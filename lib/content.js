export const SITE = {
  name: "METAPHORA",
  domain: "METAPHORA.COM",
  url: "https://metaphora.com",
};

export const locales = ["en", "de", "uk"];
export const defaultLocale = "en";

/* Voice.

   The brand idea is digital construction: we build foundations, and the
   cinematic experiences that stand on them. Every line earns its place by
   being specific — no "innovative solutions", no "next level", no sentence
   that could be pasted onto a competitor's site unchanged.

   Each language is written natively rather than translated. The positioning
   is identical; the phrasing is not. */

export const en = {
  lang: "en",
  dir: "ltr",
  meta: {
    title: "METAPHORA — Digital Foundations & Cinematic Web Experiences",
    description:
      "We build digital foundations and cinematic web experiences for startups, restaurants, construction and real estate businesses. Custom web design and development.",
    ogAlt:
      "Wireframe drawing of an architectural complex in thin white lines on black.",
  },
  nav: {
    work: "Work",
    services: "Services",
    contact: "Contact",
    menu: "Menu",
    language: "Language",
    skip: "Skip to content",
  },
  hero: {
    h1: ["Build the foundation.", "Build the future."],
    sub: "We build digital foundations — and the cinematic experiences that stand on them.",
    primary: "START A PROJECT",
    secondary: "VIEW SELECTED WORK",
  },
  services: {
    h2: "What we build",
    lede: "Not pages. A foundation, and the experience that stands on it.",
    items: [
      {
        name: "Digital presence",
        body: "Structure, hierarchy and speed. The part nobody notices until it is missing.",
      },
      {
        name: "Cinematic storytelling",
        body: "Scroll-driven film, like the one you are moving through. Your business shown, not described.",
      },
      {
        name: "Interactive experience",
        body: "Motion that carries depth, scale and progression — and never gets in the way of reading.",
      },
      {
        name: "E-commerce",
        body: "Catalogue and checkout held to the same standard as everything around them.",
      },
      {
        name: "AI-generated visuals",
        body: "When a shoot is not possible, we produce the imagery. This entire film was made in-house.",
      },
    ],
  },
  industries: {
    h2: "Who we build for",
    lede: "Businesses with something real behind them.",
    items: [
      "Startups",
      "Restaurants",
      "Construction",
      "Real estate",
      "Local business",
      "Retail",
    ],
  },
  work: {
    h2: "Selected work",
    lede: "This site is the current piece. Concept, film and engineering produced in-house.",
    caseTitle: "Digital construction sequence",
    meta: [
      { k: "Discipline", v: "Art direction, front-end engineering" },
      { k: "Output", v: "4K sequence, scroll-driven film" },
      { k: "Stack", v: "Next.js, GSAP ScrollTrigger" },
    ],
    frames: [
      { src: "f02", alt: "Construction underway with tower cranes and machinery." },
      { src: "f03", alt: "The completed architectural complex with two domes." },
      { src: "f05", alt: "The office interior with one person at a desk." },
    ],
  },
  inquiry: {
    h2: "PROJECT INQUIRY",
    tagline: "Tell us what you are building. We will build the ground it stands on.",
    orient: "Every project starts with a conversation. We reply within two working days.",
    imageAlt:
      "Wireframe drawing of the completed architectural complex on black.",
    fields: {
      name: { label: "Name", autoComplete: "name" },
      company: { label: "Company", autoComplete: "organization" },
      email: { label: "Email", autoComplete: "email" },
      project: { label: "Project", autoComplete: "off" },
      message: { label: "Message", autoComplete: "off" },
    },
    projectHint: "What kind of site, and for whom?",
    messageHint: "Scope, timing, anything already decided.",
    submit: "START A PROJECT",
    sending: "Sending",
    successTitle: "Inquiry received.",
    successBody:
      "Thank you. We have your message and will reply within two working days.",
    errors: {
      name: "Enter your name so we know who we are replying to.",
      email: "Enter an email address we can reply to.",
      emailFormat: "That email address is missing an @ or a domain.",
      project: "Tell us briefly what kind of project this is.",
      summary: "Check the highlighted fields before sending.",
    },
    optional: "Optional",
  },
  footer: {
    privacy: "Privacy",
    legal: "Legal",
    impressum: "Impressum",
    rights: "All rights reserved.",
  },
};

export const de = {
  lang: "de",
  dir: "ltr",
  meta: {
    title: "METAPHORA — Digitale Fundamente & filmische Web-Auftritte",
    description:
      "Wir bauen digitale Fundamente und filmische Websites für Startups, Restaurants, Bau- und Immobilienunternehmen. Individuelles Webdesign und Webentwicklung.",
    ogAlt:
      "Drahtgitterzeichnung eines Architekturkomplexes in dünnen weißen Linien auf Schwarz.",
  },
  nav: {
    work: "Arbeiten",
    services: "Leistungen",
    contact: "Kontakt",
    menu: "Menü",
    language: "Sprache",
    skip: "Zum Inhalt springen",
  },
  hero: {
    h1: ["Erst das Fundament.", "Dann die Zukunft."],
    sub: "Wir bauen digitale Fundamente — und die filmischen Auftritte, die darauf stehen.",
    primary: "PROJEKT STARTEN",
    secondary: "ARBEITEN ANSEHEN",
  },
  services: {
    h2: "Was wir bauen",
    lede: "Keine Seiten. Ein Fundament — und den Auftritt, der darauf steht.",
    items: [
      {
        name: "Digitaler Auftritt",
        body: "Struktur, Hierarchie und Tempo. Das, was erst auffällt, wenn es fehlt.",
      },
      {
        name: "Filmisches Erzählen",
        body: "Scrollgesteuerter Film, wie der, durch den Sie sich gerade bewegen. Ihr Unternehmen gezeigt, nicht beschrieben.",
      },
      {
        name: "Interaktives Erlebnis",
        body: "Bewegung, die Tiefe, Maßstab und Fortschritt trägt — und dem Lesen nie im Weg steht.",
      },
      {
        name: "E-Commerce",
        body: "Katalog und Checkout im selben Standard wie alles ringsum.",
      },
      {
        name: "KI-generierte Bildwelten",
        body: "Wo kein Dreh möglich ist, produzieren wir die Bilder selbst. Dieser Film entstand vollständig im Haus.",
      },
    ],
  },
  industries: {
    h2: "Für wen wir bauen",
    lede: "Unternehmen, hinter denen etwas Reales steht.",
    items: [
      "Startups",
      "Gastronomie",
      "Bau",
      "Immobilien",
      "Lokales Gewerbe",
      "Handel",
    ],
  },
  work: {
    h2: "Ausgewählte Arbeiten",
    lede: "Diese Website ist die aktuelle Arbeit. Konzept, Film und Umsetzung im Haus entstanden.",
    caseTitle: "Digitale Bausequenz",
    meta: [
      { k: "Disziplin", v: "Art Direction, Frontend-Entwicklung" },
      { k: "Ergebnis", v: "4K-Sequenz, scrollgesteuerter Film" },
      { k: "Technik", v: "Next.js, GSAP ScrollTrigger" },
    ],
    frames: [
      { src: "f02", alt: "Baustelle mit Turmdrehkranen und Baumaschinen." },
      { src: "f03", alt: "Der fertige Architekturkomplex mit zwei Kuppeln." },
      { src: "f05", alt: "Das Büro innen, eine Person am Schreibtisch." },
    ],
  },
  inquiry: {
    h2: "PROJEKTANFRAGE",
    tagline: "Sagen Sie uns, was Sie bauen. Wir bauen den Boden, auf dem es steht.",
    orient:
      "Jedes Projekt beginnt mit einem Gespräch. Wir antworten innerhalb von zwei Werktagen.",
    imageAlt:
      "Drahtgitterzeichnung des fertigen Architekturkomplexes auf Schwarz.",
    fields: {
      name: { label: "Name", autoComplete: "name" },
      company: { label: "Unternehmen", autoComplete: "organization" },
      email: { label: "E-Mail", autoComplete: "email" },
      project: { label: "Projekt", autoComplete: "off" },
      message: { label: "Nachricht", autoComplete: "off" },
    },
    projectHint: "Welche Art von Website, und für wen?",
    messageHint: "Umfang, Zeitrahmen, bereits Entschiedenes.",
    submit: "PROJEKT STARTEN",
    sending: "Wird gesendet",
    successTitle: "Anfrage erhalten.",
    successBody:
      "Vielen Dank. Ihre Nachricht liegt uns vor, wir antworten innerhalb von zwei Werktagen.",
    errors: {
      name: "Bitte geben Sie Ihren Namen an, damit wir wissen, wem wir antworten.",
      email: "Bitte geben Sie eine E-Mail-Adresse für unsere Antwort an.",
      emailFormat: "Dieser Adresse fehlt ein @ oder eine Domain.",
      project: "Beschreiben Sie kurz, um welche Art Projekt es geht.",
      summary: "Bitte prüfen Sie die markierten Felder vor dem Senden.",
    },
    optional: "Optional",
  },
  footer: {
    privacy: "Datenschutz",
    legal: "Rechtliches",
    impressum: "Impressum",
    rights: "Alle Rechte vorbehalten.",
  },
};

export const uk = {
  lang: "uk",
  dir: "ltr",
  meta: {
    title: "METAPHORA — Цифровий фундамент і кінематографічні сайти",
    description:
      "Будуємо цифровий фундамент і кінематографічні сайти для стартапів, ресторанів, будівельних і девелоперських компаній. Індивідуальний вебдизайн і розробка.",
    ogAlt:
      "Каркасне зображення архітектурного комплексу тонкими білими лініями на чорному.",
  },
  nav: {
    work: "Роботи",
    services: "Послуги",
    contact: "Контакти",
    menu: "Меню",
    language: "Мова",
    skip: "Перейти до вмісту",
  },
  hero: {
    h1: ["Спершу фундамент.", "Потім майбутнє."],
    sub: "Ми будуємо цифровий фундамент — і кінематографічні сайти, що на ньому стоять.",
    primary: "ПОЧАТИ ПРОЄКТ",
    secondary: "ПЕРЕГЛЯНУТИ РОБОТИ",
  },
  services: {
    h2: "Що ми будуємо",
    lede: "Не сторінки. Фундамент — і досвід, який на ньому тримається.",
    items: [
      {
        name: "Цифрова присутність",
        body: "Структура, ієрархія і швидкість. Те, що помічають лише тоді, коли його бракує.",
      },
      {
        name: "Кінематографічна розповідь",
        body: "Фільм, керований скролом, як той, крізь який ви зараз рухаєтесь. Бізнес показано, а не описано.",
      },
      {
        name: "Інтерактивний досвід",
        body: "Рух, що передає глибину, масштаб і поступ — і ніколи не заважає читати.",
      },
      {
        name: "E-commerce",
        body: "Каталог і оформлення замовлення того ж рівня, що й усе довкола.",
      },
      {
        name: "Візуал, згенерований ШІ",
        body: "Коли зйомка неможлива, ми створюємо зображення самі. Цей фільм зроблено повністю власноруч.",
      },
    ],
  },
  industries: {
    h2: "Для кого ми будуємо",
    lede: "Бізнеси, за якими стоїть щось справжнє.",
    items: [
      "Стартапи",
      "Ресторани",
      "Будівництво",
      "Нерухомість",
      "Локальний бізнес",
      "Торгівля",
    ],
  },
  work: {
    h2: "Вибрані роботи",
    lede: "Цей сайт — поточна робота. Концепція, фільм і розробка зроблені власноруч.",
    caseTitle: "Цифрова сцена будівництва",
    meta: [
      { k: "Напрям", v: "Арт-дирекшн, фронтенд-розробка" },
      { k: "Результат", v: "4K-послідовність, фільм на скролі" },
      { k: "Стек", v: "Next.js, GSAP ScrollTrigger" },
    ],
    frames: [
      { src: "f02", alt: "Будівництво з баштовими кранами та технікою." },
      { src: "f03", alt: "Завершений архітектурний комплекс із двома куполами." },
      { src: "f05", alt: "Інтер’єр офісу, людина за робочим столом." },
    ],
  },
  inquiry: {
    h2: "ЗАПИТ НА ПРОЄКТ",
    tagline: "Розкажіть, що ви будуєте. Ми збудуємо ґрунт, на якому воно стоятиме.",
    orient:
      "Кожен проєкт починається з розмови. Відповідаємо протягом двох робочих днів.",
    imageAlt:
      "Каркасне зображення завершеного архітектурного комплексу на чорному.",
    fields: {
      name: { label: "Ім’я", autoComplete: "name" },
      company: { label: "Компанія", autoComplete: "organization" },
      email: { label: "Email", autoComplete: "email" },
      project: { label: "Проєкт", autoComplete: "off" },
      message: { label: "Повідомлення", autoComplete: "off" },
    },
    projectHint: "Який сайт і для кого?",
    messageHint: "Обсяг, терміни, що вже вирішено.",
    submit: "ПОЧАТИ ПРОЄКТ",
    sending: "Надсилаємо",
    successTitle: "Запит отримано.",
    successBody:
      "Дякуємо. Ваше повідомлення в нас — відповімо протягом двох робочих днів.",
    errors: {
      name: "Вкажіть ім’я, щоб ми знали, до кого звертатися.",
      email: "Вкажіть email, на який надіслати відповідь.",
      emailFormat: "У цій адресі бракує @ або домену.",
      project: "Коротко опишіть, який це проєкт.",
      summary: "Перевірте позначені поля перед надсиланням.",
    },
    optional: "Необов’язково",
  },
  footer: {
    privacy: "Конфіденційність",
    legal: "Правова інформація",
    impressum: "Імпресум",
    rights: "Усі права захищено.",
  },
};

export const dictionaries = { en, de, uk };

export const LEGAL_ROUTES = {
  en: { privacy: "/en/privacy", terms: "/en/legal", impressum: "/en/impressum" },
  de: {
    privacy: "/de/datenschutz",
    terms: "/de/rechtliches",
    impressum: "/de/impressum",
  },
  uk: {
    privacy: "/uk/konfidenciynist",
    terms: "/uk/pravova-informaciya",
    impressum: "/uk/impresum",
  },
};
