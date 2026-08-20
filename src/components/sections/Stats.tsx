import { Eyebrow } from "@/components/ui/Eyebrow";
import { stats } from "@/content/sections";

export function Stats() {
  return (
    <section className="section bg-negro" data-edit="cifras">
      <div className="wrap">
        <div className="head rv" style={{ maxWidth: "640px" }}>
          <Eyebrow light>En números</Eyebrow>
          <h2>
            Experiencia que se mide en <span className="c-verde">resultados</span>
          </h2>
        </div>

        <div className="stats">
          {stats.map((stat) => (
            <div className="stat rv" key={stat.label}>
              <small>{stat.label}</small>
              {/* ScrollEffects anima el número desde 0 al entrar en pantalla.
                  El valor final ya está en el HTML por si no hay JavaScript. */}
              <b data-count={stat.value} data-pre={stat.prefix ?? ""}>
                {stat.prefix ?? ""}
                {stat.value}
              </b>
              <p>{stat.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
