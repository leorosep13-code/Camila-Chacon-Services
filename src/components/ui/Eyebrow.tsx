import { Icon } from "./Icon";

/** Etiqueta pequeña en mayúsculas que encabeza cada sección. */
export function Eyebrow({
  children,
  light = false,
}: {
  children: React.ReactNode;
  light?: boolean;
}) {
  return (
    <span className={light ? "eyebrow eyebrow--claro" : "eyebrow"}>
      <i>
        <Icon name="mark" />
      </i>{" "}
      {children}
    </span>
  );
}
