import React, { useState, useEffect } from 'react';
import placeholder from '../../images/placeholder';
import './Home.css';

const NAME = 'Aravind Nandakumar';
const TAGLINE = 'CSIT Scholar · Co-Founder of GrowCalth · Student @ Ngee Ann Polytechnic';
const BIO =
  'Passionate cybersecurity student focused on ethical hacking and digital forensics. I aspire to strengthen cyber defense systems and contribute to a safer, more secure digital future.';
const TYPE_INTERVAL_MS = 80;

function Home() {
  const [displayName, setDisplayName] = useState('');

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      i += 1;
      setDisplayName(NAME.slice(0, i));
      if (i >= NAME.length) clearInterval(interval);
    }, TYPE_INTERVAL_MS);
    return () => clearInterval(interval);
  }, []);

  const photoUrl = process.env.PUBLIC_URL + '/aravind-photo.png';

  return (
    <section id="home" className="hero">
      <div className="hero-inner">
        <div className="hero-photo-wrap">
          <img
            src={photoUrl}
            alt="Aravind"
            className="hero-photo"
            onError={(e) => {
              e.target.src = placeholder;
            }}
          />
        </div>
        <div className="hero-text">
          <p className="hero-eyebrow">~/whoami</p>
          <h1 className="hero-name">
            {displayName}
            <span className="typing-cursor">|</span>
          </h1>
          <p className="hero-tagline">{TAGLINE}</p>
          <p className="hero-bio">{BIO}</p>
          <p className="hero-hint"><em>Press <kbd>/</kbd> to jump around</em></p>
          <div className="hero-links">
            <a
              href="https://github.com/Aravind-BN"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-link"
              aria-label="GitHub"
            >
              <i className="fab fa-github" />
            </a>
            <a
              href="https://www.linkedin.com/in/aravind-nandakumar-a8ba05226/"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-link"
              aria-label="LinkedIn"
            >
              <i className="fab fa-linkedin-in" />
            </a>
            <a href="mailto:aravindbn54@gmail.com" className="hero-link" aria-label="Email">
              <i className="fas fa-envelope" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;