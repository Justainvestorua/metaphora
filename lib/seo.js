import { SITE, locales, defaultLocale } from "./content";

/**
 * Every locale declares the full alternate set, including itself, plus an
 * x-default pointing at the default locale. Each language gets its own
 * canonical URL so the three versions index separately instead of competing.
 */
export function alternatesFor(lang, path = "") {
  const languages = {};
  for (const code of locales) {
    languages[code] = `${SITE.url}/${code}${path}`;
  }
  languages["x-default"] = `${SITE.url}/${defaultLocale}${path}`;

  return {
    canonical: `${SITE.url}/${lang}${path}`,
    languages,
  };
}
