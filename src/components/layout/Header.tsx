"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { Brand } from "@/components/ui/Brand";
import { Icon } from "@/components/ui/Icon";
import { contact, navLinks } from "@/content/site";

/**
 * Cabecera fija con navegación.
 *
 * En móvil el menú ocupa toda la pantalla. Se cierra con Escape, al pulsar un
 * enlace, y devuelve el foco al botón hamburguesa, que es lo que espera alguien
 * que navega con teclado o lector de pantalla.
 */
export function Header() {
  const [open, setOpen] = useState(false);
  const burgerRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => setOpen(false), []);

  // Bloquea el scroll del fondo mientras el menú está abierto.
  useEffect(() => {
    document.body.classList.toggle("no-scroll", open);
    return () => document.body.classList.remove("no-scroll");
  }, [open]);

  // Escape cierra el menú y devuelve el foco al botón que lo abrió.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      close();
      burgerRef.current?.focus();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, close]);

  return (
    <header className="hdr" id="hdr">
      <div className="wrap hdr__in">
        <Brand />

        <nav className={open ? "nav is-open" : "nav"} id="nav" aria-label="Navegación principal">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} onClick={close}>
              {link.label}
            </Link>
          ))}
          <Link className="btn btn--morado" href="/#contacto" onClick={close}>
            Agenda tu llamada
          </Link>
        </nav>

        <div className="hdr__acts">
          <a
            className="hdr__wa"
            href={contact.waGeneral}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Escríbeme por WhatsApp"
            title="Escríbeme por WhatsApp"
          >
            <Icon name="wa" />
          </a>
          <Link className="btn btn--morado btn--sm hdr__cta" href="/#contacto">
            <Icon name="cal" /> Agenda tu llamada
          </Link>
        </div>

        <button
          ref={burgerRef}
          className={open ? "burger is-open" : "burger"}
          type="button"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          aria-controls="nav"
          onClick={() => setOpen((v) => !v)}
        >
          <Icon name={open ? "close" : "menu"} />
        </button>
      </div>
    </header>
  );
}
