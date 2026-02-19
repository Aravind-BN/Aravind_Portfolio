import React from 'react';
import './App.css';
import Navbar from './components/commonitems/Navbar';
import Home from './components/pages/Home';
import Projects from './components/projectspage/Projects';
import Certificates from './components/certificates/Certificates';
import Skills from './components/skills/Skills';
import AchievementsTimeline from './components/achievementpage/AchievementsTimeline';
import Footer from './components/commonitems/Footer';
import FloatingCircles from './FloatingCircles';


const App = () => {
  return (
    <div className="app-wrap" style={{ position: 'relative' }}>
      <FloatingCircles />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Navbar />
        <main>
          <section id="home"><Home /></section>
          <section id="skills"><Skills /></section>
          <section id="projects"><Projects /></section>
          <section id="achievements"><AchievementsTimeline /></section>
          <section id="certificates"><Certificates /></section>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default App;
