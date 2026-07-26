import React, { useState, useEffect, useRef } from 'react';
import placeholder from '../../images/placeholder';
import './Home.css';

const NAME = 'Aravind Nandakumar';
const TAGLINE = 'CSIT Scholar · Co-Founder of GrowCalth · Student @ Ngee Ann Polytechnic';
const BIO =
  'Passionate cybersecurity student focused on ethical hacking and digital forensics. I aspire to strengthen cyber defense systems and contribute to a safer, more secure digital future.';
const TYPE_INTERVAL_MS = 80;

const INITIAL_KEY = 13;
const DECRYPT_STEP_MS = 500;

function caesarEncrypt(text, shift) {
  return text
    .split('')
    .map((ch) => {
      const code = ch.charCodeAt(0);
      // Uppercase A-Z
      if (code >= 65 && code <= 90) {
        return String.fromCharCode(((code - 65 + shift) % 26) + 65);
      }
      // Lowercase a-z
      if (code >= 97 && code <= 122) {
        return String.fromCharCode(((code - 97 + shift) % 26) + 97);
      }
      return ch;
    })
    .join('');
}

function Home() {
  const [displayName, setDisplayName] = useState('');
  const [bioDisplay, setBioDisplay] = useState('');
  const [currentKey, setCurrentKey] = useState(INITIAL_KEY);
  const [bioStatus, setBioStatus] = useState('ENCRYPTED');
  const [bioStarted, setBioStarted] = useState(false);
  const intervalRef = useRef(null);

  // Name typing effect
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      i += 1;
      setDisplayName(NAME.slice(0, i));
      if (i >= NAME.length) clearInterval(interval);
    }, TYPE_INTERVAL_MS);
    return () => clearInterval(interval);
  }, []);

  // Initialize bio as Caesar-13 ciphertext
  useEffect(() => {
    setBioDisplay(caesarEncrypt(BIO, INITIAL_KEY));
  }, []);

  // Start decryption after name finishes typing
  useEffect(() => {
    const delay = NAME.length * TYPE_INTERVAL_MS + 400;
    const timer = setTimeout(() => setBioStarted(true), delay);
    return () => clearTimeout(timer);
  }, []);

  // Decrypt animation: reduce key from 13 → 0
  useEffect(() => {
    if (!bioStarted) return;

    setBioStatus('DECRYPTING...');
    let key = INITIAL_KEY;

    intervalRef.current = setInterval(() => {
      key -= 1;

      if (key < 0) {
        key = 0;
        setBioDisplay(caesarEncrypt(BIO, 0));
        setCurrentKey(0);
        setBioStatus('DECRYPTED');
        clearInterval(intervalRef.current);
        return;
      }

      setBioDisplay(caesarEncrypt(BIO, key));
      setCurrentKey(key);
    }, DECRYPT_STEP_MS);

    return () => clearInterval(intervalRef.current);
  }, [bioStarted]);

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
          <div className="hero-bio-wrap">
            <div className="hero-bio-header">
              <span className="hero-bio-tag">[caesar cipher]</span>
              <span className={`hero-bio-status${bioStatus === 'DECRYPTED' ? ' done' : ''}`}>
                {bioStatus}
              </span>
              <span className="hero-bio-key">key: {currentKey}</span>
            </div>
            <p className="hero-bio">{bioDisplay || ' '}</p>
          </div>
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
