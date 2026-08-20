import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon } from "@/components/ui/Icon";
import { moments } from "@/content/sections";

export function Moments() {
  return (
    <section className="section bg-gris" id="momentos">
      <div className="wrap">
        <div className="head head--center rv">
          <Eyebrow>Qué resuelvo</Eyebrow>
          <h2>
            ¿En cuál de estos <span className="c-morado">momentos</span> estás?
          </h2>
          <p>
            No trabajo por rubro, trabajo por momento del negocio. Encuentra el tuyo y verás
            exactamente por dónde empezaríamos.
          </p>
        </div>

        <div className="moms">
          {moments.map((moment, i) => (
            <article className={`mom mom--${i + 1} rv`} key={moment.id}>
              <div className="mom__top">
                <small>{moment.number}</small>
                <h3>{moment.title}</h3>
              </div>
              <div className="mom__body">
                <p>{moment.intro}</p>
                <ul>
                  {moment.bullets.map((bullet) => (
                    <li key={bullet}>
                      <Icon name="check" /> {bullet}
                    </li>
                  ))}
                </ul>
                <p className="mom__who">
                  <b>Ejemplos:</b> {moment.who}
                </p>
                <p className="mom__go">
                  <span>
                    {moment.goPrefix}
                    <b>{moment.goStrong}</b>
                  </span>{" "}
                  <Icon name="arrow" />
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
