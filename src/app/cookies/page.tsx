import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/LegalPage";
import { ResetConsent } from "@/components/layout/ResetConsent";
import { contact } from "@/content/site";

export const metadata: Metadata = {
  title: "Política de cookies",
  description:
    "Qué almacena club by cami en tu navegador, por qué, y cómo cambiar tu decisión en cualquier momento.",
  alternates: { canonical: "/cookies" },
};

export default function Cookies() {
  return (
    <LegalPage title="Política de cookies y almacenamiento local" updated="19 de agosto de 2026">
      <div className="legal__box">
        <p>
          <b>En corto:</b> este sitio no instala cookies propias, no usa cookies de publicidad y no
          te rastrea entre sitios. Solo guarda dos preferencias tuyas en tu propio navegador, y
          únicamente carga el calendario de Google si tú lo autorizas.
        </p>
      </div>

      <h2>1. Cookies propias</h2>
      <p>
        Ninguna. El sitio es estático y no necesita identificar a los visitantes, así que no escribe
        cookies desde este dominio.
      </p>

      <h2>2. Almacenamiento local (no son cookies)</h2>
      <p>
        Para recordar decisiones tuyas se usan <code>localStorage</code> y{" "}
        <code>sessionStorage</code>, que se quedan en tu navegador y nunca viajan al servidor:
      </p>
      <ul>
        <li>
          <b>cbc:consentimiento-terceros</b> — guarda si autorizaste cargar contenido de terceros
          (el calendario). Permanece hasta que lo borres o cambies tu decisión.
        </li>
        <li>
          <b>cbc:topbar-cerrada</b> y <b>cbc:modal-visto</b> — evitan repetirte el aviso superior y
          la ventana de recordatorio. Se borran al cerrar la pestaña.
        </li>
      </ul>
      <p>
        Estas preferencias son estrictamente necesarias para respetar tus decisiones, así que no
        requieren consentimiento adicional.
      </p>

      <h2>3. Cookies de terceros</h2>
      <p>
        El único tercero que puede instalar cookies es <b>Google Calendar</b>, a través del
        calendario de agendamiento embebido en la sección de contacto. Ese contenido{" "}
        <b>no se carga por defecto</b>: en su lugar verás un marcador con un botón. Solo si pulsas
        &laquo;Cargar calendario&raquo; (o &laquo;Aceptar&raquo; en el aviso) se inserta el iframe y
        Google puede instalar sus cookies, regidas por{" "}
        <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
          su política de privacidad
        </a>
        .
      </p>
      <p>
        Si prefieres no cargarlo, puedes abrir el calendario en una pestaña nueva desde el enlace de
        respaldo, o escribir por WhatsApp para agendar.
      </p>

      <h2>4. Métricas</h2>
      <p>
        Se usan Vercel Analytics y Vercel Speed Insights para conocer cuántas visitas recibe cada
        sección y cómo se comporta la página. Ambos funcionan <b>sin cookies</b> y sin crear
        identificadores persistentes: los datos son agregados y no permiten identificar a una
        persona.
      </p>

      <h2>5. Cambiar tu decisión</h2>
      <p>
        Puedes revocar o volver a otorgar tu autorización cuando quieras. Al hacerlo, el aviso
        volverá a aparecer y el calendario dejará de cargarse hasta que lo autorices de nuevo.
      </p>
      <ResetConsent />

      <h2>6. Contacto</h2>
      <p>
        Dudas sobre esta política: <a href={contact.emailHref}>{contact.email}</a>.
      </p>
    </LegalPage>
  );
}
