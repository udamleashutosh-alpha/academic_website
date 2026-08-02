import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import SectionReveal from './SectionReveal';

interface LibrarySectionProps {
  id: string;
  icon: LucideIcon;
  title: string;
  subtitle: string;
  body: string;
  index: number;
}

export default function LibrarySection({ id, icon: Icon, title, subtitle, body, index }: LibrarySectionProps) {
  const isEven = index % 2 === 0;

  return (
    <section
      id={id}
      className={`relative mx-auto flex max-w-7xl flex-col items-center gap-12 px-6 py-24 md:py-32 lg:flex-row lg:gap-20 ${
        isEven ? '' : 'lg:flex-row-reverse'
      }`}
    >
      {/* Decorative side ornament */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-px w-32 -translate-x-1/2 bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      {/* Icon panel */}
      <SectionReveal className="flex w-full justify-center lg:w-2/5">
        <div className="relative flex h-56 w-56 items-center justify-center rounded-full border border-gold/20 bg-brown-deep/30 md:h-72 md:w-72">
          {/* concentric rings */}
          <div className="absolute inset-6 rounded-full border border-gold/10" />
          <div className="absolute inset-12 rounded-full border border-gold/5" />
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(201,162,39,0.06) 0%, transparent 70%)',
            }}
            animate={{ opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          />
          <Icon
            className="h-20 w-20 text-gold md:h-24 md:w-24"
            strokeWidth={0.8}
          />
        </div>
      </SectionReveal>

      {/* Text panel */}
      <div className="w-full lg:w-3/5">
        <SectionReveal delay={0.15}>
          <p className="font-body text-sm uppercase tracking-[0.3em] text-gold/60">{subtitle}</p>
          <h2 className="mt-3 font-serif text-4xl text-text md:text-5xl">{title}</h2>
          <div className="mt-6 h-px w-16 bg-gold/40" />
          <p className="mt-6 max-w-xl font-body text-lg leading-relaxed text-text-muted">{body}</p>
          <p className="mt-8 font-body text-sm uppercase tracking-widest text-text-dim">
            Forthcoming
          </p>
        </SectionReveal>
      </div>
    </section>
  );
}
