import { Marquee } from "@/components/ui/Marquee";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Doors } from "@/components/sections/Doors";
import { Hero } from "@/components/sections/Hero";
import { Manifest } from "@/components/sections/Manifest";
import { Method } from "@/components/sections/Method";
import { Moments } from "@/components/sections/Moments";
import { Packages } from "@/components/sections/Packages";
import { Promo } from "@/components/sections/Promo";
import { Reasons } from "@/components/sections/Reasons";
import { Services } from "@/components/sections/Services";
import { Stats } from "@/components/sections/Stats";
import { marquees } from "@/content/site";

/**
 * Landing completa. El orden de las secciones es el recorrido comercial:
 * enganchar → generar confianza → mostrar el problema → explicar el método →
 * detallar la oferta → cerrar con el contacto.
 */
export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <Promo />
        <About />
        <Manifest />
        <Marquee items={marquees.verde} variant="verde" repeat={4} />
        <Moments />
        <Method />
        <Services />
        <Stats />
        <Packages />
        <Reasons />
        <Contact />
        <Doors />
      </main>

      <Marquee items={marquees.morado} variant="morado" repeat={4} />
    </>
  );
}
