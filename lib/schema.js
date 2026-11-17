import { SITE, dictionaries } from "./content";

/* Structured data.

   Only claims that are true of this site are emitted. There is no
   AggregateRating, no Review, no award and no employee count, because none
   of those exist on record — and marking up a rating that was never given
   is exactly the kind of thing that earns a manual action. */

export function organizationSchema(lang = "en") {
  const t = dictionaries[lang] ?? dictionaries.en;
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${SITE.url}/#organization`,
    name: SITE.name,
    url: lang === "de" ? `${SITE.url}/de` : SITE.url,
    description: t.meta.description,
    image: `${SITE.url}/img/f03-1920.webp`,
    inLanguage: lang,
    knowsLanguage: ["en", "de"],
    serviceType: t.services.items.map((s) => s.name),
    areaServed: t.industries.items,
    makesOffer: t.services.items.map((s) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: s.name,
        description: s.body,
      },
    })),
  };
}

export function websiteSchema(lang = "en") {
  const t = dictionaries[lang] ?? dictionaries.en;
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE.url}/#website`,
    url: SITE.url,
    name: SITE.name,
    description: t.meta.description,
    inLanguage: lang,
    publisher: { "@id": `${SITE.url}/#organization` },
  };
}
