import React from 'react';
import placeholder from '../../images/placeholder';
import './AchievementsTimeline.css';

/*
 * Timeline of achievements by year. Mainly text, optional images; may relate to projects or certificates.
 * Replace placeholder entries with your details later.
 */
const TIMELINE = [
  {
    year: '2024',
    items: [
      { text: 'Placeholder achievement or milestone for 2024.', image: null },
      { text: 'Another placeholder — e.g. competition, leadership, or project.', image: null },
    ],
  },
  {
    year: '2023',
    items: [
      { text: 'Placeholder for 2023 — e.g. SIT 3rd place, Blue House Vice-Captain.', image: null },
      { text: 'Optional: link to a project or certificate.', image: null },
    ],
  },
  {
    year: '2022',
    items: [
      { text: 'Placeholder for 2022.', image: null },
    ],
  },
  {
    year: '2021',
    items: [
      { text: 'Placeholder for 2021 — e.g. joined SST, DSA.', image: null },
    ],
  },
];

function TimelineItem({ item }) {
  const imgSrc = item.image ? (process.env.PUBLIC_URL + item.image) : null;
  return (
    <div className="timeline-achievement-item">
      {imgSrc && (
        <div className="timeline-achievement-image-wrap">
          <img src={imgSrc} alt="" onError={(e) => { e.target.src = placeholder; }} />
        </div>
      )}
      <p className="timeline-achievement-text">{item.text}</p>
    </div>
  );
}

function AchievementsTimeline() {
  return (
    <section className="page-section achievements-timeline-section">
      <h2 className="section-heading">achievements</h2>
      <p className="timeline-intro">Milestones and highlights by year. Add your details and optional images later.</p>
      <div className="timeline">
        {TIMELINE.map(({ year, items }) => (
          <div key={year} className="timeline-year-block">
            <h3 className="timeline-year">{year}</h3>
            <div className="timeline-year-items">
              {items.map((item, i) => (
                <TimelineItem key={`${year}-${i}`} item={item} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default AchievementsTimeline;
