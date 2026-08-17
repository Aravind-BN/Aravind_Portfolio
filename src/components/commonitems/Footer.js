import React, { useState, useEffect } from 'react';
import './Footer.css';

function Footer() {
  const [solved, setSolved] = useState(() => {
    try { return localStorage.getItem('ctf-solved') === 'true'; } catch { return false; }
  });

  useEffect(() => {
    const onSolved = () => setSolved(true);
    window.addEventListener('ctf-solved', onSolved);
    return () => window.removeEventListener('ctf-solved', onSolved);
  }, []);

  return (
    <footer className="footer-container">
      <div className="social-media">
        <div className="social-media-wrap">
          <small className="website-rights">
            © {new Date().getFullYear()} Aravind. All rights reserved.
          </small>
          <span className="footer-ctf-hint">
            <span className="footer-ctf-bracket">[</span>
            <span className="footer-ctf-blink">{solved ? 'challenge solved' : 'hidden challenge on this site'}</span>
            <span className="footer-ctf-bracket">]</span>
            <span className="footer-ctf-key">
              {' '}— <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>F</kbd> {solved ? 'to reopen' : 'to begin'}
            </span>
          </span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
