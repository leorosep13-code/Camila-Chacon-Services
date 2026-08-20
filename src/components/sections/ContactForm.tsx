"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { contactSection } from "@/content/sections";
import { sanitizeMessageInput, waLink } from "@/lib/whatsapp";

const LIMITS = { nombre: 60, negocio: 80, mensaje: 500 } as const;

type Errors = Partial<Record<"nombre" | "negocio" | "consent", string>>;

/**
 * Formulario que arma un mensaje de WhatsApp con los datos del visitante.
 *
 * Decisiones importantes:
 *  - No se envía nada a ningún servidor: el texto se abre en WhatsApp. Por eso
 *    no hay datos personales almacenados en esta web.
 *  - Aun así se pide autorización expresa del titular (Ley 1581 de 2012), que
 *    es lo que exige la norma colombiana antes de tratar datos personales.
 *  - Todo lo que escribe el visitante pasa por `sanitizeMessageInput` antes de
 *    construir la URL, y los campos tienen tope de longitud.
 */
export function ContactForm() {
  const id = useId();
  const [values, setValues] = useState({
    nombre: "",
    negocio: "",
    area: contactSection.momentOptions[0],
    mensaje: "",
  });
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Errors>({});

  const set = (field: keyof typeof values) => (value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = (): Errors => {
    const next: Errors = {};
    if (values.nombre.trim().length < 2)
      next.nombre = "Escribe tu nombre para saber cómo llamarte.";
    if (values.negocio.trim().length < 2) next.negocio = "Cuéntame el nombre de tu negocio.";
    if (!consent) next.consent = "Necesito tu autorización para tratar estos datos.";
    return next;
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();

    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) {
      const firstField = Object.keys(found)[0];
      document.getElementById(`${id}-${firstField}`)?.focus();
      return;
    }

    const message = [
      `Hola Cami, soy ${sanitizeMessageInput(values.nombre, LIMITS.nombre)}.`,
      `Mi negocio: ${sanitizeMessageInput(values.negocio, LIMITS.negocio)}.`,
      `Mi momento: ${values.area}.`,
      values.mensaje.trim() ? sanitizeMessageInput(values.mensaje, LIMITS.mensaje) : "",
    ]
      .filter(Boolean)
      .join(" ");

    window.open(waLink(message), "_blank", "noopener,noreferrer");
  };

  return (
    <form className="pref__in" onSubmit={submit} noValidate>
      <div className="pref__grid">
        <div className="field">
          <label htmlFor={`${id}-nombre`}>¿Cómo te llamas?</label>
          <input
            id={`${id}-nombre`}
            type="text"
            placeholder="Tu nombre"
            autoComplete="name"
            maxLength={LIMITS.nombre}
            value={values.nombre}
            onChange={(e) => set("nombre")(e.target.value)}
            aria-invalid={Boolean(errors.nombre)}
            aria-describedby={errors.nombre ? `${id}-nombre-err` : undefined}
          />
          {errors.nombre ? (
            <span className="field__err" id={`${id}-nombre-err`} role="alert">
              {errors.nombre}
            </span>
          ) : null}
        </div>

        <div className="field">
          <label htmlFor={`${id}-negocio`}>¿Cuál es tu negocio?</label>
          <input
            id={`${id}-negocio`}
            type="text"
            placeholder="Nombre y a qué se dedica"
            autoComplete="organization"
            maxLength={LIMITS.negocio}
            value={values.negocio}
            onChange={(e) => set("negocio")(e.target.value)}
            aria-invalid={Boolean(errors.negocio)}
            aria-describedby={errors.negocio ? `${id}-negocio-err` : undefined}
          />
          {errors.negocio ? (
            <span className="field__err" id={`${id}-negocio-err`} role="alert">
              {errors.negocio}
            </span>
          ) : null}
        </div>

        <div className="field">
          <label htmlFor={`${id}-area`}>¿En qué momento estás?</label>
          <select
            id={`${id}-area`}
            value={values.area}
            onChange={(e) => set("area")(e.target.value)}
          >
            {contactSection.momentOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </div>

        <div className="field">
          <label htmlFor={`${id}-mensaje`}>
            Cuéntame un poco más
            <span className="field__count">
              {values.mensaje.length}/{LIMITS.mensaje}
            </span>
          </label>
          <textarea
            id={`${id}-mensaje`}
            placeholder="Qué has intentado y qué te gustaría lograr"
            maxLength={LIMITS.mensaje}
            value={values.mensaje}
            onChange={(e) => set("mensaje")(e.target.value)}
          />
        </div>
      </div>

      <label
        className={errors.consent ? "consent consent--err" : "consent"}
        htmlFor={`${id}-consent`}
      >
        <input
          id={`${id}-consent`}
          type="checkbox"
          checked={consent}
          onChange={(e) => {
            setConsent(e.target.checked);
            setErrors((prev) => ({ ...prev, consent: undefined }));
          }}
          aria-invalid={Boolean(errors.consent)}
        />
        <span>
          Autorizo el tratamiento de mis datos personales para ser contactada o contactado, según la{" "}
          <Link href="/privacidad" target="_blank" rel="noopener noreferrer">
            política de privacidad
          </Link>{" "}
          (Ley 1581 de 2012).
          {errors.consent ? <> — {errors.consent}</> : null}
        </span>
      </label>

      <button className="btn btn--morado" type="submit">
        <Icon name="wa" /> Enviar por WhatsApp
      </button>

      <p className="form__legal">
        Al enviar se abre WhatsApp con tu mensaje listo. Nada se guarda en este sitio web: tus datos
        viajan solo dentro de esa conversación.
      </p>
    </form>
  );
}
