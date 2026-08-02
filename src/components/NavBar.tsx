import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useI18n } from '@/i18n/I18nContext';
import LanguageSwitcher from './LanguageSwitcher';

const SECTION_IDS = ['scholar', 'library', 'laboratory', 'workshop', 'gallery', 'observatory', 'correspondence'] as const;

export default function NavBar() {
  const { t } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navItems = SECTION_IDS.map((id) => ({
    id,
    label: t.nav[id],
  }));

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <motion.header
      className="fixed left-0 right-0 top-0 z-50 transition-all duration-500"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
    >
      <div
        className={`transition-all duration-500 ${
          scrolled ? 'border-b border-gold/15 bg-ink/85 backdrop-blur-md' : 'bg-transparent'
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          {/* Monogram */}
          <button
            onClick={() => scrollTo('top')}
            className="font-serif text-2xl font-semibold tracking-wider text-gold-light"
            aria-label="Back to top"
          >
            AU
          </button>

          {/* Desktop nav */}
          <div className="hidden items-center gap-8 lg:flex">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="font-body text-sm uppercase tracking-widest text-text-muted transition-colors duration-300 hover:text-gold-light"
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            {/* Mobile menu toggle */}
            <button
              className="text-text-muted lg:hidden"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              <div className="space-y-1.5">
                <span className={`block h-px w-6 bg-current transition-all ${menuOpen ? 'translate-y-2 rotate-45' : ''}`} />
                <span className={`block h-px w-6 bg-current transition-all ${menuOpen ? 'opacity-0' : ''}`} />
                <span className={`block h-px w-6 bg-current transition-all ${menuOpen ? '-translate-y-2 -rotate-45' : ''}`} />
              </div>
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        {menuOpen && (
          <motion.div
            className="border-t border-gold/10 bg-ink/95 px-6 py-6 lg:hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className="text-left font-body text-sm uppercase tracking-widest text-text-muted transition-colors hover:text-gold-light"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
}
