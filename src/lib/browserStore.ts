"use client";

import { useSyncExternalStore } from "react";

/**
 * Puente entre React y el almacenamiento del navegador.
 *
 * El almacenamiento del navegador es un "sistema externo" desde el punto de
 * vista de React, así que se lee con `useSyncExternalStore` en vez de con
 * `useEffect` + `setState`. Eso evita el render en cascada de leer en un efecto
 * y, sobre todo, resuelve la hidratación: durante el primer render (servidor y
 * cliente) el valor es `CARGANDO`, y solo después pasa al valor real. Sin eso,
 * el aviso de cookies parpadearía en cada carga.
 *
 * Todos los accesos van dentro de try/catch porque en modo privado o con el
 * almacenamiento bloqueado, `localStorage` lanza excepción en vez de devolver
 * `null`.
 */

/** Valor durante el render del servidor y la hidratación. */
export const CARGANDO = "cargando" as const;

const listeners = new Set<() => void>();

/** Avisa a todos los componentes suscritos de que algo cambió. */
function notify() {
  for (const listener of listeners) listener();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  // `storage` solo se dispara en OTRAS pestañas: mantiene todo sincronizado.
  window.addEventListener("storage", listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
}

function getStore(scope: "local" | "session"): Storage | null {
  try {
    return scope === "local" ? window.localStorage : window.sessionStorage;
  } catch {
    return null;
  }
}

export function readStored(scope: "local" | "session", key: string): string | null {
  try {
    return getStore(scope)?.getItem(key) ?? null;
  } catch {
    return null;
  }
}

export function writeStored(scope: "local" | "session", key: string, value: string) {
  try {
    getStore(scope)?.setItem(key, value);
  } catch {
    // Sin persistencia: la decisión vale solo para esta vista.
  }
  notify();
}

export function removeStored(scope: "local" | "session", key: string) {
  try {
    getStore(scope)?.removeItem(key);
  } catch {
    // Nada que borrar si el almacenamiento no está disponible.
  }
  notify();
}

/**
 * Lee un valor del almacenamiento y se re-renderiza cuando cambia.
 * Devuelve `CARGANDO` hasta que termina la hidratación.
 */
export function useStored(
  scope: "local" | "session",
  key: string,
): string | null | typeof CARGANDO {
  return useSyncExternalStore(
    subscribe,
    () => readStored(scope, key),
    () => CARGANDO,
  );
}
