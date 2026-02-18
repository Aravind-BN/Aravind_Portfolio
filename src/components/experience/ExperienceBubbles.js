import React, { useState, useMemo } from 'react';
import './ExperienceBubbles.css';

const ExperienceBubbles = () => {
  const [revealed, setRevealed] = useState({
    certificates: false,
    schools: false,
    work: false,
  });

  const allRevealed = useMemo(
    () => Object.values(revealed).every(Boolean),
    [revealed]
  );

  const handleReveal = (key) => {
    setRevealed((prev) => ({ ...prev, [key]: true }));
  };

  return (
    <section id="highlights" className="experience-section">
      <div className="experience-header">
        <h2 className="experience-title">Highlights at a Glance</h2>
        <p className="experience-subtitle">
          Tap the bubbles to reveal my journey. When you&apos;ve unlocked every
          bubble, they gather to show the full story.
        </p>
      </div>

      <div
        className={
          'experience-bubbles-container' + (allRevealed ? ' all-revealed' : '')
        }
      >
        <div
          className={
            'experience-bubble bubble-certificates' +
            (revealed.certificates ? ' revealed' : '')
          }
        >
          <button
            type="button"
            className="bubble-inner"
            onClick={() => handleReveal('certificates')}
          >
            <span className="bubble-label">Certificates</span>
            {!revealed.certificates && (
              <span className="bubble-hint">Reveal</span>
            )}
          </button>
        </div>

        <div
          className={
            'experience-bubble bubble-schools' +
            (revealed.schools ? ' revealed' : '')
          }
        >
          <button
            type="button"
            className="bubble-inner"
            onClick={() => handleReveal('schools')}
          >
            <span className="bubble-label">Schools</span>
            {!revealed.schools && <span className="bubble-hint">Reveal</span>}
          </button>
        </div>

        <div
          className={
            'experience-bubble bubble-work' +
            (revealed.work ? ' revealed' : '')
          }
        >
          <button
            type="button"
            className="bubble-inner"
            onClick={() => handleReveal('work')}
          >
            <span className="bubble-label">Experience</span>
            {!revealed.work && <span className="bubble-hint">Reveal</span>}
          </button>
        </div>
      </div>

      <div className="experience-details">
        {(revealed.certificates || allRevealed) && (
          <div className="experience-card">
            <h3>Certificates & Achievements</h3>
            <ul>
              <li>44th C.B. Paul Science Quiz – Individual Participation</li>
              <li>
                Stem Seeds Social Innovators Workshop (SIT) – Completed, 3rd
                Place
              </li>
              <li>CCC–CDC Education Merit Award (2017–2020)</li>
              <li>
                Edusave Certificate of Academic Achievement (2017–2020)
              </li>
              <li>SASMO – Certificate of Participation</li>
              <li>Perse Competition – Round 1 Distinction, Round 2 Higher Participation</li>
              <li>AI for Literacy (Literacy in AI) – Completed</li>
            </ul>
          </div>
        )}

        {(revealed.schools || allRevealed) && (
          <div className="experience-card">
            <h3>Schools</h3>
            <ul>
              <li>
                School of Science and Technology, Singapore (2021 – Present)
              </li>
              <li>West Grove Primary School (2015 – 2020)</li>
            </ul>
          </div>
        )}

        {(revealed.work || allRevealed) && (
          <div className="experience-card">
            <h3>Experience</h3>
            <ul>
              <li>Blue House Vice-Captain & Student Leader</li>
              <li>Developer & Designer on community-focused SST Inc project</li>
              <li>Team-based STEM and computing competitions</li>
            </ul>
          </div>
        )}
      </div>
    </section>
  );
};

export default ExperienceBubbles;

