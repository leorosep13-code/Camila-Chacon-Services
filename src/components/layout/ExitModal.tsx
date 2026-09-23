"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { exitModal } from "@/content/sections";
import { readStored, writeStored } from "@/lib/browserStore";

const STORAGE_KEY = "cbc:modal-visto";

/**
 * Aviso que aparece una vez, al pasar el 55% de la página.
 *
 * Mejoras sobre el prototipo: solo se muestra una vez por sesión, atrapa el
 * foco mientras está abierto y lo devuelve al cerrarse.
 */
export function ExitModal() {
  const [open, setOpen] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);
  const lastFocused = useRef<HTMLElement | null>(null);

  const close = useCallback(() => {
    setOpen(false);
    lastFocused.current?.focus();
  }, []);

  useEffect(() => {
    // Se lee dentro del listener, no en el cuerpo del efecto: así no hay
    // lectura de almacenamiento durante el render ni renders en cascada.
    const onScroll = () => {
      if (readStored("session", STORAGE_KEY) === "1") {
        window.removeEventListener("scroll", onScroll);
        return;
      }

      const scrollable = document.body.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;
      if (window.scrollY / scrollable <= 0.55) return;

      writeStored("session", STORAGE_KEY, "1");
      lastFocused.current = document.activeElement as HTMLElement | null;
      setOpen(true);
      window.removeEventListener("scroll", onScroll);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Escape cierra, y el foco entra al diálogo al abrirse.
  useEffect(() => {
    if (!open) return;
    boxRef.current?.querySelector<HTMLElement>("button, a")?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, close]);

  return (
    <div
      className={open ? "modal is-on" : "modal"}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modalT"
      aria-hidden={!open}
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <div className="modal__box" ref={boxRef}>
        <button className="modal__x" type="button" aria-label="Cerrar" onClick={close}>
          <Icon name="close" />
        </button>
        <div className="modal__ast">
          <Icon name="mark" />
        </div>
        <h3 id="modalT">{exitModal.title}</h3>
        <p>{exitModal.text}</p>
        <Link className="btn btn--morado" href="/#contacto" onClick={close}>
          <Icon name="cal" /> {exitModal.cta}
        </Link>
      </div>
    </div>
  );
}
