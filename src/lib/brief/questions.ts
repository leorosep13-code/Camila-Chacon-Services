/**
 * Preguntas del formulario "Brief de Marca" (`/brief`).
 *
 * Todo el contenido vive aquí: el formulario se renderiza desde esta lista y
 * el esquema de validación (`./schema.ts`) se genera también desde ella. Así,
 * cambiar una pregunta —texto, opciones, si es obligatoria— es editar un solo
 * archivo, sin tocar componentes.
 *
 * Convención de "Otro": cuando `opciones` incluye la cadena exacta "Otro", el
 * control muestra un input de texto al seleccionarla. El valor final que se
 * valida y se guarda es `"Otro: <texto>"`, nunca "Otro" a secas.
 */

interface BaseQuestion {
  id: string;
  pregunta: string;
  ayuda?: string;
  requerido?: boolean;
}

export interface TextoQuestion extends BaseQuestion {
  tipo: "texto";
  placeholder?: string;
  /** Reglas de formato además de "no vacío". */
  validar?: "whatsapp" | "email";
}

export interface ParrafoQuestion extends BaseQuestion {
  tipo: "parrafo";
}

export interface OpcionQuestion extends BaseQuestion {
  tipo: "opcion";
  opciones: string[];
}

export interface CasillasQuestion extends BaseQuestion {
  tipo: "casillas";
  opciones: string[];
  /** Debe marcarse exactamente esta cantidad (ej. "palabras": 3). */
  exactamente?: number;
  /** No se puede marcar más de esta cantidad (ej. "valores": 3). */
  maximo?: number;
  /** Opción que, al marcarse, desmarca todas las demás (y viceversa). */
  excluyente?: string;
}

export interface EscalaQuestion extends BaseQuestion {
  tipo: "escala";
  etiquetaMin: string;
  etiquetaMax: string;
}

export type Question =
  | TextoQuestion
  | ParrafoQuestion
  | OpcionQuestion
  | CasillasQuestion
  | EscalaQuestion;

export interface BriefSection {
  numero: number;
  titulo: string;
  ayuda?: string;
  preguntas: Question[];
}

export const briefSections: BriefSection[] = [
  {
    numero: 1,
    titulo: "Tus datos",
    preguntas: [
      { id: "nombre", tipo: "texto", requerido: true, pregunta: "Tu nombre completo" },
      {
        id: "negocio",
        tipo: "texto",
        requerido: true,
        pregunta: 'Nombre de tu negocio o marca (si aún no tiene, escribe "sin nombre")',
      },
      { id: "ciudad_pais", tipo: "texto", requerido: true, pregunta: "Ciudad y país" },
      {
        id: "whatsapp",
        tipo: "texto",
        requerido: true,
        validar: "whatsapp",
        placeholder: "304 567 3052",
        pregunta: "Tu WhatsApp",
      },
      {
        id: "email",
        tipo: "texto",
        validar: "email",
        pregunta: "Correo electrónico",
      },
      {
        id: "links",
        tipo: "parrafo",
        pregunta: "Links de tus redes sociales, página web o tienda (si tienes)",
      },
    ],
  },
  {
    numero: 2,
    titulo: "Tu negocio",
    ayuda: "Una foto general de lo que haces.",
    preguntas: [
      {
        id: "descripcion",
        tipo: "texto",
        requerido: true,
        pregunta:
          'Describe tu negocio en una frase. Ej.: "Vendo ___ para ___ en ___" o "Ayudo a ___ a ___"',
      },
      {
        id: "categoria",
        tipo: "opcion",
        requerido: true,
        pregunta: "¿En qué categoría está tu negocio?",
        opciones: [
          "Comida y bebidas",
          "Belleza y cuidado personal",
          "Moda y accesorios",
          "Salud y bienestar",
          "Educación y cursos",
          "Servicios profesionales",
          "Productos digitales",
          "Hogar y decoración",
          "Otro",
        ],
      },
      {
        id: "tipo_venta",
        tipo: "opcion",
        requerido: true,
        pregunta: "¿Qué vendes principalmente?",
        opciones: ["Productos físicos", "Servicios", "Productos digitales", "Una mezcla"],
      },
      {
        id: "etapa",
        tipo: "opcion",
        requerido: true,
        pregunta: "¿En qué etapa está tu negocio?",
        opciones: [
          "Es solo una idea",
          "Estoy empezando (menos de 6 meses)",
          "Vendo de vez en cuando",
          "Vendo de forma constante",
          "Quiero crecer o escalar",
        ],
      },
      {
        id: "modalidad",
        tipo: "opcion",
        requerido: true,
        pregunta: "¿Dónde vendes?",
        opciones: ["Solo online", "Solo presencial", "Online y presencial"],
      },
      {
        id: "alcance",
        tipo: "opcion",
        requerido: true,
        pregunta: "¿Hasta dónde llegas con tus ventas?",
        opciones: ["Mi barrio o zona", "Mi ciudad", "Todo mi país", "Internacional"],
      },
      {
        id: "equipo",
        tipo: "opcion",
        requerido: true,
        pregunta: "¿Quién trabaja en el negocio?",
        opciones: ["Solo yo", "Yo y 1 a 3 personas", "Un equipo de 4 o más"],
      },
    ],
  },
  {
    numero: 3,
    titulo: "Tu punto de partida",
    ayuda: "Dónde estás hoy. Empezar de cero está perfecto.",
    preguntas: [
      {
        id: "tiene_hoy",
        tipo: "casillas",
        requerido: true,
        pregunta: "¿Qué tienes hoy?",
        excluyente: "Nada todavía",
        opciones: [
          "Nombre de marca",
          "Logo",
          "Instagram",
          "TikTok",
          "Facebook",
          "WhatsApp Business",
          "Página web o tienda online",
          "Fotos profesionales",
          "Clientes",
          "Nada todavía",
        ],
      },
      {
        id: "ventas_mes",
        tipo: "opcion",
        requerido: true,
        pregunta: "¿Cuánto vendes al mes aproximadamente?",
        opciones: [
          "Todavía no vendo",
          "Menos de USD 200",
          "Entre USD 200 y 1.000",
          "Entre USD 1.000 y 5.000",
          "Más de USD 5.000",
        ],
      },
      {
        id: "num_clientes",
        tipo: "opcion",
        requerido: true,
        pregunta: "¿Cuántos clientes tienes aproximadamente?",
        opciones: ["Ninguno todavía", "Menos de 10", "Entre 10 y 50", "Más de 50"],
      },
      {
        id: "que_funciona",
        tipo: "parrafo",
        pregunta: "¿Qué te ha funcionado hasta ahora para vender o conseguir clientes?",
      },
      {
        id: "que_no_funciono",
        tipo: "parrafo",
        pregunta: "¿Qué has intentado que no te funcionó?",
      },
      {
        id: "horas_semana",
        tipo: "opcion",
        requerido: true,
        pregunta: "¿Cuántas horas a la semana le puedes dedicar al negocio?",
        opciones: ["Menos de 5", "Entre 5 y 10", "Entre 10 y 20", "Más de 20"],
      },
      {
        id: "inversion_marketing",
        tipo: "opcion",
        requerido: true,
        pregunta: "¿Cuánto puedes invertir al mes en marketing (publicidad, diseño, herramientas)?",
        opciones: ["Nada por ahora", "Menos de USD 50", "Entre USD 50 y 200", "Más de USD 200"],
      },
    ],
  },
  {
    numero: 4,
    titulo: "Tu oferta",
    ayuda: "Qué vendes, a cuánto y cómo.",
    preguntas: [
      {
        id: "productos_precios",
        tipo: "parrafo",
        requerido: true,
        pregunta:
          'Lista tus productos o servicios con su precio (si aún no tienes precios, escribe "sin precio")',
      },
      {
        id: "estrella",
        tipo: "texto",
        requerido: true,
        pregunta: "¿Cuál es tu producto o servicio estrella (el que más vendes o más te elogian)?",
      },
      { id: "mas_ganancia", tipo: "texto", pregunta: "¿Cuál te deja más ganancia?" },
      {
        id: "proceso_compra",
        tipo: "parrafo",
        requerido: true,
        pregunta:
          '¿Cómo te compra un cliente hoy, paso a paso? Ej.: "me escribe, le envío la información, paga y le entrego"',
      },
      {
        id: "metodos_pago",
        tipo: "casillas",
        pregunta: "¿Qué métodos de pago aceptas o quieres aceptar?",
        opciones: [
          "Efectivo",
          "Transferencia bancaria",
          "Tarjeta",
          "Billeteras digitales (Nequi, Daviplata, Zelle, Venmo, etc.)",
          "PayPal",
          "Link de pago",
          "Otro",
        ],
      },
      {
        id: "entrega",
        tipo: "casillas",
        requerido: true,
        pregunta: "¿Cómo entregas?",
        opciones: [
          "Recogida en mi casa o local",
          "Entrega a domicilio",
          "Envío por transportadora",
          "Digital (link o acceso)",
          "Presencial (servicio)",
        ],
      },
      {
        id: "capacidad",
        tipo: "texto",
        requerido: true,
        pregunta: "¿Cuántos pedidos o clientes puedes atender por semana sin agotarte?",
      },
      {
        id: "diferencial",
        tipo: "parrafo",
        requerido: true,
        pregunta: "¿Qué te hace diferente de otros que venden lo mismo?",
      },
      {
        id: "por_que_te_eligen",
        tipo: "parrafo",
        pregunta: "Cuando alguien te compra, ¿por qué crees que te eligió a ti?",
      },
    ],
  },
  {
    numero: 5,
    titulo: "Tu identidad",
    ayuda: "La esencia de tu marca: por qué existe y cómo se siente.",
    preguntas: [
      {
        id: "tipo_marca",
        tipo: "opcion",
        requerido: true,
        pregunta: "¿Cómo quieres que se vea tu marca?",
        opciones: [
          "Marca personal (la gente me conoce a mí)",
          "Marca de producto (el protagonista es el producto)",
          "Una mezcla de las dos",
        ],
      },
      {
        id: "historia",
        tipo: "parrafo",
        requerido: true,
        pregunta: "¿Cómo nació tu negocio? Cuéntame la historia",
      },
      {
        id: "proposito",
        tipo: "parrafo",
        pregunta: "¿Por qué haces lo que haces? ¿Qué quieres lograr más allá del dinero?",
      },
      {
        id: "palabras",
        tipo: "casillas",
        requerido: true,
        exactamente: 3,
        pregunta: "Elige exactamente 3 palabras que quieres que la gente sienta con tu marca",
        opciones: [
          "Cálida",
          "Elegante",
          "Divertida",
          "Nostálgica",
          "Moderna",
          "Artesanal",
          "Cercana",
          "Premium",
          "Tierna",
          "Atrevida",
          "Profesional",
          "Natural",
          "Lujosa",
          "Juvenil",
          "Confiable",
        ],
      },
      {
        id: "valores",
        tipo: "casillas",
        requerido: true,
        maximo: 3,
        pregunta: "¿Qué valores representan tu negocio?",
        opciones: [
          "Calidad",
          "Honestidad",
          "Cercanía",
          "Creatividad",
          "Tradición",
          "Innovación",
          "Responsabilidad",
          "Alegría",
          "Excelencia",
          "Sostenibilidad",
        ],
      },
      {
        id: "marca_persona",
        tipo: "parrafo",
        pregunta:
          "Si tu marca fuera una persona, ¿cómo sería? (cómo habla, cómo se viste, qué le gusta)",
      },
      {
        id: "tono_formal",
        tipo: "escala",
        requerido: true,
        pregunta: "Tono de tu marca: ¿más formal o más cercano?",
        etiquetaMin: "Muy formal",
        etiquetaMax: "Muy cercano",
      },
      {
        id: "tono_serio",
        tipo: "escala",
        requerido: true,
        pregunta: "Tono de tu marca: ¿más serio o más divertido?",
        etiquetaMin: "Muy serio",
        etiquetaMax: "Muy divertido",
      },
      { id: "no_parecer", tipo: "parrafo", pregunta: "¿Qué NO quieres que parezca tu marca?" },
    ],
  },
  {
    numero: 6,
    titulo: "Identidad visual",
    ayuda: "Cómo se ve tu marca.",
    preguntas: [
      {
        id: "logo",
        tipo: "opcion",
        requerido: true,
        pregunta: "¿Tienes logo?",
        opciones: [
          "Sí, hecho por un diseñador",
          "Sí, lo hice yo o con una app",
          "Tengo solo una idea",
          "No tengo",
        ],
      },
      {
        id: "logo_link",
        tipo: "texto",
        pregunta: "Si tienes logo o una idea, pega aquí el link o envíamelo por WhatsApp",
      },
      {
        id: "estilos",
        tipo: "casillas",
        requerido: true,
        pregunta: "¿Qué estilos visuales te gustan? (puedes elegir varios)",
        opciones: [
          "Pastel y tierno",
          "Minimalista",
          "Rústico y artesanal",
          "Moderno y colorido",
          "Elegante y lujoso",
          "Retro o vintage",
          "Natural y orgánico",
          "Atrevido y llamativo",
        ],
      },
      { id: "colores_si", tipo: "parrafo", pregunta: "Colores que te encantan para tu marca" },
      { id: "colores_no", tipo: "parrafo", pregunta: "Colores que NO quieres" },
      {
        id: "tipografia",
        tipo: "casillas",
        pregunta: "¿Qué estilo de letra te gusta?",
        opciones: [
          "Elegante (con serifas)",
          "Moderna y limpia",
          "Escrita a mano",
          "Divertida y redondeada",
          "No sé",
        ],
      },
      {
        id: "marcas_visuales",
        tipo: "parrafo",
        pregunta: "Marcas que te gustan visualmente (de cualquier tema) y qué te gusta de cada una",
      },
    ],
  },
  {
    numero: 7,
    titulo: "Tu cliente ideal",
    ayuda: "A quién le vendes (o quieres venderle).",
    preguntas: [
      {
        id: "edades",
        tipo: "casillas",
        requerido: true,
        pregunta: "¿Qué edad tienen tus clientes? (puedes elegir varios rangos)",
        opciones: ["Menos de 18", "18 a 24", "25 a 34", "35 a 44", "45 a 54", "55 o más"],
      },
      {
        id: "genero_cliente",
        tipo: "opcion",
        requerido: true,
        pregunta: "¿A quién le vendes principalmente?",
        opciones: ["Mujeres", "Hombres", "A los dos por igual"],
      },
      {
        id: "cliente_ideal",
        tipo: "parrafo",
        requerido: true,
        pregunta:
          "Describe a tu cliente ideal como si fuera una persona real (a qué se dedica, cómo es su día, qué le gusta)",
      },
      {
        id: "problema",
        tipo: "parrafo",
        requerido: true,
        pregunta: "¿Qué problema le resuelves o qué deseo le cumples?",
      },
      {
        id: "motivo_compra",
        tipo: "casillas",
        requerido: true,
        pregunta: "¿Para qué te compran?",
        opciones: [
          "Para ellos mismos",
          "Para regalar",
          "Para una ocasión especial",
          "Por necesidad",
          "Por antojo o capricho",
          "Para su negocio",
        ],
      },
      {
        id: "objeciones",
        tipo: "parrafo",
        pregunta:
          '¿Qué dudas o excusas ponen antes de comprarte? Ej.: "está caro", "no te conozco"',
      },
      {
        id: "donde_estan",
        tipo: "casillas",
        requerido: true,
        pregunta: "¿Dónde pasan tiempo tus clientes en internet?",
        opciones: [
          "Instagram",
          "TikTok",
          "Facebook",
          "Grupos de Facebook",
          "WhatsApp",
          "YouTube",
          "Pinterest",
          "Google",
          "LinkedIn",
          "No sé",
        ],
      },
      {
        id: "cliente_no",
        tipo: "parrafo",
        pregunta: "¿Hay algún tipo de cliente al que NO quieres venderle?",
      },
    ],
  },
  {
    numero: 8,
    titulo: "Competencia y referencias",
    ayuda: "Quién más vende lo que tú vendes, y a quién admiras.",
    preguntas: [
      {
        id: "competidores",
        tipo: "parrafo",
        pregunta: "Nombra hasta 3 competidores (links o usuarios) y qué hacen bien o mal",
      },
      {
        id: "inspiracion",
        tipo: "parrafo",
        requerido: true,
        pregunta:
          "Comparte 3 cuentas que te inspiran (de tu tema o de cualquier otro) y qué te gusta de cada una",
      },
      {
        id: "harias_distinto",
        tipo: "parrafo",
        pregunta: "¿Qué ves en tu competencia que tú harías distinto?",
      },
    ],
  },
  {
    numero: 9,
    titulo: "Contenido y comunicación",
    ayuda: "Para crear un plan de contenido que de verdad puedas cumplir.",
    preguntas: [
      {
        id: "redes_hoy",
        tipo: "casillas",
        requerido: true,
        pregunta: "¿En qué redes publicas hoy?",
        excluyente: "Ninguna todavía",
        opciones: [
          "Instagram",
          "TikTok",
          "Facebook",
          "YouTube",
          "LinkedIn",
          "Estados de WhatsApp",
          "Ninguna todavía",
        ],
      },
      {
        id: "frecuencia",
        tipo: "opcion",
        requerido: true,
        pregunta: "¿Cada cuánto publicas hoy?",
        opciones: [
          "No publico",
          "De vez en cuando",
          "1 a 2 veces por semana",
          "3 o más veces por semana",
          "Todos los días",
        ],
      },
      {
        id: "comodidad_camara",
        tipo: "escala",
        requerido: true,
        pregunta: "¿Qué tan cómoda o cómodo te sientes en cámara?",
        etiquetaMin: "Nada",
        etiquetaMax: "Muchísimo",
      },
      {
        id: "dispuesta_mostrar",
        tipo: "casillas",
        requerido: true,
        pregunta: "¿Qué estás dispuesta o dispuesto a mostrar?",
        opciones: [
          "Mi cara",
          "Mi voz",
          "Mis manos trabajando",
          "Mi historia personal",
          "Mi día a día",
          "Solo el producto o servicio",
        ],
      },
      {
        id: "formatos",
        tipo: "casillas",
        requerido: true,
        pregunta: "¿Qué formatos te gustaría hacer?",
        opciones: [
          "Reels o videos cortos",
          "Carruseles",
          "Fotos",
          "Historias",
          "En vivos",
          "No sé todavía",
        ],
      },
      {
        id: "temas_facil",
        tipo: "parrafo",
        pregunta:
          "¿De qué temas podrías hablar con facilidad? (lo que sabes, te apasiona o te preguntan)",
      },
      { id: "temas_no", tipo: "parrafo", pregunta: "¿Hay temas de los que NO quieres hablar?" },
      {
        id: "herramientas",
        tipo: "casillas",
        pregunta: "¿Qué herramientas usas o sabes usar?",
        opciones: [
          "Canva",
          "CapCut",
          "Editor de Instagram o TikTok",
          "Photoshop o similares",
          "Ninguna",
        ],
      },
      {
        id: "publicidad",
        tipo: "opcion",
        requerido: true,
        pregunta: "¿Has hecho publicidad pagada (anuncios en Instagram, Facebook, TikTok, Google)?",
        opciones: ["Nunca", "Sí, sin buenos resultados", "Sí, con buenos resultados"],
      },
    ],
  },
  {
    numero: 10,
    titulo: "Canales de venta",
    ayuda: "Dónde vendes hoy y dónde quieres vender.",
    preguntas: [
      {
        id: "vende_hoy",
        tipo: "casillas",
        requerido: true,
        pregunta: "¿Dónde vendes hoy?",
        excluyente: "Todavía no vendo",
        opciones: [
          "WhatsApp",
          "Mensajes de Instagram",
          "Página web o tienda online",
          "Tienda física",
          "Ferias o eventos",
          "Marketplaces (Amazon, Mercado Libre, Etsy, etc.)",
          "Apps de domicilios",
          "Todavía no vendo",
        ],
      },
      {
        id: "quiere_vender",
        tipo: "casillas",
        pregunta: "¿Dónde te gustaría vender?",
        opciones: [
          "WhatsApp",
          "Mensajes de Instagram",
          "Página web o tienda online",
          "Tienda física",
          "Ferias o eventos",
          "Marketplaces (Amazon, Mercado Libre, Etsy, etc.)",
          "Apps de domicilios",
        ],
      },
    ],
  },
  {
    numero: 11,
    titulo: "Tus metas",
    ayuda: "Tus números y lo que esperas de este proceso.",
    preguntas: [
      {
        id: "objetivo_principal",
        tipo: "opcion",
        requerido: true,
        pregunta: "¿Cuál es tu objetivo principal en este momento?",
        opciones: [
          "Empezar a vender",
          "Vender más",
          "Que más gente me conozca",
          "Lanzar un producto o servicio nuevo",
          "Profesionalizar mi marca",
          "Crear comunidad",
        ],
      },
      {
        id: "meta_3m",
        tipo: "texto",
        requerido: true,
        pregunta: "¿Cuánto te gustaría vender al mes en 3 meses? (en tu moneda)",
      },
      { id: "meta_1a", tipo: "texto", pregunta: "¿Y en 1 año?" },
      {
        id: "exito_1m",
        tipo: "parrafo",
        requerido: true,
        pregunta: "Si en un mes todo sale bien, ¿qué habría pasado?",
      },
      {
        id: "miedo",
        tipo: "parrafo",
        requerido: true,
        pregunta: "¿Qué es lo que más te frena o te da miedo?",
      },
      {
        id: "expectativa",
        tipo: "parrafo",
        requerido: true,
        pregunta: "¿Qué esperas recibir de este proceso conmigo?",
      },
    ],
  },
  {
    numero: 12,
    titulo: "Tu reunión",
    ayuda:
      "Recibirás tu propuesta en máximo 3 días hábiles. Elige cuándo te queda mejor la reunión.",
    preguntas: [
      {
        id: "disponibilidad",
        tipo: "casillas",
        requerido: true,
        pregunta: "¿Cuándo te queda mejor la reunión?",
        opciones: [
          "Lunes a viernes, mañana",
          "Lunes a viernes, tarde",
          "Lunes a viernes, noche",
          "Sábado",
          "Domingo",
        ],
      },
      {
        id: "zona_horaria",
        tipo: "texto",
        requerido: true,
        placeholder: "Ej.: Bogotá, Ciudad de México, Madrid",
        pregunta: "¿En qué zona horaria estás?",
      },
      {
        id: "como_conociste",
        tipo: "opcion",
        pregunta: "¿Cómo me conociste?",
        opciones: ["Instagram", "TikTok", "Recomendación", "Otro"],
      },
      { id: "algo_mas", tipo: "parrafo", pregunta: "¿Algo más que quieras contarme?" },
    ],
  },
];

/** Todas las preguntas en una sola lista, en el orden del formulario. */
export const allQuestions: Question[] = briefSections.flatMap((section) => section.preguntas);
