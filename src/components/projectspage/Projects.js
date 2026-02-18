import React, { useState } from 'react';
import './Projects.css';

const PROJECTS = [
  {
    id: 'growcalth',
    title: 'GrowCalth',
    href: 'https://github.com/cheesetan/growcalth-kotlin.git', // replace with real GitHub repo
    websiteUrl: 'https://growcalth.com/', // replace with real GrowCalth site
    image: require('../../images/growcalth2.jpg'),
    role: 'Co-Founder & Lead Android Developer',
    contributions: [
      'Co-designed and built the step-tracking and house contribution flow.',
      'Worked on front-end UI and integration with backend services.',
    ],
    tech: 'React, JavaScript, CSS, Firebase',
  },
  {
    id: 'canteen',
    title: 'Canteen Ordering App',
    href: 'https://github.com', // replace with real GitHub repo
    websiteUrl: null,
    image: '/projects/canteen.png',
    role: 'Front-end developer',
    contributions: [
      'Implemented ordering interface, cart behaviour and basic validations.',
      'Improved responsiveness and accessibility for different devices.',
    ],
    tech: 'HTML, CSS, JavaScript',
  },
  {
    id: 'crypto',
    title: 'Apple Pay Cryptography Mockup',
    href: 'https://github.com', // replace with real GitHub repo
    websiteUrl: null,
    image: '/projects/crypto.png',
    role: 'Solo developer',
    contributions: [
      'Built a prototype flow that mimics Apple Pay style payments.',
      'Implemented CRYSTALS-Kyber for key encapsulation and ChaCha20‑Poly1305 for authenticated encryption.',
    ],
    tech: 'Python, cryptography libraries (CRYSTALS‑Kyber, ChaCha20‑Poly1305)',
  },
  {
    id: 'technogates',
    title: 'Project Technogates (SIT)',
    href: 'https://github.com', // replace with real GitHub repo
    websiteUrl: null,
    image: '/projects/technogates.png',
    role: 'Team member',
    contributions: [
      'Contributed to concept and prototype for a climate‑focused solution.',
      'Helped prepare and deliver the presentation and demo at SIT.',
    ],
    tech: 'Various (web, data and presentation tools)',
  },
];

function ProjectRow({ project, expanded, onToggle }) {
  const imageUrl = project.image ? process.env.PUBLIC_URL + project.image : null;

  return (
    <li className={`project-item ${expanded ? 'expanded' : ''}`}>
      <button
        type="button"
        className="project-header"
        onClick={() => onToggle(project.id)}
        aria-expanded={expanded}
      >
        <span className="project-title">{project.title}</span>
        <span className="project-chevron" aria-hidden>
          {expanded ? '▼' : '▶'}
        </span>
      </button>
      {expanded && (
        <div className="project-details">
          <p className="project-role">
            <strong>Role:</strong> {project.role}
          </p>
          <div className="project-contributions">
            <strong>Contributions:</strong>
            <ul>
              {project.contributions.map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
          </div>
          <p className="project-tech">
            <strong>Tech:</strong> {project.tech}
          </p>
          {imageUrl && (
            <div className="project-image-wrap">
              <img src={imageUrl} alt="" className="project-image" />
              <div className="project-image-actions">
                {project.websiteUrl && (
                  <a
                    href={project.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-action-btn"
                    title="Visit website"
                    aria-label="Visit website"
                  >
                    <i className="fas fa-external-link-alt" />
                  </a>
                )}
                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-action-btn"
                  title="Open in GitHub"
                  aria-label="Open in GitHub"
                >
                  <i className="fab fa-github" />
                </a>
              </div>
            </div>
          )}
        </div>
      )}
    </li>
  );
}

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

