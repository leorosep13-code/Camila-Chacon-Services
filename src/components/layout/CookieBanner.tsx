"use client";

import Link from "next/link";
import { useConsent, writeConsent } from "@/lib/consent";

/**
 * Aviso de cookies y contenido de terceros.
 *
 * Aparece solo si el visitante todavía no ha decidido. Rechazar es tan fácil
 * como aceptar (requisito de un consentimiento válido) y, mientras no acepte,
 * el calendario de Google no se carga.
 */
export function CookieBanner() {
  const consent = useConsent();

  // "cargando" = aún hidratando; no se pinta nada para no provocar parpadeo.
  if (consent !== "sin-decidir") return null;

  return (
    <div className="ck is-on" role="region" aria-label="Aviso de cookies">
      <p>
        <b>Este sitio no usa cookies de publicidad ni de seguimiento.</b> Solo métricas anónimas de
        rendimiento. El calendario de Google, que sí instala cookies propias, únicamente se carga si
        lo autorizas. Más detalles en la <Link href="/cookies">política de cookies</Link> y la{" "}
        <Link href="/privacidad">política de privacidad</Link>.
      </p>
      <div className="ck__acts">
        <button className="btn btn--blanco" type="button" onClick={() => writeConsent("rechazado")}>
          Rechazar
        </button>
        <button className="btn btn--verde" type="button" onClick={() => writeConsent("aceptado")}>
          Aceptar
        </button>
      </div>
    </div>
  );
}
