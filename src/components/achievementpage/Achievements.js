import React from 'react';
import placeholder from '../../images/placeholder';
import './Achievements.css';

// Add your images to public/achievements/ and use paths like '/achievements/filename.jpg'
const ACHIEVEMENTS = [
  { title: '44th C.B. Paul Science Quiz — Individual Participation', image: '/achievements/cbpaul.jpeg' },
  { title: 'Stem Seeds Social Innovators (SIT) — 3rd Place', image: '/achievements/sit.jpeg' },
  { title: 'CCC–CDC Education Merit Award (2017–2020)', image: '/achievements/education-merit.jpeg' },
  { title: 'Edusave Certificate of Academic Achievement (2017–2020)', image: '/achievements/academic.jpeg' },
  { title: 'SASMO — Certificate of Participation', image: '/achievements/sasmo.jpeg' },
  { title: 'Perse Competition — Round 1 Distinction, Round 2 Higher Participation', image: '/achievements/perse.jpeg' },
  { title: 'AI for Literacy (Literacy in AI) — Completed', image: '/achievements/ai-literacy.jpeg' },
  { title: 'Blue House Vice-Captain & student leadership', image: null },
];

function AchievementItem({ item }) {
  const imgSrc = item.image ? process.env.PUBLIC_URL + item.image : null;
  return (
    <li className="achievement-item">
      <div className="achievement-content">
        {imgSrc && (
          <div className="achievement-image-wrap">
            <img
              src={imgSrc}
              alt=""
              onError={(e) => { e.target.src = placeholder; }}
            />
          </div>
        )}
        <span className="achievement-text">{item.title}</span>
      </div>
    </li>
  );
}

function Achievements() {
  return (
    <section id="achievements" className="page-section achievements-section">
      <h2 className="section-heading">achievements</h2>
      <ul className="achievement-list">
        {ACHIEVEMENTS.map((item) => (
          <AchievementItem key={item.title} item={item} />
        ))}
      </ul>
    </section>
  );
}

export default Achievements;
