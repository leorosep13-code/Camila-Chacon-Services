import { Icon } from "./Icon";

/**
 * Logotipo "club by cami". El símbolo es SVG dibujado en código,
 * así que no depende de ningún archivo de imagen.
 */
export function Brand({ href = "/#inicio" }: { href?: string }) {
  return (
    <a className="brand" href={href}>
      <span className="brand__mark">
        <Icon name="mark" />
      </span>
      <span className="brand__name">
        club <i>by</i> <b>cami</b>
        <small>Camila Chacón</small>
      </span>
    </a>
  );
}
