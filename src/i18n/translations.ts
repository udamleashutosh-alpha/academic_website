export type LanguageCode =
  | 'en'
  | 'hi'
  | 'fr'
  | 'de'
  | 'es'
  | 'it'
  | 'ja'
  | 'ko'
  | 'zh'
  | 'ru';

export interface LanguageMeta {
  code: LanguageCode;
  label: string;
  nativeLabel: string;
}

export const LANGUAGES: LanguageMeta[] = [
  { code: 'en', label: 'English', nativeLabel: 'English' },
  { code: 'hi', label: 'Hindi', nativeLabel: 'हिन्दी' },
  { code: 'fr', label: 'French', nativeLabel: 'Français' },
  { code: 'de', label: 'German', nativeLabel: 'Deutsch' },
  { code: 'es', label: 'Spanish', nativeLabel: 'Español' },
  { code: 'it', label: 'Italian', nativeLabel: 'Italiano' },
  { code: 'ja', label: 'Japanese', nativeLabel: '日本語' },
  { code: 'ko', label: 'Korean', nativeLabel: '한국어' },
  { code: 'zh', label: 'Chinese', nativeLabel: '中文' },
  { code: 'ru', label: 'Russian', nativeLabel: 'Русский' },
];

export interface TranslationKeys {
  intro: {
    welcome: string;
    tagline: string;
    enter: string;
    skip: string;
    embossed: string;
  };
  hero: {
    name: string;
    roles: string;
  };
  nav: {
    scholar: string;
    library: string;
    laboratory: string;
    workshop: string;
    gallery: string;
    observatory: string;
    correspondence: string;
  };
  sections: {
    scholar: { title: string; subtitle: string; body: string };
    library: { title: string; subtitle: string; body: string };
    laboratory: { title: string; subtitle: string; body: string };
    workshop: { title: string; subtitle: string; body: string };
    gallery: { title: string; subtitle: string; body: string };
    observatory: { title: string; subtitle: string; body: string };
    correspondence: { title: string; subtitle: string; body: string };
  };
  timeline: {
    title: string;
    subtitle: string;
    items: { title: string; description: string }[];
  };
  footer: {
    closing: string;
    rights: string;
  };
}

const en: TranslationKeys = {
  intro: {
    welcome: 'Welcome',
    tagline: 'Every discovery begins with curiosity.',
    enter: 'Enter the Library',
    skip: 'Skip Intro',
    embossed: 'ASHUTOSH UDAMLE',
  },
  hero: {
    name: 'Ashutosh Udamle',
    roles: 'Independent Researcher · Author · AI Builder',
  },
  nav: {
    scholar: 'The Scholar',
    library: 'The Library',
    laboratory: 'The Laboratory',
    workshop: 'The Workshop',
    gallery: 'The Gallery',
    observatory: 'The Observatory',
    correspondence: 'The Correspondence',
  },
  sections: {
    scholar: {
      title: 'The Scholar',
      subtitle: 'A portrait of the mind',
      body: 'Ashutosh Udamle is an independent researcher devoted to the pursuit of knowledge across disciplines. His work moves between artificial intelligence, the philosophy of science, and the quiet craft of writing — each informing the other.',
    },
    library: {
      title: 'The Library',
      subtitle: 'Collected works and writings',
      body: 'A curated collection of essays, papers, and books. Here, ideas are archived like volumes on a shelf — arranged not by date, but by the questions they attempt to answer.',
    },
    laboratory: {
      title: 'The Laboratory',
      subtitle: 'Experiments in intelligence',
      body: 'Where research becomes artifact. This is the space for building — models, tools, and systems that turn abstract inquiry into something you can touch and use.',
    },
    workshop: {
      title: 'The Workshop',
      subtitle: 'Projects in progress',
      body: 'Open notebooks and works in progress. The workshop holds the things being made right now — unfinished, honest, and shaped by iteration.',
    },
    gallery: {
      title: 'The Gallery',
      subtitle: 'Visual works and reflections',
      body: 'A quieter room for images, diagrams, and visual essays — the parts of research that speak through form as much as through language.',
    },
    observatory: {
      title: 'The Observatory',
      subtitle: 'Looking outward and ahead',
      body: 'The long view. Notes on where the field is heading, what deserves attention, and the questions worth carrying into the next decade.',
    },
    correspondence: {
      title: 'The Correspondence',
      subtitle: 'Letters and conversations',
      body: 'Reach out. Collaboration, conversation, and the exchange of ideas are the lifeblood of independent work. The door of this library is open.',
    },
  },
  timeline: {
    title: 'A Timeline',
    subtitle: 'The chapters so far',
    items: [
      { title: 'Early Life', description: 'Where curiosity first took hold — the first books, the first questions, the first sense that the world was worth understanding.' },
      { title: 'Curiosity', description: 'A habit of asking why. The slow accumulation of questions that would later shape a direction of research.' },
      { title: 'Research', description: 'Independent inquiry into artificial intelligence and the structures of knowledge. The work begins in earnest.' },
      { title: 'Books', description: 'Writing as a way of thinking. Essays and volumes that turn scattered notes into something lasting.' },
      { title: 'Projects', description: 'Building the ideas — tools and systems that make research tangible and useful to others.' },
      { title: 'Hackathons', description: 'The forge. Intense, collaborative bursts where ideas are tested under pressure and time.' },
      { title: 'Future Vision', description: 'What comes next — a horizon still being written, guided by the same curiosity that started it all.' },
    ],
  },
  footer: {
    closing: 'The next chapter is still being written.',
    rights: 'All rights reserved.',
  },
};

// Placeholder translations — structured for future i18n.
// Each non-English language mirrors the English keys so the architecture
// is complete; replace values with native translations when ready.
const placeholder: Omit<TranslationKeys, 'intro' | 'hero'> = {
  nav: en.nav,
  sections: en.sections,
  timeline: en.timeline,
  footer: en.footer,
};

const hi: TranslationKeys = {
  intro: {
    welcome: 'स्वागत है',
    tagline: 'हर खोज की शुरुआत जिज्ञासा से होती है।',
    enter: 'पुस्तकालय में प्रवेश करें',
    skip: 'परिचय छोड़ें',
    embossed: 'ASHUTOSH UDAMLE',
  },
  hero: { name: 'Ashutosh Udamle', roles: 'स्वतंत्र शोधकर्ता · लेखक · एआई बिल्डर' },
  ...placeholder,
};

const fr: TranslationKeys = {
  intro: {
    welcome: 'Bienvenue',
    tagline: 'Toute découverte commence par la curiosité.',
    enter: "Entrer dans la bibliothèque",
    skip: "Passer l'intro",
    embossed: 'ASHUTOSH UDAMLE',
  },
  hero: { name: 'Ashutosh Udamle', roles: 'Chercheur indépendant · Auteur · Créateur d\'IA' },
  ...placeholder,
};

const de: TranslationKeys = {
  intro: {
    welcome: 'Willkommen',
    tagline: 'Jede Entdeckung beginnt mit Neugier.',
    enter: 'Die Bibliothek betreten',
    skip: 'Intro überspringen',
    embossed: 'ASHUTOSH UDAMLE',
  },
  hero: { name: 'Ashutosh Udamle', roles: 'Unabhängiger Forscher · Autor · KI-Entwickler' },
  ...placeholder,
};

const es: TranslationKeys = {
  intro: {
    welcome: 'Bienvenido',
    tagline: 'Todo descubrimiento comienza con la curiosidad.',
    enter: 'Entrar en la biblioteca',
    skip: 'Saltar intro',
    embossed: 'ASHUTOSH UDAMLE',
  },
  hero: { name: 'Ashutosh Udamle', roles: 'Investigador independiente · Autor · Creador de IA' },
  ...placeholder,
};

const it: TranslationKeys = {
  intro: {
    welcome: 'Benvenuto',
    tagline: 'Ogni scoperta inizia con la curiosità.',
    enter: 'Entra in biblioteca',
    skip: "Salta l'intro",
    embossed: 'ASHUTOSH UDAMLE',
  },
  hero: { name: 'Ashutosh Udamle', roles: 'Ricercatore indipendente · Autore · Costruttore di IA' },
  ...placeholder,
};

const ja: TranslationKeys = {
  intro: {
    welcome: 'ようこそ',
    tagline: 'すべての発見は好奇心から始まる。',
    enter: '図書館へ入る',
    skip: 'イントロをスキップ',
    embossed: 'ASHUTOSH UDAMLE',
  },
  hero: { name: 'Ashutosh Udamle', roles: '独立研究者 · 著作家 · AIビルダー' },
  ...placeholder,
};

const ko: TranslationKeys = {
  intro: {
    welcome: '환영합니다',
    tagline: '모든 발견은 호기심에서 시작됩니다.',
    enter: '도서관으로 들어가기',
    skip: '인트로 건너뛰기',
    embossed: 'ASHUTOSH UDAMLE',
  },
  hero: { name: 'Ashutosh Udamle', roles: '독립 연구자 · 작가 · AI 빌더' },
  ...placeholder,
};

const zh: TranslationKeys = {
  intro: {
    welcome: '欢迎',
    tagline: '每一次发现都始于好奇。',
    enter: '进入图书馆',
    skip: '跳过开场',
    embossed: 'ASHUTOSH UDAMLE',
  },
  hero: { name: 'Ashutosh Udamle', roles: '独立研究者 · 作者 · AI构建者' },
  ...placeholder,
};

const ru: TranslationKeys = {
  intro: {
    welcome: 'Добро пожаловать',
    tagline: 'Каждое открытие начинается с любопытства.',
    enter: 'Войти в библиотеку',
    skip: 'Пропустить вступление',
    embossed: 'ASHUTOSH UDAMLE',
  },
  hero: { name: 'Ashutosh Udamle', roles: 'Независимый исследователь · Автор · Создатель ИИ' },
  ...placeholder,
};

export const translations: Record<LanguageCode, TranslationKeys> = {
  en,
  hi,
  fr,
  de,
  es,
  it,
  ja,
  ko,
  zh,
  ru,
};
