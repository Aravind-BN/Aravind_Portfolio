# Highlights Section, RizzLah Project, Content Cleanup Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the portfolio's Stats section with a new two-column Highlights section (feature tiles + absorbed impact stats), add a RizzLah project card, and clean up em dashes plus one factual correction in existing copy.

**Architecture:** Pure content/presentation change in a React (CRA) app. One new page-section component (`Highlights.js`) replaces `Stats.js`, reusing its count-up-on-scroll hook. `Projects.js` gets one new entry in its existing `PROJECTS` array. Two existing files get targeted string edits.

**Tech Stack:** React (CRA), Jest + React Testing Library (existing `@testing-library/react` setup), plain CSS with the project's existing custom-property theme tokens (`src/App.css`).

## Global Constraints

- No em dashes (`—`, U+2014) in any user-facing copy string — use commas/colons/periods instead. (Code comments are not in scope.)
- The WAPT highlight must not name the actual target company and must not describe specific vulnerabilities — title "Web App Pentest", badge "Undisclosed target" only.
- Only competition results that are an outright win or the highest attainable placing get a Highlights feature tile (already decided: CSIT Scholar, Co-Founder GrowCalth/GamEx, NP Innopoly 2026 — 1st place, Perse Competition — Distinction Round 1, Web App Pentest).
- Stat numbers must match the current `Stats.js` values exactly: 1,500+ GrowCalth users / 3 launches, $8,000 funding raised / NP Sandbox, 210M+ steps tracked / Launch 2, 8+ certifications / security, cloud, AI.
- Reuse existing CSS custom properties (`--surface`, `--border`, `--bg-deep`, `--text`, `--text-muted`, `--text-faint`, `--accent`, `--accent-strong`, `--accent-soft`, `--accent-teal-strong`, `--accent-teal-soft`, `--font-mono`, `--font-display`, `--fw-*`) — do not hardcode colors, since the site has a light/dark theme toggle driven by these tokens.
- Follow the existing `page-section <name>-section reveal${inView ? ' in-view' : ''}` + `useInView` pattern used by every other section (`Stats.js`, `Projects.js`) for scroll-reveal behavior.

---

### Task 1: Highlights section component

**Files:**
- Create: `src/components/pages/Highlights.js`
- Create: `src/components/pages/Highlights.css`
- Create: `src/components/pages/Highlights.test.js`
- Delete: `src/components/pages/Stats.js`
- Delete: `src/components/pages/Stats.css`
- Modify: `src/App.js:2` area (import) and the `<section id="stats"><Stats /></section>` line

**Interfaces:**
- Produces: default export `Highlights` (React component, no props) from `src/components/pages/Highlights.js`, rendered by `App.js` in place of `Stats`.

- [ ] **Step 1: Write the failing test**

Create `src/components/pages/Highlights.test.js`:

```jsx
import { render, screen } from '@testing-library/react';
import Highlights from './Highlights';

test('renders all highlight tiles, badges, and stat labels', () => {
  render(<Highlights />);

  expect(screen.getByText('~/highlights')).toBeInTheDocument();

  // feature tiles
  expect(screen.getByText('CSIT Scholar')).toBeInTheDocument();
  expect(screen.getByText('Co-Founder, GrowCalth and GamEx')).toBeInTheDocument();
  expect(screen.getByText('NP Innopoly 2026')).toBeInTheDocument();
  expect(screen.getByText('1st place')).toBeInTheDocument();
  expect(screen.getByText('Perse Competition')).toBeInTheDocument();
  expect(screen.getByText('Distinction, Round 1')).toBeInTheDocument();
  expect(screen.getByText('Web App Pentest')).toBeInTheDocument();
  expect(screen.getByText('Undisclosed target')).toBeInTheDocument();

  // absorbed impact stats
  expect(screen.getByText('Impact')).toBeInTheDocument();
  expect(screen.getByText('GrowCalth users')).toBeInTheDocument();
  expect(screen.getByText('Funding raised')).toBeInTheDocument();
  expect(screen.getByText('Steps tracked')).toBeInTheDocument();
  expect(screen.getByText('Certifications')).toBeInTheDocument();
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx cross-env CI=true react-scripts test src/components/pages/Highlights.test.js --watchAll=false`
Expected: FAIL — `Cannot find module './Highlights' from 'src/components/pages/Highlights.test.js'`

(If `cross-env` isn't available, run `set CI=true&&react-scripts test ...` on Windows cmd, or `$env:CI="true"; npx react-scripts test src/components/pages/Highlights.test.js --watchAll=false` in PowerShell.)

- [ ] **Step 3: Create `src/components/pages/Highlights.js`**

```jsx
import React, { useState, useEffect, useRef } from 'react';
import './Highlights.css';
import useInView from '../../hooks/useInView';

// Feature tiles: only outright wins or the highest attainable placing
// qualify here — see docs/superpowers/specs/2026-08-19-highlights-section-design.md.
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
// the final value under reduced motion. (Same behavior as the hook this
// replaces in the old Stats.js.)
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
```

- [ ] **Step 4: Create `src/components/pages/Highlights.css`**

```css
.highlights-section {
  padding-top: 2rem;
}

.highlights-columns {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.25rem;
  align-items: start;
}

@media (min-width: 720px) {
  .highlights-columns {
    grid-template-columns: 1.35fr 1fr;
  }
}

/* ── Feature tiles ── */
.highlights-features {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

.highlight-tile {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 1.1rem 1.3rem;
  opacity: 0;
  transform: translateY(16px);
  transition: opacity 0.5s ease, transform 0.3s ease, border-color 0.25s ease;
}

.highlights-section.in-view .highlight-tile {
  opacity: 1;
  transform: none;
}

.highlight-tile:hover {
  border-color: var(--accent-soft);
}

.highlight-tile-title {
  margin: 0 0 0.4rem;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
  font-size: 1rem;
  font-weight: var(--fw-semibold);
  color: var(--text);
}

.highlight-badge {
  font-family: var(--font-mono);
  font-size: 0.65rem;
  font-weight: var(--fw-medium);
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--accent-strong);
  background: var(--accent-soft);
  border: 1px solid var(--accent-soft);
  border-radius: 5px;
  padding: 0.1rem 0.5rem;
}

.highlight-tile-body {
  margin: 0;
  font-size: 0.85rem;
  line-height: 1.55;
  color: var(--text-muted);
}

/* ── Impact stats block ── */
.highlights-stats-block {
  background: var(--accent-teal-soft);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 1.1rem 1.2rem;
  opacity: 0;
  transform: translateY(16px);
  transition: opacity 0.5s ease, transform 0.3s ease;
}

.highlights-section.in-view .highlights-stats-block {
  opacity: 1;
  transform: none;
}

.highlights-stats-label {
  display: block;
  font-family: var(--font-mono);
  font-size: 0.7rem;
  font-weight: var(--fw-medium);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--accent-teal-strong);
  margin-bottom: 0.9rem;
}

.highlights-stats-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.9rem 0.8rem;
}

.highlight-stat-tile {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  min-width: 0;
}

.highlight-stat-value {
  font-family: var(--font-display);
  font-size: clamp(1.3rem, 3vw, 1.6rem);
  font-weight: var(--fw-bold);
  color: var(--accent-teal-strong);
  letter-spacing: -0.02em;
  line-height: 1.1;
  font-variant-numeric: tabular-nums;
}

.highlight-stat-label {
  font-size: 0.75rem;
  font-weight: var(--fw-medium);
  color: var(--text);
}

.highlight-stat-detail {
  font-size: 0.68rem;
  color: var(--text-faint);
}

@media (prefers-reduced-motion: reduce) {
  .highlight-tile,
  .highlights-stats-block {
    transition: none;
    opacity: 1;
    transform: none;
  }
}
```

- [ ] **Step 5: Run test to verify it passes**

Run: `npx cross-env CI=true react-scripts test src/components/pages/Highlights.test.js --watchAll=false`
Expected: PASS (1 test)

- [ ] **Step 6: Wire `Highlights` into `App.js`, remove `Stats`**

In `src/App.js`, find the import of `Stats` (near the top, alongside the other page component imports) and replace it:

```diff
-import Stats from './components/pages/Stats';
+import Highlights from './components/pages/Highlights';
```

Find the section that renders it:

```diff
-        <section id="stats"><Stats /></section>
+        <section id="highlights"><Highlights /></section>
```

- [ ] **Step 7: Delete the old Stats files**

```bash
rm src/components/pages/Stats.js src/components/pages/Stats.css
```

- [ ] **Step 8: Run the full test suite and verify the app still compiles**

Run: `npx cross-env CI=true react-scripts test --watchAll=false`
Expected: PASS, no test references `Stats` anymore, no import errors.

- [ ] **Step 9: Commit**

```bash
git add src/components/pages/Highlights.js src/components/pages/Highlights.css src/components/pages/Highlights.test.js src/App.js
git rm src/components/pages/Stats.js src/components/pages/Stats.css
git commit -m "Replace Stats section with Highlights (feature tiles + absorbed impact stats)"
```

---

### Task 2: RizzLah project card

**Files:**
- Modify: `src/components/projectspage/Projects.js` (add one entry to the `PROJECTS` array, right after the `prediction-bot` entry and before `canteen`)
- Create: `src/components/projectspage/Projects.test.js`

**Interfaces:**
- Consumes: existing `PROJECTS` array shape established in Task-1-adjacent prior work — `{ id, title, websiteUrl, image?, role, summary, description (string), contributions (string[]), tech (string[]) }`. No `image` key for this entry (falls back to the existing `project-cover-fallback` `</>` placeholder already implemented in `Projects.js`'s `coverOf`/`ProjectCard`).

- [ ] **Step 1: Write the failing test**

Create `src/components/projectspage/Projects.test.js`:

```jsx
import { render, screen } from '@testing-library/react';
import Projects from './Projects';

test('renders the RizzLah project card', () => {
  render(<Projects />);
  expect(screen.getByText('RizzLah')).toBeInTheDocument();
  expect(screen.getByText('ChatGPT API')).toBeInTheDocument();
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx cross-env CI=true react-scripts test src/components/projectspage/Projects.test.js --watchAll=false`
Expected: FAIL — `Unable to find an element with the text: RizzLah`

- [ ] **Step 3: Add the RizzLah entry to `PROJECTS`**

In `src/components/projectspage/Projects.js`, insert this object into the `PROJECTS` array immediately after the `prediction-bot` entry's closing `},` (i.e. right before the `id: 'canteen'` entry):

```js
  {
    id: 'rizzlah',
    title: 'RizzLah',
    websiteUrl: null,
    role: 'Front-End Designer',
    summary:
      'A Singaporean AI app that turns an uploaded chat screenshot into witty, culturally authentic reply suggestions.',
    description:
      "Built at HacknRoll 2025, RizzLah is a Singaporean AI app that helps you level up your conversational game. Upload a chat screenshot and it generates witty, engaging replies with an authentic Singaporean vibe, personalized by your age, your chat partner's gender, and multiple interests like Sports, Music, and Travel, all through a drag-and-drop interface.",
    contributions: [
      'Designed and built the front-end in React.',
      'Built the drag-and-drop screenshot upload flow.',
      'Built the personalization inputs for age, partner gender, and multi-interest selection.',
    ],
    tech: ['React', 'ChatGPT API', 'CSS'],
  },
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx cross-env CI=true react-scripts test src/components/projectspage/Projects.test.js --watchAll=false`
Expected: PASS (1 test)

- [ ] **Step 5: Commit**

```bash
git add src/components/projectspage/Projects.js src/components/projectspage/Projects.test.js
git commit -m "Add RizzLah project card"
```

---

### Task 3: Content cleanup — em dash sweep and Perse correction

**Files:**
- Modify: `src/components/projectspage/Projects.js` (6 string edits)
- Modify: `src/components/achievementpage/AchievementsTimeline.js` (1 string edit)

**Interfaces:** none — string-literal-only edits, no signature changes.

- [ ] **Step 1: Replace the 6 em dashes in `Projects.js`**

Each is a straight find-and-replace of `—` with plain punctuation, no other wording changes:

| Line (pre-edit) | Find | Replace |
|---|---|---|
| GrowCalth stats, "125,000 km walked altogether" | `altogether — more than` | `altogether, more than` |
| GrowCalth stats, "each made up of 10 reps" | `10 reps — averaging` | `10 reps, averaging` |
| Privacy Puppy description | `risky clauses — warning users` | `risky clauses, warning users` |
| GamEx description | `with an idea — no coding required` | `with an idea, no coding required` |
| Prediction Bot description | `biggest interests — Manchester United` | `biggest interests: Manchester United` |
| Can+een description | `in advance — earning more efficiently` | `in advance, earning more efficiently` |

Apply each with your editor's find-and-replace (exact match, not regex) inside `src/components/projectspage/Projects.js`.

- [ ] **Step 2: Verify no em dashes remain in `Projects.js`**

Run (Git Bash / any POSIX shell):
```bash
grep -c $'\xe2\x80\x94' src/components/projectspage/Projects.js
```
Expected: `0` (grep prints nothing / exits 1 when count is 0 — either is fine, just confirm no lines print)

- [ ] **Step 3: Fix the 2024 Perse line and its em dash in `AchievementsTimeline.js`**

In `src/components/achievementpage/AchievementsTimeline.js`, find the `2024` entry's `highlight` string (currently containing `"...Perse Coding Team Challenge gold...O-Levels — L1R5: 10 (net 6), ELR2B2: 8 (net 6)."`) and replace the whole string with:

```js
      "GrowCalth's first public launch: 800+ sign-ups, 16M steps; built Can+een for the SST Computing+ coursework; Perse Competition: Distinction in Round 1, Higher Participation in Round 2; led Project Technogates at SIT, placing 3rd with a climate-tech prototype; completed AI for Literacy certification; Blue House exco, mentoring the incoming Sec 3 captains; took a break from Nanyang CSN to focus on academics, the year the club began applying for tournaments and competitions; completed O-Levels: L1R5 10 (net 6), ELR2B2 8 (net 6).",
```

This both corrects the inaccurate "gold" claim (actual result: Distinction in Round 1, Higher Participation in Round 2 — matches the `Perse Competition` entry in `Certificates.js`) and removes its em dash.

- [ ] **Step 4: Verify no em dashes remain in the achievement highlight strings**

Run:
```bash
grep -c $'\xe2\x80\x94' src/components/achievementpage/AchievementsTimeline.js
```
Expected: the only remaining matches (if any print) must be inside `//` or `/* */` comments, not inside the `YEAR_DATA` highlight strings — visually confirm by opening the file if the count is non-zero. (Comments are out of scope per the design spec; only rendered copy must be clean.)

- [ ] **Step 5: Run the full test suite**

Run: `npx cross-env CI=true react-scripts test --watchAll=false`
Expected: PASS — these are copy-only changes, no test asserts on the exact wording touched here.

- [ ] **Step 6: Commit**

```bash
git add src/components/projectspage/Projects.js src/components/achievementpage/AchievementsTimeline.js
git commit -m "Remove em dashes from project/achievement copy, fix Perse Competition result"
```

---

### Task 4: Manual verification in the browser

**Files:** none (verification only)

- [ ] **Step 1: Start the dev server and open the site**

Use the project's preview tooling to start the CRA dev server (`npm start` equivalent) and load `http://localhost:3000/`.

- [ ] **Step 2: Check the Highlights section**

Confirm, right after the hero section: heading `~/highlights`, 5 feature tiles on the left (CSIT Scholar, Co-Founder GrowCalth and GamEx, NP Innopoly 2026 with "1st place" badge, Perse Competition with "Distinction, Round 1" badge, Web App Pentest with "Undisclosed target" badge), and an "Impact" block on the right with 4 stat tiles that count up when scrolled into view. Resize below 720px width and confirm the two columns stack (features first, stats block below).

- [ ] **Step 3: Check the RizzLah project card**

Scroll to Projects, confirm a RizzLah card appears with the `</>` fallback cover (no image), role "Front-End Designer", and tech tags `React`, `ChatGPT API`, `CSS`. Click it open and confirm the About paragraph, and the Contributions subsection with the 3 listed items.

- [ ] **Step 4: Spot-check the achievements timeline**

Scroll to Achievements, find the 2024 slide, confirm the highlight text reads "...Perse Competition: Distinction in Round 1, Higher Participation in Round 2..." instead of "Perse Coding Team Challenge gold".

- [ ] **Step 5: Check for console errors**

Confirm no new console errors or React warnings appear on any of the above screens.
