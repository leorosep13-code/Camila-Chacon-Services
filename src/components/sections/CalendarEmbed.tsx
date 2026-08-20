"use client";

import { Icon } from "@/components/ui/Icon";
import { contact } from "@/content/site";
import { useConsent, writeConsent } from "@/lib/consent";

/**
 * Agendamiento de Google Calendar.
 *
 * El iframe SOLO se inserta si el visitante autorizó contenido de terceros.
 * Mientras tanto se muestra un marcador con el mismo tamaño (evita saltos de
 * maquetación) y dos salidas: cargar el calendario aquí, o abrirlo en una
 * pestaña nueva sin cargar nada en este sitio.
 */
export function CalendarEmbed() {
  const accepted = useConsent() === "aceptado";

  return (
    <div className="cal rv">
      <div className="cal__top">
        <span className="cal__dot" /> Elige el día y la hora que te sirva
      </div>

      {accepted ? (
        <iframe
          src={contact.calendarEmbedUrl}
          style={{ border: 0 }}
          width="100%"
          height={600}
          title="Agenda tu diagnóstico gratuito con Camila Chacón"
          loading="lazy"
          // El iframe no necesita permisos del navegador ni salir de su origen.
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
          referrerPolicy="no-referrer-when-downgrade"
        />
      ) : (
        <div className="cal__ph">
          <div>
            <Icon name="cal" />
            <h3>Calendario de Google</h3>
            <p>
              Para reservar aquí mismo hay que cargar el calendario de Google, que instala sus
              propias cookies. Tú decides.
            </p>
            <button
              className="btn btn--morado"
              type="button"
              onClick={() => writeConsent("aceptado")}
            >
              <Icon name="cal" /> Cargar calendario
            </button>
            <small>
              ¿Prefieres no cargarlo? Ábrelo en una pestaña nueva con el enlace de abajo, o
              escríbeme por WhatsApp y lo agendamos juntas.
            </small>
          </div>
        </div>
      )}

      <p className="cal__alt">
        ¿No carga el calendario?{" "}
        <a href={contact.calendarLinkUrl} target="_blank" rel="noopener noreferrer">
          Ábrelo en una pestaña nueva
        </a>
      </p>
    </div>
  );
}
