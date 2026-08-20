import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon } from "@/components/ui/Icon";
import { catalog, packs } from "@/content/sections";
import { contact } from "@/content/site";

export function Packages() {
  return (
    <section className="section" id="paquetes">
      <div className="wrap">
        <div className="head head--center rv">
          <Eyebrow>Paquetes</Eyebrow>
          <h2>
            Tres formas de <span className="c-morado">trabajar juntas</span>
          </h2>
          <p>
            Cada negocio exige un acompañamiento distinto, así que no trabajo con tarifas fijas: te
            envío el valor por WhatsApp según lo que necesites, y lo confirmamos en el diagnóstico.
          </p>
        </div>

        <div className="packs">
          {packs.map((pack) => (
            <article className={pack.featured ? "pack pack--top rv" : "pack rv"} key={pack.id}>
              <span className="pack__tag">{pack.tag}</span>
              <h3>{pack.title}</h3>
              <p className="pack__price">
                {pack.price}
                <small>{pack.priceNote}</small>
              </p>
              <p className="pack__for">{pack.audience}</p>
              <ul className="pack__list">
                {pack.items.map((item) => (
                  <li key={item}>
                    <Icon name="check" /> {item}
                  </li>
                ))}
              </ul>
              <a
                className={`btn btn--${pack.ctaVariant} btn--wrap`}
                href={pack.waHref}
                target="_blank"
                rel="noopener noreferrer"
              >
                Consultar paquete
              </a>
            </article>
          ))}
        </div>

        {/* Catálogo secundario, plegado para no abrumar en la primera lectura. */}
        <details className="cat rv">
          <summary>
            <span>
              <i>
                <Icon name="down" />
              </i>{" "}
              Ver el catálogo completo de servicios
            </span>
            <span style={{ fontWeight: 400, color: "#7B7B88", fontSize: ".85rem" }}>
              Todo lo que puedo hacer por ti
            </span>
          </summary>

          <div className="cat__in">
            <div className="cat__grid">
              {catalog.columns.map((column, i) => (
                <div key={i}>
                  {column.map((row) => (
                    <p className="cat__row" key={row.name}>
                      <b>{row.name}</b>
                      <span>{row.price}</span>
                    </p>
                  ))}
                </div>
              ))}
            </div>

            <p className="cat__note">
              {catalog.note}
              <br />
              <a
                className="cat__wa"
                href={contact.waValores}
                target="_blank"
                rel="noopener noreferrer"
              >
                Escríbeme por WhatsApp y te envío los valores
              </a>
            </p>
          </div>
        </details>
      </div>
    </section>
  );
}
