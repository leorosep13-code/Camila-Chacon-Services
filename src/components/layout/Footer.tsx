import Link from "next/link";
import { Brand } from "@/components/ui/Brand";
import { Icon } from "@/components/ui/Icon";
import { contact, footerNav, legalNav, site } from "@/content/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="foot">
      <div className="wrap">
        <div className="foot__grid">
          <div>
            <Brand />
            <p className="foot__about">
              Estrategia, contenido, e-commerce, publicidad y datos para negocios y marcas
              personales que quieren vender más en canales digitales.
            </p>
            <div className="foot__legal" style={{ marginTop: "22px" }}>
              {legalNav.map((item) => (
                <Link key={item.href} href={item.href}>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4>Contacto</h4>
            <ul className="foot__list">
              <li>
                <a href={contact.waPortfolio} target="_blank" rel="noopener noreferrer">
                  <Icon name="wa" /> {contact.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={contact.instagramUrl} target="_blank" rel="noopener noreferrer">
                  <Icon name="insta" /> {contact.instagramHandle}
                </a>
              </li>
              <li>
                <a href={contact.emailHref}>
                  <Icon name="mail" /> {contact.email}
                </a>
              </li>
              <li>
                <Icon name="map" /> {contact.location}
              </li>
            </ul>
          </div>

          <div>
            <h4>Navega</h4>
            <ul className="foot__list">
              {footerNav.map((item) => (
                <li key={item.href}>
                  <a href={item.href}>{item.label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="foot__bottom">
          <span>
            © {year} {site.name} · Todos los derechos reservados
          </span>
          <span>Crea tu marca. Conéctate con tu audiencia. Haz que suceda.</span>
        </div>
      </div>
    </footer>
  );
}
