import React from 'react';
import './AchievementsTimeline.css';
import useInView from '../../hooks/useInView';

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
      { text: 'GrowCalth selected as top 3 in SSTInc — earned a learning trip to San Francisco and DeveloperWeek 2023. Received the Eagles Award.', tag: 'Project' },
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

function AchievementsTimeline() {
  const [ref, inView] = useInView();

  return (
    <section
      id="achievements"
      ref={ref}
      className={`page-section achievements-timeline-section reveal${inView ? ' in-view' : ''}`}
    >
      <h2 className="section-heading">~/achievements</h2>

      <div className="timeline">
        {TIMELINE.map(({ year, items }) => (
          <div key={year} className="timeline-year-block">
            <span className="timeline-year">{year}</span>
            <span className="timeline-dot" aria-hidden="true" />
            <div className="timeline-year-items">
              {items.map((item, i) => (
                <div key={i} className="timeline-card">
                  <span className={`timeline-tag timeline-tag--${item.tag.toLowerCase()}`}>{item.tag}</span>
                  <p className="timeline-text">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default AchievementsTimeline;