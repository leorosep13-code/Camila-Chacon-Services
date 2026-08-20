import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon } from "@/components/ui/Icon";
import { reasons } from "@/content/sections";

export function Reasons() {
  return (
    <section className="section bg-negro" id="por-que">
      <div className="wrap">
        <div className="head rv">
          <Eyebrow light>Por qué trabajar conmigo</Eyebrow>
          <h2>
            La diferencia está en cómo se <span className="c-verde">toman las decisiones</span>
          </h2>
          <p>No compites por publicar más bonito. Compites por vender mejor.</p>
        </div>

        <div className="why">
          {reasons.map((reason) => (
            <article className="why__c rv" key={reason.title}>
              <div className="why__ico">
                <Icon name={reason.icon} />
              </div>
              <h3>{reason.title}</h3>
              <p>{reason.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
