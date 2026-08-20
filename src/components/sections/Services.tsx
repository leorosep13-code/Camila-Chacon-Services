import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon } from "@/components/ui/Icon";
import { Rail } from "@/components/ui/Rail";
import { services, servicesNote } from "@/content/sections";

export function Services() {
  return (
    <section className="section bg-gris" id="servicios">
      <Rail
        label="Ecosistema de servicios"
        head={
          <div className="head" style={{ marginBottom: 0 }}>
            <Eyebrow>Ecosistema de servicios</Eyebrow>
            <h2>
              Seis frentes que trabajan <span className="c-morado">conectados</span>
            </h2>
            <p>
              Sin estrategia el contenido no vende, sin canal de venta la publicidad se pierde y sin
              datos no sabes qué repetir.
            </p>
          </div>
        }
        footer={
          <p
            className="rv"
            style={{ marginTop: "26px", fontSize: ".88rem", color: "#7B7B88", fontWeight: 300 }}
          >
            {servicesNote}
          </p>
        }
      >
        {services.map((service, i) => (
          <article className={`svc svc--${i + 1}`} key={service.id}>
            <div className="svc__ico">
              <Icon name={service.icon} />
            </div>
            <span className="svc__n">{service.number}</span>
            <h3>{service.title}</h3>
            <p>{service.text}</p>

            {service.disclaimer ? (
              <p className="svc__no">
                <b>{service.disclaimer.strong}</b>
                {service.disclaimer.rest}
              </p>
            ) : null}

            <ul className="svc__list">
              {service.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            {/* Añadido: cada servicio abre WhatsApp con el mensaje ya escrito,
                para que preguntar cueste un solo toque. */}
            <a className="svc__cta" href={service.waHref} target="_blank" rel="noopener noreferrer">
              <Icon name="wa" /> Preguntar por este servicio
            </a>
          </article>
        ))}
      </Rail>
    </section>
  );
}
