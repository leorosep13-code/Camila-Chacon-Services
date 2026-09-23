import type { IconName } from "@/components/ui/Icon";
import { waLink } from "@/lib/whatsapp";

/**
 * Datos de cada sección de la landing.
 * Mismo texto del prototipo original, ahora tipado y reutilizable.
 */

/* ------------------------------- HERO ------------------------------- */

export const hero = {
  lines: ["Tu negocio", "merece"],
  subtitle:
    "Soy Camila Chacón. Ayudo a negocios y marcas personales a ganar visibilidad, generar clientes y vender más en canales digitales, con estrategia, contenido, e-commerce, publicidad y datos.",
} as const;

/* ------------------------------- PROMO ------------------------------- */

export const promo = {
  tag: "Gratis · 30 minutos",
  title: "Antes de invertir un peso más, sepamos qué está fallando",
  text: "Una llamada corta para entender tu negocio, ver si hay encaje y decirte por dónde empezaría yo. Sin costo y sin compromiso.",
  next: {
    lead: "¿Necesitas ir más a fondo? La ",
    strong: "asesoría estratégica 1 a 1 de 60 minutos cuesta COP 90.000",
    tail: " e incluye resumen en PDF y plan de acción de 7 días.",
  },
  bullets: [
    "Revisamos tu presencia digital actual",
    "Identificamos dónde se caen tus ventas",
    "Te digo cuál sería el primer paso",
    "Por videollamada, desde donde estés",
  ],
} as const;

/* ------------------------------ SOBRE MÍ ------------------------------ */

export const about = {
  hi: "¡Hola, soy Cami!",
  photo: {
    src: "/foto_de_cami.jpeg",
    alt: "Camila Chacón, consultora de crecimiento digital y comercial",
    // Dimensiones reales del archivo. Next.js las usa para reservar el espacio
    // y generar las versiones AVIF/WebP; si no coinciden, la imagen se deforma.
    width: 960,
    height: 1280,
  },
  credential: {
    strong: "Ingeniera industrial y project manager.",
    rest: " Por eso empiezo con un diagnóstico y termino con indicadores.",
  },
  eyebrow: "Sobre mí",
  paragraphs: {
    intro:
      "Vengo de gestionar cuentas de vendedores en marketplaces como Olímpica, Falabella y Éxito desde agencias de marketing. Ahí aprendí que la diferencia entre una marca que vende y una que no rara vez está en el diseño: está en el método. Mi trabajo no es publicar bonito, es que tu negocio venda y que sepas exactamente por qué.",
    note: "Y cuando el proyecto crece, entra mi equipo: desarrollo, publicidad, datos y automatización.",
  },
  skills: [
    {
      strong: "Sé por qué no vendes:",
      text: " diagnostico si el problema es precio, catálogo, oferta, canal u operación.",
    },
    {
      strong: "Sé arreglarlo:",
      text: " armo la estrategia y la ejecuto contigo; el informe es el punto de partida, no el final del trabajo.",
    },
    {
      strong: "Y sé medirlo:",
      text: " seguimiento con métricas claras hasta que los números respondan.",
    },
  ],
} as const;

/* ----------------------------- MANIFIESTO ----------------------------- */

export const manifest = {
  titleStart: "Sin estrategia, publicar es solo ",
  titleEm: "ruido",
  text: "La mayoría de negocios no tiene un problema de creatividad: tiene un problema de dirección. Cuando el contenido, el canal de venta y la inversión apuntan al mismo objetivo, vender deja de ser cuestión de suerte.",
} as const;

/* ------------------------------ MOMENTOS ------------------------------ */

export type Moment = {
  id: string;
  number: string;
  title: string;
  intro: string;
  bullets: readonly string[];
  who: string;
  goPrefix: string;
  goStrong: string;
};

export const moments: readonly Moment[] = [
  {
    id: "publico-no-vendo",
    number: "Momento 01",
    title: "Publico, pero no vendo",
    intro:
      "Tienes redes activas y contenido, pero nada de eso se convierte en clientes. Casi nunca es falta de creatividad: es falta de dirección.",
    bullets: [
      "Diagnóstico de perfiles y del mensaje comercial",
      "Calendario editorial con objetivo de venta",
      "Guiones y portadas listos para publicar",
      "Camino claro del perfil al WhatsApp",
    ],
    who: "marcas personales, restaurantes, negocios de servicios.",
    goPrefix: "Empieza en ",
    goStrong: "Esencial",
  },
  {
    id: "fisico-no-internet",
    number: "Momento 02",
    title: "Vendo en físico, pero no en internet",
    intro:
      "Tu negocio funciona en el mostrador y tienes redes, pero no existe un lugar donde el cliente pueda comprarte en línea.",
    bullets: [
      "Elección del canal correcto: tienda propia, marketplace o WhatsApp",
      "Tienda Shopify o página web con pagos integrados",
      "Publicación en Mercado Libre y catálogo ordenado",
      "Fichas de producto pensadas para convertir",
    ],
    who: "tiendas físicas, distribuidoras, marcas de producto.",
    goPrefix: "Empieza en ",
    goStrong: "Ecosistema",
  },
  {
    id: "pauta-sin-retorno",
    number: "Momento 03",
    title: "Invierto en pauta y no veo retorno",
    intro:
      "Ya pusiste dinero en anuncios y llegaron mensajes que no compran, o simplemente no llegó nada. Invertir no es lo mismo que pautar.",
    bullets: [
      "Revisión de público, mensaje, oferta y destino",
      "Campañas en Meta Ads o Google Ads con objetivo definido",
      "Píxel y eventos básicos bien configurados",
      "Optimización semanal y reporte ejecutivo",
    ],
    who: "e-commerce, negocios locales, empresas de servicios.",
    goPrefix: "Ver ",
    goStrong: "Gestión de campañas",
  },
  {
    id: "sin-numeros",
    number: "Momento 04",
    title: "No sé qué está pasando con mis números",
    intro:
      "Vendes, pero no sabes qué producto deja margen, qué canal trae clientes ni cuánto te cuesta conseguir uno. Decides por intuición.",
    bullets: [
      "Dashboard de ventas y KPIs de marketing",
      "Análisis de campañas y de productos",
      "Reportes automatizados cuando aplica",
      "Guía de lectura y reunión de explicación",
    ],
    who: "negocios con varios canales, e-commerce, pymes en crecimiento.",
    goPrefix: "Ver ",
    goStrong: "Dashboard comercial",
  },
];

/* ------------------------------- MÉTODO ------------------------------- */

export type Step = { n: string; title: string; text: string; tag: string };

export const method: readonly Step[] = [
  {
    n: "01",
    title: "Diagnóstico",
    text: "Reviso negocio, competencia y canales para ver si el problema es precio, catálogo, oferta, canal u operación.",
    tag: "Claridad",
  },
  {
    n: "02",
    title: "Estrategia",
    text: "Definimos objetivos, público, oferta y el camino que recorre tu cliente hasta comprarte.",
    tag: "Dirección",
  },
  {
    n: "03",
    title: "Implementación",
    text: "Ejecutamos contenido, canal de venta y campañas. Contigo, no en un PDF que nadie aplica.",
    tag: "Ejecución",
  },
  {
    n: "04",
    title: "Optimización",
    text: "Medimos qué trae clientes y qué no. Ajustamos mensajes, inversión y procesos.",
    tag: "Rentabilidad",
  },
  {
    n: "05",
    title: "Escalamiento",
    text: "Lo que funciona se amplía: más canales, más territorio y procesos que sostienen el crecimiento.",
    tag: "Escala",
  },
];

/* ------------------------------ SERVICIOS ------------------------------ */

export type Service = {
  id: string;
  icon: IconName;
  number: string;
  title: string;
  text: string;
  disclaimer?: { strong: string; rest: string };
  items: readonly string[];
  /** Mensaje con el que se abre WhatsApp desde esta tarjeta. */
  waHref: string;
};

export const services: readonly Service[] = [
  {
    id: "auditorias",
    icon: "target",
    number: "01 · Puerta de entrada",
    title: "Auditorías y asesorías",
    text: "Antes de contratar nada: saber qué está fallando, qué priorizar y en qué orden.",
    items: [
      "Asesoría 1 a 1",
      "Auditoría digital completa",
      "Análisis de competencia",
      "Prioridades 30/60/90",
    ],
    waHref: waLink("Hola Cami, me interesan tus auditorías y asesorías"),
  },
  {
    id: "contenido",
    icon: "pen",
    number: "02 · Dirección",
    title: "Estrategia de contenido",
    text: "Yo dirijo qué se publica, por qué y con qué objetivo. Tú o tu equipo ejecutan.",
    disclaimer: {
      strong: "Aquí no grabo ni edito:",
      rest: " este servicio es la estrategia, el calendario y los guiones.",
    },
    items: [
      "Calendario editorial",
      "Guiones para Reels",
      "Portadas estratégicas",
      "Optimización de perfil",
      "Análisis de métricas",
    ],
    waHref: waLink("Hola Cami, me interesa la estrategia de contenido"),
  },
  {
    id: "contenido-ia",
    icon: "spark",
    number: "03 · Diferencial",
    title: "Contenido con IA",
    text: "Para negocios sin tiempo ni equipo creativo: producimos las piezas con inteligencia artificial, sin rodaje.",
    items: [
      "Creativos para redes",
      "Piezas y portadas",
      "Videos cortos con IA",
      "Copies optimizados",
      "Banco de ideas",
    ],
    waHref: waLink("Hola Cami, me interesa el contenido con IA"),
  },
  {
    id: "ecommerce",
    icon: "cart",
    number: "04 · Ventas",
    title: "E-commerce y marketplaces",
    text: "El lugar donde tu cliente finalmente compra, montado y conectado con el resto de canales.",
    items: [
      "Tienda Shopify",
      "Página web",
      "Mercado Libre",
      "WhatsApp Business",
      "Catálogo y pagos",
    ],
    waHref: waLink("Hola Cami, me interesa montar mi e-commerce o marketplace"),
  },
  {
    id: "publicidad",
    icon: "mega",
    number: "05 · Inversión",
    title: "Publicidad digital",
    text: "Campañas que se controlan y se miden, con foco en mensajes, contactos y ventas.",
    items: ["Meta Ads", "Google Ads", "Píxel y eventos", "Segmentación", "Optimización semanal"],
    waHref: waLink("Hola Cami, me interesa la publicidad digital"),
  },
  {
    id: "datos",
    icon: "chart",
    number: "06 · Decisiones",
    title: "Datos y reportes",
    text: "Para dejar de decidir por intuición: qué canal trae clientes, qué producto deja margen.",
    items: [
      "Dashboard de ventas",
      "KPIs de marketing",
      "Análisis de campañas",
      "Power BI o Looker",
      "Reunión de lectura",
    ],
    waHref: waLink("Hola Cami, me interesan los datos y reportes"),
  },
];

export const servicesNote =
  "¿Necesitas grabación o edición real? No lo ejecuto yo: coordino el trabajo con creadores y editores aliados según lo que requiera tu marca.";

/* -------------------------------- CIFRAS -------------------------------- */

export type Stat = { label: string; value: number; prefix?: string; text: string };

export const stats: readonly Stat[] = [
  {
    label: "Trayectoria",
    value: 3,
    prefix: "+",
    text: "años en marketing digital y marketplaces",
  },
  {
    label: "Acompañamiento",
    value: 30,
    prefix: "+",
    text: "negocios y comercios asesorados",
  },
  { label: "Servicios", value: 6, text: "frentes que cubren todo el proceso de venta" },
  {
    label: "Equipo",
    value: 4,
    prefix: "+",
    text: "especialistas que se suman según el proyecto",
  },
];

/* ------------------------------- PAQUETES ------------------------------- */

export type Pack = {
  id: string;
  tag: string;
  featured?: boolean;
  title: string;
  price: string;
  priceNote: string;
  audience: string;
  items: readonly string[];
  ctaVariant: "linea" | "verde" | "negro";
  waHref: string;
};

export const packs: readonly Pack[] = [
  {
    id: "esencial",
    tag: "Estrategia",
    title: "Esencial",
    price: "Servicio mensual",
    priceNote: "Alcance y valor según tu caso",
    audience:
      "Para negocios que ya publican o tienen quién grabe, pero necesitan dirección y un plan con objetivo de venta.",
    items: [
      "Diagnóstico inicial",
      "Calendario editorial mensual",
      "8 guiones para Reels",
      "8 portadas estratégicas",
      "Optimización de perfil y biografía",
      "Análisis de métricas y reunión mensual",
    ],
    ctaVariant: "linea",
    waHref: waLink("Hola Cami, quiero dirección de contenido (Esencial)"),
  },
  {
    id: "impulso-ia",
    tag: "Más solicitado",
    featured: true,
    title: "Impulso IA",
    price: "Servicio mensual",
    priceNote: "Alcance y valor según tu caso",
    audience:
      "Para negocios sin tiempo ni equipo creativo: además de la estrategia, produzco las piezas con inteligencia artificial.",
    items: [
      "Todo lo de Esencial",
      "Creativos para redes con IA",
      "8 a 12 videos cortos con IA",
      "Portadas y piezas visuales",
      "Copies organizados por fecha",
      "Banco de ideas de contenido",
    ],
    ctaVariant: "verde",
    waHref: waLink("Hola Cami, quiero contenido con IA (Impulso IA)"),
  },
  {
    id: "ecosistema",
    tag: "Escalamiento",
    title: "Ecosistema",
    price: "Por proyecto",
    priceNote: "Alcance y valor según tu caso",
    audience:
      "Para negocios que venden en físico y necesitan montar su operación de venta en internet, completa y conectada.",
    items: [
      "Tienda Shopify o página web",
      "Integración de pagos",
      "Mercado Libre y catálogo",
      "WhatsApp Business configurado",
      "Estrategia omnicanal",
      "Acompañamiento mensual opcional",
    ],
    ctaVariant: "negro",
    waHref: waLink("Hola Cami, quiero vender en internet (Ecosistema)"),
  },
];

/* ------------------------------- CATÁLOGO ------------------------------- */

export const catalog = {
  columns: [
    [
      { name: "Asesoría estratégica 1 a 1 · 60 min", price: "COP 90.000" },
      { name: "Auditoría digital completa", price: "Consultar" },
      { name: "Gestión de campañas (Meta / Google)", price: "Consultar" },
      { name: "Dashboard comercial y reportes", price: "Consultar" },
      { name: "Producción coordinada con aliados", price: "Consultar" },
    ],
    [
      { name: "Página web corporativa", price: "Consultar" },
      { name: "Tienda Shopify", price: "Consultar" },
      { name: "Mercado Libre inicial", price: "Consultar" },
      { name: "Acompañamiento mensual e-commerce", price: "Consultar" },
    ],
  ],
  note: "Cada servicio se cotiza según el alcance real: tamaño del catálogo, integraciones, número de piezas y nivel de acompañamiento. La gestión de campañas no incluye el presupuesto de pauta y el acompañamiento de e-commerce puede incluir comisión por ventas según el canal y el volumen.",
} as const;

/* ------------------------------- POR QUÉ ------------------------------- */

export type Reason = { icon: IconName; title: string; text: string };

export const reasons: readonly Reason[] = [
  {
    icon: "store",
    title: "Experiencia en marketplaces",
    text: "Gestioné cuentas de vendedores en Olímpica, Falabella y Éxito. Sé cómo se estructura una operación que debe cumplir metas.",
  },
  {
    icon: "gear",
    title: "Formación en proyectos",
    text: "Ingeniera industrial y project manager: por eso empiezo con un diagnóstico, trabajo con cronograma y termino con indicadores.",
  },
  {
    icon: "target",
    title: "Enfoque en ventas",
    text: "Trabajamos sobre metas concretas y medibles. Si una acción no acerca a la meta, se cambia.",
  },
  {
    icon: "shield",
    title: "Claridad en el alcance",
    text: "Sabes desde el primer día qué incluye y qué no. Sin sorpresas ni promesas que no puedo sostener.",
  },
  {
    icon: "trend",
    title: "Ejecución, no un PDF",
    text: "No te entrego un documento y desaparezco: la estrategia se implementa contigo y se ajusta con los datos.",
  },
  {
    icon: "team",
    title: "Red de aliados",
    text: "Desarrollo, producción audiovisual, publicidad y datos: coordino a los especialistas para que tú no lo hagas.",
  },
];

/* ------------------------------ FORMULARIO ------------------------------ */

export const contactSection = {
  eyebrow: "Siguiente paso",
  titleStart: "Hablemos 30 minutos de ",
  titleEm: "tu negocio",
  text: "Me cuentas qué vendes, a quién y qué has intentado. Te digo con honestidad dónde está el cuello de botella y qué haría en tu lugar. Si tiene sentido trabajar juntas, te presento una propuesta; si no, te llevas claridad.",
  bullets: [
    "Diagnóstico de 30 minutos sin costo",
    "Por videollamada, desde donde estés",
    "Elige tú el día y la hora en mi calendario",
  ],
  momentOptions: [
    "Publico, pero no vendo",
    "Vendo en físico, pero no en internet",
    "Invierto en pauta y no veo retorno",
    "No sé qué está pasando con mis números",
    "Necesito contenido y no tengo equipo",
    "Todavía no lo tengo claro",
  ],
} as const;

/* -------------------------------- MODAL -------------------------------- */

export const exitModal = {
  title: "¿Te ayudo a ordenarlo?",
  text: "Cada semana reservo algunos espacios para diagnósticos gratuitos de 30 minutos. Si tu negocio necesita claridad, este es el momento.",
  cta: "Ver horarios disponibles",
} as const;
