import { env, displayPhone, instagramHandle } from "@/lib/env";
import { waLink, waMessages } from "@/lib/whatsapp";

/**
 * Datos generales del sitio: identidad, navegación, contacto y SEO.
 *
 * Toda la copia vive en `src/content/*`. Si el cliente quiere cambiar un
 * texto, se edita aquí y no hay que tocar ni un componente.
 */

export const site = {
  name: "club by cami",
  person: "Camila Chacón",
  role: "Consultora de crecimiento digital y comercial",
  city: "Barranquilla",
  region: "Atlántico",
  country: "Colombia",
  url: env.siteUrl,
  title: "club by cami | Camila Chacón — Consultora de crecimiento digital y comercial",
  description:
    "Estrategia, contenido con IA, e-commerce, publicidad y datos para negocios y marcas personales que quieren vender más en canales digitales. Barranquilla, Colombia.",
  keywords: [
    "marketing digital Barranquilla",
    "consultora marketing digital Colombia",
    "estrategia de contenido",
    "e-commerce Shopify Colombia",
    "Mercado Libre marketplaces",
    "Meta Ads Google Ads",
    "contenido con inteligencia artificial",
    "dashboard de ventas",
  ],
} as const;

export const contact = {
  whatsappNumber: env.whatsappNumber,
  phoneDisplay: displayPhone,
  phoneHref: `tel:+${env.whatsappNumber}`,
  email: env.contactEmail,
  emailHref: `mailto:${env.contactEmail}`,
  instagramUrl: env.instagramUrl,
  instagramHandle,
  calendarEmbedUrl: env.calendarEmbedUrl,
  calendarLinkUrl: env.calendarLinkUrl,
  location: `${site.city}, ${site.country}`,
  waGeneral: waLink(waMessages.general),
  waPortfolio: waLink(waMessages.fromPortfolio),
  waDiagnostico: waLink(waMessages.diagnostico),
  waAntesDeAgendar: waLink(waMessages.antesDeAgendar),
  waMarca: waLink(waMessages.marca),
  waValores: waLink(waMessages.valores),
} as const;

export const topbar = {
  strong: "Diagnóstico gratuito de 30 minutos",
  rest: "— para ver dónde se están quedando tus ventas.",
  ctaLabel: "Ver horarios",
  ctaHref: "#contacto",
} as const;

export const navLinks = [
  { href: "#sobre-mi", label: "Sobre mí" },
  { href: "#momentos", label: "Qué resuelvo" },
  { href: "#metodo", label: "Método" },
  { href: "#servicios", label: "Servicios" },
  { href: "#paquetes", label: "Paquetes" },
  { href: "/brief", label: "Brief de marca" },
  { href: "#contacto", label: "Contacto" },
] as const;

export const footerNav = [
  { href: "#sobre-mi", label: "Sobre mí" },
  { href: "#momentos", label: "Qué resuelvo" },
  { href: "#metodo", label: "Metodología" },
  { href: "#servicios", label: "Servicios" },
  { href: "#paquetes", label: "Paquetes" },
  { href: "#contacto", label: "Agenda tu llamada" },
] as const;

export const legalNav = [
  { href: "/privacidad", label: "Política de privacidad" },
  { href: "/terminos", label: "Términos y condiciones" },
  { href: "/cookies", label: "Política de cookies" },
] as const;

/** Palabras que rotan en el titular del hero. */
export const heroRotatingWords = [
  "vender más",
  "más clientes",
  "ser recordado",
  "crecer de verdad",
] as const;

export const marquees = {
  hero: [
    "Estrategia",
    "Contenido",
    "Contenido con IA",
    "E-commerce",
    "Marketplaces",
    "Publicidad",
    "Datos",
  ],
  verde: ["Crea tu marca", "Conéctate con tu audiencia", "Haz que suceda"],
  morado: ["Estrategia que conecta", "Contenido que vende", "club by cami"],
} as const;
