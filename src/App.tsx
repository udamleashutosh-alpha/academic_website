import { useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { I18nProvider } from '@/i18n/I18nContext';
import CustomCursor from '@/components/CustomCursor';
import Intro from '@/components/Intro';
import NavBar from '@/components/NavBar';
import Hero from '@/components/Hero';
import Timeline from '@/components/Timeline';
import Sections from '@/components/Sections';
import Footer from '@/components/Footer';

function App() {
  const [entered, setEntered] = useState(false);

  const handleComplete = useCallback(() => setEntered(true), []);

  return (
    <I18nProvider>
      <CustomCursor />

      <AnimatePresence mode="wait">
        {!entered ? (
          <Intro key="intro" onComplete={handleComplete} />
        ) : (
          <motion.main
            key="site"
            className="relative min-h-screen parchment-grain"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.6, ease: 'easeOut' }}
          >
            <NavBar />
            <Hero />
            <Timeline />
            <Sections />
            <Footer />
          </motion.main>
        )}
      </AnimatePresence>
    </I18nProvider>
  );
}

export default App;
