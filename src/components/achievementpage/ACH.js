import React from 'react';
import './ACH.css';

const achievementsData = [
  {
    title: "44th C.B. Paul Science Quiz",
    description: "Individual Participation",
    duplicates: 1 // Adjust as needed
  },
  {
    title: "Stem Seeds Social Innovators of the Future Workshop on Battling Climate Change with Technologies (SIT)",
    description: "Completed, 3rd Place",
    duplicates: 1 // Adjust as needed
  },
  {
    title: "CCC - CDC EDUCATION MERIT AWARD",
    description: "2020 Primary 6, 2019 Primary 5, 2018 Primary 4, 2017 Primary 3",
    duplicates: 4 // Adjust as needed
  },
  {
    title: "EDUSAVE CERTIFICATE OF ACADEMIC ACHIEVEMENT",
    description: "2020 Primary 6, 2019 Primary 5, 2018 Primary 4, 2017 Primary 3",
    duplicates: 4 // Adjust as needed
  },
  {
    title: "SASMO (Singapore & Asian Schools Math Olympiad)",
    description: "Certificate of Participation",
    duplicates: 1 // Adjust as needed
  },
  {
    title: "Perse Competition",
    description: "Round 1 Distinction, Round 2 Higher Participation",
    duplicates: 1 // Adjust as needed
  },
  {
    title: "AI for Literacy (Literacy in AI)",
    description: "Done",
    duplicates: 1 // Adjust as needed
  }
];

function ACH() {
  return (
    <div className="screenach">
      <div className="computingprojects">
        <h3>Computing Projects</h3>
      </div>
      <div className="achievements-list">
        {achievementsData.map((achievement, index) => (
          <div className="achievement" key={index}>
            <div className="achievement-details">
              <h3 className="achievement-title">{achievement.title}</h3>
              <p className="achievement-description">{achievement.description}</p>
              {achievement.duplicates > 1 && <span className="duplicate-indicator">x{achievement.duplicates}</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ACH;
