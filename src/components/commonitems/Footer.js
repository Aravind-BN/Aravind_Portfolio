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
        </div>
      </div>
    </div>
  );
}

export default Footer;
