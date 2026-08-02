import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import { translations, type LanguageCode, type TranslationKeys } from './translations';

interface I18nContextValue {
  lang: LanguageCode;
  t: TranslationKeys;
  setLang: (lang: LanguageCode) => void;
}

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<LanguageCode>('en');

  const setLang = useCallback((next: LanguageCode) => {
    setLangState(next);
    document.documentElement.lang = next;
  }, []);

  return (
    <I18nContext.Provider value={{ lang, t: translations[lang], setLang }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within an I18nProvider');
  return ctx;
}
