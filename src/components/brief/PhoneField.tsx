"use client";

import { useState } from "react";
import {
  countries,
  defaultCountry,
  findCountryByDial,
  type CountryWithFlag,
} from "@/lib/brief/countries";

interface PhoneFieldProps {
  id: string;
  label: string;
  placeholder?: string;
  requerido?: boolean;
  /** Valor final ya combinado: "+<código><número>", sin espacios. */
  value: string;
  error?: string;
  onChange: (value: string) => void;
}

/** Separa "+573045673052" en { country: Colombia, local: "3045673052" }. */
function splitPhone(value: string): { country: CountryWithFlag; local: string } {
  const digits = value.replace(/^\+/, "");
  if (!digits) return { country: defaultCountry, local: "" };
  const country = findCountryByDial(digits) ?? defaultCountry;
  return { country, local: digits.slice(country.dial.length) };
}

/**
 * WhatsApp con selector de país (bandera + código) separado del número
 * local. Al dividir el código de país del número, ya no es posible olvidar
 * el "+57" delante — que es, con diferencia, el error más común al llenar
 * este campo a mano.
 */
export function PhoneField({
  id,
  label,
  placeholder,
  requerido,
  value,
  error,
  onChange,
}: PhoneFieldProps) {
  const initial = splitPhone(value);
  const [country, setCountry] = useState(initial.country);
  const [local, setLocal] = useState(initial.local);
  const errId = error ? `${id}-err` : undefined;

  function commit(nextCountry: CountryWithFlag, nextLocal: string) {
    setCountry(nextCountry);
    setLocal(nextLocal);
    onChange(nextLocal ? `+${nextCountry.dial}${nextLocal}` : "");
  }

  return (
    <div className="field" id={id}>
      <label htmlFor={`${id}-local`}>
        {label}
        {requerido ? " *" : ""}
      </label>
      <div className="phone-row">
        <select
          className="phone-country"
          aria-label="Código de país"
          value={country.iso2}
          onChange={(e) => {
            const next = countries.find((c) => c.iso2 === e.target.value) ?? defaultCountry;
            commit(next, local);
          }}
        >
          {countries.map((c) => (
            <option key={c.iso2} value={c.iso2}>
              {c.flag} +{c.dial} {c.name}
            </option>
          ))}
        </select>
        <input
          id={`${id}-local`}
          type="tel"
          inputMode="numeric"
          autoComplete="tel-national"
          placeholder={placeholder}
          value={local}
          onChange={(e) => commit(country, e.target.value.replace(/\D/g, ""))}
          aria-invalid={Boolean(error)}
          aria-describedby={errId}
        />
      </div>
      {error ? (
        <span className="field__err" id={errId} role="alert">
          {error}
        </span>
      ) : null}
    </div>
  );
}
