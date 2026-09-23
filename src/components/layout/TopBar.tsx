"use client";

import { Icon } from "@/components/ui/Icon";
import { topbar } from "@/content/site";
import { CARGANDO, useStored, writeStored } from "@/lib/browserStore";

const STORAGE_KEY = "cbc:topbar-cerrada";

/**
 * Barra de anuncio superior.
 *
 * Si el visitante la cierra, se recuerda durante la sesión (sessionStorage,
 * no cookies), así que no hay que pedir consentimiento por esto.
 */
export function TopBar() {
  const cerrada = useStored("session", STORAGE_KEY);

  // Durante la hidratación se muestra: es el estado por defecto del servidor.
  if (cerrada !== CARGANDO && cerrada === "1") return null;

  return (
    <div className="topbar" id="topbar">
      <div className="topbar__in">
        <span>
          <b>{topbar.strong}</b> <span className="hide-mb">{topbar.rest}</span>
        </span>
        <a href={topbar.ctaHref}>{topbar.ctaLabel}</a>
      </div>
      <button
        className="topbar__x"
        onClick={() => writeStored("session", STORAGE_KEY, "1")}
        aria-label="Cerrar aviso"
        type="button"
      >
        <Icon name="close" />
      </button>
    </div>
  );
}
