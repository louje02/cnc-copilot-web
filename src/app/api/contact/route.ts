import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const ADMIN_EMAIL = "loucolloto02@gmail.com";

function buildAutoReplyHtml(name: string) {
  return `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#0a1628;font-family:Arial,sans-serif">
  <div style="max-width:600px;margin:0 auto;padding:40px 20px">

    <!-- Header -->
    <div style="text-align:center;margin-bottom:30px">
      <div style="display:inline-block;background:linear-gradient(135deg,#38bdf8,#0284c7);padding:12px 16px;border-radius:12px;font-family:monospace;font-weight:bold;font-size:20px;color:white">AI</div>
      <h1 style="color:white;margin:15px 0 0;font-size:26px">CNC Copilot <span style="color:#38bdf8">AI</span></h1>
    </div>

    <!-- Body -->
    <div style="background:#142a48;border-radius:16px;padding:32px;border:1px solid rgba(255,255,255,0.05)">
      <h2 style="color:#38bdf8;margin:0 0 20px;font-size:22px">¡Hola ${name}!</h2>

      <p style="color:#d8dde5;line-height:1.7;margin:0 0 16px">
        Gracias por tu interés en <strong style="color:white">CNC Copilot AI</strong>. Hemos recibido tu mensaje y queremos que sepas que estamos aquí para ayudarte.
      </p>

      <p style="color:#d8dde5;line-height:1.7;margin:0 0 16px">
        CNC Copilot AI es un asistente de inteligencia artificial diseñado <strong style="color:white">específicamente para profesionales del mecanizado CNC</strong>. Resuelve alarmas, genera G-Code, calcula velocidades de corte y optimiza ciclos — todo en segundos.
      </p>

      <!-- CTA Demo -->
      <div style="background:#0a1628;border-radius:12px;padding:24px;margin:24px 0;text-align:center;border:1px solid #38bdf8">
        <p style="color:#38bdf8;font-weight:bold;font-size:14px;margin:0 0 8px;text-transform:uppercase;letter-spacing:1px">Prueba gratuita</p>
        <p style="color:#d8dde5;margin:0 0 16px;font-size:15px">Accede a la demo durante <strong style="color:white">7 días gratis</strong> con <strong style="color:white">20 consultas</strong> incluidas</p>
        <a href="https://cnc-copilot-web.vercel.app/auth" style="display:inline-block;background:#0ea5e9;color:white;padding:14px 36px;border-radius:10px;text-decoration:none;font-weight:bold;font-size:16px">Acceder a la Demo Gratuita →</a>
      </div>

      <!-- Features -->
      <p style="color:#b0b8c5;font-size:14px;margin:20px 0 12px">Con tu prueba gratuita podrás:</p>
      <table style="width:100%">
        <tr>
          <td style="color:#38bdf8;padding:6px 8px 6px 0;font-size:14px;vertical-align:top">✓</td>
          <td style="color:#d8dde5;padding:6px 0;font-size:14px">Resolver alarmas CNC al instante</td>
        </tr>
        <tr>
          <td style="color:#38bdf8;padding:6px 8px 6px 0;font-size:14px;vertical-align:top">✓</td>
          <td style="color:#d8dde5;padding:6px 0;font-size:14px">Generar y entender G-Code y M-Code</td>
        </tr>
        <tr>
          <td style="color:#38bdf8;padding:6px 8px 6px 0;font-size:14px;vertical-align:top">✓</td>
          <td style="color:#d8dde5;padding:6px 0;font-size:14px">Calcular velocidades y avances optimizados</td>
        </tr>
        <tr>
          <td style="color:#38bdf8;padding:6px 8px 6px 0;font-size:14px;vertical-align:top">✓</td>
          <td style="color:#d8dde5;padding:6px 0;font-size:14px">Consultar documentación técnica 24/7</td>
        </tr>
      </table>

      <!-- Videollamada -->
      <div style="border-top:1px solid rgba(255,255,255,0.05);margin-top:24px;padding-top:24px">
        <p style="color:#d8dde5;line-height:1.7;margin:0 0 12px;font-size:15px">
          ¿Prefieres una demostración personalizada para tu taller?
        </p>
        <p style="margin:0">
          <a href="https://calendly.com/cnccopilot/demo" style="color:#38bdf8;text-decoration:underline;font-size:15px">→ Agendar videollamada con nuestro equipo</a>
        </p>
      </div>
    </div>

    <!-- Footer -->
    <div style="text-align:center;margin-top:30px">
      <p style="color:#636e80;font-size:13px;margin:0 0 4px">Responderemos a tu mensaje en menos de 24 horas.</p>
      <p style="color:#636e80;font-size:12px;margin:16px 0 0">CNC Copilot AI — Inteligencia artificial para mecanizado CNC</p>
      <p style="color:#636e80;font-size:12px;margin:4px 0 0">
        <a href="https://cnc-copilot-web.vercel.app" style="color:#636e80">cnc-copilot-web.vercel.app</a>
      </p>
    </div>
  </div>
</body>
</html>`;
}

function buildNotificationHtml(name: string, email: string, company: string, machines: string, message: string) {
  return `
<h2>Nuevo contacto desde CNC Copilot AI</h2>
<table style="border-collapse:collapse;width:100%">
  <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Nombre</td><td style="padding:8px;border:1px solid #ddd">${name}</td></tr>
  <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Email</td><td style="padding:8px;border:1px solid #ddd">${email}</td></tr>
  <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Empresa</td><td style="padding:8px;border:1px solid #ddd">${company || '-'}</td></tr>
  <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Máquinas</td><td style="padding:8px;border:1px solid #ddd">${machines || '-'}</td></tr>
  <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Mensaje</td><td style="padding:8px;border:1px solid #ddd">${message || '-'}</td></tr>
</table>`;
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.json();
    const { name, email, company, machines, message } = formData;

    if (!name || !email) {
      return NextResponse.json({ error: "Nombre y email son obligatorios" }, { status: 400 });
    }

    // 1. Enviar auto-reply al usuario
    await resend.emails.send({
      from: "CNC Copilot AI <onboarding@resend.dev>",
      to: email,
      subject: "Gracias por contactar con CNC Copilot AI — Tu demo gratuita te espera",
      html: buildAutoReplyHtml(name),
    });

    // 2. Notificación al admin
    await resend.emails.send({
      from: "CNC Copilot AI <onboarding@resend.dev>",
      to: ADMIN_EMAIL,
      subject: `Nuevo contacto: ${name} — ${company || "Sin empresa"}`,
      html: buildNotificationHtml(name, email, company, machines, message),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : "Error desconocido";
    return NextResponse.json({ error: errMsg }, { status: 500 });
  }
}
