import React from 'react';
import './Stats.css';
import useInView from '../../hooks/useInView';

// Numbers pulled from real, already-documented milestones (Achievements /
// Certificates data) — nothing here is invented.
const STATS = [
  { value: '1,200+', label: 'GrowCalth users', detail: 'across 2 school-wide launches' },
  { value: '$5,000', label: 'Funding raised', detail: 'NP Sandbox grant for GrowCalth' },
  { value: '210M+', label: 'Steps tracked', detail: "through GrowCalth's Launch 2" },
  { value: '8+', label: 'Certifications earned', detail: 'cybersecurity, cloud & AI' },
];

function Stats() {
  const [ref, inView] = useInView();

  return (
    <section
      id="stats"
      ref={ref}
      className={`page-section stats-section reveal${inView ? ' in-view' : ''}`}
    >
      <h2 className="section-heading">~/impact</h2>
      <div className="stats-grid">
        {STATS.map((s, i) => (
          <div key={s.label} className="stat-card" style={{ transitionDelay: `${i * 80}ms` }}>
            <span className="stat-value">{s.value}</span>
            <span className="stat-label">{s.label}</span>
            <span className="stat-detail">{s.detail}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Stats;
