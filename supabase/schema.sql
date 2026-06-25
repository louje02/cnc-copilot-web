-- =============================================
-- CNC Copilot AI — Database Schema (Supabase)
-- =============================================

-- Perfil de usuario con datos del trial
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text not null,
  full_name text,
  company text,
  plan text not null default 'trial',
  trial_start timestamptz not null default now(),
  trial_end timestamptz not null default (now() + interval '7 days'),
  queries_used integer not null default 0,
  queries_limit integer not null default 20,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

-- Historial de consultas
create table public.queries (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  question text not null,
  answer text not null,
  category text not null,
  created_at timestamptz not null default now()
);

-- RLS: cada usuario solo ve sus datos
alter table public.profiles enable row level security;
alter table public.queries enable row level security;

create policy "Users can read own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

create policy "Users can read own queries"
  on public.queries for select
  using (auth.uid() = user_id);

create policy "Users can insert own queries"
  on public.queries for insert
  with check (auth.uid() = user_id);

-- Trigger: crear perfil automáticamente al registrarse
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', '')
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Índices
create index idx_queries_user_id on public.queries(user_id);
create index idx_profiles_plan on public.profiles(plan);
