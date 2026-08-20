import { Eyebrow } from "@/components/ui/Eyebrow";
import { method } from "@/content/sections";

export function Method() {
  return (
    <section className="section" id="metodo">
      <div className="wrap">
        <div className="head rv">
          <Eyebrow>Mi metodología</Eyebrow>
          <h2>
            Cinco pasos, siempre en el <span className="c-morado">mismo orden</span>
          </h2>
          <p>
            Nada se ejecuta antes de entender el negocio. Así evitamos gastar tiempo y dinero en
            acciones sueltas.
          </p>
        </div>

        <div className="method" id="method">
          {/* Línea que se dibuja sola cuando la sección entra en pantalla. */}
          <span className="method__line">
            <span />
          </span>

          {method.map((step) => (
            <article className="step rv" key={step.n}>
              <div className="step__n">{step.n}</div>
              <div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
                <span className="step__tag">{step.tag}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
