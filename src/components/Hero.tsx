export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(14,165,233,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(14,165,233,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-accent-500/10 rounded-full blur-[120px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-500/10 border border-accent-500/20 text-accent-400 text-sm mb-6">
              <span className="w-2 h-2 rounded-full bg-accent-400 animate-pulse" />
              Diseñado por profesionales del mecanizado
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Tu copiloto
              <br />
              <span className="text-gradient">inteligente</span> en el
              <br />
              taller CNC
            </h1>

            <p className="text-lg text-steel-300 max-w-lg mb-8 leading-relaxed">
              Resuelve alarmas, programa en G-Code y optimiza ciclos con IA
              especializada. El conocimiento de 20 años de mecanizado, disponible
              en segundos.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <a
                href="/auth"
                className="px-8 py-4 rounded-xl bg-accent-500 hover:bg-accent-600 text-white font-semibold text-center transition-all hover:shadow-lg hover:shadow-accent-500/25"
              >
                Prueba Gratis 7 Días
              </a>
              <a
                href="#demo"
                className="px-8 py-4 rounded-xl border border-white/10 hover:border-white/20 text-white font-medium text-center transition-colors"
              >
                Ver Demostración
              </a>
            </div>

            <div className="flex items-center gap-8 text-sm text-steel-400">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                HAAS, Fanuc, Siemens
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                24/7 disponible
              </div>
            </div>
          </div>

          {/* Terminal simulado */}
          <div className="animate-float">
            <div className="bg-navy-800 rounded-2xl border border-white/10 glow overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 bg-navy-700/50 border-b border-white/5">
                <div className="w-3 h-3 rounded-full bg-red-500/60" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                <div className="w-3 h-3 rounded-full bg-green-500/60" />
                <span className="ml-2 text-xs text-steel-400 font-mono">CNC Copilot AI</span>
              </div>
              <div className="p-6 font-mono text-sm space-y-4">
                <div>
                  <span className="text-steel-400">usuario@taller:~$</span>
                  <span className="text-accent-400 ml-2">¿Qué velocidad de corte uso para acero 1045 con inserto CNMG?</span>
                </div>
                <div className="bg-navy-700/30 rounded-lg p-4 border-l-2 border-accent-500">
                  <p className="text-green-400 mb-2">✓ CNC Copilot AI</p>
                  <p className="text-steel-200 leading-relaxed">
                    Para <span className="text-accent-400">acero AISI 1045</span> con inserto CNMG (carburo recubierto):
                  </p>
                  <ul className="text-steel-300 mt-2 space-y-1">
                    <li>→ Vc: <span className="text-white">180-220 m/min</span></li>
                    <li>→ Avance: <span className="text-white">0.25-0.35 mm/rev</span></li>
                    <li>→ Profundidad: <span className="text-white">2-4 mm</span></li>
                  </ul>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-steel-400">usuario@taller:~$</span>
                  <span className="w-2 h-5 bg-accent-400 animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
