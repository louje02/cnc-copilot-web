"use client";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const links = [
    { href: "#problema", label: "El Problema" },
    { href: "#funciones", label: "Funciones" },
    { href: "#como-funciona", label: "Cómo Funciona" },
    { href: "#precios", label: "Precios" },
    { href: "#faq", label: "FAQ" },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-navy-900/80 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a href="#" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-400 to-accent-600 flex items-center justify-center font-mono font-bold text-sm">
              AI
            </div>
            <span className="font-semibold text-lg">
              CNC Copilot<span className="text-accent-400"> AI</span>
            </span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm text-steel-300 hover:text-white transition-colors"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#precios"
              className="px-5 py-2 rounded-lg bg-accent-500 hover:bg-accent-600 text-white text-sm font-medium transition-colors"
            >
              Empieza Gratis
            </a>
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 text-steel-300"
            aria-label="Menú"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-navy-800 border-t border-white/5 px-4 py-4 space-y-3">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block text-steel-300 hover:text-white transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#precios"
            onClick={() => setOpen(false)}
            className="block text-center px-5 py-2 rounded-lg bg-accent-500 text-white font-medium"
          >
            Empieza Gratis
          </a>
        </div>
      )}
    </nav>
  );
}
