import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/LegalPage";
import { contact, site } from "@/content/site";

export const metadata: Metadata = {
  title: "Política de privacidad",
  description:
    "Cómo trata club by cami los datos personales de quienes visitan el sitio o solicitan una asesoría, conforme a la Ley 1581 de 2012.",
  alternates: { canonical: "/privacidad" },
  robots: { index: true, follow: true },
};

export default function Privacidad() {
  return (
    <LegalPage title="Política de tratamiento de datos personales" updated="19 de agosto de 2026">
      <div className="legal__box">
        <p>
          <b>En corto:</b> este sitio no tiene formularios que envíen datos a un servidor, no vende
          ni comparte información con terceros, y no usa cookies de publicidad. Lo que escribes en
          el formulario de contacto viaja directamente a WhatsApp, no a esta web.
        </p>
      </div>

      <h2>1. Responsable del tratamiento</h2>
      <p>
        {site.person}, quien opera comercialmente como <b>{site.name}</b>, con domicilio en{" "}
        {site.city}, {site.country}. Correo de contacto:{" "}
        <a href={contact.emailHref}>{contact.email}</a>. Teléfono y WhatsApp: {contact.phoneDisplay}
        .
      </p>

      <h2>2. Marco legal</h2>
      <p>
        Esta política se rige por la Ley Estatutaria 1581 de 2012, el Decreto 1074 de 2015 (que
        compiló el Decreto 1377 de 2013) y demás normas colombianas sobre protección de datos
        personales, bajo la vigilancia de la Superintendencia de Industria y Comercio.
      </p>

      <h2>3. Qué datos se recogen y cómo</h2>
      <p>
        Este sitio recoge datos personales únicamente en dos escenarios, y siempre porque tú los
        entregas:
      </p>
      <ul>
        <li>
          <b>Formulario de contacto:</b> nombre, nombre del negocio, el momento en que se encuentra
          tu negocio y el mensaje que escribas. Estos datos <b>no se almacenan en este sitio web</b>{" "}
          ni se envían a ningún servidor propio: al pulsar &laquo;Enviar por WhatsApp&raquo; se abre
          la aplicación de WhatsApp con el texto ya redactado, y eres tú quien decide enviarlo.
        </li>
        <li>
          <b>Agendamiento:</b> si autorizas cargar el calendario de Google y reservas una cita, los
          datos que ingreses (nombre, correo y, si lo indicas, teléfono) son tratados por Google
          como operador y quedan en el calendario de la responsable.
        </li>
      </ul>
      <p>
        Adicionalmente se recogen <b>métricas anónimas y agregadas</b> de rendimiento y visitas
        (Vercel Analytics y Speed Insights). Estas métricas no usan cookies, no crean un perfil ni
        permiten identificar a una persona.
      </p>

      <h2>4. Finalidad</h2>
      <ul>
        <li>Responder consultas comerciales y agendar sesiones de diagnóstico o asesoría.</li>
        <li>Elaborar y enviar propuestas de servicios.</li>
        <li>Ejecutar y hacer seguimiento a los servicios contratados.</li>
        <li>Cumplir obligaciones legales, contables y tributarias.</li>
        <li>Medir el rendimiento del sitio de forma anónima para mejorarlo.</li>
      </ul>
      <p>
        Los datos <b>no</b> se usan para publicidad de terceros, no se venden y no se ceden con
        fines comerciales.
      </p>

      <h2>5. Autorización</h2>
      <p>
        Antes de enviar el formulario debes marcar la casilla de autorización. Esa manifestación es
        previa, expresa e informada, tal como exige el artículo 9 de la Ley 1581 de 2012. Puedes
        revocarla en cualquier momento escribiendo a <a href={contact.emailHref}>{contact.email}</a>
        .
      </p>

      <h2>6. Derechos del titular</h2>
      <p>Como titular de tus datos personales tienes derecho a:</p>
      <ul>
        <li>Conocer, actualizar y rectificar tus datos.</li>
        <li>Solicitar prueba de la autorización otorgada.</li>
        <li>Ser informado sobre el uso que se ha dado a tus datos.</li>
        <li>
          Presentar quejas ante la Superintendencia de Industria y Comercio por infracciones a la
          ley.
        </li>
        <li>
          Revocar la autorización y solicitar la supresión de tus datos, cuando no exista un deber
          legal o contractual que obligue a conservarlos.
        </li>
        <li>Acceder gratuitamente a los datos que hayan sido objeto de tratamiento.</li>
      </ul>

      <h2>7. Cómo ejercer tus derechos</h2>
      <p>
        Envía tu solicitud a <a href={contact.emailHref}>{contact.email}</a> indicando tu nombre,
        los datos de contacto donde quieres recibir respuesta y una descripción de lo que solicitas.
        Las consultas se atienden en un plazo máximo de diez (10) días hábiles y los reclamos en un
        máximo de quince (15) días hábiles, prorrogables conforme a la ley.
      </p>

      <h2>8. Conservación</h2>
      <p>
        Los datos se conservan mientras dure la relación comercial y, después, durante el tiempo que
        exijan las obligaciones legales, contables y tributarias aplicables. Cumplido ese plazo se
        eliminan de forma segura.
      </p>

      <h2>9. Seguridad</h2>
      <p>
        El sitio se sirve exclusivamente por HTTPS, aplica una política de seguridad de contenidos
        (CSP) estricta, no almacena datos personales en el navegador salvo tus propias preferencias
        de consentimiento, y no incorpora rastreadores publicitarios. Las comunicaciones por
        WhatsApp están cifradas de extremo a extremo por la propia plataforma.
      </p>

      <h2>10. Encargados y transferencias</h2>
      <p>
        Para operar el sitio se usan proveedores que pueden procesar datos técnicos (como la
        dirección IP) fuera de Colombia:
      </p>
      <ul>
        <li>
          <b>Vercel Inc.</b> — alojamiento del sitio y métricas anónimas.
        </li>
        <li>
          <b>Google LLC</b> — agendamiento de citas, solo si autorizas cargar el calendario.
        </li>
        <li>
          <b>WhatsApp / Meta Platforms</b> — canal de conversación, solo si decides escribir.
        </li>
      </ul>

      <h2>11. Cambios</h2>
      <p>
        Cualquier modificación sustancial de esta política se publicará en esta misma página, con su
        nueva fecha de actualización.
      </p>
    </LegalPage>
  );
}
