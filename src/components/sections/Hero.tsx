import { Icon } from "@/components/ui/Icon";
import { Marquee } from "@/components/ui/Marquee";
import { hero } from "@/content/sections";
import { marquees } from "@/content/site";
import { RotatingWord } from "./RotatingWord";

export function Hero() {
  return (
    <section className="hero" id="inicio">
      {/* Halos y asteriscos decorativos: puro adorno, invisibles para lectores. */}
      <span className="hero__glow hero__glow--1" />
      <span className="hero__glow hero__glow--2" />
      <span className="hero__ast hero__ast--1">
        <Icon name="mark" />
      </span>
      <span className="hero__ast hero__ast--2">
        <Icon name="mark" />
      </span>

      <div className="wrap hero__in">
        <h1>
          {hero.lines.map((line) => (
            <span className="line" key={line}>
              <span>{line}</span>
            </span>
          ))}
          <span className="line">
            <span>
              <RotatingWord />
            </span>
          </span>
        </h1>

        <p className="hero__sub">{hero.subtitle}</p>

        <div className="hero__actions">
          <a className="btn btn--verde" href="#contacto">
            <Icon name="cal" /> Agenda tu llamada
          </a>
          <a className="btn btn--blanco" href="#servicios">
            Ver servicios <Icon name="arrow" />
          </a>
        </div>

        <div className="hero__scroll">
          Desliza
          <span />
        </div>
      </div>

      <Marquee items={marquees.hero} repeat={2} />
    </section>
  );
}
