import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Cliente de Supabase con la clave de servicio (bypassa RLS).
 *
 * `server-only` hace que el build falle si algún componente cliente llega a
 * importar este archivo, aunque sea por accidente en una cadena de imports.
 *
 * Se crea perezosamente (no al cargar el módulo) para que un despliegue sin
 * las variables de entorno todavía compile; el error aparece recién cuando
 * `/api/brief` intenta usarlo, con un mensaje claro en los logs del servidor
 * en vez de un build roto.
 */
let cliente: SupabaseClient | null = null;

export function supabaseAdmin(): SupabaseClient {
  if (cliente) return cliente;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    throw new Error(
      "Faltan NEXT_PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY en las variables de entorno del servidor.",
    );
  }

  cliente = createClient(url, serviceRoleKey, {
    auth: { persistSession: false },
  });
  return cliente;
}
