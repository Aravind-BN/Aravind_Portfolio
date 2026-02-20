import React, { useState } from 'react';
import './Projects.css';

const PROJECTS = [
  {
    id: 'growcalth',
    title: 'GrowCalth',
    href: 'https://github.com/cheesetan/growcalth-kotlin.git',
    websiteUrl: 'https://growcalth.com/',
    image: require('../../images/growcalth2.jpg'),
    role: 'Co-Founder & Lead Android Developer',
    description: [
      'GrowCalth is a mobile fitness app built for students by students with the aim of empowering students to live healthier lives, forging a stronger house spirit amongst students as well as to create a more connected community in school',
      'The app gamifies fitness by tying step counts to house points.',
      'Launched to over 1200 students with active daily engagement tracked via Firebase analytics.',
      'Has 2 successful launches in SST with increased engagement from the first year to second',
      'Have receieved funding from NP Sandbox worth $5000 and got our own office within Ngee Ann Polytechnic',
      'Initially started as a project in 2022, which my groupmates and I have been continously working on for the past 4 years.'
    ],
    contributions: [
      'Implemented GoogleFit Integration into Android App.',
      'Worked on front-end UI and integration with backend services in the Android side.',
      "Created GrowCalth's very own pedometer that doesn't depend on steps calculated from other apps.",
    ],
    tech: ['Kotlin', 'Google Firebase', 'GoogleFit Integration'],
  },
  {
    id: 'canteen',
    title: 'Can+een',
    href: 'https://github.com/TheshyanTTT/Comp-Coursework',
    websiteUrl: 'https://sites.google.com/sst.edu.sg/cp-coursework-gallery/2024/can-een?authuser=0',
    image: require('../../images/projects/canteen.png'),
    role: 'Front-end Developer',
    description: [
      "At SST, the canteen stall owners face significant business losses due to the school's small size, leading to long queues and extended waiting times for students during their breaks. To solve this, we created an app that facilitates communication between SST students/staff and canteen stall owners. Students & Staff can seamlessly communicate placed orders to canteen stall owners before break times, which allows stall owners to prepare the orders in advance, thus being able to earn more efficiently and mitigate the issue of long queues and waiting times..",
      'Created for my SST Computing + 2024 Coursework Project.',
      'Co-developed by Theshyan Thirun and Timothy Tan.',
    ],
    contributions: [
      'Validations for the entire app.',
      'Basic UI for the app, consisting of widgets for users to sign in respectively.',
      'Displaying menu for students to order from as well as displaying orders derived from Order.txt and order submission handling.',
      'Helped prepare and deliver the presentation and demo.',
    ],
    tech: ['Python', 'HTML', 'TKinter'],
  },
  {
    id: 'crypto',
    title: 'Apple Pay Cryptography Mockup',
    href: 'https://github.com/Aravind-BN/Crypto-Assignment',
    websiteUrl: null,
    image: require('../../images/projects/crypto.png'),
    role: 'Developer',
    description: [
      'A research-driven prototype that simulates Apple Pay\'s cryptographic payment flow using post-quantum algorithms.',
      'Built to explore how modern payment systems can be hardened against quantum computing threats.',
      'Demonstrates end-to-end key encapsulation and authenticated encryption in a payment context.',
      'Cryptographic Algorithms used: ChaCha20-Poly1305 and CRYSTALS-Kyber',
      'Project for cryptography module in Ngee Ann Polytechnic 1.2'
    ],
    contributions: [
      'Built a prototype flow that mimics Apple Pay style payments.',
      'Implemented CRYSTALS-Kyber for key encapsulation and ChaCha20‑Poly1305 for authenticated encryption.',
      'Worked on the UI for the entire app, and displayed the necessary keys and other details',
      'Helped prepare and deliver the presentation and demo.',
    ],
    tech: ['Python', 'CRYSTALS‑Kyber', 'ChaCha20‑Poly1305', 'HTML', 'Cryptography'],
  },
  {
    id: 'technogates',
    title: 'Project Technogates (SIT)',
    href: null,
    websiteUrl: null,
    images: [
      require('../../images/projects/sitimage.png'),
      require('../../images/projects/sitimage2.jpeg'),
      require('../../images/projects/sitimage3.jpeg'),
      require('../../images/projects/sitimage4.jpeg'),
      require('../../images/projects/sitimage5.jpeg'),
    ],
    videos: [
      require('../../images/projects/sitvid.mp4'),
      require('../../images/projects/sitvid2.mp4'),
    ],
    role: 'Lead Developer',
    description: [
      'A climate-focused innovation project presented at the Singapore Institute of Technology (SIT).',
      'The team ideated and prototyped a solution addressing urban environmental challenges.',
      'Selected to present at SIT\'s STEM Seeds Social Innovaters of the Future workshop on Battling Climate Change with Technology (2024), as part of a competitive cohort.',
    ],
    contributions: [
      'Contributed to concept and prototype for a climate‑focused solution.',
      'Helped prepare and deliver the presentation and demo at SIT.',
    ],
    tech: ['React', 'Sensor Data Integration', 'Presentation', 'Teamwork', 'Engineering'],
  },
];

// ── SVG Icons ───────────────────────────────────────────────
const GitHubIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const ExternalIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

function resolveUrl(src) {
  return typeof src === 'string' ? process.env.PUBLIC_URL + src : src;
}

// ── Media renderer ──────────────────────────────────────────
// Case 1: project.images array → responsive grid of images + optional video
// Case 2: project.image (single) → image card with action buttons overlay
// Case 3: neither → renders nothing (text links shown separately)
function ProjectMedia({ project }) {
  // Multi-image/video grid
  if (project.images) {
    return (
      <div className="project-media-grid">
        {project.images.map((src, i) => (
          <div key={i} className="project-media-cell">
            <img
              src={resolveUrl(src)}
              alt={`${project.title} ${i + 1}`}
              className="project-media-img"
            />
          </div>
        ))}
        {project.videos && project.videos.map((src, i) => (
          <div key={i} className="project-media-cell project-media-cell--video">
            <video
              src={resolveUrl(src)}
              className="project-media-video"
              controls
              playsInline
              preload="metadata"
            />
          </div>
        ))}
      </div>
    );
  }

  // Single image with action buttons
  if (project.image) {
    return (
      <div className="project-image-wrap">
        <img src={resolveUrl(project.image)} alt={project.title} className="project-image" />
        <div className="project-image-actions">
          {project.href && (
            <a href={project.href} target="_blank" rel="noopener noreferrer" className="project-action-btn" title="GitHub">
              <GitHubIcon />
            </a>
          )}
          {project.websiteUrl && (
            <a href={project.websiteUrl} target="_blank" rel="noopener noreferrer" className="project-action-btn" title="Live site">
              <ExternalIcon />
            </a>
          )}
        </div>
      </div>
    );
  }

  return null;
}

// ── Project row ─────────────────────────────────────────────
function ProjectRow({ project, expanded, onToggle }) {
  const hasMedia = project.image || project.images;

  return (
    <li className={`project-item${expanded ? ' expanded' : ''}`}>
      <button
        className="project-header"
        onClick={() => onToggle(project.id)}
        aria-expanded={expanded}
      >
        <span className="project-title">{project.title}</span>
        <span className="project-chevron">{expanded ? '▼' : '▶'}</span>
      </button>

      {expanded && (
        <div className="project-details">
          <ProjectMedia project={project} />

          <div className="project-info-grid">

            <div className="project-info-block">
              <span className="project-info-label">About</span>
              <ul className="project-info-list">
                {project.description.map((d, i) => <li key={i}>{d}</li>)}
              </ul>
            </div>

            <div className="project-info-block">
              <span className="project-info-label">Role</span>
              <span className="project-role-badge">{project.role}</span>
            </div>

            <div className="project-info-block">
              <span className="project-info-label">Contributions</span>
              <ul className="project-info-list">
                {project.contributions.map((c, i) => <li key={i}>{c}</li>)}
              </ul>
            </div>

            <div className="project-info-block">
              <span className="project-info-label">Tech Stack</span>
              <div className="project-tech-tags">
                {project.tech.map((t, i) => (
                  <span key={i} className="project-tech-tag">{t}</span>
                ))}
              </div>
            </div>

          </div>

          {/* Text links — only when no media AND links exist */}
          {!hasMedia && (project.href || project.websiteUrl) && (
            <div className="project-links">
              {project.href && (
                <a href={project.href} target="_blank" rel="noopener noreferrer" className="project-github-link">
                  View on GitHub ↗
                </a>
              )}
              {project.websiteUrl && (
                <a href={project.websiteUrl} target="_blank" rel="noopener noreferrer" className="project-github-link">
                  Live Site ↗
                </a>
              )}
            </div>
          )}

        </div>
      )}
    </li>
  );
}

// ── Page section ────────────────────────────────────────────
function Projects() {
  const [expandedId, setExpandedId] = useState(null);

  const handleToggle = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="projects" className="page-section projects-section">
      <h2 className="section-heading">projects</h2>
      <ul className="project-list">
        {PROJECTS.map((p) => (
          <ProjectRow
            key={p.id}
            project={p}
            expanded={expandedId === p.id}
            onToggle={handleToggle}
          />
        ))}
      </ul>
    </section>
  );
}

export default Projects;