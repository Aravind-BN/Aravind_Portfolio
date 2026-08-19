# Highlights section, RizzLah project, and content cleanup

## Context

Three related content changes to the portfolio, agreed via brainstorming with visual mockups:

1. A new "Highlights" section replacing the existing "Stats" (`~/impact`) section.
2. A new "RizzLah" project card.
3. A site-wide em-dash cleanup and one factual correction to the achievements timeline.

## 1. Highlights section

Replaces `Stats` (`src/components/pages/Stats.js` / `Stats.css`) entirely. Absorbs its four
animated counters instead of keeping them in a separate section.

**Position:** same slot Stats currently occupies in `App.js` (2nd section, right after Home).
**Section id/heading:** `id="highlights"`, heading `~/highlights` (matches the site's
`~/section-name` heading convention).

**Layout:** two-column split inside the section (approved via mockup `split-layout-v2.html`):

- **Left column** (`1.35fr`): feature tiles stacked vertically, one card per highlight,
  each with a title, an optional badge (e.g. "1st place"), and a one-sentence body.
- **Right column** (`1fr`): a single "Impact" block containing the 4 stat tiles in a 2x2
  grid. Reuses the existing count-up-on-scroll behavior from `Stats.js` (`useCountUp`,
  `easeOutCubic`, reduced-motion handling) — that logic moves into the new component
  unchanged, just restyled to fit the compact block instead of a full-width row.
- Below `768px` (or wherever the project's existing card breakpoints fall), the two columns
  stack — left column first, stats block below. Follow the same responsive pattern already
  used elsewhere in the site (e.g. `Projects.css`'s `project-info-grid` breakpoint) rather
  than inventing a new one.

**Feature tiles (left column, in order):**

1. **CSIT Scholar** — awarded the CSIT scholarship after joining Ngee Ann Polytechnic's
   Cybersecurity and Digital Forensics course, tied to a future role in Singapore's public
   cybersecurity service.
2. **Co-Founder, GrowCalth and GamEx** — co-founded two funded student ventures, both backed
   by NP Sandbox funding.
3. **NP Innopoly 2026** — badge "1st place". Won 1st place at NP Innopoly 2026, Ngee Ann
   Polytechnic's flagship innovation and entrepreneurship competition.
4. **Perse Competition** — badge "Distinction, Round 1". Achieved a Distinction in Round 1 of
   the Perse Competition hosted by The Perse School, advancing to Round 2 with a Higher
   Participation result. (Corrects the existing achievements-timeline line that called this
   "Perse Coding Team Challenge gold" — see section 3.)
5. **Web App Pentest** — badge "Undisclosed target". Full-scope web application penetration
   test for an NP coursework assessment, applying OWASP-style methodology end to end. Does
   **not** name the actual target (see prior safety discussion this session: live-production
   test, not yet run through an authorized disclosure channel — no target name or vuln
   specifics until that's resolved).

Only wins/highest-placing results qualify per the user's own bar — no Director's List,
Eagles Award, SOLA, or Technogates 3rd place tile, since none of those are a win or a top
placement.

**Stat tiles (right column, unchanged numbers from current `Stats.js`):**

| Value | Label | Detail |
|---|---|---|
| 1,500+ | GrowCalth users | 3 launches |
| $8,000 | Funding raised | NP Sandbox |
| 210M+ | Steps tracked | Launch 2 |
| 8+ | Certifications | security, cloud, AI |

**Styling:** dark card language already used across the site (`--surface`, `--border`,
`--bg-deep`, `--font-mono` tag label), consistent with `Projects.css` / `Stats.css` tokens —
this was mockup direction "A" (extend current style), not the brutalist alternative.

**Files:**
- Add `src/components/pages/Highlights.js` and `Highlights.css`.
- Remove `src/components/pages/Stats.js` and `Stats.css` (fully absorbed).
- Update `src/App.js`: swap `<Stats />` for `<Highlights />` in the same section slot.
- No Navbar changes needed — `Navbar.js` has no `#stats` link to update.

## 2. RizzLah project

New card in `src/components/projectspage/Projects.js`, following the existing project data
shape (paragraph `description`, `contributions` array, `tech` array) established earlier this
session for the other project cards.

- **Role:** Front-end Designer (team project, built at HacknRoll 2025).
- **Summary:** a Singaporean AI app that turns an uploaded chat screenshot into witty,
  culturally-authentic reply suggestions.
- **Description (paragraph):** built at HacknRoll 2025, RizzLah is a Singaporean AI app that
  helps users level up their conversational game — upload a chat screenshot and it generates
  witty, engaging replies with an authentic Singaporean vibe. Users can personalize results
  with their age, their chat partner's gender, and multiple interests (Sports, Music, Travel,
  and more) for tailored suggestions, through a drag-and-drop interface.
- **Contributions:**
  - Designed and built the front-end in React.
  - Built the drag-and-drop screenshot upload flow.
  - Built the personalization inputs (age, partner gender, multi-interest selection).
- **Tech:** `React`, `ChatGPT API`, `CSS`.
- **Image:** none supplied yet — uses the existing fallback cover (`</>` placeholder), same
  pattern as Privacy Puppy/GamEx used before their images were added. Can be wired in later
  the same way those were.

## 3. Content cleanup

- **Em-dash sweep, whole site:** replace every `—` (em dash) introduced or already present in
  `Projects.js` and `AchievementsTimeline.js` (both edited earlier this session) with plain
  punctuation (comma, period, semicolon, or "and"/"with" as fits each sentence). Applies to
  the new Highlights and RizzLah copy too — none of it should use em dashes from the start.
- **Perse correction:** the 2024 line in `AchievementsTimeline.js` currently reads "...Perse
  Coding Team Challenge gold...". Replace with wording consistent with the actual result
  (Round 1 Distinction, Round 2 Higher Participation) rather than an unqualified "gold" — same
  correction reflected in the new Highlights tile above.

## Out of scope

- No new images beyond what's already in `src/images` (RizzLah has none).
- No changes to Certificates.js or Navbar.js.
- Airbnb WAPT specifics stay excluded pending disclosure (already decided this session).
