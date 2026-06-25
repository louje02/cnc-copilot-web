export default function Benefits() {
  const stats = [
    { value: "65%", label: "Menos tiempo buscando información técnica" },
    { value: "3x", label: "Más rápido resolviendo alarmas de máquina" },
    { value: "40%", label: "Reducción en errores de programación" },
    { value: "2h", label: "Ahorradas de media por turno de trabajo" },
  ];

  return (
    <section className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-accent-400 font-medium text-sm uppercase tracking-wider mb-4">
            Impacto económico
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            El ROI que tu jefe quiere ver
          </h2>
          <p className="text-steel-300 text-lg">
            Un plan Pro cuesta <span className="text-white font-semibold">29€/mes</span>.
            Un minuto de máquina parada cuesta <span className="text-white font-semibold">entre 1€ y 3€</span>.
            Haz las cuentas.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s) => (
            <div
              key={s.label}
              className="text-center p-8 rounded-2xl bg-navy-800/50 border border-white/5 hover:border-accent-500/20 transition-colors"
            >
              <div className="text-5xl font-bold text-gradient mb-3">{s.value}</div>
              <p className="text-steel-300 text-sm">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-accent-600/20 to-blue-600/20 rounded-2xl border border-accent-500/20 p-8 lg:p-12">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4">
                Un taller con 5 operarios ahorra más de <span className="text-accent-400">3.000€/mes</span>
              </h3>
              <p className="text-steel-300 leading-relaxed">
                Menos máquinas paradas, menos scrap, menos horas extra buscando soluciones.
                CNC Copilot AI se paga solo la primera semana.
              </p>
            </div>
            <div className="text-center">
              <div className="inline-block bg-navy-900/50 rounded-2xl p-8">
                <div className="text-sm text-steel-400 mb-2">Inversión mensual</div>
                <div className="text-4xl font-bold text-white mb-1">5 × 29€ = 145€</div>
                <div className="text-sm text-steel-400 mb-4">vs.</div>
                <div className="text-sm text-steel-400 mb-2">Ahorro estimado</div>
                <div className="text-4xl font-bold text-green-400">+3.000€</div>
                <div className="mt-4 text-accent-400 font-semibold text-lg">ROI: 20x</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
