/**
 * Sistema de iconos basado en un unico sprite SVG.
 *
 * Ventajas frente a una libreria de iconos: cero dependencias, cero peticiones
 * extra y el mismo trazo del diseño original. Los iconos heredan el color del
 * texto (`currentColor`), asi que se pintan solos segun el contexto.
 */

/** Nombres validos de icono. TypeScript avisa si escribes uno que no existe. */
export type IconName =
  | "mark"
  | "check"
  | "arrow"
  | "left"
  | "up"
  | "down"
  | "cal"
  | "trend"
  | "target"
  | "cart"
  | "chat"
  | "pen"
  | "spark"
  | "chart"
  | "mega"
  | "video"
  | "map"
  | "mail"
  | "insta"
  | "wa"
  | "store"
  | "shield"
  | "team"
  | "gear"
  | "menu"
  | "close"
  | "cam"
  | "copy"
  | "share"
  | "phone"
  | "download";

type IconProps = {
  name: IconName;
  className?: string;
  /** Texto alternativo. Si se omite, el icono se marca como decorativo. */
  title?: string;
};

export function Icon({ name, className, title }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      {title ? <title>{title}</title> : null}
      <use href={`#i-${name}`} />
    </svg>
  );
}

/**
 * Definiciones del sprite. Se renderiza UNA sola vez, al inicio del <body>,
 * y todos los <Icon /> de la pagina apuntan a estos simbolos con <use>.
 */
export function IconSprite() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
      <defs>
        <g id="i-mark">
          <path
            d="M12 12V3M12 12 5.8 5.8M12 12H3M12 12 5.8 18.2M12 12v9M12 12 18.2 18.2M12 12h9M12 12 18.2 5.8"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.3"
            strokeLinecap="square"
          />
        </g>
        <g id="i-check">
          <path
            d="M20 6 9 17l-5-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
        <g id="i-arrow">
          <path
            d="M5 12h14M13 6l6 6-6 6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
        <g id="i-left">
          <path
            d="M19 12H5M11 6l-6 6 6 6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
        <g id="i-up">
          <path
            d="M12 19V5M6 11l6-6 6 6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
        <g id="i-down">
          <path
            d="M12 5v14M18 13l-6 6-6-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
        <g id="i-cal">
          <rect
            x="3"
            y="4"
            width="18"
            height="18"
            rx="3"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="M3 10h18M8 2v4M16 2v4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </g>
        <g id="i-trend">
          <path
            d="M3 17l6-6 4 4 8-8"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M15 7h6v6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
        <g id="i-target">
          <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="2" />
          <circle cx="12" cy="12" r="5" fill="none" stroke="currentColor" strokeWidth="2" />
          <circle cx="12" cy="12" r="1.5" fill="currentColor" />
        </g>
        <g id="i-cart">
          <circle cx="9" cy="20" r="1.6" fill="currentColor" />
          <circle cx="18" cy="20" r="1.6" fill="currentColor" />
          <path
            d="M2 3h3l2.6 12h11l2.4-8.5H6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
        <g id="i-chat">
          <path
            d="M21 12a8 8 0 0 1-11.6 7.1L3 21l1.9-6.2A8 8 0 1 1 21 12z"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </g>
        <g id="i-pen">
          <path
            d="M4 20h4l10-10a2.8 2.8 0 1 0-4-4L4 16v4z"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path d="M13.5 6.5l4 4" fill="none" stroke="currentColor" strokeWidth="2" />
        </g>
        <g id="i-spark">
          <path
            d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3z"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M18 16l.9 2.1L21 19l-2.1.9L18 22l-.9-2.1L15 19l2.1-.9L18 16z"
            fill="currentColor"
          />
        </g>
        <g id="i-chart">
          <path
            d="M4 20V10M10 20V4M16 20v-7M22 20H2"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </g>
        <g id="i-mega">
          <path
            d="M4 10v4a2 2 0 0 0 2 2h1l7 4V4L7 8H6a2 2 0 0 0-2 2z"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M18 9a4 4 0 0 1 0 6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </g>
        <g id="i-video">
          <rect
            x="2"
            y="6"
            width="13"
            height="12"
            rx="3"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="m15 11 6-4v10l-6-4z"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </g>
        <g id="i-map">
          <path
            d="M12 21s7-6.1 7-11a7 7 0 1 0-14 0c0 4.9 7 11 7 11z"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <circle cx="12" cy="10" r="2.6" fill="none" stroke="currentColor" strokeWidth="2" />
        </g>
        <g id="i-mail">
          <rect
            x="2"
            y="4"
            width="20"
            height="16"
            rx="3"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="m3 7 9 6 9-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </g>
        <g id="i-insta">
          <rect
            x="3"
            y="3"
            width="18"
            height="18"
            rx="5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
          <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2" />
          <circle cx="17.2" cy="6.8" r="1.2" fill="currentColor" />
        </g>
        <g id="i-wa">
          <path
            d="M20.5 11.6A8.5 8.5 0 0 1 7.6 19L3 20.4l1.5-4.4a8.5 8.5 0 1 1 16-4.4z"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M8.8 8.4c.6-.2 1 0 1.2.5l.5 1.2c.1.4 0 .7-.3.9l-.4.3c.5 1 1.3 1.8 2.3 2.3l.3-.4c.2-.3.5-.4.9-.3l1.2.5c.5.2.7.6.5 1.2-.3.9-1.3 1.3-2.3 1.1-2.4-.5-4.5-2.6-5-5-.2-1 .2-2 1.1-2.3z"
            fill="currentColor"
          />
        </g>
        <g id="i-store">
          <path
            d="M4 10v9a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-9"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M3 10 5 4h14l2 6a3 3 0 0 1-6 0 3 3 0 0 1-6 0 3 3 0 0 1-6 0z"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </g>
        <g id="i-shield">
          <path
            d="M12 22s8-3.4 8-9V5.5L12 2 4 5.5V13c0 5.6 8 9 8 9z"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="m9 12 2 2 4-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
        <g id="i-team">
          <circle cx="9" cy="8" r="3.4" fill="none" stroke="currentColor" strokeWidth="2" />
          <path
            d="M2.5 19a6.5 6.5 0 0 1 13 0"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M17 5.2a3.4 3.4 0 0 1 0 6.6M18 14.4A5.5 5.5 0 0 1 21.5 19"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </g>
        <g id="i-gear">
          <circle cx="12" cy="12" r="3.2" fill="none" stroke="currentColor" strokeWidth="2" />
          <path
            d="M19.4 15a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-2.7 1.1V21a2 2 0 1 1-4 0v-.1A1.6 1.6 0 0 0 7.5 19.4l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1A1.6 1.6 0 0 0 3.6 14H3a2 2 0 1 1 0-4h.1a1.6 1.6 0 0 0 1.1-2.7l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1A1.6 1.6 0 0 0 10 3.6V3a2 2 0 1 1 4 0v.1A1.6 1.6 0 0 0 16.5 4.6l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0 1.1 2.7H21a2 2 0 1 1 0 4h-.1a1.6 1.6 0 0 0-1.5 1z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinejoin="round"
          />
        </g>
        <g id="i-menu">
          <path
            d="M4 7h16M4 12h16M4 17h16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </g>
        <g id="i-close">
          <path
            d="m6 6 12 12M18 6 6 18"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </g>
        <g id="i-cam">
          <path
            d="M4 8h3l1.6-2.4h6.8L17 8h3a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <circle cx="12" cy="13" r="3.4" fill="none" stroke="currentColor" strokeWidth="2" />
        </g>
        {/* Iconos añadidos en la version React (no estaban en el prototipo) */}
        <g id="i-copy">
          <rect
            x="9"
            y="9"
            width="12"
            height="12"
            rx="2.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="M5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </g>
        <g id="i-share">
          <circle cx="18" cy="5" r="2.6" fill="none" stroke="currentColor" strokeWidth="2" />
          <circle cx="6" cy="12" r="2.6" fill="none" stroke="currentColor" strokeWidth="2" />
          <circle cx="18" cy="19" r="2.6" fill="none" stroke="currentColor" strokeWidth="2" />
          <path
            d="m8.4 10.8 7.2-4.2M8.4 13.2l7.2 4.2"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </g>
        <g id="i-phone">
          <path
            d="M6.6 3h3l1.5 4-2.2 1.6a12 12 0 0 0 6.5 6.5L17 12.9l4 1.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.5 5.2 2 2 0 0 1 6.6 3z"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </g>
        <g id="i-download">
          <path
            d="M12 3v12M7.5 10.5 12 15l4.5-4.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </g>
      </defs>
    </svg>
  );
}
