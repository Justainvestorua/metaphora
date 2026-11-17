/* Statutory pages.

   These are scaffolds, not legal text. The studio's registered details were
   not provided, and inventing a company address, register number or VAT ID
   would be worse than an obvious gap — in the German-speaking market an
   incorrect Impressum is itself an offence.

   Every [BRACKETED] value below is a required entry. Replace them all before
   this site goes public, and have the finished text reviewed by a lawyer.

   Multi-line values are arrays of lines rather than escaped strings, so a
   stray newline can never break the module. */

export const NEEDS_REVIEW = true;

export const legal = {
  en: {
    privacy: {
      slug: "privacy",
      title: "Privacy",
      lede: "How this site handles personal data.",
      body: [
        {
          h: "What we collect",
          p: [
            "The project inquiry form collects the name, company, email address, project description and message you choose to send us. Nothing else on this site collects personal data. There are no analytics cookies, no advertising trackers and no third-party embeds.",
          ],
        },
        {
          h: "Why we hold it",
          p: [
            "We use your details solely to answer your inquiry and, if we go on to work together, to administer that engagement. We do not sell, rent or share your data with third parties for marketing.",
          ],
        },
        {
          h: "How long we keep it",
          p: [
            "Inquiries that do not lead to an engagement are deleted after [RETENTION PERIOD]. Records connected to an engagement are retained for the statutory period that applies to business correspondence.",
          ],
        },
        {
          h: "Your rights",
          p: [
            "You may request access to, correction of, or deletion of your data, and you may object to its processing. Write to [DATA PROTECTION CONTACT EMAIL]. You also have the right to complain to a supervisory authority.",
          ],
        },
        {
          h: "Controller",
          p: ["[LEGAL ENTITY NAME], [FULL POSTAL ADDRESS]. Contact: [CONTACT EMAIL]."],
        },
      ],
    },
    impressum: {
      slug: "impressum",
      title: "Impressum",
      lede: "Provider identification.",
      body: [
        {
          h: "Provider",
          p: ["[LEGAL ENTITY NAME]", "[STREET AND NUMBER]", "[POSTCODE AND CITY]", "[COUNTRY]"],
        },
        { h: "Represented by", p: ["[NAME OF MANAGING DIRECTOR OR OWNER]"] },
        { h: "Contact", p: ["Email: [CONTACT EMAIL]", "Telephone: [TELEPHONE NUMBER]"] },
        {
          h: "Register",
          p: [
            "Commercial register: [REGISTER COURT]",
            "Registration number: [HRB NUMBER]",
            "VAT identification number: [VAT ID]",
          ],
        },
        {
          h: "Responsible for content",
          p: ["[NAME], [ADDRESS] — responsible for editorial content under the applicable media law."],
        },
        {
          h: "Dispute resolution",
          p: [
            "We are neither obliged nor willing to participate in dispute resolution proceedings before a consumer arbitration board.",
          ],
        },
      ],
    },
    terms: {
      slug: "legal",
      title: "Legal",
      lede: "Terms of use for this website.",
      body: [
        {
          h: "Content",
          p: [
            "We compile the content of this site with care but give no warranty as to its accuracy, completeness or timeliness.",
          ],
        },
        {
          h: "Links",
          p: [
            "Our site links to external sites over whose content we have no control. Responsibility for that content rests with the respective operator.",
          ],
        },
        {
          h: "Copyright",
          p: [
            "The content and works on this site are subject to copyright. Reproduction, adaptation or distribution outside the limits of copyright law requires our written consent.",
          ],
        },
        { h: "Governing law", p: ["[GOVERNING LAW AND PLACE OF JURISDICTION]."] },
      ],
    },
  },

  de: {
    privacy: {
      slug: "datenschutz",
      title: "Datenschutz",
      lede: "Wie diese Website mit personenbezogenen Daten umgeht.",
      body: [
        {
          h: "Was wir erheben",
          p: [
            "Das Anfrageformular erhebt Name, Unternehmen, E-Mail-Adresse, Projektbeschreibung und Nachricht, soweit Sie diese angeben. Darüber hinaus erhebt diese Website keine personenbezogenen Daten. Es gibt keine Analyse-Cookies, keine Werbe-Tracker und keine Einbindungen Dritter.",
          ],
        },
        {
          h: "Zweck der Verarbeitung",
          p: [
            "Wir verwenden Ihre Angaben ausschließlich zur Beantwortung Ihrer Anfrage und, im Fall einer Zusammenarbeit, zur Abwicklung des Auftrags. Eine Weitergabe zu Werbezwecken findet nicht statt.",
          ],
        },
        {
          h: "Speicherdauer",
          p: [
            "Anfragen ohne Auftragsverhältnis löschen wir nach [AUFBEWAHRUNGSFRIST]. Unterlagen zu einem Auftrag bewahren wir für die gesetzlichen Fristen des Geschäftsverkehrs auf.",
          ],
        },
        {
          h: "Ihre Rechte",
          p: [
            "Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung sowie Widerspruch. Wenden Sie sich an [DATENSCHUTZ-KONTAKT E-MAIL]. Zudem steht Ihnen ein Beschwerderecht bei einer Aufsichtsbehörde zu.",
          ],
        },
        {
          h: "Verantwortlicher",
          p: ["[FIRMIERUNG], [VOLLSTÄNDIGE ANSCHRIFT]. Kontakt: [KONTAKT E-MAIL]."],
        },
      ],
    },
    impressum: {
      slug: "impressum",
      title: "Impressum",
      lede: "Angaben gemäß § 5 DDG.",
      body: [
        {
          h: "Anbieter",
          p: ["[FIRMIERUNG]", "[STRASSE UND HAUSNUMMER]", "[PLZ UND ORT]", "[LAND]"],
        },
        { h: "Vertreten durch", p: ["[NAME DER GESCHÄFTSFÜHRUNG ODER INHABER]"] },
        { h: "Kontakt", p: ["E-Mail: [KONTAKT E-MAIL]", "Telefon: [TELEFONNUMMER]"] },
        {
          h: "Register",
          p: [
            "Handelsregister: [REGISTERGERICHT]",
            "Registernummer: [HRB-NUMMER]",
            "Umsatzsteuer-Identifikationsnummer: [UST-IDNR.]",
          ],
        },
        {
          h: "Redaktionell verantwortlich",
          p: ["[NAME], [ANSCHRIFT] — verantwortlich für den redaktionellen Inhalt."],
        },
        {
          h: "Streitschlichtung",
          p: [
            "Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.",
          ],
        },
      ],
    },
    terms: {
      slug: "rechtliches",
      title: "Rechtliches",
      lede: "Nutzungsbedingungen dieser Website.",
      body: [
        {
          h: "Inhalte",
          p: [
            "Die Inhalte dieser Website erstellen wir mit Sorgfalt. Für Richtigkeit, Vollständigkeit und Aktualität übernehmen wir jedoch keine Gewähr.",
          ],
        },
        {
          h: "Verlinkungen",
          p: [
            "Unsere Website verweist auf externe Seiten, auf deren Inhalte wir keinen Einfluss haben. Für diese Inhalte ist der jeweilige Betreiber verantwortlich.",
          ],
        },
        {
          h: "Urheberrecht",
          p: [
            "Die Inhalte und Werke auf dieser Website unterliegen dem Urheberrecht. Vervielfältigung, Bearbeitung und Verbreitung außerhalb der Grenzen des Urheberrechts bedürfen unserer schriftlichen Zustimmung.",
          ],
        },
        { h: "Anwendbares Recht", p: ["[ANWENDBARES RECHT UND GERICHTSSTAND]."] },
      ],
    },
  },

  uk: {
    privacy: {
      slug: "konfidenciynist",
      title: "Конфіденційність",
      lede: "Як цей сайт поводиться з персональними даними.",
      body: [
        {
          h: "Що ми збираємо",
          p: [
            "Форма запиту збирає ім’я, компанію, email, опис проєкту та повідомлення — те, що ви самі вирішите надіслати. Більше жодних персональних даних сайт не збирає. Тут немає аналітичних cookie, рекламних трекерів і сторонніх вставок.",
          ],
        },
        {
          h: "Навіщо ми їх зберігаємо",
          p: [
            "Ми використовуємо ваші дані лише щоб відповісти на запит і, якщо дійде до співпраці, вести цей проєкт. Ми не продаємо і не передаємо їх третім сторонам для маркетингу.",
          ],
        },
        {
          h: "Скільки зберігаємо",
          p: [
            "Запити, які не призвели до співпраці, видаляємо через [СТРОК ЗБЕРІГАННЯ]. Документи, пов’язані з проєктом, зберігаємо протягом строку, встановленого законом для ділового листування.",
          ],
        },
        {
          h: "Ваші права",
          p: [
            "Ви можете запитати доступ до своїх даних, їх виправлення або видалення, а також заперечити проти обробки. Пишіть на [EMAIL ДЛЯ ПИТАНЬ ПРО ДАНІ]. Ви також маєте право звернутися зі скаргою до наглядового органу.",
          ],
        },
        {
          h: "Володілець даних",
          p: ["[НАЗВА ЮРИДИЧНОЇ ОСОБИ], [ПОВНА АДРЕСА]. Контакт: [КОНТАКТНИЙ EMAIL]."],
        },
      ],
    },
    impressum: {
      slug: "impresum",
      title: "Імпресум",
      lede: "Відомості про постачальника послуг.",
      body: [
        {
          h: "Постачальник",
          p: [
            "[НАЗВА ЮРИДИЧНОЇ ОСОБИ]",
            "[ВУЛИЦЯ ТА НОМЕР]",
            "[ІНДЕКС І МІСТО]",
            "[КРАЇНА]",
          ],
        },
        { h: "Представник", p: ["[ІМ’Я КЕРІВНИКА АБО ВЛАСНИКА]"] },
        { h: "Контакт", p: ["Email: [КОНТАКТНИЙ EMAIL]", "Телефон: [НОМЕР ТЕЛЕФОНУ]"] },
        {
          h: "Реєстрація",
          p: [
            "Реєстр: [РЕЄСТРУЮЧИЙ ОРГАН]",
            "Реєстраційний номер: [НОМЕР]",
            "Податковий номер: [ПОДАТКОВИЙ НОМЕР]",
          ],
        },
        { h: "Відповідальний за зміст", p: ["[ІМ’Я], [АДРЕСА]"] },
        {
          h: "Вирішення спорів",
          p: [
            "Ми не зобов’язані та не маємо наміру брати участь у процедурах вирішення спорів у споживчому арбітражі.",
          ],
        },
      ],
    },
    terms: {
      slug: "pravova-informaciya",
      title: "Правова інформація",
      lede: "Умови користування цим сайтом.",
      body: [
        {
          h: "Зміст",
          p: [
            "Ми готуємо матеріали цього сайту сумлінно, проте не гарантуємо їх точність, повноту та актуальність.",
          ],
        },
        {
          h: "Посилання",
          p: [
            "Сайт містить посилання на зовнішні ресурси, зміст яких ми не контролюємо. Відповідальність за нього несе відповідний власник.",
          ],
        },
        {
          h: "Авторське право",
          p: [
            "Матеріали цього сайту захищені авторським правом. Відтворення, переробка та поширення поза межами закону потребують нашої письмової згоди.",
          ],
        },
        { h: "Застосовне право", p: ["[ЗАСТОСОВНЕ ПРАВО ТА ЮРИСДИКЦІЯ]."] },
      ],
    },
  },
};
