import { Icon } from "@/components/ui/Icon";
import { contact } from "@/content/site";

/**
 * Barra fija de contacto en móvil.
 *
 * En pantallas pequeñas el visitante puede estar a mitad de página y aun así
 * tiene las dos acciones importantes a un pulgar de distancia: escribir por
 * WhatsApp o agendar. Solo se muestra por debajo de 760px (CSS .dock).
 */
export function MobileDock() {
  return (
    <div className="dock" aria-label="Acciones rápidas de contacto">
      <a
        className="btn btn--verde"
        href={contact.waPortfolio}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Icon name="wa" /> WhatsApp
      </a>
      {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- <a>
          a propósito: navega desde cualquier ruta, ver comentario en site.ts */}
      <a className="btn btn--morado" href="/#contacto">
        <Icon name="cal" /> Agendar
      </a>
    </div>
  );
}
