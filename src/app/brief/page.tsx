import type { Metadata } from "next";
import { BriefForm } from "@/components/brief/BriefForm";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon } from "@/components/ui/Icon";

export const metadata: Metadata = {
  title: "Brief de Marca",
  description:
    "Cuéntame sobre tu negocio para armar tu diagnóstico inicial y tu estrategia digital a medida.",
  alternates: { canonical: "/brief" },
  // El brief es un formulario privado para clientas que ya iniciaron el
  // proceso: no tiene valor buscarlo en Google.
  robots: { index: false, follow: false },
};

export default function BriefPage() {
  return (
    <main className="brief-page">
      <section className="hero hero--brief">
        {/* Halos decorativos: mismo tratamiento que el hero de la landing. */}
        <span className="hero__glow hero__glow--1" />
        <span className="hero__glow hero__glow--2" />
        <span className="hero__ast hero__ast--1">
          <Icon name="mark" />
        </span>

        <div className="wrap hero__in">
          <Eyebrow light>Brief de marca</Eyebrow>
          <h1>Cuéntame sobre tu negocio</h1>
          <p className="brief-hero__intro">
            ¡Hola! 💜 Este brief es la base de tu estrategia. Mientras más me cuentes, más a tu
            medida será tu propuesta. Te toma entre 20 y 30 minutos. Responde con calma: si no sabes
            algo, escríbelo tal cual (&quot;no sé todavía&quot;), eso también me ayuda.
          </p>
        </div>
      </section>

      <div className="wrap brief-wrap">
        <BriefForm />
      </div>
    </main>
  );
}
