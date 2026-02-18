import React, { useState, useEffect } from 'react';
import placeholder from '../../images/placeholder';
import './Home.css';

const NAME = 'Aravind';
const TAGLINE = 'Student of SST · Full-stack developer';
const BIO = 'I build things for the web and enjoy turning ideas into code. Focused on clean design and learning in public.';

function Home() {
  const [displayName, setDisplayName] = useState('');
  const [cursorVisible, setCursorVisible] = useState(true);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i <= NAME.length) {
        setDisplayName(NAME.slice(0, i));
        i++;
      } else {
        clearInterval(interval);
        setCursorVisible(false);
      }
    }, 120);
    return () => clearInterval(interval);
  }, []);

  const photoUrl = process.env.PUBLIC_URL + '/aravind-photo.png';

  return (
    <section id="home" className="hero">
      <div className="hero-inner">
        <div className="hero-text">
          <h1 className="hero-name">
            {displayName}
            <span className={cursorVisible ? 'typing-cursor' : 'typing-cursor hidden'}>|</span>
          </h1>
          <p className="hero-tagline">{TAGLINE}</p>
          <p className="hero-bio">{BIO}</p>
          <div className="hero-links">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hero-link" aria-label="GitHub">
            <i className="fab fa-github" />
          </a>
          <a href="https://www.linkedin.com/in/aravind-nandakumar-a8ba05226/" target="_blank" rel="noopener noreferrer" className="hero-link" aria-label="LinkedIn">
            <i className="fab fa-linkedin-in" />
          </a>
          <a href="https://twitter.com/ar4v1ndn0tc00l" target="_blank" rel="noopener noreferrer" className="hero-link" aria-label="Twitter">
            <i className="fab fa-twitter" />
          </a>
          <a href="mailto:bellam_nandakumar_aravind@s2021.sst.edu.sg" className="hero-link" aria-label="Email">
            <i className="fas fa-envelope" />
          </a>
          </div>
        </div>
        <div className="hero-photo-wrap">
          <img
            src={photoUrl}
            alt="Aravind"
            className="hero-photo"
            onError={(e) => { e.target.src = placeholder; }}
          />
        </div>
      </div>
    </section>
  );
}

export default Home;
