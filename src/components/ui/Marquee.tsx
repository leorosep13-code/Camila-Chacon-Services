import { Icon } from "./Icon";

type MarqueeProps = {
  items: readonly string[];
  variant?: "oscuro" | "verde" | "morado";
  /** Cuántas veces se repite la lista. La animación desplaza justo el 50%,
   *  así que el total de elementos debe ser par para que el bucle sea continuo. */
  repeat?: number;
};

/**
 * Cinta de texto en movimiento continuo.
 * La animación se pausa al pasar el ratón y se desactiva por completo si el
 * visitante pidió reducir el movimiento (regla en 09-floating.css).
 */
export function Marquee({ items, variant = "oscuro", repeat = 2 }: MarqueeProps) {
  const cls = variant === "oscuro" ? "marquee" : `marquee marquee--${variant}`;
  const list = Array.from({ length: repeat }, () => items).flat();

  return (
    <div className={cls} aria-hidden="true">
      <div className="marquee__track">
        {list.map((item, i) => (
          <span className="marquee__item" key={`${item}-${i}`}>
            <i>
              <Icon name="mark" />
            </i>{" "}
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
