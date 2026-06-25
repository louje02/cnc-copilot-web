"use client";
import { useState } from "react";

const faqs = [
  {
    q: "¿Necesito saber de IA para usar CNC Copilot?",
    a: "No. Si sabes escribir un WhatsApp, sabes usar CNC Copilot. Escribe tu pregunta como se la harías a un compañero de taller y obtendrás una respuesta técnica clara.",
  },
  {
    q: "¿Qué controles CNC soporta?",
    a: "Fanuc, Siemens, Heidenhain, HAAS, Mazak, Okuma, Fagor y más. En el plan Pro tienes acceso a todos los controles. En Starter, puedes elegir uno.",
  },
  {
    q: "¿Puede generar programas CNC completos?",
    a: "Sí. Puede generar código G para operaciones estándar: cajeras, contornos, ciclos de torneado, roscados, etc. Siempre debes verificar y simular el código antes de ejecutarlo en máquina.",
  },
  {
    q: "¿Es seguro usar el código que genera?",
    a: "CNC Copilot genera código según las mejores prácticas, pero como cualquier herramienta de programación, el operario debe verificar el programa antes de ejecutar. Nunca ejecutes código sin revisarlo.",
  },
  {
    q: "¿Funciona sin conexión a internet?",
    a: "Necesitas conexión a internet para consultar el asistente. Estamos trabajando en un modo offline para el plan Enterprise.",
  },
  {
    q: "¿Puedo cancelar en cualquier momento?",
    a: "Sí, sin permanencia ni penalizaciones. Cancelas y sigues teniendo acceso hasta fin de tu período de facturación.",
  },
  {
    q: "¿Mis consultas son privadas?",
    a: "Tus consultas son confidenciales. No compartimos datos de uso con terceros. En el plan Enterprise, ofrecemos opciones de privacidad adicionales.",
  },
  {
    q: "¿Cómo se diferencia de ChatGPT?",
    a: "ChatGPT es un asistente general. CNC Copilot está entrenado específicamente para mecanizado CNC, con conocimiento profundo de controles, herramientas, materiales y procedimientos industriales reales.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 lg:py-32 bg-navy-800/30">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-accent-400 font-medium text-sm uppercase tracking-wider mb-4">
            Preguntas frecuentes
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold">
            Lo que necesitas saber
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="border border-white/5 rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-white/[0.02] transition-colors"
              >
                <span className="font-medium pr-4">{faq.q}</span>
                <svg
                  className={`w-5 h-5 text-steel-400 shrink-0 transition-transform ${
                    openIndex === i ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openIndex === i && (
                <div className="px-5 pb-5 text-steel-300 text-sm leading-relaxed">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
