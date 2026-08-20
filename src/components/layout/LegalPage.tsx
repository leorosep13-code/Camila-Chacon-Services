import Link from "next/link";
import { Icon } from "@/components/ui/Icon";

/** Envoltorio común de las páginas legales: título, fecha y volver al inicio. */
export function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <main className="section legal">
      <div className="wrap legal__in">
        <Link className="legal__back" href="/">
          <Icon name="left" /> Volver al inicio
        </Link>
        <h1>{title}</h1>
        <p className="legal__meta">Última actualización: {updated}</p>
        {children}
      </div>
    </main>
  );
}
