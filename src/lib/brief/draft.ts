import { readStored, removeStored, writeStored } from "@/lib/browserStore";
import type { BriefAnswers } from "./schema";

/**
 * Borrador del formulario `/brief` en `localStorage`.
 *
 * Se apoya en `browserStore.ts` (mismo mecanismo que el resto del sitio),
 * que ya envuelve cada acceso en try/catch. Aquí solo se agrega la
 * serialización JSON, también protegida: un borrador corrupto o un cambio
 * de formato entre versiones no debe romper el formulario, solo perderse.
 */

const DRAFT_KEY = "brief-draft-v1";

export interface BriefDraft {
  paso: number;
  respuestas: BriefAnswers;
}

export function readDraft(): BriefDraft | null {
  const raw = readStored("local", DRAFT_KEY);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as BriefDraft;
    if (typeof parsed?.paso !== "number" || typeof parsed?.respuestas !== "object") return null;
    return parsed;
  } catch {
    return null;
  }
}

export function writeDraft(draft: BriefDraft) {
  try {
    writeStored("local", DRAFT_KEY, JSON.stringify(draft));
  } catch {
    // Sin borrador: el llenado sigue funcionando, solo no se recupera al recargar.
  }
}

export function clearDraft() {
  removeStored("local", DRAFT_KEY);
}
