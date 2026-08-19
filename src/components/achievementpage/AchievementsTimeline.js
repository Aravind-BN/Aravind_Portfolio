import React, { useState, useEffect, useCallback, useRef, memo } from 'react';
import { createPortal } from 'react-dom';
import './AchievementsTimeline.css';
import { stepEase } from '../../utils/scrollEase';

// Years walked through in the horizontal journey. 2021 is skipped — no
// photos exist for it yet; the journey starts where the photo record does.
const YEAR_DATA = [
  {
    year: '2022',
    highlight:
      "Blue House Junior House Leader; started GrowCalth with friends; represented SST at NSG Football C Division (West Zone); joined SSTInc to deepen programming skills under mentorship; joined local football club Nanyang CSN, though the club wasn't yet registered for any competitions.",
  },
  {
    year: '2023',
    highlight:
      "Blue House Vice-Captain; GrowCalth selected top 3 in SSTInc: earned a trip to San Francisco & DeveloperWeek; received the Eagles Award; competed in SASMO and the Perse Competition; represented SST at Hwa Chong's Student Leaders Convention; selected for the B-Division football team representing SST Football; organised and led inter-house activities including CheerDance, OEE, Interhouse Games, and the Games Carnival; led Blue House to 3rd place overall.",
  },
  {
    year: '2024',
    highlight:
      "GrowCalth's first public launch: 800+ sign-ups, 16M steps; built Can+een for the SST Computing+ coursework; Perse Competition: Distinction in Round 1, Higher Participation in Round 2; led Project Technogates at SIT, placing 3rd with a climate-tech prototype; completed AI for Literacy certification; Blue House exco, mentoring the incoming Sec 3 captains; took a break from Nanyang CSN to focus on academics, the year the club began applying for tournaments and competitions; completed O-Levels: L1R5 10 (net 6), ELR2B2 8 (net 6).",
  },
  {
    year: '2025',
    highlight:
      "Joined Ngee Ann Polytechnic's Cybersecurity & Digital Forensics course, later becoming a CSIT scholar; attended NUS HacknRoll; GrowCalth Launch 2: 1,200+ sign-ups, $5,000 NP Sandbox funding, plus multiple publicity events; made the Director's List; received SOLA; completed IBM, Cisco & Google AI certifications; returned to Nanyang CSN one last time before the club stopped running training sessions for the U16 age group; played in JSSL League 2, making regular appearances for the team.",
  },
  {
    year: '2026',
    highlight:
      "Attended TCP Camp; joined nullsec's SecOps exco, teaching cybersecurity concepts to students; won 1st place at NP Innopoly 2026; led GrowCalth's third launch with an in-school booth; completed the Google Cybersecurity Certificate and LinkedIn certifications in PowerShell automation, generative AI security, and Windows Subsystem for Linux; attended multiple conferences and hackathons; started working at Nee Lee, my mother's company, helping set up their firewall, handling admin work, and automating processes to save time going forward.",
  },
];

// Auto-loads every image dropped into src/images/achievements/<year>/, so
// adding photos never requires touching this file. Sort order follows
// filename (numeric-aware) — name files 1.jpg, 2.jpg, 3.jpg per year.
// `require.context` is webpack-only — Jest sets NODE_ENV=test, so skip it
// there instead of crashing. (Checking `typeof require.context` instead
// breaks webpack's static analysis of the call below — hence NODE_ENV.)
const photoContext =
  process.env.NODE_ENV === 'test'
    ? { keys: () => [] }
    : require.context('../../images/achievements', true, /\.(png|jpe?g|webp)$/i);
const PHOTOS_BY_YEAR = {};
photoContext.keys().forEach((key) => {
  const match = key.match(/^\.\/(\d{4})\//);
  if (!match) return;
  const year = match[1];
  (PHOTOS_BY_YEAR[year] = PHOTOS_BY_YEAR[year] || []).push({ key, src: photoContext(key) });
});
Object.values(PHOTOS_BY_YEAR).forEach((arr) =>
  arr.sort((a, b) => a.key.localeCompare(b.key, undefined, { numeric: true }))
);

const STEP_VH = 75;

// Photo grid uses the same aspect-ratio-matched mosaic technique as the
// certificates grid: fixed-width columns, and each tile's row-span is
// computed from the image's own natural ratio once it loads — so the tile
// box always matches the real photo shape and object-fit: contain never
// has to crop anything.
const ACHV_MOSAIC_GAP_PX = 12;
const ACHV_MOSAIC_ROW_PX = 14;
const ACHV_FALLBACK_SPAN = 14;

// Column width scales down as a year has more photos, so a sparse year
// (e.g. one photo) gets one big showcase tile while a packed year (e.g.
// eight) still fits inside the slide without needing an internal scroll —
// scrolling here was easy to miss since the page's main scroll gesture is
// already spent driving the horizontal journey.
function colPxFor(count) {
  if (count >= 7) return 145;
  if (count >= 4) return 158;
  return 280;
}

// One in every five photos runs wide (2 columns) for real mosaic variety
// instead of a uniform grid of same-width tiles.
function tileCols(i) {
  return i % 5 === 2 ? 2 : 1;
}

// ── Lightbox ─────────────────────────────────────────────────────────────
const PhotoLightbox = memo(function PhotoLightbox({ src, onClose }) {
  const closeButtonRef = useRef(null);

  useEffect(() => {
    const previouslyFocused = document.activeElement;
    closeButtonRef.current?.focus();

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      if (previouslyFocused && typeof previouslyFocused.focus === 'function') {
        previouslyFocused.focus();
      }
    };
  }, [onClose]);

  return createPortal(
    <div className="timeline-lightbox-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="timeline-lightbox-content" onClick={(e) => e.stopPropagation()}>
        <img src={src} alt="Achievement memory" className="timeline-lightbox-image" />
        <button ref={closeButtonRef} type="button" className="timeline-lightbox-close" onClick={onClose} aria-label="Close">
          ✕
        </button>
      </div>
    </div>,
    document.body
  );
});

// ── Detects whether the scroll-driven horizontal journey should run.
// Off for reduced-motion (never scroll-jack) and for narrow/touch viewports
// (scroll-jacking is a poor fit for touch scroll physics). ───────────────
function useJourneyEnabled() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const reduceMq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const widthMq = window.matchMedia('(min-width: 768px)');
    const update = () => setEnabled(!reduceMq.matches && widthMq.matches);
    update();
    reduceMq.addEventListener('change', update);
    widthMq.addEventListener('change', update);
    return () => {
      reduceMq.removeEventListener('change', update);
      widthMq.removeEventListener('change', update);
    };
  }, []);

  return enabled;
}

// ── Scroll progress (0..1) across the pinned wrapper ────────────────────
function useScrollProgress(ref, active) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!active) return;
    let rafId = null;

    const compute = () => {
      rafId = null;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const raw = total > 0 ? -rect.top / total : 0;
      setProgress(Math.min(1, Math.max(0, raw)));
    };

    const onScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(compute);
    };

    compute();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [ref, active]);

  return progress;
}

// ── Journey mode (desktop, motion-safe) ─────────────────────────────────
function AchievementsJourney({ onOpenPhoto }) {
  const wrapRef = useRef(null);
  const progress = useScrollProgress(wrapRef, true);
  const lastIndex = YEAR_DATA.length - 1;
  const currentIndex = Math.round(progress * lastIndex);
  // Dwell on each year instead of sliding continuously with every pixel
  // scrolled — see stepEase for why leaving a settled year needs
  // deliberate, sustained scrolling rather than any small nudge.
  const { position: trackPosition } = stepEase(progress * lastIndex, lastIndex);
  const [spans, setSpans] = useState({});

  const handleLoadSpan = useCallback((key, colPx, cols, naturalWidth, naturalHeight) => {
    if (!naturalWidth || !naturalHeight) return;
    const tileWidthPx = cols * colPx + (cols - 1) * ACHV_MOSAIC_GAP_PX;
    const tileHeightPx = tileWidthPx * (naturalHeight / naturalWidth);
    // Spanning N row tracks renders N*ROW_PX + (N-1)*GAP_PX tall (the gap
    // compounds across every internal row line) — solve for N against that.
    const rowSpan = Math.max(
      1,
      Math.round((tileHeightPx + ACHV_MOSAIC_GAP_PX) / (ACHV_MOSAIC_ROW_PX + ACHV_MOSAIC_GAP_PX))
    );
    setSpans((prev) => (prev[key] === rowSpan ? prev : { ...prev, [key]: rowSpan }));
  }, []);

  // Flower-bloom origin: measure each tile's real grid slot once laid out
  // (and again whenever a row-span updates, since that reshapes the grid),
  // then set --fx/--fy to the offset from the photo grid's own center so
  // the CSS entrance can animate "outward from a point" instead of a
  // generic fade. Pure layout measurement — doesn't touch React state.
  useEffect(() => {
    const compute = () => {
      document.querySelectorAll('.achv-slide-photos').forEach((container) => {
        const crect = container.getBoundingClientRect();
        const cx = crect.width / 2;
        const cy = crect.height / 2;
        container.querySelectorAll('.achv-photo-tile').forEach((tile) => {
          const trect = tile.getBoundingClientRect();
          const tx = trect.left - crect.left + trect.width / 2;
          const ty = trect.top - crect.top + trect.height / 2;
          tile.style.setProperty('--fx', `${cx - tx}px`);
          tile.style.setProperty('--fy', `${cy - ty}px`);
        });
      });
    };
    compute();
    window.addEventListener('resize', compute);
    return () => window.removeEventListener('resize', compute);
  }, [spans]);

  return (
    <div
      ref={wrapRef}
      className="achv-pin-wrap"
      style={{ height: `${YEAR_DATA.length * STEP_VH}vh` }}
    >
      <div className="achv-sticky">
        {/* Text is a fixed overlay, not part of the sliding track — it used
            to live inside each 100vw slide, so mid-transition it was half
            scrolled off one side while the next slide's text hadn't
            arrived yet, leaving neither fully readable. Keying on the year
            remounts it with a quick crossfade instead. */}
        <div className="achv-slide-text" key={YEAR_DATA[currentIndex].year}>
          <span className="achv-slide-year">{YEAR_DATA[currentIndex].year}</span>
          <p className="achv-slide-highlight">{YEAR_DATA[currentIndex].highlight}</p>
        </div>

        <div
          className="achv-track"
          style={{ transform: `translateX(-${trackPosition * 100}vw)` }}
        >
          {YEAR_DATA.map((y, slideIndex) => {
            const photos = PHOTOS_BY_YEAR[y.year] || [];
            const isActive = slideIndex === currentIndex;
            const colPx = colPxFor(photos.length);
            return (
              <div key={y.year} className={`achv-slide${isActive ? ' achv-slide--active' : ''}`}>
                <div className="achv-slide-photos" style={{ gridTemplateColumns: `repeat(auto-fill, ${colPx}px)` }}>
                  {photos.length > 0 ? (
                    photos.map((p, i) => {
                      const cols = tileCols(i);
                      return (
                        <button
                          key={p.key}
                          type="button"
                          className="achv-photo-tile"
                          style={{
                            gridColumn: cols > 1 ? `span ${cols}` : undefined,
                            gridRowEnd: `span ${spans[p.key] || ACHV_FALLBACK_SPAN * cols}`,
                            transitionDelay: isActive ? `${i * 70}ms` : '0ms',
                            '--frot': `${(i % 2 === 0 ? 1 : -1) * (14 + (i % 3) * 6)}deg`,
                          }}
                          onClick={() => onOpenPhoto(p.src)}
                          aria-label={`Open ${y.year} photo ${i + 1}`}
                        >
                          <img
                            src={p.src}
                            alt={`${y.year} memory ${i + 1}`}
                            onLoad={(e) =>
                              handleLoadSpan(p.key, colPx, cols, e.target.naturalWidth, e.target.naturalHeight)
                            }
                          />
                        </button>
                      );
                    })
                  ) : (
                    <span className="achv-no-photos">~/no-photos-yet</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="achv-progress-line" aria-hidden="true">
          <span className="achv-progress-fill" style={{ transform: `scaleX(${progress})` }} />
          {YEAR_DATA.map((y, i) => (
            <span
              key={y.year}
              className={`achv-progress-dot${progress >= i / lastIndex - 0.001 ? ' active' : ''}`}
              style={{ left: `${(i / lastIndex) * 100}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Fallback mode (mobile / reduced motion): stacked cards, native swipe ─
function AchievementsFallback({ onOpenPhoto }) {
  return (
    <div className="achv-fallback">
      {YEAR_DATA.map((y) => {
        const photos = PHOTOS_BY_YEAR[y.year] || [];
        return (
          <div key={y.year} className="achv-fallback-year">
            <span className="achv-fallback-year-label">{y.year}</span>
            <p className="achv-fallback-highlight">{y.highlight}</p>
            {photos.length > 0 && (
              <div className="achv-fallback-strip">
                {photos.map((p, i) => (
                  <button
                    key={p.key}
                    type="button"
                    className="achv-fallback-photo"
                    onClick={() => onOpenPhoto(p.src)}
                    aria-label={`Open ${y.year} photo ${i + 1}`}
                  >
                    <img src={p.src} alt={`${y.year} memory ${i + 1}`} />
                  </button>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function AchievementsTimeline() {
  const [lightbox, setLightbox] = useState(null);
  const journeyEnabled = useJourneyEnabled();

  const openLightbox = useCallback((src) => setLightbox(src), []);
  const closeLightbox = useCallback(() => setLightbox(null), []);

  return (
    <section id="achievements" className="achievements-timeline-section">
      <div className="page-section achv-heading-wrap">
        <h2 className="section-heading">~/achievements</h2>
      </div>

      {journeyEnabled ? (
        <AchievementsJourney onOpenPhoto={openLightbox} />
      ) : (
        <div className="page-section">
          <AchievementsFallback onOpenPhoto={openLightbox} />
        </div>
      )}

      {lightbox && <PhotoLightbox src={lightbox} onClose={closeLightbox} />}
    </section>
  );
}

export default AchievementsTimeline;
