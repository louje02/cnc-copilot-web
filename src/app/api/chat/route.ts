import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { checkTrialStatus } from "@/lib/trial";
import { searchKnowledge } from "@/lib/rag";

const SYSTEM_PROMPT = `Eres CNC Copilot AI, un asistente experto en mecanizado CNC.

Tienes conocimiento profundo de:
- Programación G-Code y M-Code para Fanuc, Siemens, Heidenhain, HAAS, Mazak, Fagor
- Resolución de alarmas de máquinas CNC
- Velocidades de corte y avances para todos los materiales
- Tornos CNC, fresadoras CNC, centros de mecanizado
- Interpretación de planos mecánicos
- Estrategias de mecanizado y optimización de ciclos
- Herramientas de corte y portaherramientas

Reglas:
- Responde SIEMPRE en español
- Sé directo y práctico, como hablaría un compañero de taller experimentado
- Incluye valores numéricos concretos cuando sea posible
- Si generas código G, añade comentarios explicativos
- Si no estás seguro de algo, dilo claramente
- NUNCA inventes códigos de alarma o parámetros — si no los conoces, dilo
- Prioriza la seguridad: siempre recuerda verificar en simulación antes de ejecutar`;

function classifyQuestion(question: string): string {
  const q = question.toLowerCase();
  if (/alarm|error|fallo|aviso|mensaje/.test(q)) return "alarmas";
  if (/g\d{1,3}|código g|gcode|g-code|programa cnc|ciclo/.test(q)) return "gcode";
  if (/m\d{1,3}|código m|mcode|m-code/.test(q)) return "mcode";
  if (/velocidad|avance|rpm|vc|fz|profundidad|pasada/.test(q)) return "parametros";
  if (/optimi|reducir|tiempo|ciclo|mejorar/.test(q)) return "optimizacion";
  return "mecanizado-basico";
}

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const token = authHeader.replace("Bearer ", "");

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      { global: { headers: { Authorization: `Bearer ${token}` } } }
    );

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser(token);

    if (authError || !user) {
      return NextResponse.json({ error: "Token inválido" }, { status: 401 });
    }

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (!profile) {
      return NextResponse.json(
        { error: `Perfil no encontrado. ${profileError?.message || ""}` },
        { status: 404 }
      );
    }

    const trialStatus = checkTrialStatus(profile);
    if (!trialStatus.canQuery) {
      return NextResponse.json(
        { error: trialStatus.reason, trialStatus },
        { status: 403 }
      );
    }

    const { question } = await req.json();
    if (!question || typeof question !== "string" || question.trim().length === 0) {
      return NextResponse.json({ error: "Pregunta vacía" }, { status: 400 });
    }

    const category = classifyQuestion(question);

    // Buscar conocimiento relevante en la base de datos
    let knowledgeContext = "";
    try {
      knowledgeContext = await searchKnowledge(question);
    } catch {
      // Si falla la búsqueda RAG, continuar sin contexto adicional
    }

    const systemMessage = knowledgeContext
      ? `${SYSTEM_PROMPT}\n\n--- DOCUMENTACIÓN TÉCNICA RELEVANTE ---\nUsa la siguiente información de nuestros manuales técnicos para responder. Si la información contradice tu conocimiento general, prioriza los manuales. Cita la fuente cuando uses esta información.\n\n${knowledgeContext}\n--- FIN DE DOCUMENTACIÓN ---`
      : SYSTEM_PROMPT;

    const aiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: systemMessage },
          { role: "user", content: question },
        ],
        max_tokens: 1500,
        temperature: 0.3,
      }),
    });

    if (!aiResponse.ok) {
      const errBody = await aiResponse.text();
      return NextResponse.json(
        { error: `Error IA (${aiResponse.status}): ${errBody.slice(0, 200)}` },
        { status: 500 }
      );
    }

    const aiData = await aiResponse.json();
    const answer = aiData.choices[0].message.content;

    // Guardar consulta e incrementar contador
    await supabase.from("queries").insert({
      user_id: user.id,
      question: question.slice(0, 2000),
      answer: answer.slice(0, 5000),
      category,
    });

    await supabase
      .from("profiles")
      .update({ queries_used: profile.queries_used + 1 })
      .eq("id", user.id);

    return NextResponse.json({
      answer,
      category,
      usedKnowledgeBase: knowledgeContext.length > 0,
      trialStatus: {
        ...trialStatus,
        queriesUsed: trialStatus.queriesUsed + 1,
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
