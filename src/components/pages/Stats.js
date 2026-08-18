import React, { useState, useEffect, useRef } from 'react';
import './Stats.css';
import useInView from '../../hooks/useInView';

// Numbers pulled from real, already-documented milestones (Achievements /
// Certificates data) — nothing here is invented. `target` is the raw number
// the count-up animates to; prefix/suffix/comma control display formatting.
const STATS = [
  { target: 1500, prefix: '', suffix: '+', comma: true, label: 'GrowCalth users', detail: 'across 3 school-wide launches' },
  { target: 8000, prefix: '$', suffix: '', comma: true, label: 'Funding raised', detail: 'NP Sandbox grants for GrowCalth & GamEx' },
  { target: 210, prefix: '', suffix: 'M+', comma: false, label: 'Steps tracked', detail: "through GrowCalth's Launch 2" },
  { target: 8, prefix: '', suffix: '+', comma: false, label: 'Certifications earned', detail: 'cybersecurity, cloud & AI' },
];

const COUNT_DURATION_MS = 1400;

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

// Counts up from 0 to `target` once `active` becomes true, starting after
// `delayMs` so cards can stagger. Fires only once (useInView never resets
// to false), and jumps straight to the final value under reduced motion.
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

function StatCard({ stat, index, inView }) {
  const value = useCountUp(stat.target, inView, index * 120);
  const display = stat.comma ? value.toLocaleString('en-US') : String(value);

  return (
    <div className="stat-card" style={{ transitionDelay: `${index * 80}ms` }}>
      <span className="stat-value">
        {stat.prefix}
        {display}
        {stat.suffix}
      </span>
      <span className="stat-label">{stat.label}</span>
      <span className="stat-detail">{stat.detail}</span>
    </div>
  );
}

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
          <StatCard key={s.label} stat={s} index={i} inView={inView} />
        ))}
      </div>
    </section>
  );
}

export default Stats;
