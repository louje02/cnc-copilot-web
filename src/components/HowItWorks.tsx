export default function HowItWorks() {
  const steps = [
    {
      num: "01",
      title: "Regístrate gratis",
      desc: "Sin tarjeta de crédito. Accede a 10 consultas diarias para probar el asistente.",
    },
    {
      num: "02",
      title: "Haz tu pregunta",
      desc: "Escribe como hablarías con un compañero: alarmas, G-Code, materiales, lo que necesites.",
    },
    {
      num: "03",
      title: "Obtén la respuesta",
      desc: "Respuesta técnica precisa en segundos. Con código, parámetros y pasos a seguir.",
    },
    {
      num: "04",
      title: "Aplica en tu máquina",
      desc: "Soluciones prácticas que puedes aplicar directamente en tu CNC.",
    },
  ];

  return (
    <section id="como-funciona" className="py-24 lg:py-32 bg-navy-800/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-accent-400 font-medium text-sm uppercase tracking-wider mb-4">
            Simple y directo
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold">
            Cómo funciona
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((s, i) => (
            <div key={s.num} className="relative">
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-full w-full h-px bg-gradient-to-r from-accent-500/30 to-transparent" />
              )}
              <div className="text-5xl font-black text-accent-500/20 mb-4">{s.num}</div>
              <h3 className="font-semibold text-lg mb-2">{s.title}</h3>
              <p className="text-steel-400 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
