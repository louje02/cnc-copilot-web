import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function generateEmbedding(text: string): Promise<number[]> {
  const res = await fetch("https://api.openai.com/v1/embeddings", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "text-embedding-3-small",
      input: text,
    }),
  });

  if (!res.ok) {
    throw new Error(`Embedding error: ${res.status}`);
  }

  const data = await res.json();
  return data.data[0].embedding;
}

export function splitTextIntoChunks(text: string, maxChunkSize = 800, overlap = 100): string[] {
  const sentences = text.split(/(?<=[.!?])\s+/);
  const chunks: string[] = [];
  let current = "";

  for (const sentence of sentences) {
    if ((current + " " + sentence).length > maxChunkSize && current.length > 0) {
      chunks.push(current.trim());
      const words = current.split(" ");
      const overlapWords = words.slice(-Math.floor(overlap / 5));
      current = overlapWords.join(" ") + " " + sentence;
    } else {
      current = current ? current + " " + sentence : sentence;
    }
  }

  if (current.trim()) {
    chunks.push(current.trim());
  }

  return chunks;
}

export async function uploadDocument(
  title: string,
  content: string,
  category: string,
  source?: string
): Promise<{ documentId: string; chunksCount: number }> {
  const { data: doc, error: docError } = await supabaseAdmin
    .from("documents")
    .insert({ title, category, source })
    .select("id")
    .single();

  if (docError || !doc) {
    throw new Error(`Error creating document: ${docError?.message}`);
  }

  const textChunks = splitTextIntoChunks(content);
  let inserted = 0;

  for (const chunk of textChunks) {
    const embedding = await generateEmbedding(chunk);

    const { error } = await supabaseAdmin.from("chunks").insert({
      document_id: doc.id,
      content: chunk,
      embedding,
      metadata: { title, category },
    });

    if (!error) inserted++;
  }

  return { documentId: doc.id, chunksCount: inserted };
}

export async function searchKnowledge(question: string, matchCount = 5): Promise<string> {
  const embedding = await generateEmbedding(question);

  const { data: chunks, error } = await supabaseAdmin.rpc("match_chunks", {
    query_embedding: embedding,
    match_threshold: 0.65,
    match_count: matchCount,
  });

  if (error || !chunks || chunks.length === 0) {
    return "";
  }

  const context = chunks
    .map(
      (c: { content: string; document_title: string; similarity: number }) =>
        `[Fuente: ${c.document_title} | Relevancia: ${(c.similarity * 100).toFixed(0)}%]\n${c.content}`
    )
    .join("\n\n---\n\n");

  return context;
}
