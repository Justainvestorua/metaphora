import { SITE, LEGAL_ROUTES, locales } from "@/lib/content";

const LABEL = { en: "EN", de: "DE", uk: "UK" };

export function Nav({ t }) {
  const home = `/${t.lang}`;
  return (
    <header className="nav">
      <a className="nav__brand" href={home}>
        {SITE.name}
      </a>

      <nav aria-label={t.nav.menu}>
        <ul className="nav__links">
          <li>
            <a href="#work">{t.nav.work}</a>
          </li>
          <li>
            <a href="#services">{t.nav.services}</a>
          </li>
          <li>
            <a href="#inquiry">{t.nav.contact}</a>
          </li>
        </ul>
      </nav>

      <div className="nav__lang">
        <span className="sr-only">{t.nav.language}</span>
        {locales.map((code, i) => (
          <span key={code}>
            {i > 0 && <span aria-hidden="true">/</span>}
            <a
              href={`/${code}`}
              hrefLang={code}
              aria-current={code === t.lang ? "true" : undefined}
            >
              {LABEL[code]}
            </a>
          </span>
        ))}
      </div>
    </header>
  );
}

export function Footer({ t }) {
  const year = new Date().getFullYear();
  const r = LEGAL_ROUTES[t.lang] ?? LEGAL_ROUTES.en;
  return (
    <footer className="footer">
      <div className="shell footer__grid">
        <ul className="footer__links">
          <li>
            <a href={r.privacy}>{t.footer.privacy}</a>
          </li>
          <li>
            <a href={r.terms}>{t.footer.legal}</a>
          </li>
          <li>
            <a href={r.impressum}>{t.footer.impressum}</a>
          </li>
        </ul>
        <p className="footer__meta" data-nums>
          © {year} {SITE.domain} — {t.footer.rights}
        </p>
      </div>
    </footer>
  );
}
