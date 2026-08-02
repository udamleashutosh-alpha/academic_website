import {
  Feather,
  BookOpen,
  FlaskConical,
  Hammer,
  Frame,
  Telescope,
  Mail,
} from 'lucide-react';
import { useI18n } from '@/i18n/I18nContext';
import LibrarySection from './LibrarySection';

export default function Sections() {
  const { t } = useI18n();

  const sections = [
    { id: 'scholar', icon: Feather, ...t.sections.scholar },
    { id: 'library', icon: BookOpen, ...t.sections.library },
    { id: 'laboratory', icon: FlaskConical, ...t.sections.laboratory },
    { id: 'workshop', icon: Hammer, ...t.sections.workshop },
    { id: 'gallery', icon: Frame, ...t.sections.gallery },
    { id: 'observatory', icon: Telescope, ...t.sections.observatory },
    { id: 'correspondence', icon: Mail, ...t.sections.correspondence },
  ] as const;

  return (
    <div className="relative">
      {/* Divider between timeline and sections */}
      <div className="mx-auto h-px max-w-3xl bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      {sections.map((s, i) => (
        <LibrarySection
          key={s.id}
          id={s.id}
          icon={s.icon}
          title={s.title}
          subtitle={s.subtitle}
          body={s.body}
          index={i}
        />
      ))}
    </div>
  );
}
