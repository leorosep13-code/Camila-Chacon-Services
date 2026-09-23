import { z } from "zod";
import { allQuestions, type Question } from "./questions";

/**
 * Esquema de validación generado desde `questions.ts`, una sola vez, para que
 * el cliente (validar por paso) y el servidor (revalidar en `/api/brief`)
 * usen exactamente las mismas reglas.
 */

const WHATSAPP_RE = /^\+\d{8,15}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Valores válidos para una pregunta de opción única, incluida la variante "Otro: <texto>". */
function opcionValida(opciones: string[]) {
  const permiteOtro = opciones.includes("Otro");
  return z.string().refine((value) => {
    if (opciones.includes(value) && value !== "Otro") return true;
    if (permiteOtro) return /^Otro: .+/.test(value);
    return false;
  }, "Selecciona una opción válida.");
}

/** Valores válidos para casillas: cada elemento debe venir de `opciones`, o ser "Otro: <texto>". */
function casillaValida(opciones: string[]) {
  const permiteOtro = opciones.includes("Otro");
  return z.string().refine((value) => {
    if (opciones.includes(value) && value !== "Otro") return true;
    if (permiteOtro) return /^Otro: .+/.test(value);
    return false;
  });
}

function schemaFor(question: Question): z.ZodTypeAny {
  switch (question.tipo) {
    case "texto": {
      // El orden importa: .min/.max solo existen en ZodString, así que se
      // aplican primero; .refine() ya devuelve ZodEffects (sin esos
      // métodos), por eso a partir de ahí la variable se tipa como
      // ZodTypeAny y solo se usan métodos genéricos (refine/optional/or).
      let str = z.string().trim().max(500, "Demasiado largo.");
      if (question.requerido) str = str.min(1, "Este campo es obligatorio.");

      let schema: z.ZodTypeAny = str;
      if (question.validar === "whatsapp") {
        schema = schema.refine(
          (value) => value === "" || WHATSAPP_RE.test(value as string),
          "Debe empezar con + y tener entre 8 y 15 dígitos (ej. +573045673052).",
        );
      } else if (question.validar === "email") {
        schema = schema.refine(
          (value) => value === "" || EMAIL_RE.test(value as string),
          "Ese correo no parece válido.",
        );
      }
      return question.requerido ? schema : schema.optional().or(z.literal(""));
    }

    case "parrafo": {
      const base = z.string().trim().max(4000, "Demasiado largo.");
      return question.requerido
        ? base.min(1, "Este campo es obligatorio.")
        : base.optional().or(z.literal(""));
    }

    case "opcion": {
      const base = opcionValida(question.opciones);
      return question.requerido ? base : base.optional().or(z.literal(""));
    }

    case "casillas": {
      let base = z.array(casillaValida(question.opciones));
      if (question.exactamente !== undefined) {
        base = base.length(question.exactamente, `Elige exactamente ${question.exactamente}.`);
      } else if (question.maximo !== undefined) {
        base = base.max(question.maximo, `Elige máximo ${question.maximo}.`);
      }
      if (question.requerido && question.exactamente === undefined) {
        base = base.min(1, "Elige al menos una opción.");
      }
      return base;
    }

    case "escala":
      return z
        .number()
        .int()
        .min(1, "Elige un valor entre 1 y 5.")
        .max(5, "Elige un valor entre 1 y 5.");
  }
}

/** Un validador por pregunta, para revisar un solo campo al avanzar de paso. */
export const fieldSchemas: Record<string, z.ZodTypeAny> = Object.fromEntries(
  allQuestions.map((question) => [question.id, schemaFor(question)]),
);

/** El brief completo: todas las preguntas más el honeypot antispam. */
export const briefSchema = z.object({
  respuestas: z.object(fieldSchemas),
  honeypot: z.string().optional().default(""),
});

export type BriefAnswers = Record<string, string | string[] | number | undefined>;
export type BriefSubmission = z.infer<typeof briefSchema>;
