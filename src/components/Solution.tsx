export default function Solution() {
  const features = [
    {
      title: "Programación G-Code",
      desc: "Genera, corrige y explica código G y M para cualquier control: Fanuc, Siemens, Heidenhain, HAAS.",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
    },
    {
      title: "Resolución de alarmas",
      desc: "Identifica la causa de cualquier alarma y te guía paso a paso para resolverla sin parar producción.",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
      ),
    },
    {
      title: "Velocidades y avances",
      desc: "Parámetros de corte optimizados según material, herramienta y máquina. Cálculos instantáneos.",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
    {
      title: "Optimización de ciclos",
      desc: "Analiza tus programas y sugiere mejoras para reducir tiempos de ciclo sin comprometer calidad.",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: "Documentación técnica",
      desc: "Accede a información de máquinas, herramientas, materiales y procedimientos sin buscar en manuales.",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
    },
    {
      title: "Asistente 24/7",
      desc: "Disponible a las 3 de la mañana en el turno de noche. Sin esperas, sin depender de nadie.",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  ];

  return (
    <section id="funciones" className="py-24 lg:py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-navy-900 via-navy-800/50 to-navy-900" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-accent-400 font-medium text-sm uppercase tracking-wider mb-4">
            La solución
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Todo el conocimiento CNC que necesitas, en un solo lugar
          </h2>
          <p className="text-steel-300 text-lg">
            CNC Copilot AI entiende tu trabajo porque fue creado por profesionales del mecanizado.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="bg-navy-800/30 border border-white/5 rounded-2xl p-8 hover:border-accent-500/30 hover:glow-sm transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-accent-500/10 text-accent-400 flex items-center justify-center mb-5 group-hover:bg-accent-500/20 transition-colors">
                {f.icon}
              </div>
              <h3 className="font-semibold text-lg mb-3">{f.title}</h3>
              <p className="text-steel-400 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
