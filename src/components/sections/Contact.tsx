import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon } from "@/components/ui/Icon";
import { contactSection } from "@/content/sections";
import { contact } from "@/content/site";
import { CalendarEmbed } from "./CalendarEmbed";
import { ContactForm } from "./ContactForm";
import { QuickContact } from "./QuickContact";

export function Contact() {
  return (
    <section className="section bg-gris" id="contacto">
      <div className="wrap">
        <div className="form">
          <div className="rv">
            <Eyebrow>{contactSection.eyebrow}</Eyebrow>
            <h2>
              {contactSection.titleStart}
              <em>{contactSection.titleEm}</em>
            </h2>
            <p className="form__p">{contactSection.text}</p>

            <ul className="form__list">
              {contactSection.bullets.map((bullet) => (
                <li key={bullet}>
                  <Icon name="check" /> {bullet}
                </li>
              ))}
            </ul>

            <a
              className="btn btn--morado"
              style={{ marginTop: "28px" }}
              href={contact.waAntesDeAgendar}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon name="wa" /> Tengo una consulta antes
            </a>

            {/* Añadido: copiar datos, guardar el contacto y compartir. */}
            <QuickContact />
          </div>

          <CalendarEmbed />
        </div>

        <details className="pref rv">
          <summary>
            <span>
              <i>
                <Icon name="down" />
              </i>{" "}
              ¿Prefieres escribirme antes de agendar?
            </span>
            <span className="pref__hint">Cuéntame tu caso por WhatsApp</span>
          </summary>
          <ContactForm />
        </details>
      </div>
    </section>
  );
}
