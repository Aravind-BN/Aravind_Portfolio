import React, { useState, useEffect, useRef } from 'react';
import './Highlights.css';
import useInView from '../../hooks/useInView';

// Feature tiles: only outright wins or the highest attainable placing
// qualify here.
const HIGHLIGHTS = [
  {
    id: 'csit-scholar',
    title: 'CSIT Scholar',
    badge: null,
    body:
      "Awarded the CSIT scholarship after joining Ngee Ann Polytechnic's Cybersecurity and Digital Forensics course, tied to a future role in Singapore's public cybersecurity service.",
  },
  {
    id: 'cofounder',
    title: 'Co-Founder, GrowCalth and GamEx',
    badge: null,
    body: 'Co-founded two funded student ventures, both backed by NP Sandbox funding.',
  },
  {
    id: 'innopoly',
    title: 'NP Innopoly 2026',
    badge: '1st place',
    body:
      "Won 1st place at NP Innopoly 2026, Ngee Ann Polytechnic's flagship innovation and entrepreneurship competition.",
  },
  {
    id: 'perse',
    title: 'Perse Competition',
    badge: 'Distinction, Round 1',
    body:
      'Achieved a Distinction in Round 1 of the Perse Competition hosted by The Perse School, advancing to Round 2 with a Higher Participation result.',
  },
  {
    id: 'wapt',
    title: 'Web App Pentest',
    badge: 'Undisclosed target',
    body:
      'Full-scope web application penetration test for an NP coursework assessment, applying OWASP-style methodology end to end.',
  },
];

// Absorbed from the old Stats.js — same numbers, same source milestones.
const STATS = [
  { target: 1500, prefix: '', suffix: '+', comma: true, label: 'GrowCalth users', detail: '3 launches' },
  { target: 8000, prefix: '$', suffix: '', comma: true, label: 'Funding raised', detail: 'NP Sandbox' },
  { target: 210, prefix: '', suffix: 'M+', comma: false, label: 'Steps tracked', detail: 'Launch 2' },
  { target: 8, prefix: '', suffix: '+', comma: false, label: 'Certifications', detail: 'security, cloud, AI' },
];

const COUNT_DURATION_MS = 1400;

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

// Counts up from 0 to `target` once `active` becomes true, starting after
// `delayMs` so tiles can stagger. Fires only once, and jumps straight to
// the final value under reduced motion.
function useCountUp(target, active, delayMs) {
  const [value, setValue] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!active || startedRef.current) return;
    startedRef.current = true;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setValue(target);
      return;
    }

    let rafId;
    const timeoutId = setTimeout(() => {
      const start = performance.now();
      const tick = (now) => {
        const elapsed = now - start;
        const t = Math.min(1, elapsed / COUNT_DURATION_MS);
        setValue(Math.round(target * easeOutCubic(t)));
        if (t < 1) rafId = requestAnimationFrame(tick);
      };
      rafId = requestAnimationFrame(tick);
    }, delayMs);

    return () => {
      clearTimeout(timeoutId);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [active, target, delayMs]);

  return value;
}

function HighlightTile({ item }) {
  return (
    <div className="highlight-tile">
      <h3 className="highlight-tile-title">
        <span className="highlight-tile-title-text">{item.title}</span>
        {item.badge && <span className="highlight-badge">{item.badge}</span>}
      </h3>
      <p className="highlight-tile-body">{item.body}</p>
    </div>
  );
}

function StatTile({ stat, index, inView }) {
  const value = useCountUp(stat.target, inView, index * 120);
  const display = stat.comma ? value.toLocaleString('en-US') : String(value);

  return (
    <div className="highlight-stat-tile">
      <span className="highlight-stat-value">
        {stat.prefix}
        {display}
        {stat.suffix}
      </span>
      <span className="highlight-stat-label">{stat.label}</span>
      <span className="highlight-stat-detail">{stat.detail}</span>
    </div>
  );
}

function Highlights() {
  const [ref, inView] = useInView();

  return (
    <section
      id="highlights"
      ref={ref}
      className={`page-section highlights-section reveal${inView ? ' in-view' : ''}`}
    >
      <h2 className="section-heading">~/highlights</h2>
      <div className="highlights-columns">
        <div className="highlights-features">
          {HIGHLIGHTS.map((item) => (
            <HighlightTile key={item.id} item={item} />
          ))}
        </div>

        <div className="highlights-stats-block">
          <span className="highlights-stats-label">Impact</span>
          <div className="highlights-stats-grid">
            {STATS.map((s, i) => (
              <StatTile key={s.label} stat={s} index={i} inView={inView} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Highlights;
