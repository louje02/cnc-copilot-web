export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-400 to-accent-600 flex items-center justify-center font-mono font-bold text-sm">
                AI
              </div>
              <span className="font-semibold">
                CNC Copilot<span className="text-accent-400"> AI</span>
              </span>
            </div>
            <p className="text-steel-400 text-sm leading-relaxed">
              Asistente de inteligencia artificial especializado en mecanizado CNC.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-4">Producto</h4>
            <ul className="space-y-2 text-sm text-steel-400">
              <li><a href="#funciones" className="hover:text-white transition-colors">Funciones</a></li>
              <li><a href="#precios" className="hover:text-white transition-colors">Precios</a></li>
              <li><a href="#demo" className="hover:text-white transition-colors">Demo</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">FAQ</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-4">Controles CNC</h4>
            <ul className="space-y-2 text-sm text-steel-400">
              <li>Fanuc</li>
              <li>Siemens Sinumerik</li>
              <li>HAAS</li>
              <li>Heidenhain</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-steel-400">
              <li><a href="#" className="hover:text-white transition-colors">Política de privacidad</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Términos de uso</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Cookies</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-steel-500 text-sm">
            &copy; 2025 CNC Copilot AI. Todos los derechos reservados.
          </p>
          <p className="text-steel-500 text-xs">
            Diseñado por profesionales del mecanizado CNC
          </p>
        </div>
      </div>
    </footer>
  );
}
