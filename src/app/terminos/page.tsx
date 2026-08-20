import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/LegalPage";
import { contact, site } from "@/content/site";

export const metadata: Metadata = {
  title: "Términos y condiciones",
  description:
    "Condiciones de uso del sitio de club by cami y alcance general de los servicios de consultoría en marketing digital.",
  alternates: { canonical: "/terminos" },
};

export default function Terminos() {
  return (
    <LegalPage title="Términos y condiciones de uso" updated="19 de agosto de 2026">
      <p>
        Este sitio es operado por {site.person} (&laquo;{site.name}&raquo;), con domicilio en{" "}
        {site.city}, {site.country}. Al navegarlo aceptas estas condiciones.
      </p>

      <h2>1. Objeto del sitio</h2>
      <p>
        Este sitio tiene una finalidad informativa y comercial: presentar los servicios de
        consultoría en crecimiento digital y comercial, y facilitar el contacto. No es una tienda en
        línea y no procesa pagos.
      </p>

      <h2>2. Precios y cotizaciones</h2>
      <ul>
        <li>
          Los valores publicados están expresados en pesos colombianos (COP) y corresponden a
          precios de referencia vigentes a la fecha de actualización de esta página.
        </li>
        <li>
          Los paquetes que aparecen sin precio se cotizan según el alcance real de cada proyecto:
          tamaño del catálogo, integraciones, número de piezas y nivel de acompañamiento.
        </li>
        <li>
          Una cotización solo es vinculante cuando se entrega por escrito, con alcance, plazos y
          condiciones detalladas, y es aceptada por el cliente.
        </li>
        <li>
          La gestión de campañas publicitarias <b>no incluye</b> el presupuesto de pauta, que el
          cliente paga directamente a la plataforma correspondiente.
        </li>
      </ul>

      <h2>3. Alcance de los servicios</h2>
      <p>
        Cada servicio se presta con la diligencia propia de una consultoría profesional. Se acuerda
        por escrito qué incluye y qué no antes de iniciar. En particular:
      </p>
      <ul>
        <li>
          El servicio de estrategia de contenido comprende dirección, calendario y guiones; no
          incluye grabación ni edición audiovisual.
        </li>
        <li>
          Cuando un proyecto requiere producción, desarrollo u otras especialidades, el trabajo se
          coordina con aliados y se informa al cliente.
        </li>
      </ul>

      <h2>4. Resultados</h2>
      <p>
        El marketing digital depende de factores que no están bajo control exclusivo de la
        consultora: el mercado, el producto, el precio, la operación del cliente y las políticas
        cambiantes de cada plataforma. Por eso se trabaja sobre <b>metas medibles y acordadas</b>,
        pero <b>no se garantizan cifras específicas de ventas</b>. Cualquier proyección compartida
        es una estimación, no una promesa contractual.
      </p>

      <h2>5. Diagnóstico gratuito</h2>
      <p>
        La sesión de diagnóstico de 30 minutos es gratuita, no genera obligación para ninguna de las
        partes y su disponibilidad depende de la agenda de la consultora.
      </p>

      <h2>6. Propiedad intelectual</h2>
      <p>
        El diseño, los textos, la marca &laquo;{site.name}&raquo; y los materiales de este sitio son
        propiedad de su titular. Los entregables de cada proyecto (calendarios, guiones, piezas,
        tiendas, dashboards) se ceden al cliente en los términos que fije el acuerdo comercial
        correspondiente, una vez pagado el servicio.
      </p>

      <h2>7. Enlaces y servicios de terceros</h2>
      <p>
        El sitio enlaza a servicios de terceros (WhatsApp, Instagram, Google Calendar). El uso de
        esos servicios se rige por sus propias condiciones y políticas de privacidad, sobre las que
        {site.name} no tiene control.
      </p>

      <h2>8. Disponibilidad</h2>
      <p>
        Se procura que el sitio esté disponible de forma continua, pero puede haber interrupciones
        por mantenimiento o por causas atribuibles al proveedor de alojamiento. No se garantiza
        disponibilidad ininterrumpida.
      </p>

      <h2>9. Ley aplicable</h2>
      <p>
        Estas condiciones se rigen por la legislación colombiana. Cualquier controversia se someterá
        a los jueces competentes de la República de Colombia.
      </p>

      <h2>10. Contacto</h2>
      <p>
        Para cualquier consulta sobre estos términos escribe a{" "}
        <a href={contact.emailHref}>{contact.email}</a> o al {contact.phoneDisplay}.
      </p>
    </LegalPage>
  );
}
