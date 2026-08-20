"use client";

import { Icon } from "@/components/ui/Icon";
import { useConsent, writeConsent } from "@/lib/consent";

/**
 * Control para cambiar la decisión sobre contenido de terceros desde la
 * política de cookies. Poder revocar tiene que ser tan fácil como aceptar.
 */
export function ResetConsent() {
  const consent = useConsent();

  if (consent === "cargando") return null;

  const label =
    consent === "aceptado"
      ? "Ahora mismo: contenido de terceros autorizado."
      : consent === "rechazado"
        ? "Ahora mismo: contenido de terceros rechazado."
        : "Ahora mismo: todavía no has decidido.";

  return (
    <div className="legal__box">
      <p>{label}</p>
      <div className="quick" style={{ marginTop: "18px" }}>
        <button className="quick__b" type="button" onClick={() => writeConsent("aceptado")}>
          <Icon name="check" /> Autorizar
        </button>
        <button className="quick__b" type="button" onClick={() => writeConsent("rechazado")}>
          <Icon name="close" /> Revocar
        </button>
      </div>
    </div>
  );
}
