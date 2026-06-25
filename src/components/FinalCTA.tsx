export default function FinalCTA() {
  return (
    <section className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-accent-600/10 to-blue-600/10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent-500/10 rounded-full blur-[100px]" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
          Deja de perder tiempo.
          <br />
          <span className="text-gradient">Empieza a producir más.</span>
        </h2>
        <p className="text-steel-300 text-lg mb-10 max-w-2xl mx-auto">
          Únete a los talleres que ya usan IA para trabajar mejor.
          Plan Starter gratuito, sin tarjeta de crédito.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/auth"
            className="px-10 py-4 rounded-xl bg-accent-500 hover:bg-accent-600 text-white font-semibold text-lg transition-all hover:shadow-lg hover:shadow-accent-500/25"
          >
            Prueba Gratis 7 Días
          </a>
          <a
            href="#contacto"
            className="px-10 py-4 rounded-xl border border-white/10 hover:border-white/20 text-white font-medium text-lg transition-colors"
          >
            Solicitar Demo
          </a>
        </div>
      </div>
    </section>
  );
}
