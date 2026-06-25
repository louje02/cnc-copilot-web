import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Profile = {
  id: string;
  email: string;
  full_name: string;
  company: string;
  plan: "trial" | "pro" | "enterprise";
  trial_start: string;
  trial_end: string;
  queries_used: number;
  queries_limit: number;
  is_active: boolean;
};

export type Query = {
  id: string;
  user_id: string;
  question: string;
  answer: string;
  category: string;
  created_at: string;
};
