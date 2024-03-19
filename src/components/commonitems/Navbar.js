import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import './styles.css';
import './background_styles.css';
import { FaRocket } from 'react-icons/fa'; 
import HomeScreen from '../pages/HomeScreen';
import MorePage from '../morepage/MorePage';
import Achievements from '../achievementpage/Achievements';
import LearnMore from '../morepage/LearnMore';
import Life from '../pages/Life';
import Projects from '../projectspage/Projects';



function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(window.innerWidth > 960);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
    window.addEventListener('resize', showButton);
    return () => {
      window.removeEventListener('resize', showButton);
    };
  }, []);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-menu">
          <Link to="/start" className="navbar-logo">
            Aravind
          </Link>
        </div>
        <div className="menu-icon" onClick={handleClick}>
          <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
        </div>
        <ul className={click ? 'nav-menu active nav-menu-mobile' : 'nav-menu'}>
          <li className ="nav-item">
            <Link to= "/projects" className = "nav-links" onClick = {closeMobileMenu}>
            Projects
            </Link>
            <Link to="/achievements" className="nav-links" onClick={closeMobileMenu}>
              Achievements
            </Link>
            <Link to="/life" className="nav-links" onClick={closeMobileMenu}>
              Hobbies
            </Link>
            <Link to="/more" className="nav-links" onClick={closeMobileMenu}>
              More
            </Link>
          </li>
          {button && (
            <li className="nav-item">
              <Link
                to="/learn-more"
                className="nav-links-mobile"
                onClick={closeMobileMenu}
              >
                Contact Me
              </Link>
            </li>
          )}
          {!button && (
            <li className="nav-item">
              <Link 
                to="/learn-more"
                className="nav-links-mobile"
              >
                Learn More
              </Link>
            </li>
          )}
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/start" element={<HomeScreen />} />
        <Route path="/more" element={<MorePage />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/achievements" element={<Achievements />} />
        <Route path="/learn-more" element={<LearnMore />} />
        <Route path="/life" element={<Life />} />
      </Routes>
    </>
  );
}

export default Navbar;
