"use client";

import { Icon } from "@/components/ui/Icon";
import { contact } from "@/content/site";

/**
 * Acciones flotantes: WhatsApp siempre visible y "volver arriba".
 *
 * La clase `.is-on` del botón de subir la controla ScrollEffects, para que
 * todo el trabajo ligado al scroll ocurra en un solo sitio.
 */
export function FloatingActions() {
  const scrollTop = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <>
      <a
        className="wa"
        href={contact.waPortfolio}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Escribir por WhatsApp"
        data-label="Escríbeme por WhatsApp"
      >
        <Icon name="wa" />
      </a>

      <button
        className="top"
        id="toTop"
        type="button"
        aria-label="Volver arriba"
        onClick={scrollTop}
      >
        <Icon name="up" />
      </button>
    </>
  );
}
