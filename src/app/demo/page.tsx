"use client";
import { useEffect, useState, useRef } from "react";
import { supabase } from "@/lib/supabase";
import type { Profile } from "@/lib/supabase";
import type { TrialStatus } from "@/lib/trial";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function DemoPage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [trialStatus, setTrialStatus] = useState<TrialStatus | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function checkAuth() {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      window.location.href = "/auth";
      return;
    }

    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", session.user.id)
      .single();

    if (data) {
      setProfile(data);
      const now = new Date();
      const trialEnd = new Date(data.trial_end);
      const daysLeft = Math.max(0, Math.ceil((trialEnd.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)));
      setTrialStatus({
        canQuery: now <= trialEnd && data.queries_used < data.queries_limit,
        queriesUsed: data.queries_used,
        queriesLimit: data.queries_limit,
        daysLeft,
        plan: data.plan,
      });
    }
    setAuthLoading(false);
  }

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const question = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: question }]);
    setLoading(true);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        window.location.href = "/auth";
        return;
      }

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({ question }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.trialStatus) setTrialStatus(data.trialStatus);
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.error || "Error al procesar la consulta." },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.answer },
        ]);
        if (data.trialStatus) setTrialStatus(data.trialStatus);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Error de conexión. Inténtalo de nuevo." },
      ]);
    }

    setLoading(false);
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    window.location.href = "/";
  }

  if (authLoading) {
    return (
      <div className="min-h-screen bg-navy-900 flex items-center justify-center">
        <div className="text-steel-400">Cargando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-navy-900 flex flex-col">
      {/* Header */}
      <header className="border-b border-white/5 px-4 py-3">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-400 to-accent-600 flex items-center justify-center font-mono font-bold text-sm">
              AI
            </div>
            <span className="font-semibold">
              CNC Copilot<span className="text-accent-400"> AI</span>
            </span>
          </a>

          <div className="flex items-center gap-4">
            {trialStatus && trialStatus.plan === "trial" && (
              <div className="hidden sm:flex items-center gap-3 text-sm">
                <span className="text-steel-400">
                  {trialStatus.queriesUsed}/{trialStatus.queriesLimit} consultas
                </span>
                <span className="text-steel-500">|</span>
                <span className="text-steel-400">
                  {trialStatus.daysLeft} días restantes
                </span>
                <a
                  href="/#precios"
                  className="px-3 py-1 rounded-lg bg-accent-500/10 text-accent-400 text-xs font-medium hover:bg-accent-500/20 transition-colors"
                >
                  Actualizar a Pro
                </a>
              </div>
            )}
            <button
              onClick={handleLogout}
              className="text-steel-400 text-sm hover:text-white transition-colors"
            >
              Salir
            </button>
          </div>
        </div>
      </header>

      {/* Trial status bar (mobile) */}
      {trialStatus && trialStatus.plan === "trial" && (
        <div className="sm:hidden bg-navy-800/50 border-b border-white/5 px-4 py-2 flex items-center justify-between text-xs text-steel-400">
          <span>{trialStatus.queriesUsed}/{trialStatus.queriesLimit} consultas</span>
          <span>{trialStatus.daysLeft} días restantes</span>
          <a href="/#precios" className="text-accent-400">Actualizar</a>
        </div>
      )}

      {/* Chat area */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {messages.length === 0 && (
            <div className="text-center py-20">
              <div className="w-16 h-16 rounded-2xl bg-accent-500/10 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-mono font-bold text-accent-400">AI</span>
              </div>
              <h2 className="text-xl font-bold mb-2">¡Hola{profile?.full_name ? `, ${profile.full_name}` : ""}!</h2>
              <p className="text-steel-400 mb-8">Soy tu asistente CNC. Pregúntame lo que necesites.</p>

              <div className="grid sm:grid-cols-2 gap-3 max-w-lg mx-auto">
                {[
                  "¿Qué significa la alarma 410 en HAAS?",
                  "Velocidad de corte para aluminio 6061 con fresa D12",
                  "Explícame el código G41",
                  "Ciclo de roscado en Fanuc",
                ].map((q) => (
                  <button
                    key={q}
                    onClick={() => setInput(q)}
                    className="text-left text-sm p-3 rounded-xl bg-navy-800/50 border border-white/5 text-steel-300 hover:border-accent-500/30 hover:text-white transition-all"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((msg, i) => (
            <div key={i} className="flex gap-3">
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-mono shrink-0 ${
                  msg.role === "user"
                    ? "bg-steel-500/20 text-steel-300"
                    : "bg-accent-500/20 text-accent-400"
                }`}
              >
                {msg.role === "user" ? "TÚ" : "AI"}
              </div>
              <div
                className={`rounded-xl rounded-tl-none p-4 text-sm leading-relaxed max-w-[85%] whitespace-pre-wrap ${
                  msg.role === "user"
                    ? "bg-navy-700/50 text-steel-200"
                    : "bg-accent-500/5 border border-accent-500/10 text-steel-200 font-mono"
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-lg bg-accent-500/20 flex items-center justify-center text-xs font-mono text-accent-400 shrink-0">
                AI
              </div>
              <div className="bg-accent-500/5 border border-accent-500/10 rounded-xl rounded-tl-none p-4">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-accent-400 rounded-full animate-bounce" />
                  <span className="w-2 h-2 bg-accent-400 rounded-full animate-bounce [animation-delay:0.1s]" />
                  <span className="w-2 h-2 bg-accent-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="border-t border-white/5 px-4 py-4">
        <div className="max-w-4xl mx-auto">
          {trialStatus && !trialStatus.canQuery ? (
            <div className="text-center py-4">
              <p className="text-steel-400 text-sm mb-3">{trialStatus.reason}</p>
              <a
                href="/#precios"
                className="inline-block px-6 py-3 rounded-xl bg-accent-500 hover:bg-accent-600 text-white font-semibold transition-colors"
              >
                Actualizar a Pro — 29€/mes
              </a>
            </div>
          ) : (
            <form onSubmit={handleSend} className="flex gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Escribe tu pregunta sobre CNC..."
                className="flex-1 px-4 py-3 rounded-xl bg-navy-800 border border-white/10 text-white placeholder:text-steel-500 focus:outline-none focus:border-accent-500 transition-colors"
                disabled={loading}
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="px-6 py-3 rounded-xl bg-accent-500 hover:bg-accent-600 disabled:opacity-50 text-white font-medium transition-colors"
              >
                Enviar
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
