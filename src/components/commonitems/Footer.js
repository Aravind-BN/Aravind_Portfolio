import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer-container">
      <div className="social-media">
        <div className="social-media-wrap">
          <small className="website-rights">
            © {new Date().getFullYear()} Aravind. All rights reserved.
          </small>
          <span className="footer-ctf-hint">
            <span className="footer-ctf-bracket">[</span>
            <span className="footer-ctf-blink">access restricted</span>
            <span className="footer-ctf-bracket">]</span>
          </span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
