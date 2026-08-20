"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { contact, site } from "@/content/site";

type Done = "correo" | "telefono" | "compartir" | null;

/**
 * Accesos rápidos de contacto.
 *
 * La idea es quitar fricción: copiar el correo o el teléfono sin seleccionarlos
 * a mano, guardar el contacto en la agenda del móvil (.vcf) y compartir la
 * página con quien tenga que aprobar la decisión.
 *
 * Todo son mejoras progresivas: si el navegador no soporta portapapeles o
 * Web Share, el botón simplemente no aparece o cae en el comportamiento
 * clásico de "abrir enlace".
 */
export function QuickContact() {
  const [done, setDone] = useState<Done>(null);

  const copy = async (text: string, key: Exclude<Done, null>) => {
    try {
      await navigator.clipboard.writeText(text);
      setDone(key);
      window.setTimeout(() => setDone(null), 2000);
    } catch {
      // Sin permiso de portapapeles: se abre el enlace nativo como respaldo.
      window.location.href = key === "correo" ? contact.emailHref : contact.phoneHref;
    }
  };

  const share = async () => {
    const data = {
      title: site.title,
      text: `${site.person} — ${site.role}`,
      url: site.url,
    };

    if (typeof navigator !== "undefined" && "share" in navigator) {
      try {
        await navigator.share(data);
        return;
      } catch {
        // El visitante canceló: no hace falta hacer nada.
        return;
      }
    }
    void copy(site.url, "compartir");
  };

  return (
    <div className="quick">
      <button
        className={cls(done === "correo")}
        type="button"
        onClick={() => copy(contact.email, "correo")}
      >
        <Icon name={done === "correo" ? "check" : "copy"} />
        {done === "correo" ? "Correo copiado" : "Copiar correo"}
      </button>

      <button
        className={cls(done === "telefono")}
        type="button"
        onClick={() => copy(contact.phoneDisplay, "telefono")}
      >
        <Icon name={done === "telefono" ? "check" : "phone"} />
        {done === "telefono" ? "Número copiado" : "Copiar teléfono"}
      </button>

      <a className="quick__b" href="/api/vcard" download="camila-chacon.vcf">
        <Icon name="download" />
        Guardar contacto
      </a>

      <button className={cls(done === "compartir")} type="button" onClick={share}>
        <Icon name={done === "compartir" ? "check" : "share"} />
        {done === "compartir" ? "Enlace copiado" : "Compartir"}
      </button>
    </div>
  );
}

function cls(active: boolean) {
  return active ? "quick__b is-done" : "quick__b";
}
