import { Nav, Footer } from "./Chrome";

const NOTICE = {
  en: "Draft. Every value marked in square brackets must be completed and legally reviewed before this site goes public.",
  de: "Entwurf. Alle in eckigen Klammern markierten Angaben müssen vor Veröffentlichung ergänzt und rechtlich geprüft werden.",
  uk: "Чернетка. Усі значення у квадратних дужках потрібно заповнити та юридично перевірити до публікації сайту.",
};

export default function LegalPage({ t, doc }) {
  return (
    <>
      <a className="skip-link" href="#main">
        {t.nav.skip}
      </a>
      <Nav t={t} />
      <main id="main" className="legal">
        <div className="shell">
          <h1 className="legal__title">{doc.title}</h1>
          <p className="legal__lede">{doc.lede}</p>

          <p className="legal__notice" role="note">
            {NOTICE[t.lang] ?? NOTICE.en}
          </p>

          <div className="legal__body">
            {doc.body.map((section) => (
              <section key={section.h}>
                <h2>{section.h}</h2>
                <div>
                  {section.p.map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </main>
      <Footer t={t} />
    </>
  );
}
