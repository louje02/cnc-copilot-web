"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    if (isLogin) {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        setError(error.message === "Invalid login credentials"
          ? "Email o contraseña incorrectos"
          : error.message);
      } else {
        window.location.href = "/demo";
      }
    } else {
      const { data: signUpData, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: fullName },
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (error) {
        setError(error.message);
      } else if (signUpData.session) {
        window.location.href = "/demo";
      } else {
        setSuccess("Cuenta creada. Revisa tu email para confirmar y acceder a la demo.");
      }
    }

    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-navy-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <a href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-400 to-accent-600 flex items-center justify-center font-mono font-bold">
              AI
            </div>
            <span className="text-xl font-semibold">
              CNC Copilot<span className="text-accent-400"> AI</span>
            </span>
          </a>
          <h1 className="text-2xl font-bold mt-4">
            {isLogin ? "Accede a tu cuenta" : "Prueba gratuita — 7 días"}
          </h1>
          <p className="text-steel-400 mt-2">
            {isLogin
              ? "Introduce tus credenciales"
              : "20 consultas gratis. Sin tarjeta de crédito."}
          </p>
        </div>

        <div className="bg-navy-800/50 border border-white/5 rounded-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium mb-2">
                  Nombre completo
                </label>
                <input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required={!isLogin}
                  className="w-full px-4 py-3 rounded-xl bg-navy-900 border border-white/10 text-white placeholder:text-steel-500 focus:outline-none focus:border-accent-500 transition-colors"
                  placeholder="Tu nombre"
                />
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl bg-navy-900 border border-white/10 text-white placeholder:text-steel-500 focus:outline-none focus:border-accent-500 transition-colors"
                placeholder="tu@empresa.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2">
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full px-4 py-3 rounded-xl bg-navy-900 border border-white/10 text-white placeholder:text-steel-500 focus:outline-none focus:border-accent-500 transition-colors"
                placeholder="Mínimo 6 caracteres"
              />
            </div>

            {error && (
              <p className="text-red-400 text-sm">{error}</p>
            )}
            {success && (
              <p className="text-green-400 text-sm">{success}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-xl bg-accent-500 hover:bg-accent-600 disabled:opacity-50 text-white font-semibold transition-colors"
            >
              {loading
                ? "Procesando..."
                : isLogin
                ? "Iniciar Sesión"
                : "Crear Cuenta Gratuita"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setError("");
                setSuccess("");
              }}
              className="text-accent-400 text-sm hover:underline"
            >
              {isLogin
                ? "¿No tienes cuenta? Regístrate gratis"
                : "¿Ya tienes cuenta? Inicia sesión"}
            </button>
          </div>
        </div>

        {!isLogin && (
          <div className="mt-6 text-center text-sm text-steel-400">
            <p>Tu prueba gratuita incluye:</p>
            <ul className="mt-2 space-y-1">
              <li>✓ 20 consultas durante 7 días</li>
              <li>✓ Explicación de G-Code y M-Code</li>
              <li>✓ Resolución de alarmas CNC</li>
              <li>✓ Consultas básicas de mecanizado</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
