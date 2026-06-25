import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CNC Copilot AI — Asistente Inteligente para Mecanizado CNC",
  description:
    "Asistente de inteligencia artificial para programadores CNC, operarios y talleres de mecanizado. Resuelve alarmas, optimiza G-Code y reduce tiempos de programación.",
  keywords:
    "CNC, G-Code, mecanizado, programación CNC, asistente IA, HAAS, Fanuc, Siemens, torno CNC, fresadora CNC",
  openGraph: {
    title: "CNC Copilot AI — Tu Copiloto en el Taller",
    description:
      "IA especializada en mecanizado CNC. Programación, alarmas, velocidades y avances.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
