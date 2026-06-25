"use client";
import { useState, type FormEvent } from "react";

const FORMSPREE_ID = "YOUR_FORMSPREE_ID";

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSending(true);
    setError(false);

    const data = new FormData(e.currentTarget);

    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setSent(true);
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    } finally {
      setSending(false);
    }
  }

  return (
    <section id="contacto" className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          <div>
            <p className="text-accent-400 font-medium text-sm uppercase tracking-wider mb-4">
              Contacto
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              ¿Dudas? Hablemos.
            </h2>
            <p className="text-steel-300 text-lg mb-8 leading-relaxed">
              Si tienes un taller con varias máquinas y quieres una demo
              personalizada del plan Enterprise, escríbenos.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-steel-300">
                <svg className="w-5 h-5 text-accent-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                contacto@cnccopilot.ai
              </div>
              <div className="flex items-center gap-3 text-steel-300">
                <svg className="w-5 h-5 text-accent-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Respondemos en menos de 24 horas
              </div>
            </div>
          </div>

          <div className="bg-navy-800/50 border border-white/5 rounded-2xl p-8">
            {sent ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Mensaje enviado</h3>
                <p className="text-steel-400">Te contactaremos pronto.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">Nombre</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-navy-900 border border-white/10 text-white placeholder:text-steel-500 focus:outline-none focus:border-accent-500 transition-colors"
                    placeholder="Tu nombre"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-navy-900 border border-white/10 text-white placeholder:text-steel-500 focus:outline-none focus:border-accent-500 transition-colors"
                    placeholder="tu@empresa.com"
                  />
                </div>
                <div>
                  <label htmlFor="company" className="block text-sm font-medium mb-2">Empresa / Taller</label>
                  <input
                    id="company"
                    name="company"
                    type="text"
                    className="w-full px-4 py-3 rounded-xl bg-navy-900 border border-white/10 text-white placeholder:text-steel-500 focus:outline-none focus:border-accent-500 transition-colors"
                    placeholder="Nombre de tu taller"
                  />
                </div>
                <div>
                  <label htmlFor="machines" className="block text-sm font-medium mb-2">¿Cuántas máquinas CNC tienes?</label>
                  <select
                    id="machines"
                    name="machines"
                    className="w-full px-4 py-3 rounded-xl bg-navy-900 border border-white/10 text-white focus:outline-none focus:border-accent-500 transition-colors"
                  >
                    <option value="">Selecciona</option>
                    <option value="1-3">1-3 máquinas</option>
                    <option value="4-10">4-10 máquinas</option>
                    <option value="11-25">11-25 máquinas</option>
                    <option value="25+">Más de 25 máquinas</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">Mensaje</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl bg-navy-900 border border-white/10 text-white placeholder:text-steel-500 focus:outline-none focus:border-accent-500 transition-colors resize-none"
                    placeholder="Cuéntanos qué necesitas..."
                  />
                </div>
                {error && (
                  <p className="text-red-400 text-sm">Error al enviar. Inténtalo de nuevo.</p>
                )}
                <button
                  type="submit"
                  disabled={sending}
                  className="w-full py-4 rounded-xl bg-accent-500 hover:bg-accent-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold transition-colors"
                >
                  {sending ? "Enviando..." : "Enviar Mensaje"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
