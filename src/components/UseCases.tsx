export default function UseCases() {
  const cases = [
    {
      role: "Programador CNC",
      scenario: "Necesita generar un programa de fresado para una pieza compleja a las 11 de la noche.",
      result: "CNC Copilot genera el código base en 30 segundos. El programador lo ajusta y valida. Tiempo ahorrado: 2 horas.",
      color: "accent",
    },
    {
      role: "Operario en turno de noche",
      scenario: "Salta una alarma que nunca ha visto. No hay jefe de taller ni manual disponible.",
      result: "Consulta CNC Copilot, identifica la causa y resuelve en 10 minutos. Sin llamar a nadie.",
      color: "green",
    },
    {
      role: "Preparador de máquina",
      scenario: "Necesita calcular velocidades para un material que no ha mecanizado antes.",
      result: "Obtiene parámetros optimizados al instante. Sin prueba y error. Sin piezas de scrap.",
      color: "purple",
    },
    {
      role: "Jefe de taller",
      scenario: "Operario junior no sabe interpretar un plano con tolerancias complejas.",
      result: "CNC Copilot explica cada cota, tolerancia y acabado. El operario trabaja con confianza.",
      color: "orange",
    },
  ];

  const colorMap: Record<string, string> = {
    accent: "border-accent-500/30 bg-accent-500/5",
    green: "border-green-500/30 bg-green-500/5",
    purple: "border-purple-500/30 bg-purple-500/5",
    orange: "border-orange-500/30 bg-orange-500/5",
  };

  return (
    <section className="py-24 lg:py-32 bg-navy-800/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-accent-400 font-medium text-sm uppercase tracking-wider mb-4">
            Casos de uso reales
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Para cada persona en tu taller
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {cases.map((c) => (
            <div key={c.role} className={`rounded-2xl border p-8 ${colorMap[c.color]}`}>
              <h3 className="font-bold text-xl mb-3">{c.role}</h3>
              <p className="text-steel-300 mb-4 text-sm">
                <span className="text-steel-400">Situación:</span> {c.scenario}
              </p>
              <div className="flex items-start gap-2">
                <svg className="w-5 h-5 text-green-400 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <p className="text-white text-sm font-medium">{c.result}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
