"use client";

import { useState } from "react";
import type { Question } from "@/lib/brief/questions";
import { PhoneField } from "./PhoneField";

export type Value = string | string[] | number | undefined;

interface QuestionFieldProps {
  /** Id estable derivado de `question.id` (lo asigna BriefForm) — se usa para
   *  llevar el foco/scroll al primer campo con error al fallar la validación. */
  id: string;
  question: Question;
  value: Value;
  error?: string;
  onChange: (value: Value) => void;
}

/** Si el valor guardado es "Otro: <texto>", separa la etiqueta del texto. */
function splitOtro(value: string): { seleccion: string; texto: string } {
  const match = /^Otro: (.*)$/.exec(value);
  return match ? { seleccion: "Otro", texto: match[1] ?? "" } : { seleccion: value, texto: "" };
}

/**
 * Despacha el control correcto según `question.tipo` y aplica las reglas que
 * no puede expresar el esquema por sí solo: la expansión de texto de
 * "Otro", el tope de casillas marcadas y las opciones excluyentes
 * ("Nada todavía" desmarca el resto, y viceversa).
 */
export function QuestionField({ id, question, value, error, onChange }: QuestionFieldProps) {
  const errId = error ? `${id}-err` : undefined;

  if (question.tipo === "texto") {
    if (question.validar === "whatsapp") {
      return (
        <PhoneField
          id={id}
          label={question.pregunta}
          placeholder={question.placeholder}
          requerido={question.requerido}
          value={(value as string) ?? ""}
          error={error}
          onChange={onChange}
        />
      );
    }
    return (
      <div className="field">
        <label htmlFor={id}>
          {question.pregunta}
          {question.requerido ? " *" : ""}
        </label>
        <input
          id={id}
          type="text"
          placeholder={question.placeholder}
          value={(value as string) ?? ""}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={Boolean(error)}
          aria-describedby={errId}
        />
        {error ? (
          <span className="field__err" id={errId} role="alert">
            {error}
          </span>
        ) : null}
      </div>
    );
  }

  if (question.tipo === "parrafo") {
    return (
      <div className="field">
        <label htmlFor={id}>
          {question.pregunta}
          {question.requerido ? " *" : ""}
        </label>
        <textarea
          id={id}
          value={(value as string) ?? ""}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={Boolean(error)}
          aria-describedby={errId}
        />
        {error ? (
          <span className="field__err" id={errId} role="alert">
            {error}
          </span>
        ) : null}
      </div>
    );
  }

  if (question.tipo === "opcion") {
    return (
      <OpcionField
        id={id}
        question={question}
        value={(value as string) ?? ""}
        error={error}
        onChange={onChange}
      />
    );
  }

  if (question.tipo === "casillas") {
    return (
      <CasillasField
        id={id}
        question={question}
        value={(value as string[]) ?? []}
        error={error}
        onChange={onChange}
      />
    );
  }

  return (
    <EscalaField
      id={id}
      question={question}
      value={value as number | undefined}
      error={error}
      onChange={onChange}
    />
  );
}

function OpcionField({
  id,
  question,
  value,
  error,
  onChange,
}: {
  id: string;
  question: Extract<Question, { tipo: "opcion" }>;
  value: string;
  error?: string;
  onChange: (value: string) => void;
}) {
  const initial = splitOtro(value);
  const [seleccion, setSeleccion] = useState(initial.seleccion);
  const [otroTexto, setOtroTexto] = useState(initial.texto);
  const errId = error ? `${id}-err` : undefined;

  return (
    <fieldset id={id} className="field field--chips">
      <legend>
        {question.pregunta}
        {question.requerido ? " *" : ""}
      </legend>
      <div className="chip-grid" role="radiogroup" aria-describedby={errId}>
        {question.opciones.map((opcion) => (
          <label key={opcion} className={seleccion === opcion ? "chip chip--sel" : "chip"}>
            <input
              type="radio"
              name={id}
              value={opcion}
              checked={seleccion === opcion}
              onChange={() => {
                setSeleccion(opcion);
                onChange(
                  opcion === "Otro" ? (otroTexto.trim() ? `Otro: ${otroTexto}` : "") : opcion,
                );
              }}
            />
            {opcion}
          </label>
        ))}
      </div>
      {seleccion === "Otro" ? (
        <input
          type="text"
          className="chip-otro"
          placeholder="Especifica…"
          value={otroTexto}
          onChange={(e) => {
            setOtroTexto(e.target.value);
            onChange(e.target.value.trim() ? `Otro: ${e.target.value}` : "");
          }}
        />
      ) : null}
      {error ? (
        <span className="field__err" id={errId} role="alert">
          {error}
        </span>
      ) : null}
    </fieldset>
  );
}

function CasillasField({
  id,
  question,
  value,
  error,
  onChange,
}: {
  id: string;
  question: Extract<Question, { tipo: "casillas" }>;
  value: string[];
  error?: string;
  onChange: (value: string[]) => void;
}) {
  // Estado local: qué etiquetas están marcadas (incluida "Otro" como tal),
  // separado del texto libre de "Otro". El valor que sube al padre ya viene
  // resuelto ("Otro: <texto>"), así que se reconstruye la selección visual a
  // partir de él una sola vez, al montar.
  const initialOtro = value.find((v) => v.startsWith("Otro: "));
  const [seleccion, setSeleccion] = useState<string[]>(() =>
    value.map((v) => (v.startsWith("Otro: ") ? "Otro" : v)),
  );
  const [otroTexto, setOtroTexto] = useState(initialOtro ? initialOtro.replace(/^Otro: /, "") : "");
  const errId = error ? `${id}-err` : undefined;

  const limite = question.exactamente ?? question.maximo;
  const enLimite = limite !== undefined && seleccion.length >= limite;

  function commit(next: string[]) {
    setSeleccion(next);
    const resuelto = next
      .map((opcion) => {
        if (opcion !== "Otro") return opcion;
        return otroTexto.trim() ? `Otro: ${otroTexto}` : null;
      })
      .filter((v): v is string => v !== null);
    onChange(resuelto);
  }

  function toggle(opcion: string) {
    const marcado = seleccion.includes(opcion);

    if (!marcado && opcion === question.excluyente) {
      commit([opcion]);
      return;
    }
    if (!marcado && question.excluyente && seleccion.includes(question.excluyente)) {
      commit([opcion]);
      return;
    }
    if (marcado) {
      commit(seleccion.filter((o) => o !== opcion));
      return;
    }
    if (limite !== undefined && seleccion.length >= limite) return;
    commit([...seleccion, opcion]);
  }

  return (
    <fieldset id={id} className="field field--chips">
      <legend>
        {question.pregunta}
        {question.requerido ? " *" : ""}
      </legend>
      {limite !== undefined ? (
        <p className="chip-count">
          {seleccion.length} de {limite}
        </p>
      ) : null}
      <div className="chip-grid" aria-describedby={errId}>
        {question.opciones.map((opcion) => {
          const marcado = seleccion.includes(opcion);
          const deshabilitado = !marcado && enLimite;
          return (
            <label
              key={opcion}
              className={
                marcado ? "chip chip--sel" : deshabilitado ? "chip chip--disabled" : "chip"
              }
            >
              <input
                type="checkbox"
                checked={marcado}
                disabled={deshabilitado}
                onChange={() => toggle(opcion)}
              />
              {opcion}
            </label>
          );
        })}
      </div>
      {seleccion.includes("Otro") ? (
        <input
          type="text"
          className="chip-otro"
          placeholder="Especifica…"
          value={otroTexto}
          onChange={(e) => {
            setOtroTexto(e.target.value);
            const resuelto = seleccion
              .map((opcion) => {
                if (opcion !== "Otro") return opcion;
                return e.target.value.trim() ? `Otro: ${e.target.value}` : null;
              })
              .filter((v): v is string => v !== null);
            onChange(resuelto);
          }}
        />
      ) : null}
      {error ? (
        <span className="field__err" id={errId} role="alert">
          {error}
        </span>
      ) : null}
    </fieldset>
  );
}

function EscalaField({
  id,
  question,
  value,
  error,
  onChange,
}: {
  id: string;
  question: Extract<Question, { tipo: "escala" }>;
  value: number | undefined;
  error?: string;
  onChange: (value: number) => void;
}) {
  const errId = error ? `${id}-err` : undefined;
  return (
    <fieldset id={id} className="field field--escala">
      <legend>
        {question.pregunta}
        {question.requerido ? " *" : ""}
      </legend>
      <div className="escala" aria-describedby={errId}>
        <span className="escala__etiqueta">{question.etiquetaMin}</span>
        <div className="escala__botones" role="radiogroup">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              className={value === n ? "escala__btn escala__btn--sel" : "escala__btn"}
              aria-pressed={value === n}
              onClick={() => onChange(n)}
            >
              {n}
            </button>
          ))}
        </div>
        <span className="escala__etiqueta">{question.etiquetaMax}</span>
      </div>
      {error ? (
        <span className="field__err" id={errId} role="alert">
          {error}
        </span>
      ) : null}
    </fieldset>
  );
}
