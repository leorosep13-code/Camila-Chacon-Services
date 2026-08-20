import { contact } from "./site";

/** Las tres "puertas de entrada" del cierre de la página. */
export type Door = {
  id: string;
  small: string;
  title: string;
  text: string;
  cta: string;
  href: string;
  external: boolean;
};

export const doors: readonly Door[] = [
  {
    id: "instagram",
    small: "Conoce",
    title: "Instagram",
    text: "Estrategias, ejemplos reales y contenido práctico para vender más desde tus canales digitales.",
    cta: `Seguir a ${contact.instagramHandle}`,
    href: contact.instagramUrl,
    external: true,
  },
  {
    id: "paquetes",
    small: "Compara",
    title: "Paquetes",
    text: "Mira los tres paquetes y el catálogo completo, con valores de partida claros.",
    cta: "Ver paquetes",
    href: "#paquetes",
    external: false,
  },
  {
    id: "diagnostico",
    small: "Acciona",
    title: "Diagnóstico",
    text: "30 minutos gratis para entender qué está frenando tus ventas. Elige tú el día y la hora.",
    cta: "Ver horarios disponibles",
    href: "#contacto",
    external: false,
  },
];
