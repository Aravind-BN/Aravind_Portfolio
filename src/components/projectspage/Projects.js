import React, { useState, useCallback, useEffect, useRef, memo } from 'react';
import { createPortal } from 'react-dom';
import './Projects.css';
import useInView from '../../hooks/useInView';
import GrowCalthShowcase from './GrowCalthShowcase';

const PROJECTS = [
  {
    id: 'growcalth',
    title: 'GrowCalth',
    websiteUrl: 'https://growcalth.com/',
    image: require('../../images/growcalth2.png'),
    role: 'Co-Founder & Lead Android Developer',
    summary: 'A student fitness app that gamifies step counts into house points: 1,500+ students, $5,000 in NP Sandbox funding.',
    description: [
      'GrowCalth is a mobile fitness app built for students by students with the aim of empowering students to live healthier lives, forging a stronger house spirit amongst students as well as to create a more connected community in school',
      'The app gamifies fitness by tying step counts to house points.',
      'Launched to over 1,500 students with active daily engagement tracked via Firebase analytics.',
      'Has 3 successful launches in SST, with engagement growing season over season.',
      'Season 3: ~125,000 km walked altogether (more than 3 times around the Earth) and ~8,865 fitness challenges completed across push-ups, squats, and jumping jacks, averaging 3,000 reps each.',
      'Have receieved funding from NP Sandbox worth $5000 and got our own office within Ngee Ann Polytechnic',
      'Initially started as a project in 2022, which my groupmates and I have been continously working on for the past 4 years.',
    ],
    contributions: [
      'Implemented GoogleFit Integration into Android App.',
      'Worked on front-end UI and integration with backend services in the Android side.',
      "Created GrowCalth's very own pedometer that doesn't depend on steps calculated from other apps.",
    ],
    tech: ['Kotlin', 'Google Firebase', 'GoogleFit Integration'],
    screens: [
      {
        id: 'home',
        title: 'Home',
        image: require('../../images/projects/growcalth-home.jpeg'),
        blurb: 'Live step and distance rings track progress toward the daily goal, with the top-3 house leaderboard front and center.',
      },
      {
        id: 'updates',
        title: 'Updates',
        image: require('../../images/projects/growcalth-updates.jpeg'),
        blurb: 'Season announcements, from leaderboard freezes to double-points events, keep every house in the loop.',
      },
      {
        id: 'challenges',
        title: 'Challenges',
        image: require('../../images/projects/growcalth-challenges.jpeg'),
        blurb: 'Daily push-up, squat, and jumping-jack targets gamify a quick burst of movement between classes.',
      },
      {
        id: 'napfa',
        title: 'NAPFA',
        image: require('../../images/projects/growcalth-napfa.jpeg'),
        blurb: 'The NAPFA leaderboard shows the top 5 performers in each fitness category, ranked across the whole cohort by level.',
      },
    ],
  },
  {
    id: 'privacy-puppy',
    title: 'Privacy Puppy',
    websiteUrl: null,
    role: 'Developer',
    summary: 'A browser extension that blocks non-essential cookies and scans T&Cs / privacy policies to warn you of real risks before you sign up.',
    description: [
      'Built at a hackathon: a security-focused browser extension.',
      'Automatically blocks non-essential cookies, allowing only what a site actually needs to function.',
      'Scans Terms & Conditions and Privacy Policies to detect and flag risky clauses, warning users before they sign up for an app or service.',
    ],
    contributions: [
      'Designed and built the cookie-blocking logic for the extension.',
      'Built the policy scanning flow that surfaces risk warnings to the user.',
    ],
    tech: ['JavaScript', 'Browser Extension APIs', 'Cookie Management', 'Privacy Policy Analysis'],
  },
  {
    id: 'gamex',
    title: 'GamEx',
    websiteUrl: null,
    role: 'Co-Founder & Developer',
    summary: 'An online platform that lets anyone create browser games using AI, no coding required.',
    description: [
      'GamEx is an online platform for creating browser games with AI, built to make game creation accessible to anyone with an idea.',
      'Co-founded the project and led development.',
      'Received $3,000 in NP Sandbox funding.',
    ],
    contributions: [
      'Co-founded the project and led development.',
      'Built the front-end in React and integrated AI-driven game generation.',
    ],
    tech: ['React', 'Node.js', 'AI/LLM Integration', 'JavaScript'],
  },
  {
    id: 'canteen',
    title: 'Can+een',
    websiteUrl: 'https://sites.google.com/sst.edu.sg/cp-coursework-gallery/2024/can-een?authuser=0',
    image: require('../../images/projects/canteen.png'),
    role: 'Front-end Developer',
    summary: 'Pre-order app that lets students queue with canteen stalls remotely, cutting break-time wait times.',
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
    websiteUrl: null,
    image: require('../../images/projects/crypto.png'),
    role: 'Developer',
    summary: 'A post-quantum payment-flow prototype using CRYSTALS-Kyber key encapsulation and ChaCha20-Poly1305 encryption.',
    description: [
      "A research-driven prototype that simulates Apple Pay's cryptographic payment flow using post-quantum algorithms.",
      'Built to explore how modern payment systems can be hardened against quantum computing threats.',
      'Demonstrates end-to-end key encapsulation and authenticated encryption in a payment context.',
      'Cryptographic Algorithms used: ChaCha20-Poly1305 and CRYSTALS-Kyber',
      'Project for cryptography module in Ngee Ann Polytechnic 1.2',
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
    websiteUrl: null,
    images: [
      require('../../images/projects/sitimage.png'),
      require('../../images/projects/sitimage2.jpeg'),
      require('../../images/projects/sitimage3.jpeg'),
      require('../../images/projects/sitimage4.jpeg'),
      require('../../images/projects/sitimage5.jpeg'),
    ],
    videos: [require('../../images/projects/sitvid.mp4'), require('../../images/projects/sitvid2.mp4')],
    role: 'Lead Developer',
    summary: 'Climate-tech prototype selected to present at SIT’s STEM Seeds workshop on fighting climate change with technology.',
    description: [
      'A climate-focused innovation project presented at the Singapore Institute of Technology (SIT).',
      'The team ideated and prototyped a solution addressing urban environmental challenges.',
      "Selected to present at SIT's STEM Seeds Social Innovaters of the Future workshop on Battling Climate Change with Technology (2024), as part of a competitive cohort.",
    ],
    contributions: [
      'Contributed to concept and prototype for a climate‑focused solution.',
      'Helped prepare and deliver the presentation and demo at SIT.',
    ],
    tech: ['React', 'Sensor Data Integration', 'Presentation', 'Teamwork', 'Engineering'],
  },
];

const ExternalIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

function resolveUrl(src) {
  return typeof src === 'string' ? process.env.PUBLIC_URL + src : src;
}

function coverOf(project) {
  return project.image || (project.images && project.images[0]);
}

// ── Extra media gallery (shown only when expanded, multi-asset projects) ──
function ProjectGallery({ project }) {
  if (!project.images) return null;
  const rest = project.images.slice(project.image ? 0 : 1);
  if (rest.length === 0 && !project.videos) return null;

  return (
    <div className="project-media-grid">
      {rest.map((src, i) => (
        <div key={i} className="project-media-cell">
          <img src={resolveUrl(src)} alt={`${project.title} ${i + 1}`} className="project-media-img" />
        </div>
      ))}
      {project.videos &&
        project.videos.map((src, i) => (
          <div key={i} className="project-media-cell project-media-cell--video">
            <video src={resolveUrl(src)} className="project-media-video" controls playsInline preload="metadata" />
          </div>
        ))}
    </div>
  );
}

// ── Detail modal (opened on click, replaces the old inline accordion) ──
const ProjectModal = memo(function ProjectModal({ project, onClose }) {
  const closeButtonRef = useRef(null);
  const contentRef = useRef(null);
  const cover = coverOf(project);

  useEffect(() => {
    const previouslyFocused = document.activeElement;
    closeButtonRef.current?.focus();

    // Locks the page behind the modal so scroll-chaining can't leak past
    // the modal's own scroll container (e.g. once the GrowCalth showcase's
    // long pinned scroll bottoms out, further wheel input was moving the
    // page underneath instead of just stopping).
    const previousBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousBodyOverflow;
      if (previouslyFocused && typeof previouslyFocused.focus === 'function') {
        previouslyFocused.focus();
      }
    };
  }, [onClose]);

  return createPortal(
    <div className="project-modal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-label={project.title}>
      <div
        ref={contentRef}
        className={`project-modal-content${project.screens ? ' project-modal-content--wide' : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button ref={closeButtonRef} type="button" className="project-modal-close" onClick={onClose} aria-label="Close">
          ✕
        </button>

        {cover && (
          <div className="project-modal-cover">
            <img src={resolveUrl(cover)} alt={project.title} />
          </div>
        )}

        <div className="project-modal-body">
          <div className="project-modal-head">
            <h3 className="project-modal-title">{project.title}</h3>
            <span className="project-role-badge">{project.role}</span>
          </div>

          <p className="project-card-summary">{project.summary}</p>

          <div className="project-tech-tags">
            {project.tech.map((t) => (
              <span key={t} className="project-tech-tag">{t}</span>
            ))}
          </div>

          {project.websiteUrl && (
            <a href={project.websiteUrl} target="_blank" rel="noopener noreferrer" className="project-live-link">
              <ExternalIcon /> Live site
            </a>
          )}

          {project.screens && <GrowCalthShowcase screens={project.screens} scrollContainerRef={contentRef} />}

          <ProjectGallery project={project} />

          <div className="project-info-grid">
            <div className="project-info-block">
              <span className="project-info-label">About</span>
              <ul className="project-info-list">
                {project.description.map((d, i) => (
                  <li key={i}>{d}</li>
                ))}
              </ul>
            </div>

            <div className="project-info-block">
              <span className="project-info-label">Contributions</span>
              <ul className="project-info-list">
                {project.contributions.map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
});

// ── Project card (memoized: static card, opens the modal on click) ──────
const ProjectCard = memo(function ProjectCard({ project, index, onOpen }) {
  const cover = coverOf(project);

  return (
    <li className="project-card" style={{ transitionDelay: `${index * 90}ms` }}>
      <button type="button" className="project-card-cover" onClick={() => onOpen(project)}>
        {cover ? (
          <img src={resolveUrl(cover)} alt={project.title} className="project-cover-img" />
        ) : (
          <div className="project-cover-fallback" aria-hidden="true">{'</>'}</div>
        )}
        <span className="project-card-role">{project.role}</span>
      </button>

      <div className="project-card-body">
        <button type="button" className="project-card-head" onClick={() => onOpen(project)}>
          <span className="project-card-title">{project.title}</span>
          <span className="project-card-chevron" aria-hidden="true">＋</span>
        </button>

        <p className="project-card-summary">{project.summary}</p>

        <div className="project-tech-tags">
          {project.tech.map((t) => (
            <span key={t} className="project-tech-tag">{t}</span>
          ))}
        </div>

        {project.websiteUrl && (
          <a
            href={project.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="project-live-link"
            onClick={(e) => e.stopPropagation()}
          >
            <ExternalIcon /> Live site
          </a>
        )}
      </div>
    </li>
  );
});

// ── Page section ────────────────────────────────────────────
function Projects() {
  const [activeProject, setActiveProject] = useState(null);
  const [ref, inView] = useInView();

  const handleOpen = useCallback((project) => setActiveProject(project), []);
  const handleClose = useCallback(() => setActiveProject(null), []);

  return (
    <section
      id="projects"
      ref={ref}
      className={`page-section projects-section reveal${inView ? ' in-view' : ''}`}
    >
      <h2 className="section-heading">~/projects</h2>
      <ul className="project-grid">
        {PROJECTS.map((p, i) => (
          <ProjectCard key={p.id} project={p} index={i} onOpen={handleOpen} />
        ))}
      </ul>

      {activeProject && <ProjectModal project={activeProject} onClose={handleClose} />}
    </section>
  );
}

export default Projects;
