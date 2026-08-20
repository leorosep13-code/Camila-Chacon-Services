"use client";

import { useEffect, useState } from "react";
import { heroRotatingWords } from "@/content/site";

/**
 * Palabra que va cambiando en el titular.
 *
 * Se renderiza siempre la primera palabra en el servidor, así que el titular
 * es completo y rastreable aunque el JavaScript no llegue a ejecutarse.
 * Si el visitante pidió reducir el movimiento, se queda quieta.
 */
export function RotatingWord() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % heroRotatingWords.length);
    }, 2600);

    return () => window.clearInterval(id);
  }, []);

  return (
    <em className="rot" id="rot">
      {/* La `key` fuerza el remontaje para que la animación de entrada se repita. */}
      <span className="rot__i" key={index}>
        {heroRotatingWords[index]}
      </span>
    </em>
  );
}
