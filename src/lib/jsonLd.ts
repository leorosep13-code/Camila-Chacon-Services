import { contact, site } from "@/content/site";
import { packs, services } from "@/content/sections";

/**
 * Datos estructurados (schema.org).
 *
 * Es lo que permite que Google muestre el negocio con su teléfono, su ciudad
 * y sus servicios, y lo que alimenta las fichas de conocimiento. Se genera a
 * partir del mismo contenido de la página, así que nunca queda desfasado.
 */
export function buildJsonLd() {
  const professionalService = {
    "@type": "ProfessionalService",
    "@id": `${site.url}/#negocio`,
    name: site.name,
    alternateName: site.person,
    description: site.description,
    url: site.url,
    telephone: `+${contact.whatsappNumber}`,
    email: contact.email,
    image: `${site.url}/opengraph-image`,
    priceRange: "$$",
    areaServed: [
      { "@type": "Country", name: "Colombia" },
      { "@type": "City", name: site.city },
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: site.city,
      addressRegion: site.region,
      addressCountry: "CO",
    },
    sameAs: [contact.instagramUrl],
    founder: { "@id": `${site.url}/#persona` },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Servicios de marketing digital",
      itemListElement: services.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.title,
          description: service.text,
        },
      })),
    },
    makesOffer: packs.map((pack) => ({
      "@type": "Offer",
      name: pack.title,
      description: pack.audience,
      priceCurrency: "COP",
      availability: "https://schema.org/InStock",
    })),
  };

  const person = {
    "@type": "Person",
    "@id": `${site.url}/#persona`,
    name: site.person,
    jobTitle: site.role,
    url: site.url,
    email: contact.email,
    telephone: `+${contact.whatsappNumber}`,
    worksFor: { "@id": `${site.url}/#negocio` },
    sameAs: [contact.instagramUrl],
    knowsAbout: [
      "Marketing digital",
      "E-commerce",
      "Marketplaces",
      "Publicidad digital",
      "Analítica de datos",
      "Estrategia de contenido",
    ],
  };

  const website = {
    "@type": "WebSite",
    "@id": `${site.url}/#sitio`,
    url: site.url,
    name: site.name,
    inLanguage: "es-CO",
    publisher: { "@id": `${site.url}/#negocio` },
  };

  return { "@context": "https://schema.org", "@graph": [professionalService, person, website] };
}
