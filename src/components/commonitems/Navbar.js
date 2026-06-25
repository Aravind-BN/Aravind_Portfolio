import React, { useState, useEffect, useCallback } from 'react';
import './Navbar.css';

function Navbar() {
  const [click, setClick] = useState(false);

  const closeMobileMenu = useCallback(() => setClick(false), []);
  const toggleMobileMenu = useCallback(() => setClick((prev) => !prev), []);

  const scrollToSection = useCallback((id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 960) setClick(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <button
          type="button"
          className="navbar-logo"
          onClick={() => {
            closeMobileMenu();
            scrollToSection('home');
          }}
        >
          ~/aravind
        </button>
        <button
          type="button"
          className="menu-icon"
          onClick={toggleMobileMenu}
          aria-label="Toggle navigation menu"
          aria-expanded={click}
          aria-controls="primary-navigation"
        >
          <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
        </button>
        <ul id="primary-navigation" className={click ? 'nav-menu active' : 'nav-menu'}>
          <li>
            <button
              type="button"
              className="nav-link"
              onClick={() => {
                closeMobileMenu();
                scrollToSection('projects');
              }}
            >
              projects
            </button>
          </li>
          <li>
            <button
              type="button"
              className="nav-link"
              onClick={() => {
                closeMobileMenu();
                scrollToSection('achievements');
              }}
            >
              achievements
            </button>
          </li>
          <li>
            <button
              type="button"
              className="nav-link"
              onClick={() => {
                closeMobileMenu();
                scrollToSection('certificates');
              }}
            >
              certificates
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;