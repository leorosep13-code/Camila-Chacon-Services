import Image from "next/image";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon } from "@/components/ui/Icon";
import { about } from "@/content/sections";
import { contact } from "@/content/site";

export function About() {
  return (
    <section className="section" id="sobre-mi">
      <div className="wrap">
        <div className="hey">
          <div className="hey__media rv">
            <span className="hey__hi">{about.hi}</span>

            <div className="hey__photo" data-parallax>
              {/* next/image sirve AVIF/WebP y reserva el espacio para que la
                  página no salte mientras carga. */}
              <Image
                src={about.photo.src}
                alt={about.photo.alt}
                width={about.photo.width}
                height={about.photo.height}
                sizes="(max-width: 980px) 90vw, 460px"
                priority={false}
              />
            </div>

            <div className="hey__cred">
              <b>{about.credential.strong}</b>
              {about.credential.rest}
            </div>
          </div>

          <div className="rv">
            <Eyebrow>{about.eyebrow}</Eyebrow>
            <h2>
              Consultora de <em>crecimiento digital y comercial</em>. Y, si me lo permites, tu
              próxima aliada.
            </h2>

            <p className="hey__p">{about.paragraphs.intro}</p>

            <p className="hey__ses">
              {about.skills.map((skill) => (
                <span key={skill.strong}>
                  <b>{skill.strong}</b>
                  {skill.text}{" "}
                </span>
              ))}
            </p>

            <p className="hey__nota">{about.paragraphs.note}</p>

            <a
              className="btn btn--morado"
              href={contact.waMarca}
              target="_blank"
              rel="noopener noreferrer"
            >
              Hablemos de tu marca <Icon name="arrow" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
