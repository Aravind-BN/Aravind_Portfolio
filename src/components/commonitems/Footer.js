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

  const reopen = () => window.dispatchEvent(new Event('ctf-reopen'));

  return (
    <footer className="footer-container">
      <div className="social-media">
        <div className="social-media-wrap">
          <small className="website-rights">
            © {new Date().getFullYear()} Aravind. All rights reserved.
          </small>
          {solved ? (
            <button type="button" className="footer-ctf-hint footer-ctf-hint--button" onClick={reopen}>
              <span className="footer-ctf-bracket">[</span>
              <span className="footer-ctf-blink">challenge solved</span>
              <span className="footer-ctf-bracket">]</span>
              <span className="footer-ctf-key"> · click to reopen</span>
            </button>
          ) : (
            <span className="footer-ctf-hint">
              <span className="footer-ctf-bracket">[</span>
              <span className="footer-ctf-blink">hidden challenge on this site</span>
              <span className="footer-ctf-bracket">]</span>
              <span className="footer-ctf-key">
                {' '}· <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>F</kbd> to begin
              </span>
            </span>
          )}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
