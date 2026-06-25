import type { Profile } from "./supabase";

export type TrialStatus = {
  canQuery: boolean;
  reason?: string;
  queriesUsed: number;
  queriesLimit: number;
  daysLeft: number;
  plan: string;
};

export function checkTrialStatus(profile: Profile): TrialStatus {
  const now = new Date();
  const trialEnd = new Date(profile.trial_end);
  const daysLeft = Math.max(0, Math.ceil((trialEnd.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)));

  if (profile.plan === "pro" || profile.plan === "enterprise") {
    return {
      canQuery: true,
      queriesUsed: profile.queries_used,
      queriesLimit: -1,
      daysLeft: -1,
      plan: profile.plan,
    };
  }

  if (now > trialEnd) {
    return {
      canQuery: false,
      reason: "Tu periodo de prueba de 7 días ha expirado. Actualiza a Pro para seguir usando CNC Copilot AI.",
      queriesUsed: profile.queries_used,
      queriesLimit: profile.queries_limit,
      daysLeft: 0,
      plan: profile.plan,
    };
  }

  if (profile.queries_used >= profile.queries_limit) {
    return {
      canQuery: false,
      reason: `Has alcanzado el límite de ${profile.queries_limit} consultas gratuitas. Actualiza a Pro para consultas ilimitadas.`,
      queriesUsed: profile.queries_used,
      queriesLimit: profile.queries_limit,
      daysLeft,
      plan: profile.plan,
    };
  }

  return {
    canQuery: true,
    queriesUsed: profile.queries_used,
    queriesLimit: profile.queries_limit,
    daysLeft,
    plan: profile.plan,
  };
}

const ALLOWED_CATEGORIES_TRIAL = [
  "gcode",
  "mcode",
  "alarmas",
  "mecanizado-basico",
];

export function isCategoryAllowed(category: string, plan: string): boolean {
  if (plan === "pro" || plan === "enterprise") return true;
  return ALLOWED_CATEGORIES_TRIAL.includes(category);
}
