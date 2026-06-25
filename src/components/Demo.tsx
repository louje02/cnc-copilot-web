"use client";
import { useState } from "react";

const conversations = [
  {
    tab: "Alarmas",
    query: "Tengo alarma 410 SERVO ERROR en mi HAAS VF-2. ¿Qué hago?",
    response: `**Alarma 410 — SERVO ERROR (HAAS VF-2)**

**Causa probable:** Fallo en el servomotor o encoder del eje afectado.

**Pasos para resolver:**
1. Pulsa RESET. Si desaparece, monitoriza.
2. Comprueba qué eje marca error en la pantalla de diagnóstico.
3. Revisa conexiones del encoder (conector suelto).
4. Verifica que no haya sobrecalentamiento del motor.
5. Si persiste, comprueba el amplificador del servo.

**Código relacionado:** Parámetro 11 (ganancia del servo)
**Tiempo estimado:** 15-30 min si es conector, 2-4h si es amplificador.`,
  },
  {
    tab: "G-Code",
    query: "Necesito un ciclo de cajera rectangular en Fanuc, 80x50mm, profundidad 15mm en aluminio 6061",
    response: `**Cajera rectangular — Fanuc (Aluminio 6061)**

\`\`\`gcode
O0001 (CAJERA 80X50 PROF15)
T01 M06 (FRESA D12 3F CARBURO)
G90 G54 G17
S8000 M03
G43 H01 Z50.
G00 X0 Y0
M08
G01 Z-3. F1200 (PASO 3MM)
G41 D01
G01 X-40. Y-25.
Y25.
X40.
Y-25.
X-40.
G40
G00 Z5.
(REPETIR PARA Z-6, Z-9, Z-12, Z-15)
M09
G91 G28 Z0
M30
\`\`\`

**Parámetros:** Vc=250m/min, fz=0.08mm, ae=60%(7.2mm)`,
  },
  {
    tab: "Optimización",
    query: "Mi ciclo de torneado tarda 12 minutos por pieza. ¿Cómo lo reduzco?",
    response: `**Análisis de optimización — Torneado**

**Acciones de impacto inmediato:**

1. **Velocidad de corte:** Si usas Vc=150, sube a 200-220 m/min con inserto recubierto CVD. Ahorro: ~15%.

2. **Profundidad de pasada:** Reduce pasadas. Si haces 4 pasadas de 1mm, haz 2 de 2mm. Ahorro: ~25%.

3. **Avance en desbaste:** Sube de f=0.2 a f=0.3 mm/rev con plaquita robusta (CNMG tipo -PR). Ahorro: ~20%.

4. **Movimientos en vacío:** Usa G00 en todos los reposicionamientos. Revisa recorridos muertos.

5. **Cambio de herramienta:** Minimiza cambios reorganizando operaciones.

**Estimación:** De 12 min a ~8 min/pieza = **33% más productividad**.
Con 100 piezas/día = **6.5 horas ahorradas**.`,
  },
];

export default function Demo() {
  const [active, setActive] = useState(0);
  const c = conversations[active];

  return (
    <section id="demo" className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="text-accent-400 font-medium text-sm uppercase tracking-wider mb-4">
            Demostración
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Mira cómo trabaja CNC Copilot AI
          </h2>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="flex gap-2 mb-6">
            {conversations.map((conv, i) => (
              <button
                key={conv.tab}
                onClick={() => setActive(i)}
                className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${
                  active === i
                    ? "bg-accent-500 text-white"
                    : "bg-navy-800 text-steel-400 hover:text-white"
                }`}
              >
                {conv.tab}
              </button>
            ))}
          </div>

          <div className="bg-navy-800 rounded-2xl border border-white/10 glow overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 bg-navy-700/50 border-b border-white/5">
              <div className="w-3 h-3 rounded-full bg-red-500/60" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
              <div className="w-3 h-3 rounded-full bg-green-500/60" />
              <span className="ml-2 text-xs text-steel-400 font-mono">
                CNC Copilot AI — Chat
              </span>
            </div>

            <div className="p-6 space-y-6">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-lg bg-steel-500/20 flex items-center justify-center text-xs font-mono text-steel-300 shrink-0">
                  TÚ
                </div>
                <div className="bg-navy-700/50 rounded-xl rounded-tl-none p-4 text-sm text-steel-200">
                  {c.query}
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-lg bg-accent-500/20 flex items-center justify-center text-xs font-mono text-accent-400 shrink-0">
                  AI
                </div>
                <div className="bg-accent-500/5 border border-accent-500/10 rounded-xl rounded-tl-none p-4 text-sm text-steel-200 whitespace-pre-wrap font-mono leading-relaxed">
                  {c.response}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
