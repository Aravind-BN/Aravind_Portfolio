import React, { useState, useMemo } from 'react';
import placeholder from '../../images/placeholder';

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
  'Google':                             { bg: 'rgba(66,133,244,0.12)',   color: '#4285f4', border: 'rgba(66,133,244,0.28)' },
  'Cisco':                              { bg: 'rgba(0,188,212,0.12)',    color: '#00bcd4', border: 'rgba(0,188,212,0.28)' },
  'IBM':                                { bg: 'rgba(34,126,230,0.12)',   color: '#227ee6', border: 'rgba(34,126,230,0.28)' },
  'Microsoft':                          { bg: 'rgba(0,164,239,0.12)',    color: '#00a4ef', border: 'rgba(0,164,239,0.28)' },
  'AI Singapore':                       { bg: 'rgba(167,139,250,0.12)', color: '#a78bfa', border: 'rgba(167,139,250,0.28)' },
  'Ministry of Education':              { bg: 'rgba(52,211,153,0.12)',  color: '#34d399', border: 'rgba(52,211,153,0.28)' },
  'The Perse School':                   { bg: 'rgba(251,191,36,0.12)',  color: '#fbbf24', border: 'rgba(251,191,36,0.28)' },
  'SASMO':                              { bg: 'rgba(251,113,133,0.12)', color: '#fb7185', border: 'rgba(251,113,133,0.28)' },
  'Anglo-Chinese School':               { bg: 'rgba(253,186,116,0.12)', color: '#fdba74', border: 'rgba(253,186,116,0.28)' },
  'Singapore Institute of Technology':  { bg: 'rgba(129,140,248,0.12)', color: '#818cf8', border: 'rgba(129,140,248,0.28)' },
  'LinkedIn':                           { bg: 'rgba(10,102,194,0.12)',  color: '#0a66c2', border: 'rgba(10,102,194,0.30)' },
  'Coursera & Google':                  { bg: 'rgba(66,133,244,0.12)',  color: '#4285f4', border: 'rgba(66,133,244,0.28)' },
  'CSIT':                               { bg: 'rgba(251,146,60,0.12)',  color: '#fb923c', border: 'rgba(251,146,60,0.28)' },
  'SST':                                { bg: 'rgba(220,38,38,0.12)',   color: '#f87171', border: 'rgba(220,38,38,0.30)' },
  'Ngee Ann Polytechnic':               { bg: 'rgba(37,99,235,0.10)',   color: '#f0c940', border: 'rgba(234,179,8,0.35)' },
  'Hwa Chong Institution':               { bg: 'rgba(159, 26, 17, 0.1)',   color: 'rgb(230, 78, 67)', border: 'rgba(224, 87, 87, 0.35)' },
};

const CATEGORY_COLORS = {
  technical:     { bg: 'rgba(167,139,250,0.12)', color: '#a78bfa', border: 'rgba(167,139,250,0.25)' },
  cybersecurity: { bg: 'rgba(251,113,133,0.12)', color: '#fb7185', border: 'rgba(251,113,133,0.25)' },
  interpersonal: { bg: 'rgba(52,211,153,0.12)',  color: '#34d399', border: 'rgba(52,211,153,0.25)' },
};

// ── Modal ────────────────────────────────────────────────────────────────────
function ImageModal({ src, title, onClose }) {
  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'rgba(0,0,0,0.85)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '1.5rem',
        backdropFilter: 'blur(6px)',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          position: 'relative',
          maxWidth: '90vw', maxHeight: '90vh',
          borderRadius: '12px', overflow: 'hidden',
          border: '1px solid rgba(255,255,255,0.1)',
          boxShadow: '0 32px 80px rgba(0,0,0,0.6)',
        }}
      >
        <img
          src={src}
          alt={title}
          onError={e => { e.target.src = placeholder; }}
          style={{ display: 'block', maxWidth: '90vw', maxHeight: '85vh', objectFit: 'contain' }}
        />
        <button
          onClick={onClose}
          style={{
            position: 'absolute', top: '0.75rem', right: '0.75rem',
            width: '32px', height: '32px', borderRadius: '50%',
            background: 'rgba(0,0,0,0.6)', border: '1px solid rgba(255,255,255,0.15)',
            color: '#e4e4e7', cursor: 'pointer', fontSize: '1rem',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          ✕
        </button>
      </div>
    </div>
  );
}

// ── Certificate card ─────────────────────────────────────────────────────────
function CertCard({ item, onExpand }) {
  const [hovered, setHovered] = useState(false);
  const issuerStyle = ISSUER_COLORS[item.issuer] || {
    bg: 'rgba(161,161,170,0.1)', color: '#a1a1aa', border: 'rgba(161,161,170,0.2)',
  };

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex', alignItems: 'center', gap: '1.25rem',
        background: hovered ? 'rgba(255,255,255,0.042)' : 'rgba(255,255,255,0.025)',
        border: `1px solid ${hovered ? 'rgba(167,139,250,0.18)' : 'rgba(255,255,255,0.06)'}`,
        borderRadius: '12px',
        padding: '1.1rem 1.25rem',
        transition: 'background 0.2s, border-color 0.2s, transform 0.2s',
        transform: hovered ? 'translateX(3px)' : 'translateX(0)',
        cursor: 'default',
      }}
    >
      {/* Left: title + subtitle + credly + year + issuer + category tags */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{
          fontSize: '1rem', fontWeight: 600,
          color: hovered ? '#f4f4f5' : '#e4e4e7',
          margin: 0, lineHeight: 1.4, transition: 'color 0.2s',
        }}>
          {item.title}
        </p>

        {item.subtitle && (
          <p style={{ fontSize: '0.85rem', color: '#a1a1aa', margin: '0.2rem 0 0', lineHeight: 1.4 }}>
            {item.subtitle}
          </p>
        )}

        {/* Credly link */}
        {item.credlyUrl && (
          <a
            href={item.credlyUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
              fontSize: '0.78rem', color: '#a78bfa', marginTop: '0.3rem',
              textDecoration: 'none',
              transition: 'color 0.15s',
            }}
            onMouseEnter={e => e.currentTarget.style.color = '#c4b5fd'}
            onMouseLeave={e => e.currentTarget.style.color = '#a78bfa'}
          >
            <span style={{ fontSize: '0.7rem' }}>🏅</span>
            View Credly badge ↗
          </a>
        )}

        {/* Year + issuer row */}
        <div style={{ marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.4rem', marginTop: '0.7rem' }}>
          <span style={{
            display: 'inline-block', alignSelf: 'flex-start',
            fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.03em',
            padding: '0.18rem 0.6rem', borderRadius: '4px', lineHeight: 1.7,
            background: issuerStyle.bg, color: issuerStyle.color,
            border: `1px solid ${issuerStyle.border}`,
          }}>
            {item.issuer}
          </span>
          <span style={{ fontSize: '0.78rem', color: '#52525b' }}>{item.year}</span>
        </div>
      </div>

      {/* Right: thumbnail (fully clickable) */}
      {item.image && (
        <div
          onClick={() => onExpand(item)}
          title="View full image"
          style={{ flexShrink: 0, position: 'relative', cursor: 'pointer' }}
        >
          <div style={{
            width: '90px', height: '90px', borderRadius: '9px', overflow: 'hidden',
            border: `1px solid ${hovered ? 'rgba(167,139,250,0.35)' : 'rgba(255,255,255,0.08)'}`,
            background: 'rgba(255,255,255,0.04)',
            transition: 'border-color 0.2s',
          }}>
            <img
              src={item.image}
              alt=""
              onError={e => { e.target.src = placeholder; }}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          </div>
          <div style={{
            position: 'absolute', inset: 0, borderRadius: '9px',
            background: 'rgba(0,0,0,0.35)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            opacity: hovered ? 1 : 0,
            transition: 'opacity 0.2s',
            fontSize: '1.1rem', color: '#fff',
          }}>
            ⤢
          </div>
        </div>
      )}
    </div>
  );
}

// ── Main ─────────────────────────────────────────────────────────────────────
function Certificates() {
  const [filter, setFilter] = useState('all');
  const [modal, setModal] = useState(null);

  const filtered = useMemo(() => {
    if (filter === 'all') return CERTIFICATES;
    return CERTIFICATES.filter(c => c.categories.includes(filter));
  }, [filter]);

  const FILTER_LABELS = {
    all: 'all',
    technical: 'technical',
    cybersecurity: 'cybersecurity',
    interpersonal: 'interpersonal',
  };

  return (
    <section id="certificates" className="page-section certificates-section">
      <h2 style={{
        fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.08em',
        textTransform: 'lowercase', color: '#a1a1aa', marginBottom: '1.5rem',
      }}>
        certificates
      </h2>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
        {FILTERS.map(f => {
          const active = filter === f;
          return (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                padding: '0.35rem 0.85rem',
                fontSize: '0.8rem', fontFamily: 'inherit',
                borderRadius: '6px', cursor: 'pointer',
                border: `1px solid ${active ? 'rgba(124,58,237,0.5)' : 'rgba(255,255,255,0.08)'}`,
                background: active ? 'rgba(124,58,237,0.12)' : 'rgba(255,255,255,0.04)',
                color: active ? '#a78bfa' : '#a1a1aa',
                transition: 'all 0.2s',
              }}
            >
              {FILTER_LABELS[f]}
            </button>
          );
        })}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', background: 'transparent' }}>
        {filtered.map((item, idx) => (
          <CertCard
            key={`${item.title}-${item.subtitle}-${idx}`}
            item={item}
            onExpand={item => setModal({ src: item.image, title: item.title })}
          />
        ))}
      </div>

      {modal && (
        <ImageModal src={modal.src} title={modal.title} onClose={() => setModal(null)} />
      )}
    </section>
  );
}

export default Certificates;