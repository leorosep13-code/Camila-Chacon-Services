"use client";

import { CARGANDO, readStored, useStored, writeStored } from "./browserStore";

/**
 * Consentimiento para contenido de terceros.
 *
 * El único tercero que carga este sitio es el calendario de Google, que sí
 * instala cookies propias. Mientras el visitante no acepte, ese iframe NO se
 * inserta: en su lugar se muestra un marcador con un botón. Así el sitio
 * cumple por diseño, sin depender de que nadie lea el aviso.
 *
 * Se guarda en localStorage, no en una cookie, porque no necesita viajar al
 * servidor.
 */

const STORAGE_KEY = "cbc:consentimiento-terceros";

export type Consentimiento = "aceptado" | "rechazado" | "sin-decidir" | typeof CARGANDO;

function normalizar(raw: string | null | typeof CARGANDO): Consentimiento {
  if (raw === CARGANDO) return CARGANDO;
  if (raw === "aceptado" || raw === "rechazado") return raw;
  return "sin-decidir";
}

/** Lectura puntual, fuera de React. */
export function readConsent(): Consentimiento {
  return normalizar(readStored("local", STORAGE_KEY));
}

export function writeConsent(value: "aceptado" | "rechazado") {
  writeStored("local", STORAGE_KEY, value);
}

/**
 * Decisión actual del visitante.
 *
 * Devuelve `"cargando"` durante el render del servidor y la hidratación:
 * quien lo use debe no pintar nada en ese estado, para que el aviso no
 * aparezca y desaparezca en cada carga.
 */
export function useConsent(): Consentimiento {
  return normalizar(useStored("local", STORAGE_KEY));
}
