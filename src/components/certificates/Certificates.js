import React, { useState, useMemo } from 'react';
import placeholder from '../../images/placeholder';
import './Certificates.css';

// Match to images in public/images/ (e.g. Aravind_CBPaul.jpeg). Filter by category.
const FILTERS = ['all', 'technical', 'leadership', 'cybersecurity'];

const CERTIFICATES = [
  { title: 'Perse Competition — Round 1 Distinction, Round 2 Higher Participation', image: '/images/Aravind_.jpeg', category: 'technical' },
  { title: 'SASMO — Certificate of Participation', image: '/images/Aravind_SASMO.jpeg', category: 'technical' },
  { title: 'AI for Literacy (Literacy in AI)', image: '/images/Aravind_AI.jpeg', category: 'technical' },
  { title: 'Edusave Certificate of Academic Achievement', image: '/images/Aravind_AcademicAcheivement.jpg', category: 'technical' },
  { title: 'CCC–CDC Education Merit Award', image: '/images/Aravind_AcademicAcheivement.jpg', category: 'technical' },
  { title: 'C.B. Paul Science Quiz — Individual Participation', image: '/images/Aravind_CBPaul.jpeg', category: 'technical' },
  { title: 'Stem Seeds Social Innovators (SIT) — 3rd Place', image: '/images/Aravind_SITImage.jpg', category: 'technical' },
  { title: 'Blue House Vice-Captain / JHL', image: null, category: 'leadership' },
];

function CertItem({ item }) {
  const imgSrc = item.image ? process.env.PUBLIC_URL + item.image : null;
  return (
    <li className="cert-item">
      <div className="cert-content">
        {imgSrc && (
          <div className="cert-image-wrap">
            <img
              src={imgSrc}
              alt=""
              onError={(e) => { e.target.src = placeholder; }}
            />
          </div>
        )}
        <span className="cert-text">{item.title}</span>
      </div>
    </li>
  );
}

function Certificates() {
  const [filter, setFilter] = useState('all');

  const filtered = useMemo(() => {
    if (filter === 'all') return CERTIFICATES;
    return CERTIFICATES.filter((c) => c.category === filter);
  }, [filter]);

  return (
    <section id="certificates" className="page-section certificates-section">
      <h2 className="section-heading">certificates</h2>
      <div className="cert-filters">
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            className={`cert-filter-btn ${filter === f ? 'active' : ''}`}
            onClick={() => setFilter(f)}
          >
            {f === 'all' ? 'all' : f === 'technical' ? 'technical skills' : f === 'leadership' ? 'leadership' : 'cybersecurity'}
          </button>
        ))}
      </div>
      <ul className="cert-list">
        {filtered.map((item) => (
          <CertItem key={item.title} item={item} />
        ))}
      </ul>
    </section>
  );
}

export default Certificates;
