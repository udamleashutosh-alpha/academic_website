import { motion } from 'framer-motion';
import { useI18n } from '@/i18n/I18nContext';

export default function Footer() {
  const { t } = useI18n();
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden px-6 py-24 text-center">
      {/* top ornament */}
      <div className="mx-auto mb-16 flex max-w-xs items-center justify-center gap-4">
        <span className="gold-rule flex-1" />
        <span className="text-gold">✦</span>
        <span className="gold-rule flex-1" />
      </div>

      <motion.p
        className="mx-auto max-w-2xl font-script text-4xl text-gradient-gold md:text-5xl"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 1.4, ease: 'easeOut' }}
      >
        {t.footer.closing}
      </motion.p>

      <div className="mx-auto mt-16 h-px w-16 bg-gold/30" />

      <p className="mt-8 font-body text-sm uppercase tracking-widest text-text-dim">
        Ashutosh Udamle
      </p>
      <p className="mt-2 font-body text-xs text-text-dim">
        © {year} · {t.footer.rights}
      </p>
    </footer>
  );
}
