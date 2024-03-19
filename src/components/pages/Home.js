import React from 'react';
import './Home.css';
import ME from '../../images/img-home2.png';

function Home() {
  return (
    <section className="home">
      <div className="home-content">
          <h3 className="monkey">Aspiring Student Leader</h3>
          <h3 className="intro">Hi! I'm<span>           Aravind</span></h3>
          <blockquote className="typing-section">
            <p className="typing-animation"> # I like coding and creating stuff on the internet... </p>
          </blockquote>
          <div className="social-media">
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
          </div>
      </div>
      <div className="home-img">
        <img src={ME} className="mypic" alt="My Pic" />
      </div>
    </section>

  );
}

export default Home;
