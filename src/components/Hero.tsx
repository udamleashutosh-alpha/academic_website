import { motion } from 'framer-motion';
import { useI18n } from '@/i18n/I18nContext';
import DustParticles from './DustParticles';

export default function Hero() {
  const { t } = useI18n();

  return (
    <section
      id="top"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center"
    >
      {/* Ambient candlelight glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 50% 60%, rgba(201,162,39,0.08) 0%, transparent 60%)',
        }}
      />
      <DustParticles count={20} />

      {/* Vignette */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(10,9,8,0.6) 90%)',
        }}
      />

      <div className="relative z-10 flex flex-col items-center">
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1.6, ease: 'easeOut' }}
        >
          <div className="gold-rule w-40" />
        </motion.div>

        <motion.h1
          className="font-serif text-5xl font-light tracking-wide text-text sm:text-6xl md:text-7xl lg:text-8xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
        >
          {t.hero.name}
        </motion.h1>

        <motion.div
          className="my-8 flex items-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, delay: 0.9 }}
        >
          <span className="gold-rule w-16" />
          <span className="text-gold">✦</span>
          <span className="gold-rule w-16" />
        </motion.div>

        <motion.p
          className="max-w-xl font-body text-base uppercase tracking-[0.3em] text-gold-light/80 sm:text-lg"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, ease: 'easeOut', delay: 1.1 }}
        >
          {t.hero.roles}
        </motion.p>

        <motion.div
          className="mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, delay: 1.6 }}
        >
          <div className="flex flex-col items-center gap-2 text-text-dim">
            <span className="font-body text-xs uppercase tracking-widest">Scroll to explore</span>
            <motion.div
              className="h-10 w-px bg-gradient-to-b from-gold/60 to-transparent"
              animate={{ scaleY: [0.3, 1, 0.3] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              style={{ transformOrigin: 'top' }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
