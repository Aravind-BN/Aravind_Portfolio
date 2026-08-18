import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import Navbar from './components/commonitems/Navbar';
import Home from './components/pages/Home';
import Stats from './components/pages/Stats';
import Projects from './components/projectspage/Projects';
import Certificates from './components/certificates/Certificates';
import AchievementsTimeline from './components/achievementpage/AchievementsTimeline';
import Footer from './components/commonitems/Footer';
import FloatingCircles from './FloatingCircles';
import CommandPalette from './components/commonitems/CommandPalette';
import CTF from './components/ctf/CTF';


const App = () => {
  const [paletteOpen, setPaletteOpen] = useState(false);

  const openPalette = useCallback(() => setPaletteOpen(true), []);
  const closePalette = useCallback(() => setPaletteOpen(false), []);

  useEffect(() => {
    const handleKey = (e) => {
      // Ignore when typing in inputs
      const tgt = e.target;
      if (tgt && (tgt.tagName === 'INPUT' || tgt.tagName === 'TEXTAREA' || tgt.isContentEditable)) return;

      if (e.key === '/') {
        e.preventDefault();
        openPalette();
      } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        openPalette();
      }
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [openPalette]);

  return (
    <div className="app-wrap" style={{ position: 'relative' }}>
      <FloatingCircles />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <a href="#home" className="skip-link">Skip to content</a>
        <Navbar />
        <main>
          <section id="home"><Home /></section>
          <section id="stats"><Stats /></section>
          <section id="projects"><Projects /></section>
          <section id="achievements"><AchievementsTimeline /></section>
          <section id="certificates"><Certificates /></section>
        </main>
        <Footer />
      </div>

      <CommandPalette open={paletteOpen} onClose={closePalette} />
      <CTF />
    </div>
  );
};

export default App;
