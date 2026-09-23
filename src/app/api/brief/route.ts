import { NextResponse } from "next/server";
import { briefSchema } from "@/lib/brief/schema";
import { supabaseAdmin } from "@/lib/supabase/admin";

/**
 * POST /api/brief — Fase 2.
 *
 * Valida el brief con el mismo esquema Zod que usa el formulario y lo
 * inserta en `briefs` con la service_role key (la tabla tiene RLS activada
 * y sin políticas: el navegador nunca puede leerla ni escribirla, solo este
 * endpoint). Las columnas clave se copian de `respuestas` para poder
 * filtrar sin parsear el jsonb; `respuestas` completo también se guarda tal
 * cual, con el id de cada pregunta como clave.
 */
export async function POST(request: Request) {
  const body: unknown = await request.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ ok: false, error: "Solicitud inválida." }, { status: 400 });
  }

  // Honeypot lleno: responde éxito de inmediato, ANTES de validar nada, para
  // no gastar ciclos en un bot ni darle ninguna pista (ni siquiera un error
  // de validación) de por qué su envío "funcionó".
  const honeypot = (body as { honeypot?: unknown }).honeypot;
  if (typeof honeypot === "string" && honeypot) {
    return NextResponse.json({ ok: true });
  }

  const parsed = briefSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Revisa los campos marcados.", issues: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const { respuestas } = parsed.data;

  const { error } = await supabaseAdmin()
    .from("briefs")
    .insert({
      nombre: respuestas.nombre,
      negocio: respuestas.negocio,
      ciudad_pais: respuestas.ciudad_pais,
      whatsapp: respuestas.whatsapp,
      email: respuestas.email || null,
      categoria: respuestas.categoria || null,
      etapa: respuestas.etapa || null,
      objetivo_principal: respuestas.objetivo_principal || null,
      zona_horaria: respuestas.zona_horaria || null,
      respuestas,
    });

  if (error) {
    console.error("[api/brief] No se pudo insertar en Supabase:", error.message);
    return NextResponse.json(
      { ok: false, error: "No pudimos guardar tu brief. Intenta otra vez." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
