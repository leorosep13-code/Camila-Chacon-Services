/**
 * Configuracion del sitio leida desde variables de entorno.
 *
 * Reglas importantes:
 *  - Solo se usan variables `NEXT_PUBLIC_*`: todo lo que hay aqui es publico
 *    (telefono, correo, enlaces). NUNCA pongas un secreto en una variable
 *    NEXT_PUBLIC_*, porque Next.js la incrusta literalmente en el bundle
 *    que descarga el navegador.
 *  - Se leen de forma ESTATICA (`process.env.NEXT_PUBLIC_X`), no con indices
 *    dinamicos, porque Next.js las sustituye en tiempo de compilacion.
 *  - Cada valor tiene respaldo, para que un despliegue sin variables
 *    configuradas siga funcionando en vez de romperse.
 */

function required(value: string | undefined, fallback: string, name: string): string {
  const resolved = value?.trim() || fallback;
  if (!value?.trim() && process.env.NODE_ENV === "production" && typeof window === "undefined") {
    // Aviso en los logs del build; no detiene el despliegue porque hay respaldo.
    console.warn(`[env] ${name} no esta definida. Se usa el valor por defecto: ${fallback}`);
  }
  return resolved;
}

/** Normaliza un telefono a solo digitos (formato que exige wa.me). */
function toWhatsAppDigits(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  return digits.length >= 8 ? digits : "573045673052";
}

/** Solo acepta URLs https, para no inyectar http:// ni javascript: por error. */
function safeHttpsUrl(raw: string, fallback: string): string {
  try {
    const url = new URL(raw);
    return url.protocol === "https:" ? url.toString() : fallback;
  } catch {
    return fallback;
  }
}

const DEFAULTS = {
  siteUrl: "https://clubdecami.com",
  whatsapp: "573045673052",
  email: "camila.chaconb@gmail.com",
  instagram: "https://instagram.com/clubdecami",
  calendarEmbed:
    "https://calendar.google.com/calendar/appointments/schedules/AcZssZ2wU49tRu9IwgmXKyXBxNPcEMOmSAC_YzLgBfPAL9pFVmvmlQ6Y_HEFgIncJFdWT_wHHh_qpsCr?gv=true",
  calendarLink: "https://calendar.app.google/cgepqveJBkL9ofUB9",
} as const;

export const env = {
  /** URL canonica del sitio. Se usa en metadatos, sitemap y robots. */
  siteUrl: safeHttpsUrl(
    required(process.env.NEXT_PUBLIC_SITE_URL, DEFAULTS.siteUrl, "NEXT_PUBLIC_SITE_URL"),
    DEFAULTS.siteUrl,
  ).replace(/\/$/, ""),

  /** Numero de WhatsApp en formato internacional sin "+" (ej. 573045673052). */
  whatsappNumber: toWhatsAppDigits(
    required(
      process.env.NEXT_PUBLIC_WHATSAPP_NUMBER,
      DEFAULTS.whatsapp,
      "NEXT_PUBLIC_WHATSAPP_NUMBER",
    ),
  ),

  /** Correo de contacto publicado en el sitio. */
  contactEmail: required(
    process.env.NEXT_PUBLIC_CONTACT_EMAIL,
    DEFAULTS.email,
    "NEXT_PUBLIC_CONTACT_EMAIL",
  ),

  /** Perfil de Instagram. */
  instagramUrl: safeHttpsUrl(
    required(
      process.env.NEXT_PUBLIC_INSTAGRAM_URL,
      DEFAULTS.instagram,
      "NEXT_PUBLIC_INSTAGRAM_URL",
    ),
    DEFAULTS.instagram,
  ),

  /** URL del iframe de agendamiento de Google Calendar. */
  calendarEmbedUrl: safeHttpsUrl(
    required(
      process.env.NEXT_PUBLIC_CALENDAR_EMBED_URL,
      DEFAULTS.calendarEmbed,
      "NEXT_PUBLIC_CALENDAR_EMBED_URL",
    ),
    DEFAULTS.calendarEmbed,
  ),

  /** Enlace corto de respaldo por si el iframe no carga. */
  calendarLinkUrl: safeHttpsUrl(
    required(
      process.env.NEXT_PUBLIC_CALENDAR_LINK_URL,
      DEFAULTS.calendarLink,
      "NEXT_PUBLIC_CALENDAR_LINK_URL",
    ),
    DEFAULTS.calendarLink,
  ),

  /** Activa Vercel Analytics y Speed Insights (metricas sin cookies). */
  analyticsEnabled: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS !== "false",
} as const;

/** Telefono formateado para mostrar: +57 304 567 3052 */
export const displayPhone = (() => {
  const d = env.whatsappNumber;
  if (d.length === 12 && d.startsWith("57")) {
    return `+57 ${d.slice(2, 5)} ${d.slice(5, 8)} ${d.slice(8)}`;
  }
  return `+${d}`;
})();

/** Handle de Instagram derivado de la URL (ej. @clubdecami). */
export const instagramHandle = (() => {
  try {
    const path = new URL(env.instagramUrl).pathname.replace(/\//g, "");
    return path ? `@${path}` : "@clubdecami";
  } catch {
    return "@clubdecami";
  }
})();
