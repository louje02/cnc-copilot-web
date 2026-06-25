export default function Pricing() {
  const plans = [
    {
      name: "Starter",
      price: "0",
      period: "para siempre",
      desc: "Perfecto para probar el asistente",
      features: [
        "10 consultas al día",
        "Resolución de alarmas básica",
        "Códigos G y M explicados",
        "1 control CNC",
        "Soporte por email",
      ],
      cta: "Empezar Gratis",
      highlight: false,
    },
    {
      name: "Pro",
      price: "29",
      period: "/mes",
      desc: "Para programadores y operarios profesionales",
      features: [
        "Consultas ilimitadas",
        "Todos los controles CNC",
        "Generación de G-Code",
        "Optimización de ciclos",
        "Velocidades y avances avanzados",
        "Historial de consultas",
        "Soporte prioritario",
      ],
      cta: "Empezar Prueba Gratuita",
      highlight: true,
      badge: "Más popular",
    },
    {
      name: "Enterprise",
      price: "99",
      period: "/mes por puesto",
      desc: "Para talleres y equipos completos",
      features: [
        "Todo lo de Pro",
        "Multiusuario (5+ puestos)",
        "Documentación por máquina",
        "Base de conocimiento personalizada",
        "Dashboard de uso y métricas",
        "Integración API",
        "Soporte dedicado 24/7",
        "Formación inicial incluida",
      ],
      cta: "Contactar Ventas",
      highlight: false,
    },
  ];

  return (
    <section id="precios" className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-accent-400 font-medium text-sm uppercase tracking-wider mb-4">
            Precios transparentes
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Elige tu plan. Empieza hoy.
          </h2>
          <p className="text-steel-300 text-lg">
            Sin permanencia. Sin sorpresas. Cancela cuando quieras.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`relative rounded-2xl p-8 ${
                p.highlight
                  ? "bg-gradient-to-b from-accent-500/10 to-navy-800 border-2 border-accent-500/40 glow"
                  : "bg-navy-800/50 border border-white/5"
              }`}
            >
              {p.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-accent-500 rounded-full text-xs font-semibold">
                  {p.badge}
                </div>
              )}

              <h3 className="text-xl font-bold mb-1">{p.name}</h3>
              <p className="text-steel-400 text-sm mb-6">{p.desc}</p>

              <div className="mb-6">
                <span className="text-4xl font-bold">{p.price}€</span>
                <span className="text-steel-400 ml-1">{p.period}</span>
              </div>

              <a
                href="#contacto"
                className={`block text-center py-3 rounded-xl font-medium transition-all mb-8 ${
                  p.highlight
                    ? "bg-accent-500 hover:bg-accent-600 text-white"
                    : "bg-white/5 hover:bg-white/10 text-white border border-white/10"
                }`}
              >
                {p.cta}
              </a>

              <ul className="space-y-3">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm">
                    <svg className="w-5 h-5 text-accent-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-steel-300">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
