import { NextRequest, NextResponse } from "next/server";
import { uploadDocument } from "@/lib/rag";

export async function POST(req: NextRequest) {
  try {
    const adminKey = req.headers.get("x-admin-key");
    if (adminKey !== process.env.ADMIN_SECRET_KEY) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const { title, content, category, source } = await req.json();

    if (!title || !content) {
      return NextResponse.json(
        { error: "Título y contenido son obligatorios" },
        { status: 400 }
      );
    }

    const result = await uploadDocument(
      title,
      content,
      category || "general",
      source
    );

    return NextResponse.json({
      message: `Documento "${title}" subido correctamente`,
      documentId: result.documentId,
      chunksCreated: result.chunksCount,
    });
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : "Error desconocido";
    return NextResponse.json({ error: errMsg }, { status: 500 });
  }
}
