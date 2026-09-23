"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { clearDraft, readDraft, writeDraft } from "@/lib/brief/draft";
import { briefSections } from "@/lib/brief/questions";
import { fieldSchemas, type BriefAnswers } from "@/lib/brief/schema";
import { QuestionField, type Value } from "./QuestionField";

type Status = "idle" | "submitting" | "success" | "error";

const TOTAL = briefSections.length;

function validateSection(index: number, answers: BriefAnswers): Record<string, string> {
  const errores: Record<string, string> = {};
  const seccion = briefSections[index];
  if (!seccion) return errores;

  for (const pregunta of seccion.preguntas) {
    const schema = fieldSchemas[pregunta.id];
    if (!schema) continue;
    const valorPorDefecto = pregunta.tipo === "casillas" ? [] : "";
    const resultado = schema.safeParse(answers[pregunta.id] ?? valorPorDefecto);
    if (!resultado.success) {
      errores[pregunta.id] = resultado.error.issues[0]?.message ?? "Revisa este campo.";
    }
  }
  return errores;
}

function focusFirstError(errores: Record<string, string>) {
  const primerId = Object.keys(errores)[0];
  if (!primerId) return;
  const el = document.getElementById(`q-${primerId}`);
  el?.scrollIntoView({ behavior: "smooth", block: "center" });
  if (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement) {
    el.focus();
  } else {
    el?.querySelector<HTMLElement>("input, button, textarea")?.focus();
  }
}

/**
 * Formulario de 12 pasos de `/brief`. El contenido y las reglas vienen de
 * `lib/brief/questions.ts` y `lib/brief/schema.ts` — este componente solo
 * orquesta navegación, borrador y envío.
 */
export function BriefForm() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<BriefAnswers>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [restored, setRestored] = useState(false);
  const [consent, setConsent] = useState(false);
  const [consentError, setConsentError] = useState<string | null>(null);
  const doneRef = useRef<HTMLDivElement>(null);

  // El borrador se lee una sola vez, después de montar: en el servidor no
  // hay localStorage, así que leerlo antes causaría un desajuste de
  // hidratación. Ver `lib/brief/draft.ts`. Es la excepción que reconoce la
  // propia documentación de React ("inicializar el estado desde un sistema
  // externo que no existe durante el render"), por eso se silencia el aviso
  // de la regla en vez de reestructurarlo.
  /* eslint-disable react-hooks/set-state-in-effect -- lectura única de
     localStorage al montar; no hay forma de sincronizarla durante el render
     porque en el servidor no existe `window`. */
  useEffect(() => {
    const draft = readDraft();
    if (draft) {
      setAnswers(draft.respuestas);
      setStep(Math.min(Math.max(draft.paso, 0), TOTAL - 1));
    }
    setRestored(true);
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  useEffect(() => {
    if (!restored || status === "success") return;
    writeDraft({ paso: step, respuestas: answers });
  }, [step, answers, restored, status]);

  // El formulario se reemplaza por un bloque mucho más corto al terminar:
  // sin esto, la persona queda con el scroll donde estaba y ve el pie de
  // página en vez del mensaje de confirmación.
  useEffect(() => {
    if (status === "success") doneRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [status]);

  function setAnswer(id: string, value: Value) {
    setAnswers((prev) => ({ ...prev, [id]: value }));
    setErrors((prev) => {
      if (!(id in prev)) return prev;
      const next = { ...prev };
      delete next[id];
      return next;
    });
  }

  function goNext() {
    const errores = validateSection(step, answers);
    setErrors(errores);
    if (Object.keys(errores).length > 0) {
      focusFirstError(errores);
      return;
    }
    setStep((s) => Math.min(s + 1, TOTAL - 1));
  }

  function goBack() {
    setErrors({});
    setStep((s) => Math.max(s - 1, 0));
  }

  async function submit(e: FormEvent) {
    e.preventDefault();

    // Red de seguridad: valida TODO el formulario, no solo el paso actual,
    // por si el borrador restaurado dejó huecos en un paso anterior.
    let errores: Record<string, string> = {};
    for (let i = 0; i < TOTAL; i++) errores = { ...errores, ...validateSection(i, answers) };

    if (Object.keys(errores).length > 0) {
      const primerId = Object.keys(errores)[0];
      const seccion = briefSections.findIndex((s) => s.preguntas.some((q) => q.id === primerId));
      setErrors(errores);
      setStep(seccion === -1 ? 0 : seccion);
      requestAnimationFrame(() => focusFirstError(errores));
      return;
    }

    if (!consent) {
      setConsentError("Necesito tu autorización para tratar estos datos.");
      setStep(TOTAL - 1);
      requestAnimationFrame(() => {
        document.getElementById("brief-consent")?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      });
      return;
    }

    setStatus("submitting");
    setSubmitError(null);
    try {
      const res = await fetch("/api/brief", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ respuestas: answers, honeypot }),
      });
      const data: unknown = await res.json().catch(() => null);
      const ok = res.ok && Boolean((data as { ok?: boolean } | null)?.ok);
      if (!ok) {
        setStatus("error");
        setSubmitError(
          "No pudimos enviar tu brief. Tus respuestas están a salvo: intenta otra vez.",
        );
        return;
      }
      setStatus("success");
      clearDraft();
    } catch {
      setStatus("error");
      setSubmitError("Parece que no hay conexión. Tus respuestas están a salvo: intenta otra vez.");
    }
  }

  if (status === "success") {
    return (
      <div className="brief-done" ref={doneRef}>
        <p className="brief-done__emoji" aria-hidden="true">
          🎉
        </p>
        <h2>¡Gracias!</h2>
        <p>
          Recibirás tu propuesta en máximo 3 días hábiles. Te escribiré por WhatsApp para confirmar
          tu reunión.
        </p>
      </div>
    );
  }

  // El paso siempre está entre 0 y TOTAL-1 (ver goNext/goBack/useEffect de
  // restauración), pero `noUncheckedIndexedAccess` no puede probarlo.
  const seccion = briefSections[step] ?? briefSections[0]!;
  const progreso = Math.round(((step + 1) / TOTAL) * 100);
  const esUltimoPaso = step === TOTAL - 1;

  return (
    <form className="brief-form" onSubmit={submit} noValidate>
      <div
        className="brief-progress"
        role="progressbar"
        aria-valuenow={step + 1}
        aria-valuemin={1}
        aria-valuemax={TOTAL}
      >
        <div className="brief-progress__track">
          <div className="brief-progress__fill" style={{ width: `${progreso}%` }} />
        </div>
        <span className="brief-progress__label">
          Paso {step + 1} de {TOTAL}
        </span>
      </div>

      {/* Honeypot: invisible para una persona, tentador para un bot. Si viene
         lleno, el servidor responde éxito sin guardar nada. */}
      <input
        type="text"
        name="pagina_web"
        className="brief-hp"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
      />

      <fieldset className="brief-section">
        <legend className="brief-section__titulo">{seccion.titulo}</legend>
        {seccion.ayuda ? <p className="brief-section__ayuda">{seccion.ayuda}</p> : null}

        {seccion.preguntas.map((pregunta) => (
          <QuestionField
            key={pregunta.id}
            id={`q-${pregunta.id}`}
            question={pregunta}
            value={answers[pregunta.id]}
            error={errors[pregunta.id]}
            onChange={(value) => setAnswer(pregunta.id, value)}
          />
        ))}
      </fieldset>

      {esUltimoPaso ? (
        <label
          className={consentError ? "consent consent--err" : "consent"}
          htmlFor="brief-consent"
        >
          <input
            id="brief-consent"
            type="checkbox"
            checked={consent}
            onChange={(e) => {
              setConsent(e.target.checked);
              setConsentError(null);
            }}
            aria-invalid={Boolean(consentError)}
          />
          <span>
            Autorizo el tratamiento de mis datos personales para elaborar mi diagnóstico y propuesta
            de estrategia, según la{" "}
            <Link href="/privacidad" target="_blank" rel="noopener noreferrer">
              política de privacidad
            </Link>{" "}
            (Ley 1581 de 2012).
            {consentError ? <> — {consentError}</> : null}
          </span>
        </label>
      ) : null}

      {status === "error" && submitError ? (
        <p className="field__err brief-form__err" role="alert">
          {submitError}
        </p>
      ) : null}

      <div className="brief-nav">
        <button
          type="button"
          className="btn btn--linea"
          onClick={goBack}
          disabled={step === 0 || status === "submitting"}
        >
          Atrás
        </button>
        {esUltimoPaso ? (
          <button type="submit" className="btn btn--morado" disabled={status === "submitting"}>
            {status === "submitting" ? "Enviando…" : "Enviar mi brief"}
          </button>
        ) : (
          <button
            type="button"
            className="btn btn--morado"
            onClick={goNext}
            disabled={status === "submitting"}
          >
            Siguiente
          </button>
        )}
      </div>
    </form>
  );
}
