-- =============================================
-- CNC Copilot AI — RAG Knowledge Base Schema
-- =============================================

-- Activar extensión pgvector
create extension if not exists vector;

-- Documentos subidos (manuales, guías, etc.)
create table public.documents (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  source text,
  category text not null default 'general',
  created_at timestamptz not null default now()
);

-- Fragmentos de texto con embeddings
create table public.chunks (
  id uuid default gen_random_uuid() primary key,
  document_id uuid references public.documents(id) on delete cascade not null,
  content text not null,
  embedding vector(1536),
  metadata jsonb default '{}',
  created_at timestamptz not null default now()
);

-- Índice para búsqueda por similitud
create index idx_chunks_embedding on public.chunks
  using ivfflat (embedding vector_cosine_ops)
  with (lists = 100);

create index idx_chunks_document_id on public.chunks(document_id);

-- Función para buscar fragmentos similares a una pregunta
create or replace function match_chunks(
  query_embedding vector(1536),
  match_threshold float default 0.7,
  match_count int default 5
)
returns table (
  id uuid,
  content text,
  document_title text,
  category text,
  similarity float
)
language sql stable
as $$
  select
    chunks.id,
    chunks.content,
    documents.title as document_title,
    documents.category,
    1 - (chunks.embedding <=> query_embedding) as similarity
  from chunks
  join documents on documents.id = chunks.document_id
  where 1 - (chunks.embedding <=> query_embedding) > match_threshold
  order by chunks.embedding <=> query_embedding
  limit match_count;
$$;

-- RLS: los chunks y documentos son públicos de lectura (el conocimiento es compartido)
alter table public.documents enable row level security;
alter table public.chunks enable row level security;

create policy "Documents are readable by all authenticated users"
  on public.documents for select
  using (auth.role() = 'authenticated');

create policy "Chunks are readable by all authenticated users"
  on public.chunks for select
  using (auth.role() = 'authenticated');
