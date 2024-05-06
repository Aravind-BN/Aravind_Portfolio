// ACH.js
import React from 'react';
import './ACH.css';
import CBPaul from '../../images/Aravind_CBPaul.jpeg';
import SITImage from '../../images/Aravind_SITImage.jpg';
import EducationMerit from '../../images/Aravind_AcademicAcheivement.jpg';
import AcademicAchievement from '../../images/Aravind_AcademicAcheivement.jpg';
import SASMO from '../../images/Aravind_SASMO.jpeg';
import Perse from '../../images/Aravind_.jpeg';
import AI from '../../images/Aravind_AI.jpeg';

function ACH() {
  return (
    <div className="achievements-container">
      <div className="achievement">
        <img src={CBPaul} alt="44th C.B. Paul Science Quiz" className="achievement-image" />
        <div className="achievement-details">
          <h3 className="achievement-title">44th C.B. Paul Science Quiz</h3>
          <p className="achievement-description">Individual Participation</p>
          <span className="duplicate-indicator">x1</span>
        </div>
      </div>
      <div className="achievement">
        <img src={SITImage} alt="Stem Seeds Social Innovators of the Future Workshop on Battling Climate Change with Technologies (SIT)" className="achievement-image" />
        <div className="achievement-details">
          <h3 className="achievement-title">Stem Seeds Social Innovators of the Future Workshop on Battling Climate Change with Technologies (SIT)</h3>
          <p className="achievement-description">Completed, 3rd Place</p>
          <span className="duplicate-indicator">x1</span>
        </div>
      </div>
      <div className="achievement">
        <img src={EducationMerit} alt="CCC - CDC Education Merit" className="achievement-image" />
        <div className="achievement-details">
          <h3 className="achievement-title">CCC - CDC EDUCATION MERIT AWARD</h3>
          <p className="achievement-description">2020 Primary 6, 2019 Primary 5, 2018 Primary 4, 2017 Primary 3</p>
          <span className="duplicate-indicator">x4</span>
        </div>
      </div>
      <div className="achievement">
        <img src={AcademicAchievement} alt="EDUSAVE CERTIFICATE OF ACADEMIC ACHIEVEMENT" className="achievement-image" />
        <div className="achievement-details">
          <h3 className="achievement-title">EDUSAVE CERTIFICATE OF ACADEMIC ACHIEVEMENT</h3>
          <p className="achievement-description">2020 Primary 6, 2019 Primary 5, 2018 Primary 4, 2017 Primary 3</p>
          <span className="duplicate-indicator">x4</span>
        </div>
      </div>
      <div className="achievement">
        <img src={SASMO} alt="SASMO (Singapore & Asian Schools Math Olympiad)" className="achievement-image" />
        <div className="achievement-details">
          <h3 className="achievement-title">SASMO (Singapore & Asian Schools Math Olympiad)</h3>
          <p className="achievement-description">Certificate of Participation</p>
          <span className="duplicate-indicator">x1</span>
        </div>
      </div>
      <div className="achievement">
        <img src={Perse} alt="Perse Competition" className="achievement-image" />
        <div className="achievement-details">
          <h3 className="achievement-title">Perse Competition</h3>
          <p className="achievement-description">Round 1 Distinction, Round 2 Higher Participation</p>
          <span className="duplicate-indicator">x2</span>
        </div>
      </div>
      <div className="achievement">
        <img src={AI} alt="AI for Literacy (Literacy in AI)" className="achievement-image" />
        <div className="achievement-details">
          <h3 className="achievement-title">AI for Literacy (Literacy in AI)</h3>
          <p className="achievement-description">Done</p>
          <span className="duplicate-indicator">x1</span>
        </div>
      </div>
    </div>
  );
}

export default ACH;
