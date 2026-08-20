"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Icon } from "./Icon";

type RailProps = {
  /** Encabezado de la sección; se coloca a la izquierda de las flechas. */
  head: React.ReactNode;
  /** Las tarjetas del carrusel (se renderizan en el servidor). */
  children: React.ReactNode;
  /** Nota opcional bajo el carrusel. */
  footer?: React.ReactNode;
  label: string;
};

/**
 * Carrusel horizontal con arrastre y flechas.
 *
 * El contenido llega ya renderizado desde el servidor: este componente solo
 * añade el comportamiento. Sigue funcionando sin JavaScript porque la pista
 * es un contenedor con scroll nativo; las flechas son un extra.
 */
export function Rail({ head, children, footer, label }: RailProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const syncButtons = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    setAtStart(track.scrollLeft < 6);
    setAtEnd(track.scrollLeft > track.scrollWidth - track.clientWidth - 6);
  }, []);

  useEffect(() => {
    syncButtons();
    window.addEventListener("resize", syncButtons);
    return () => window.removeEventListener("resize", syncButtons);
  }, [syncButtons]);

  const scrollBy = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.firstElementChild;
    const step = card ? card.getBoundingClientRect().width + 24 : 320;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    track.scrollBy({ left: step * direction, behavior: reduce ? "auto" : "smooth" });
  };

  /* ---- arrastre con el ratón / dedo ---- */
  const drag = useRef({ active: false, startX: 0, startScroll: 0, moved: 0 });

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    if (!track) return;
    drag.current = { active: true, startX: e.clientX, startScroll: track.scrollLeft, moved: 0 };
    track.classList.add("is-drag");
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    if (!track || !drag.current.active) return;
    const delta = e.clientX - drag.current.startX;
    drag.current.moved = Math.abs(delta);
    track.scrollLeft = drag.current.startScroll - delta;
  };

  const endDrag = () => {
    drag.current.active = false;
    trackRef.current?.classList.remove("is-drag");
  };

  // Si el gesto fue un arrastre y no un clic, no se activa el enlace de debajo.
  const onClickCapture = (e: React.MouseEvent<HTMLDivElement>) => {
    if (drag.current.moved > 8) e.preventDefault();
  };

  return (
    <div className="wrap rail">
      <div className="rail__top rv">
        {head}
        <div className="rail__nav">
          <button
            className="rail__btn"
            type="button"
            aria-label="Anterior"
            disabled={atStart}
            onClick={() => scrollBy(-1)}
          >
            <Icon name="left" />
          </button>
          <button
            className="rail__btn"
            type="button"
            aria-label="Siguiente"
            disabled={atEnd}
            onClick={() => scrollBy(1)}
          >
            <Icon name="arrow" />
          </button>
        </div>
      </div>

      <div
        className="rail__track"
        ref={trackRef}
        role="group"
        aria-label={label}
        tabIndex={0}
        onScroll={syncButtons}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        onPointerCancel={endDrag}
        onClickCapture={onClickCapture}
      >
        {children}
      </div>

      {footer}
    </div>
  );
}
