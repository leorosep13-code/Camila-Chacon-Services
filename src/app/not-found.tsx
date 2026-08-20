import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { contact } from "@/content/site";

export const metadata: Metadata = {
  title: "Página no encontrada",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main className="nf">
      <div>
        <p className="nf__code">404</p>
        <h1>Esta página no existe</h1>
        <p>
          El enlace que seguiste está roto o la página se movió. Vuelve al inicio o escríbeme
          directamente: te respondo yo.
        </p>
        <div className="nf__acts">
          <Link className="btn btn--morado" href="/">
            <Icon name="left" /> Ir al inicio
          </Link>
          <a
            className="btn btn--linea"
            href={contact.waGeneral}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon name="wa" /> Escribir por WhatsApp
          </a>
        </div>
      </div>
    </main>
  );
}
