import { Icon } from "@/components/ui/Icon";
import { promo } from "@/content/sections";
import { contact } from "@/content/site";

export function Promo() {
  return (
    <section className="section" style={{ paddingBlock: "clamp(46px,5vw,80px)" }}>
      <div className="wrap">
        <div className="promo rv">
          <div>
            <span className="promo__tag">{promo.tag}</span>
            <h2>{promo.title}</h2>
            <p>{promo.text}</p>

            <div className="promo__cta">
              <a className="btn btn--verde" href="#contacto">
                <Icon name="cal" /> Elige tu horario
              </a>
              <a
                className="promo__alt"
                href={contact.waDiagnostico}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon name="wa" /> o escríbeme por WhatsApp
              </a>
            </div>

            <p className="promo__next">
              {promo.next.lead}
              <b>{promo.next.strong}</b>
              {promo.next.tail}
            </p>
          </div>

          <ul className="promo__card">
            {promo.bullets.map((item) => (
              <li key={item}>
                <Icon name="check" /> {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
