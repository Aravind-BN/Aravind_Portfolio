import React, { useEffect, useRef, useState } from 'react';
import './GrowCalthShowcase.css';

const clamp = (v, min, max) => Math.min(max, Math.max(min, v));
const STEP_VH = 42;

// Each screen's face fades in/out around its own resting angle (k * 180deg)
// so only one is ever visible - backface-visibility alone aliases every
// 360deg, which shows two faces at once past the 2nd screen.
function faceOpacity(rotation, k) {
  return clamp(1 - Math.abs(rotation - k * 180) / 90, 0, 1);
}

// ── Scroll progress (0..1) across the pinned wrapper, measured against the
// modal's own scroll container rather than window - same pinned-scrollytelling
// technique as AchievementsTimeline, adapted for a nested scroll box. ──────
function useScrollProgress(wrapRef, containerRef) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    const wrap = wrapRef.current;
    if (!container || !wrap) return undefined;
    let rafId = null;

    const compute = () => {
      rafId = null;
      const wrapRect = wrap.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      const relativeTop = wrapRect.top - containerRect.top;
      const total = wrapRect.height - container.clientHeight;
      const raw = total > 0 ? -relativeTop / total : 0;
      setProgress(clamp(raw, 0, 1));
    };

    const onScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(compute);
    };

    compute();
    container.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      container.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [wrapRef, containerRef]);

  return progress;
}

// ── 3D phone that spins through app screens as the surrounding modal
// scrolls past it. Pinned (not independently scrollable), so the modal has
// exactly one scroll region and viewing every screen is unavoidable on the
// way down to the rest of the project details. ────────────────────────────
function GrowCalthShowcase({ screens, scrollContainerRef }) {
  const wrapRef = useRef(null);
  const [reducedMotion] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
  const count = screens.length;
  const lastIndex = count - 1;
  const progress = useScrollProgress(wrapRef, scrollContainerRef);
  const rotation = progress * lastIndex * 180;
  const activeIndex = clamp(Math.round(rotation / 180), 0, lastIndex);
  const active = screens[activeIndex];
  const atEnd = activeIndex === lastIndex;
  const showHint = progress < 0.04 || atEnd;

  return (
    <div className="gc-pin-wrap" ref={wrapRef} style={{ height: `${count * STEP_VH}vh` }}>
      <div className="gc-sticky">
        <div className="gc-row">
          <div className="gc-phone-wrap">
            <div className="gc-phone" style={!reducedMotion ? { transform: `rotateY(${rotation}deg)` } : undefined}>
              {screens.map((screen, k) => (
                <div
                  key={screen.id}
                  className="gc-face"
                  aria-hidden={k !== activeIndex}
                  style={{
                    opacity: faceOpacity(rotation, k),
                    transform: !reducedMotion ? `rotateY(${k % 2 === 0 ? 0 : 180}deg)` : undefined,
                  }}
                >
                  <div className="gc-notch" />
                  <img src={screen.image} alt="" className="gc-face-img" draggable={false} />
                </div>
              ))}
            </div>
          </div>

          <div className="gc-caption" aria-live="polite">
            <span className="gc-caption-index">
              {String(activeIndex + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
            </span>
            <h4 className="gc-caption-title">{active.title}</h4>
            <p className="gc-caption-blurb">{active.blurb}</p>
          </div>
        </div>

        <div className="gc-progress" aria-hidden="true">
          <span className="gc-progress-fill" style={{ transform: `scaleX(${progress})` }} />
          {screens.map((screen, k) => (
            <span
              key={screen.id}
              className={`gc-progress-dot${k <= activeIndex ? ' gc-progress-dot--active' : ''}`}
              style={{ left: `${(k / lastIndex) * 100}%` }}
            />
          ))}
        </div>

        <span className="gc-scroll-hint" style={{ opacity: showHint ? 1 : 0 }} aria-hidden="true">
          {atEnd ? 'keep scrolling for more ↓' : 'scroll to explore ↓'}
        </span>
      </div>
    </div>
  );
}

export default GrowCalthShowcase;
