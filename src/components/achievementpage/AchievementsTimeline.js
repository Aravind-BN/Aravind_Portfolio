import React, { useState } from 'react';

const TIMELINE = [
  {
    year: '2025',
    items: [
      { text: 'Received O-Level results (Raw 10, nett 6) and joined Ngee Ann Polytechnic Cybersecurity & Digital Forensics. Accepted as a CSIT scholar.', tag: 'Academic' },
      { text: 'GrowCalth Launch 2: ~1,200 sign-ups, ~160,000 km walked, ~210 million steps. Secured $5,000 from NP Sandbox and an office at NP Spark; became lead Android developer.', tag: 'Project' },
      { text: "Maintained 4.0 GPA in Semester 1 and made the Director's List. Represented Westville Rovers at JSSL U16 and travelled to Vietnam with NP.", tag: 'Achievement' },
      { text: 'Received SST Outstanding Leadership Award (SOLA) for 2024 contributions and began working on online certifications.', tag: 'Leadership' },
    ],
  },
  {
    year: '2024',
    items: [
      { text: 'Upper Sec Blue House Vice-Captain and Vice-Chairperson for Upper Sec Inter-House Games; continued to lead and support house events.', tag: 'Leadership' },
      { text: 'Represented SST at NSG Football Championships B Division Boys (League 4) and achieved strong team results.', tag: 'Sports' },
      { text: 'Perse Coding Team Challenge: Gold in Round 1 and Bronze in the Final Round at international level.', tag: 'Competition' },
      { text: 'Volunteered at Willing Hearts and SST Open House. GrowCalth first public launch: ~800 sign-ups, ~12,000 km walked, ~16 million steps. Completed O Levels.', tag: 'Project' },
    ],
  },
  {
    year: '2023',
    items: [
      { text: 'Became Blue House Vice-Captain. Led Inter-House Cheer & Dance rehearsals and chaired S2 OEE training, recce and hike.', tag: 'Leadership' },
      { text: "Represented SST House for Hwa Chong Institution's 28th Edition Student Leader Convention 2023.", tag: 'Leadership' },
      { text: 'Wide range of activities: Games Carnival, Inter-House Cheerleading, OBS, SEP Dragonboat, Sec 2 OEE Camp as facilitator, Technopreneurship Programme.', tag: 'Activities' },
      { text: 'Represented SST at NSG Football B Division (League 5) and in the international C.B. Paul Science Quiz.', tag: 'Sports' },
      { text: "GrowCalth selected as top 3 in SSTInc — earned a learning trip to San Francisco and DeveloperWeek 2023. Received the Eagles Award.", tag: 'Project' },
    ],
  },
  {
    year: '2022',
    items: [
      { text: 'Served as Blue House Junior House Leader (JHL), helping organise Inter-House Cheerleading and OEE.', tag: 'Leadership' },
      { text: 'Completed two leadership modules and represented SST at NSG Football C Division Boys (West Zone).', tag: 'Sports' },
      { text: 'Sec 2 Learning Alliance Beyond Borders (LABB) with Penabur Secondary Tanjung Duren — community service.', tag: 'Service' },
      { text: 'Started working on GrowCalth with friends, laying the groundwork for later launches.', tag: 'Project' },
    ],
  },
  {
    year: '2021',
    items: [
      { text: 'Joined SST through DSA and represented the school at NSG Football C Division Boys (West Zone).', tag: 'Sports' },
      { text: "Joined SSTInc, the school's incubation programme, to deepen programming skills under mentorship.", tag: 'Project' },
    ],
  },
];

const TAG_COLORS = {
  Academic:    { bg: 'rgba(99,179,237,0.12)',  color: '#63b3ed', border: 'rgba(99,179,237,0.25)' },
  Project:     { bg: 'rgba(167,139,250,0.12)', color: '#a78bfa', border: 'rgba(167,139,250,0.25)' },
  Achievement: { bg: 'rgba(251,191,36,0.12)',  color: '#fbbf24', border: 'rgba(251,191,36,0.25)' },
  Leadership:  { bg: 'rgba(52,211,153,0.12)',  color: '#34d399', border: 'rgba(52,211,153,0.25)' },
  Sports:      { bg: 'rgba(251,113,133,0.12)', color: '#fb7185', border: 'rgba(251,113,133,0.25)' },
  Competition: { bg: 'rgba(253,186,116,0.12)', color: '#fdba74', border: 'rgba(253,186,116,0.25)' },
  Activities:  { bg: 'rgba(129,140,248,0.12)', color: '#818cf8', border: 'rgba(129,140,248,0.25)' },
  Service:     { bg: 'rgba(94,234,212,0.12)',  color: '#5eead4', border: 'rgba(94,234,212,0.25)' },
};

/*
  Layout math (left-to-right):
    [year: 52px] [gap: 16px] [dot: 16px] [gap: 20px] = 104px total left padding
    Vertical line is centered on dot → left: 52 + 16 + 8 = 76px from left edge of outer wrapper
    Dot's left edge = 52 + 16 = 68px → use transform: translateX(-50%) to center it on the line at 76px
*/
const YEAR_WIDTH   = 52;   // px
const GAP1         = 16;   // px  year → dot
const DOT_SIZE     = 16;   // px
const GAP2         = 20;   // px  dot → cards
const CARD_OFFSET  = YEAR_WIDTH + GAP1 + DOT_SIZE + GAP2;  // 104px
const LINE_LEFT    = YEAR_WIDTH + GAP1 + DOT_SIZE / 2;     // 76px
const DOT_LEFT     = YEAR_WIDTH + GAP1 + DOT_SIZE / 2;     // 76px  (center of dot)

function AchievementsTimeline() {
  const [hoveredYear, setHoveredYear] = useState(null);

  return (
    <section className="page-section achievements-timeline-section">
      <h2 style={{
        fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.08em',
        textTransform: 'lowercase', color: '#a1a1aa', marginBottom: '2rem',
      }}>
        achievements
      </h2>

      <div style={{ position: 'relative', paddingLeft: `${CARD_OFFSET}px` }}>

        {/* Vertical line */}
        <div style={{
          position: 'absolute',
          left: `${LINE_LEFT}px`,
          top: '8px',
          bottom: '8px',
          width: '1px',
          background: 'linear-gradient(180deg, transparent, rgba(124,58,237,0.55) 8%, rgba(124,58,237,0.3) 92%, transparent)',
          pointerEvents: 'none',
        }} />

        {TIMELINE.map(({ year, items }, yearIdx) => (
          <div
            key={year}
            style={{ position: 'relative', marginBottom: yearIdx < TIMELINE.length - 1 ? '3rem' : 0 }}
            onMouseEnter={() => setHoveredYear(year)}
            onMouseLeave={() => setHoveredYear(null)}
          >
            {/* Year label — absolutely positioned to the left */}
            <div style={{
              position: 'absolute',
              left: `-${CARD_OFFSET}px`,
              top: '5px',
              width: `${YEAR_WIDTH}px`,
              textAlign: 'right',
              pointerEvents: 'none',
            }}>
              <span style={{
                fontSize: '0.9rem',
                fontWeight: 700,
                color: hoveredYear === year ? '#c4b5fd' : '#7c3aed',
                letterSpacing: '0.04em',
                transition: 'color 0.2s',
                display: 'inline-block',
              }}>
                {year}
              </span>
            </div>

            {/* Dot — centered on the vertical line */}
            <div style={{
              position: 'absolute',
              left: `${DOT_LEFT - CARD_OFFSET}px`,   // relative to the padded content area
              top: '5px',
              width: `${DOT_SIZE}px`,
              height: `${DOT_SIZE}px`,
              borderRadius: '50%',
              border: `2px solid ${hoveredYear === year ? '#a78bfa' : '#7c3aed'}`,
              background: hoveredYear === year ? '#a78bfa' : 'transparent',
              transition: 'all 0.25s ease',
              boxShadow: hoveredYear === year ? '0 0 14px rgba(167,139,250,0.7)' : 'none',
              pointerEvents: 'none',
              transform: 'translateX(-50%)',
            }} />

            {/* Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {items.map((item, i) => {
                const ts = TAG_COLORS[item.tag] || TAG_COLORS.Project;
                const active = hoveredYear === year;
                return (
                  <div
                    key={i}
                    style={{
                      background: active ? 'rgba(255,255,255,0.042)' : 'rgba(255,255,255,0.025)',
                      border: `1px solid ${active ? 'rgba(167,139,250,0.18)' : 'rgba(255,255,255,0.06)'}`,
                      borderRadius: '10px',
                      padding: '0.8rem 1rem',
                      transition: 'border-color 0.2s, background 0.2s, transform 0.2s',
                      transform: active ? 'translateX(3px)' : 'translateX(0)',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.75rem',
                    }}
                  >
                    {/* Tag: fixed width + center-aligned text so all body text starts at same column */}
                    <span style={{
                      display: 'inline-block',
                      flexShrink: 0,
                      width: '82px',          /* wide enough for "Competition" */
                      textAlign: 'center',
                      fontSize: '0.68rem',
                      fontWeight: 600,
                      letterSpacing: '0.03em',
                      padding: '0.2rem 0',
                      borderRadius: '4px',
                      background: ts.bg,
                      color: ts.color,
                      border: `1px solid ${ts.border}`,
                      marginTop: '1px',       /* optical alignment with first line of text */
                      lineHeight: 1.7,
                    }}>
                      {item.tag}
                    </span>

                    <p style={{
                      fontSize: '0.88rem',
                      color: active ? '#c4c4cb' : '#a1a1aa',
                      lineHeight: 1.65,
                      margin: 0,
                      flex: 1,
                      transition: 'color 0.2s',
                    }}>
                      {item.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default AchievementsTimeline;