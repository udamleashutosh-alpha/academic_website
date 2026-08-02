import { useState, useRef, useEffect } from 'react';
import { Globe } from 'lucide-react';
import { useI18n } from '@/i18n/I18nContext';
import { LANGUAGES } from '@/i18n/translations';

export default function LanguageSwitcher() {
  const { lang, setLang } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  const current = LANGUAGES.find((l) => l.code === lang) ?? LANGUAGES[0];

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Select language"
        aria-expanded={open}
        aria-haspopup="listbox"
        className="flex items-center gap-2 rounded-full border border-gold/30 px-3 py-2 text-text-muted transition-colors duration-300 hover:border-gold/60 hover:text-gold-light"
      >
        <Globe className="h-4 w-4" strokeWidth={1.5} />
        <span className="font-body text-sm">{current.nativeLabel}</span>
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label="Languages"
          className="absolute right-0 mt-2 w-44 overflow-hidden rounded-lg border border-gold/20 bg-brown-deep/95 shadow-2xl shadow-black/60 backdrop-blur-sm"
        >
          {LANGUAGES.map((l) => (
            <li key={l.code}>
              <button
                role="option"
                aria-selected={l.code === lang}
                onClick={() => {
                  setLang(l.code);
                  setOpen(false);
                }}
                className={`flex w-full items-center justify-between px-4 py-2.5 font-body text-sm transition-colors duration-200 ${
                  l.code === lang
                    ? 'bg-gold/10 text-gold-light'
                    : 'text-text-muted hover:bg-brown-light/60 hover:text-text'
                }`}
              >
                <span>{l.nativeLabel}</span>
                <span className="text-xs text-text-dim">{l.label}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
