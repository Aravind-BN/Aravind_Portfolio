import React from 'react';
import './Footer.css';


function Footer() {
  return (
    <div className='footer-container'>
      <div className="social-media">
        <div className="social-media-wrap">
          <small className="website-rights">
            © {new Date().getFullYear()} Aravind. All rights reserved.
          </small>
          <div className="social-icons">
            <a
              className="social-icon-link facebook"
              href="https://www.facebook.com/profile.php?id=100077464941267&mibextid=ZbWKwL"
              target="_blank"
              rel="noopener noreferrer"
              aria-label='Facebook'
            >
              <i className="fab fa-facebook-f" />
            </a>
            <a
              className="social-icon-link instagram"
              href="https://www.instagram.com/ar4v1nd_notc00l/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label='Instagram'
            >
              <i className="fab fa-instagram" />
            </a>
            <a
              className="social-icon-link twitter"
              href="https://twitter.com/ar4v1ndn0tc00l?t=W68lynDF23K7Mqo71K0O8w&s=09"
              target="_blank"
              rel="noopener noreferrer"
              aria-label='Twitter'
            >
              <i className="fab fa-twitter" />
            </a>
            <a
              className="social-icon-link Linkedin"
              href="https://www.linkedin.com/in/aravind-nandakumar-a8ba05226/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label='Linkedin'
            >
              <i className="fab fa-linkedin" />
            </a>
            <a
              className="social-icon-link Youtube"
              href="https://www.youtube.com/channel/UCI8E8HlfkpdE3rXRENx1bzQ"
              target="_blank"
              rel="noopener noreferrer"
              aria-label='Youtube'
            >
              <i className="fab fa-youtube" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
