import React, { useState } from 'react';
import './Aboutsection.css'; // Import the CSS file for styling
import img from '../../images/man-user.png';
import img2 from '../../images/img-2.jpg';

function Aboutsection() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleButtonClick = (category) => {
    setSelectedCategory(category);
  };

  const renderTextForCategory = () => {
    switch (selectedCategory) {
      case 'skills':
        return (
          <div className="popup-text">
            <p>Leadership</p>
            <ul>
              <h6>Collaboration</h6>
              <h6>Communication</h6>
              <h6>Modeling the way</h6>
              <h6>Inspiring a Shared Vision</h6>
            </ul>
            <p>Check out more of my skills in the "Hobbies" Page</p>
          </div>
        );
      case 'education':
        return (
          <div className="popup-text">
            <p>2021 - Current</p>
            <ul>
              <h6>School of Science and Technology, SST</h6>
              {/* Add more schools or details as needed */}
            </ul>
            <p>2015 to 2020</p>
            <ul>
              <h6>West Grove Primary School</h6>
              {/* Add more schools or details as needed */}
            </ul>
          </div>
        );
      case 'achievements':
        return (
          <div className="popup-text">
            <p>Infocomm Technology</p>
            <ul>
              <h6>Perse Competition Round 1 Distinction, Round 2 Higher Participation</h6>
              <h6>AI for Literacy (Literacy in AI)</h6>
              <h6>Stem Seeds Social Innovators of the Future Workshop on Battling Climate CHange with Technologies (SIT), 3rd Place Overall</h6>
            </ul>
            <p>Check out more achievements in the "Achievements" Page</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className='home-container'>
      <div className='intro-container'>
        <div className="about-col-1">
          <img src={img2} alt="Aravind" className="aravind-face-2" />
        </div>
        <div className="about-col-2">
          <div className="topic">
            <img src={img} alt="User Icon" className="user-icon" />
            <h1 className='heading'>About Me</h1>
          </div>
          <div className="about-text">
            <div className="line"></div>
            <p>
              Hello! I'm Bellam Nandakumar Aravind, a passionate coder based in Singapore.
              I love football, coding and trying out various new stuff, and I'm dedicated to performing my best no matter the situation.
              Explore my portfolio to learn more about my journey and skills.
            </p>
          </div>
          <div className="buttons-container">
            <button onClick={() => handleButtonClick('skills')} className="button">Skills</button>
            <button onClick={() => handleButtonClick('education')} className="button">Education</button>
            <button onClick={() => handleButtonClick('achievements')} className="button">Achievements</button>
          </div>
          {renderTextForCategory()}
        </div>
      </div>
      {/* Add other sections or components as needed */}
    </div>
  );
}

export default Aboutsection;
