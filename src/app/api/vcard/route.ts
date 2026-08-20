import { contact, site } from "@/content/site";

/**
 * Tarjeta de contacto (.vcf) para guardar a Camila en la agenda del móvil.
 *
 * Se genera desde las mismas variables de entorno que el resto del sitio, así
 * que cambiar el teléfono en Vercel actualiza también este archivo.
 *
 * Es una ruta estática: no recibe ni procesa nada del visitante, por lo que no
 * hay superficie de ataque. Solo responde a GET.
 */
export const dynamic = "force-static";

/** En vCard, las comas, puntos y coma y barras invertidas van escapadas. */
function escapeVCard(value: string): string {
  return value.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,");
}

export function GET() {
  const lines = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `N:${escapeVCard("Chacón")};${escapeVCard("Camila")};;;`,
    `FN:${escapeVCard(site.person)}`,
    `ORG:${escapeVCard(site.name)}`,
    `TITLE:${escapeVCard(site.role)}`,
    `TEL;TYPE=CELL,VOICE:+${contact.whatsappNumber}`,
    `EMAIL;TYPE=INTERNET,WORK:${contact.email}`,
    `URL:${site.url}`,
    `ADR;TYPE=WORK:;;;${escapeVCard(site.city)};${escapeVCard(site.region)};;${escapeVCard(site.country)}`,
    `NOTE:${escapeVCard(site.description)}`,
    `X-SOCIALPROFILE;TYPE=instagram:${contact.instagramUrl}`,
    "END:VCARD",
  ];

  // CRLF: es lo que exige la especificación de vCard (RFC 6350).
  const body = `${lines.join("\r\n")}\r\n`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/vcard; charset=utf-8",
      "Content-Disposition": 'attachment; filename="camila-chacon.vcf"',
      "Cache-Control": "public, max-age=86400",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
