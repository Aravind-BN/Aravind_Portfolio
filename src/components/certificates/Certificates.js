import React, { useState, useMemo, useCallback, memo } from 'react';
import placeholder from '../../images/placeholder';
import './Certificates.css';
import useInView from '../../hooks/useInView';

const FILTERS = ['all', 'technical', 'cybersecurity', 'interpersonal'];

// credlyUrl: separate field so subtitle stays clean
const CERTIFICATES = [
  // ── Technical (tech, math, science) ─────────────────────────────────────
  {
    title: 'Perse Competition',
    subtitle: 'Round 1 Distinction, Round 2 Higher Participation',
    issuer: 'The Perse School',
    image: require('../../images/Aravind_.jpeg'),
    categories: ['technical'],
    year: '2023',
    credlyUrl: null,
  },
  {
    title: 'SASMO',
    subtitle: 'Certificate of Participation',
    issuer: 'SASMO',
    image: require('../../images/Aravind_SASMO.jpeg'),
    categories: ['technical'],
    year: '2023',
    credlyUrl: null,
  },
  {
    title: "Hwa Chong Institution's 28th Edition Student Leaders Convention 2023",
    subtitle: 'Certificate of Participation',
    issuer: 'Hwa Chong Institution',
    image: require('../../images/aravind_hci.jpeg'),
    categories: ['interpersonal'],
    year: '2023',
    credlyUrl: null,
  },
  {
    title: 'C.B. Paul Science Quiz',
    subtitle: 'Individual Participation',
    issuer: 'Anglo-Chinese School',
    image: require('../../images/Aravind_CBPaul.jpeg'),
    categories: ['technical'],
    year: '2023',
    credlyUrl: null,
  },
  {
    title: 'AI for Literacy',
    subtitle: 'Literacy in AI',
    issuer: 'AI Singapore',
    image: require('../../images/Aravind_AI.jpeg'),
    categories: ['technical'],
    year: '2024',
    credlyUrl: null,
  },
  {
    title: 'Google AI Essentials Specialization',
    subtitle: null,
    issuer: 'Google',
    image: require('../../images/Aravind_Google.png'),
    categories: ['technical'],
    year: '2025',
    credlyUrl: null,
  },
  {
    title: 'Edusave Certificate of Academic Achievement',
    subtitle: null,
    issuer: 'Ministry of Education',
    image: require('../../images/Aravind_AcademicAcheivement.jpg'),
    categories: ['technical'],
    year: '2017, 2018, 2019, 2020',
    credlyUrl: null,
  },
  {
    title: 'Stem Seeds Social Innovators (SIT)',
    subtitle: '3rd Place',
    issuer: 'Singapore Institute of Technology',
    image: require('../../images/Aravind_SITImage.jpg'),
    categories: ['technical'],
    year: '2024',
    credlyUrl: null,
  },
  {
    title: 'CSIT Diploma Scholarship',
    subtitle: null,
    issuer: 'CSIT',
    image: require('../../images/csit.png'),
    categories: ['technical'],
    year: '2025',
    credlyUrl: null,
  },
  {
    title: "Ngee Ann Polytechnic Director's List Sem 1.1",
    subtitle: 'Awarded for the top 10% of the cohort',
    issuer: 'Ngee Ann Polytechnic',
    image: require('../../images/directorlist.png'),
    categories: ['technical'],
    year: '2025',
    credlyUrl: null,
  },
  {
    title: 'PowerShell: Automating IT Administration',
    subtitle: 'LinkedIn Online Certification',
    issuer: 'LinkedIn',
    image: require('../../images/Aravind_PowerShell.png'),
    categories: ['technical'],
    year: '2026',
    credlyUrl: null,
  },
  {
    title: 'Using Generative AI to Secure the Network',
    subtitle: 'LinkedIn Online Certification',
    issuer: 'LinkedIn',
    image: require('../../images/Aravind_GenAI_Network.png'),
    categories: ['technical'],
    year: '2026',
    credlyUrl: null,
  },

  // ── Cybersecurity ────────────────────────────────────────────────────────
  {
    title: 'Google Cybersecurity Certificate',
    subtitle: null,
    issuer: 'Coursera & Google',
    image: require('../../images/Aravind_CyberSecurityGoogle_Cert.png'),
    categories: ['cybersecurity', 'technical'],
    year: '2026',
    credlyUrl: 'https://www.credly.com/badges/8e1a7770-1f84-45e0-bde4-9918da8cb2be/linked_in_profile',
  },
  {
    title: 'Cybersecurity Fundamentals',
    subtitle: null,
    issuer: 'IBM',
    image: require('../../images/Aravind_IBM.png'),
    categories: ['cybersecurity'],
    year: '2025',
    credlyUrl: 'https://www.credly.com/badges/0592a424-e61c-4f89-a35d-cbe38b97686a/linked_in_profile',
  },
  {
    title: 'CISCO Packet Tracer',
    subtitle: null,
    issuer: 'Cisco',
    image: require('../../images/Aravind_CISCOPKT.png'),
    categories: ['cybersecurity', 'technical'],
    year: '2025',
    credlyUrl: null,
  },
  {
    title: 'Learning Windows Subsystem for Linux',
    subtitle: 'LinkedIn Online Certification',
    issuer: 'LinkedIn',
    image: require('../../images/Aravind_Linux.png'),
    categories: ['cybersecurity', 'technical'],
    year: '2026',
    credlyUrl: null,
  },

  // ── Interpersonal / Leadership ───────────────────────────────────────────
  {
    title: 'Edusave Award for Achievement, Good Leadership and Service (EAGLES) 2023',
    subtitle: 'Issued for demonstrating leadership qualities, service to community and schools, excellence in non-academic activities, and good conduct.',
    issuer: 'Ministry of Education',
    image: require('../../images/Eagles.jpeg'),
    categories: ['interpersonal'],
    year: '2023',
    credlyUrl: null,
  },
  {
    title: 'CCC–CDC Education Merit Award',
    subtitle: null,
    issuer: 'Ministry of Education',
    image: require('../../images/Aravind_EducationMerit.jpg'),
    categories: ['interpersonal'],
    year: '2017, 2018, 2019, 2020',
    credlyUrl: null,
  },
  {
    title: 'SST Outstanding Leadership Award (House)',
    subtitle: 'Issued for the contributions to House',
    issuer: 'SST',
    image: require('../../images/sola.png'),
    categories: ['interpersonal'],
    year: '2025',
    credlyUrl: null,
  },
];

const ISSUER_COLORS = {
  Google: { bg: 'rgba(66,133,244,0.12)', color: '#4285f4', border: 'rgba(66,133,244,0.28)' },
  Cisco: { bg: 'rgba(0,188,212,0.12)', color: '#00bcd4', border: 'rgba(0,188,212,0.28)' },
  IBM: { bg: 'rgba(34,126,230,0.12)', color: '#227ee6', border: 'rgba(34,126,230,0.28)' },
  Microsoft: { bg: 'rgba(0,164,239,0.12)', color: '#00a4ef', border: 'rgba(0,164,239,0.28)' },
  'AI Singapore': { bg: 'rgba(167,139,250,0.12)', color: '#a78bfa', border: 'rgba(167,139,250,0.28)' },
  'Ministry of Education': { bg: 'rgba(52,211,153,0.12)', color: '#34d399', border: 'rgba(52,211,153,0.28)' },
  'The Perse School': { bg: 'rgba(251,191,36,0.12)', color: '#fbbf24', border: 'rgba(251,191,36,0.28)' },
  SASMO: { bg: 'rgba(251,113,133,0.12)', color: '#fb7185', border: 'rgba(251,113,133,0.28)' },
  'Anglo-Chinese School': { bg: 'rgba(253,186,116,0.12)', color: '#fdba74', border: 'rgba(253,186,116,0.28)' },
  'Singapore Institute of Technology': { bg: 'rgba(129,140,248,0.12)', color: '#818cf8', border: 'rgba(129,140,248,0.28)' },
  LinkedIn: { bg: 'rgba(10,102,194,0.12)', color: '#0a66c2', border: 'rgba(10,102,194,0.30)' },
  'Coursera & Google': { bg: 'rgba(66,133,244,0.12)', color: '#4285f4', border: 'rgba(66,133,244,0.28)' },
  CSIT: { bg: 'rgba(251,146,60,0.12)', color: '#fb923c', border: 'rgba(251,146,60,0.28)' },
  SST: { bg: 'rgba(220,38,38,0.12)', color: '#f87171', border: 'rgba(220,38,38,0.30)' },
  'Ngee Ann Polytechnic': { bg: 'rgba(37,99,235,0.10)', color: '#f0c940', border: 'rgba(234,179,8,0.35)' },
  'Hwa Chong Institution': { bg: 'rgba(159, 26, 17, 0.1)', color: 'rgb(230, 78, 67)', border: 'rgba(224, 87, 87, 0.35)' },
};

const FALLBACK_ISSUER_STYLE = {
  bg: 'rgba(161,161,170,0.1)',
  color: '#a1a1aa',
  border: 'rgba(161,161,170,0.2)',
};

// ── Modal ────────────────────────────────────────────────────────────────────
const ImageModal = memo(function ImageModal({ src, title, onClose }) {
  return (
    <div className="cert-modal-overlay" onClick={onClose}>
      <div className="cert-modal-content" onClick={(e) => e.stopPropagation()}>
        <img
          src={src}
          alt={title}
          onError={(e) => {
            e.target.src = placeholder;
          }}
          className="cert-modal-image"
        />
        <button className="cert-modal-close" onClick={onClose} aria-label="Close">
          ✕
        </button>
      </div>
    </div>
  );
});

// ── Certificate card (memoized — opening/closing the modal or changing the
// filter no longer re-renders cards whose own props haven't changed) ───────
const CertCard = memo(function CertCard({ item, onExpand }) {
  const issuerStyle = ISSUER_COLORS[item.issuer] || FALLBACK_ISSUER_STYLE;

  return (
    <div className="cert-card">
      <div className="cert-card-info">
        <p className="cert-title">{item.title}</p>

        {item.subtitle && <p className="cert-subtitle">{item.subtitle}</p>}

        {item.credlyUrl && (
          <a href={item.credlyUrl} target="_blank" rel="noopener noreferrer" className="cert-credly-link">
            <span aria-hidden="true">🏅</span> View Credly badge ↗
          </a>
        )}

        <div className="cert-meta-row">
          <span
            className="cert-issuer-badge"
            style={{ background: issuerStyle.bg, color: issuerStyle.color, borderColor: issuerStyle.border }}
          >
            {item.issuer}
          </span>
          <span className="cert-year">{item.year}</span>
        </div>
      </div>

      {item.image && (
        <button
          type="button"
          className="cert-thumb-btn"
          onClick={() => onExpand(item)}
          title="View full image"
          aria-label={`View full image for ${item.title}`}
        >
          <span className="cert-thumb">
            <img
              src={item.image}
              alt=""
              onError={(e) => {
                e.target.src = placeholder;
              }}
            />
          </span>
          <span className="cert-thumb-overlay" aria-hidden="true">
            ⤢
          </span>
        </button>
      )}
    </div>
  );
});

// ── Main ─────────────────────────────────────────────────────────────────────
function Certificates() {
  const [filter, setFilter] = useState('all');
  const [modal, setModal] = useState(null);
  const [ref, inView] = useInView();

  const filtered = useMemo(() => {
    if (filter === 'all') return CERTIFICATES;
    return CERTIFICATES.filter((c) => c.categories.includes(filter));
  }, [filter]);

  const handleExpand = useCallback((item) => {
    setModal({ src: item.image, title: item.title });
  }, []);

  const closeModal = useCallback(() => setModal(null), []);

  return (
    <section
      id="certificates"
      ref={ref}
      className={`page-section certificates-section reveal${inView ? ' in-view' : ''}`}
    >
      <h2 className="section-heading">~/certificates</h2>

      <div className="cert-filters">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`cert-filter-btn${filter === f ? ' active' : ''}`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="cert-list">
        {filtered.map((item, idx) => (
          <CertCard key={`${item.title}-${item.subtitle}-${idx}`} item={item} onExpand={handleExpand} />
        ))}
      </div>

      {modal && <ImageModal src={modal.src} title={modal.title} onClose={closeModal} />}
    </section>
  );
}

export default Certificates;