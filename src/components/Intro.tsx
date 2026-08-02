import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useI18n } from '@/i18n/I18nContext';
import LibraryScene from './LibraryScene';
import DustParticles from './DustParticles';
import { playPageTurn, playJournalOpen } from '@/lib/sound';

interface IntroProps {
  onComplete: () => void;
}

type Phase = 'black' | 'reveal' | 'journal' | 'open' | 'welcome';

const PHASE_DURATIONS: Record<Phase, number> = {
  black: 1200,
  reveal: 3500,
  journal: 1800,
  open: 1500,
  welcome: 2200,
};

export default function Intro({ onComplete }: IntroProps) {
  const { t } = useI18n();
  const [phase, setPhase] = useState<Phase>('black');
  const [progress, setProgress] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
  }, []);

  const advance = useCallback(() => {
    setPhase((prev) => {
      const order: Phase[] = ['black', 'reveal', 'journal', 'open', 'welcome'];
      const idx = order.indexOf(prev);
      if (idx >= order.length - 1) {
        onComplete();
        return prev;
      }
      const next = order[idx + 1];
      if (next === 'reveal') playPageTurn();
      if (next === 'open') playJournalOpen();
      return next;
    });
  }, [onComplete]);

  useEffect(() => {
    if (reducedMotion) {
      const timer = setTimeout(onComplete, 600);
      return () => clearTimeout(timer);
    }
    const timer = setTimeout(advance, PHASE_DURATIONS[phase]);
    return () => clearTimeout(timer);
  }, [phase, advance, onComplete, reducedMotion]);

  // Smoothly animate camera progress during reveal
  useEffect(() => {
    if (phase === 'reveal') {
      const start = performance.now();
      const dur = PHASE_DURATIONS.reveal;
      let raf = 0;
      const tick = (now: number) => {
        const p = Math.min(1, (now - start) / dur);
        setProgress(p);
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
      return () => cancelAnimationFrame(raf);
    }
    if (phase === 'journal' || phase === 'open' || phase === 'welcome') {
      setProgress(1);
    }
  }, [phase]);

  const sceneVisible = phase !== 'black';
  const journalVisible = phase === 'journal' || phase === 'open' || phase === 'welcome';
  const journalOpen = phase === 'open' || phase === 'welcome';
  const welcomeVisible = phase === 'welcome';

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-ink"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2, ease: 'easeInOut' }}
    >
      {/* Skip button */}
      <button
        onClick={onComplete}
        className="absolute right-6 top-6 z-50 font-body text-sm uppercase tracking-widest text-text-muted transition-colors duration-300 hover:text-gold-light"
        aria-label={t.intro.skip}
      >
        {t.intro.skip}
      </button>

      <AnimatePresence>
        {sceneVisible && (
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
          >
            <LibraryScene progress={progress} />
            <DustParticles count={36} />
            {/* Vignette */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  'radial-gradient(ellipse at center, transparent 30%, rgba(10,9,8,0.7) 80%, #0A0908 100%)',
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Journal on desk */}
      <AnimatePresence>
        {journalVisible && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            <div className="relative" style={{ perspective: '1200px' }}>
              {/* Journal cover (closed) */}
              <motion.div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                style={{ transformStyle: 'preserve-3d', transformOrigin: 'left center' }}
                initial={{ rotateY: 0 }}
                animate={{ rotateY: journalOpen ? -175 : 0 }}
                transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1], delay: journalOpen ? 0.2 : 0 }}
              >
                <div
                  className="relative h-44 w-72 rounded-sm shadow-2xl shadow-black/80"
                  style={{
                    background: 'linear-gradient(135deg, #3A2A1B 0%, #241C15 50%, #1A140F 100%)',
                    border: '1px solid #5C3E22',
                    boxShadow: 'inset 0 0 30px rgba(0,0,0,0.5)',
                  }}
                >
                  {/* Gold embossed name */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span
                      className="font-serif text-lg tracking-[0.25em] text-gold"
                      style={{ textShadow: '0 1px 0 rgba(232,217,168,0.3), 0 -1px 0 rgba(0,0,0,0.5)' }}
                    >
                      {t.intro.embossed}
                    </span>
                  </div>
                  {/* Cover border ornament */}
                  <div className="absolute inset-3 border border-gold/30 rounded-sm" />
                  <div className="absolute inset-4 border border-gold/15 rounded-sm" />
                </div>
              </motion.div>

              {/* Open page (revealed when cover opens) */}
              <AnimatePresence>
                {journalOpen && (
                  <motion.div
                    className="relative h-44 w-72 rounded-sm"
                    style={{
                      background: 'linear-gradient(135deg, #F4ECD8 0%, #E8D9A8 100%)',
                      boxShadow: '0 20px 60px rgba(0,0,0,0.6), inset 0 0 40px rgba(201,162,39,0.1)',
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                  >
                    <div className="absolute inset-4 border border-gold/20 rounded-sm" />
                    <div className="absolute inset-6 border border-gold/10 rounded-sm" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Welcome text */}
      <AnimatePresence>
        {welcomeVisible && (
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            <motion.h1
              className="font-script text-6xl text-gradient-gold sm:text-7xl md:text-8xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.4, ease: 'easeOut', delay: 0.3 }}
            >
              {t.intro.welcome}
            </motion.h1>
            <motion.p
              className="mt-6 max-w-md font-body text-lg italic text-text-muted sm:text-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, delay: 1 }}
            >
              {t.intro.tagline}
            </motion.p>
            <motion.button
              onClick={onComplete}
              className="mt-10 rounded-full border border-gold/40 px-8 py-3 font-body text-sm uppercase tracking-widest text-gold-light transition-colors duration-500 hover:bg-gold/10 hover:border-gold"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.6 }}
              whileHover={{ scale: 1.03 }}
            >
              {t.intro.enter}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
