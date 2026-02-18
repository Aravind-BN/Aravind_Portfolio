import React, { useState, useEffect } from 'react';
import './Navbar.css';

function Navbar() {
  const [click, setClick] = useState(false);

  const closeMobileMenu = () => setClick(false);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  useEffect(() => {
    const handleResize = () => { if (window.innerWidth > 960) setClick(false); };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <button type="button" className="navbar-logo" onClick={() => { closeMobileMenu(); scrollToSection('home'); }}>
          aravind
        </button>
        <div className="menu-icon" onClick={() => setClick(!click)} aria-label="Menu">
          <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
        </div>
        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
          <li><button type="button" className="nav-link" onClick={() => { closeMobileMenu(); scrollToSection('projects'); }}>projects</button></li>
          <li><button type="button" className="nav-link" onClick={() => { closeMobileMenu(); scrollToSection('achievements'); }}>achievements</button></li>
          <li><button type="button" className="nav-link" onClick={() => { closeMobileMenu(); scrollToSection('certificates'); }}>certificates</button></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
