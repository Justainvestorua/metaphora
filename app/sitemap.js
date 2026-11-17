import { SITE, locales, defaultLocale } from "@/lib/content";

/* Statutory pages are excluded on purpose: they are noindex while they still
   contain bracketed placeholders. Add them once the real details are filled
   in and the robots directive on those routes is removed. */

export default function sitemap() {
  const now = new Date();
  const languages = Object.fromEntries(
    locales.map((code) => [code, `${SITE.url}/${code}`])
  );
  languages["x-default"] = `${SITE.url}/${defaultLocale}`;

  return locales.map((code) => ({
    url: `${SITE.url}/${code}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: code === defaultLocale ? 1 : 0.9,
    alternates: { languages },
  }));
}
