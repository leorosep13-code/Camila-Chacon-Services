import { env } from "./env";

/** Limite de caracteres del mensaje: wa.me falla con URLs demasiado largas. */
const MAX_MESSAGE_LENGTH = 900;

/**
 * Limpia texto escrito por el visitante antes de meterlo en una URL.
 *
 * Aunque `encodeURIComponent` ya impide romper la URL, aqui se eliminan
 * caracteres de control y saltos de linea abusivos para que el mensaje
 * llegue legible y no se pueda usar el campo para inyectar ruido.
 */
export function sanitizeMessageInput(raw: string, maxLength = 300): string {
  return (
    raw
      // Elimina caracteres de control (incluye \u0000-\u001F y \u007F-\u009F).
      .replace(/[\u0000-\u001F\u007F-\u009F]/g, " ")
      // Colapsa espacios repetidos.
      .replace(/\s{2,}/g, " ")
      .trim()
      .slice(0, maxLength)
  );
}

/**
 * Construye un enlace de WhatsApp valido y seguro.
 * Siempre apunta al numero configurado en las variables de entorno.
 */
export function waLink(message?: string): string {
  const base = `https://wa.me/${env.whatsappNumber}`;
  if (!message) return base;
  const text = sanitizeMessageInput(message, MAX_MESSAGE_LENGTH);
  if (!text) return base;
  return `${base}?text=${encodeURIComponent(text)}`;
}

/** Mensajes predefinidos, en un solo lugar para poder ajustarlos rapido. */
export const waMessages = {
  general: "Hola Cami, tengo una consulta",
  fromPortfolio: "Hola Cami, vengo de tu portafolio",
  diagnostico: "Hola Cami, quiero mi diagnóstico gratuito de 30 minutos",
  antesDeAgendar: "Hola Cami, tengo una consulta antes de agendar",
  marca: "Hola Cami, quiero hablar de mi marca",
  valores: "Hola Cami, quiero conocer los valores de tus servicios",
} as const;
