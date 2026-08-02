import { motion } from 'framer-motion';
import { useI18n } from '@/i18n/I18nContext';
import SectionReveal from './SectionReveal';

export default function Timeline() {
  const { t } = useI18n();
  const items = t.timeline.items;

  return (
    <section id="timeline" className="relative mx-auto max-w-5xl px-6 py-32 md:py-48">
      <SectionReveal className="mb-20 text-center">
        <p className="font-body text-sm uppercase tracking-[0.3em] text-gold/70">{t.timeline.subtitle}</p>
        <h2 className="mt-4 font-serif text-4xl text-text md:text-5xl lg:text-6xl">{t.timeline.title}</h2>
        <div className="mx-auto mt-8 h-px w-24 bg-gradient-to-r from-transparent via-gold to-transparent" />
      </SectionReveal>

      <div className="relative">
        {/* Vertical line */}
        <div
          className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-transparent via-gold/30 to-transparent md:left-1/2 md:-translate-x-1/2"
          aria-hidden="true"
        />

        <div className="space-y-16 md:space-y-24">
          {items.map((item, i) => {
            const isLeft = i % 2 === 0;
            return (
              <TimelineCard
                key={i}
                index={i}
                title={item.title}
                description={item.description}
                isLeft={isLeft}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

interface TimelineCardProps {
  index: number;
  title: string;
  description: string;
  isLeft: boolean;
}

function TimelineCard({ index, title, description, isLeft }: TimelineCardProps) {
  return (
    <div className="relative flex flex-col md:flex-row md:items-center">
      {/* Node dot */}
      <motion.div
        className="absolute left-4 top-2 z-10 h-3 w-3 -translate-x-1/2 rounded-full border border-gold bg-ink md:left-1/2"
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="absolute inset-0 rounded-full bg-gold/40 blur-sm" />
      </motion.div>

      {/* Spacer for alternating layout on desktop */}
      <div className={`hidden md:block md:w-1/2 ${isLeft ? '' : 'md:order-2'}`} />

      {/* Card */}
      <motion.div
        className={`ml-12 md:ml-0 md:w-1/2 ${isLeft ? 'md:pr-16 md:text-right' : 'md:pl-16'}`}
        initial={{ opacity: 0, x: isLeft ? -40 : 40, y: 20 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="group relative rounded-lg border border-gold/15 bg-brown-deep/40 p-8 transition-colors duration-500 hover:border-gold/30 hover:bg-brown-deep/60">
          <span className="font-script text-3xl text-gold/50">{String(index + 1).padStart(2, '0')}</span>
          <h3 className="mt-2 font-serif text-2xl text-gold-light md:text-3xl">{title}</h3>
          <p className="mt-4 font-body text-base leading-relaxed text-text-muted">{description}</p>
          {/* corner ornament */}
          <div
            className={`absolute top-0 h-6 w-6 border-t border-l border-gold/20 ${isLeft ? 'right-0 rounded-tr-lg' : 'left-0 rounded-tl-lg'}`}
          />
          <div
            className={`absolute bottom-0 h-6 w-6 border-b border-r border-gold/20 ${isLeft ? 'right-0 rounded-br-lg' : 'left-0 rounded-bl-lg'}`}
          />
        </div>
      </motion.div>
    </div>
  );
}
