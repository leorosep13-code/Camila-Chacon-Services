import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon } from "@/components/ui/Icon";
import { doors } from "@/content/doors";

export function Doors() {
  return (
    <section className="section">
      <div className="wrap">
        <div className="head head--center rv">
          <Eyebrow>Empieza por donde quieras</Eyebrow>
          <h2>
            Tres formas de <span className="c-morado">empezar hoy</span>
          </h2>
        </div>

        <div className="doors">
          {doors.map((door, i) => (
            <a
              className={`door door--${i + 1} rv`}
              key={door.id}
              href={door.href}
              {...(door.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              <small>{door.small}</small>
              <h3>{door.title}</h3>
              <p>{door.text}</p>
              <span className="door__go">
                {door.cta} <Icon name="arrow" />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
