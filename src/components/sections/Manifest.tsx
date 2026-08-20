import { Icon } from "@/components/ui/Icon";
import { manifest } from "@/content/sections";

export function Manifest() {
  return (
    <section className="section bg-negro manifest">
      <span className="manifest__ast">
        <Icon name="mark" />
      </span>
      <div className="wrap rv" style={{ position: "relative", zIndex: 2 }}>
        <h2>
          {manifest.titleStart}
          <em>{manifest.titleEm}</em>
        </h2>
        <p>{manifest.text}</p>
        <a className="btn btn--verde" href="#metodo">
          Conoce mi método <Icon name="arrow" />
        </a>
      </div>
    </section>
  );
}
