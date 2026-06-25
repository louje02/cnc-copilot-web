export default function Problem() {
  const problems = [
    {
      icon: "⏱",
      title: "Horas buscando en manuales",
      desc: "Manuales de 500 páginas para encontrar un código de alarma. Tiempo perdido que cuesta dinero.",
    },
    {
      icon: "🔴",
      title: "Máquinas paradas por alarmas",
      desc: "Una alarma desconocida puede parar la producción horas hasta que alguien con experiencia la resuelve.",
    },
    {
      icon: "📉",
      title: "Errores de programación",
      desc: "Un parámetro mal calculado significa piezas rechazadas, material desperdiciado y retrasos en entregas.",
    },
    {
      icon: "👴",
      title: "Conocimiento que se jubila",
      desc: "Los mejores operarios se retiran y su experiencia de décadas se pierde para siempre.",
    },
  ];

  return (
    <section id="problema" className="py-24 lg:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-accent-400 font-medium text-sm uppercase tracking-wider mb-4">
            El problema real
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Tu taller pierde dinero cada día por falta de información inmediata
          </h2>
          <p className="text-steel-300 text-lg">
            Los profesionales CNC pierden una media de <span className="text-white font-semibold">45 minutos diarios</span> buscando
            información técnica que debería estar disponible al instante.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {problems.map((p) => (
            <div
              key={p.title}
              className="bg-navy-800/50 border border-white/5 rounded-2xl p-6 hover:border-red-500/20 transition-colors group"
            >
              <span className="text-3xl mb-4 block">{p.icon}</span>
              <h3 className="font-semibold text-lg mb-2 group-hover:text-red-400 transition-colors">
                {p.title}
              </h3>
              <p className="text-steel-400 text-sm leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 bg-red-500/10 border border-red-500/20 rounded-full px-6 py-3">
            <span className="text-red-400 font-semibold">Coste estimado:</span>
            <span className="text-white">+2.500€/mes por taller en productividad perdida</span>
          </div>
        </div>
      </div>
    </section>
  );
}
