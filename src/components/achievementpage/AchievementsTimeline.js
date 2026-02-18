import React from 'react';
import placeholder from '../../images/placeholder';
import './AchievementsTimeline.css';

const TIMELINE = [
  {
    year: '2025',
    items: [
      {
        text:
          'Received O-Level results (Raw 10, nett 6) and joined Ngee Ann Polytechnic Cybersecurity & Digital Forensics. Accepted as a CSIT scholar.',
        image: null,
      },
      {
        text:
          'GrowCalth Launch 2 with new features and members: ~1,200 sign-ups, ~160,000 km walked, ~210 million steps. Secured $5,000 from NP Sandbox and an office at NP Spark; became lead Android developer.',
        image: null,
      },
      {
        text:
          'Maintained 4.0 GPA in Semester 1 and made the Director’s List. Represented Westville Rovers (formerly Nanyang CSN) at JSSL U16 and travelled to Vietnam with NP.',
        image: null,
      },
      {
        text:
          'Received SST Outstanding Leadership Award (SOLA) for 2024 contributions and began working on online certifications (shown in the certificates section).',
        image: null,
      },
    ],
  },
  {
    year: '2024',
    items: [
      {
        text:
          'Upper Sec Blue House Vice-Captain and Vice-Chairperson for Upper Sec Inter-House Games; continued to lead and support house events.',
        image: null,
      },
      {
        text:
          'Represented SST at NSG Football Championships B Division Boys (League 4) and achieved strong team results.',
        image: null,
      },
      {
        text:
          'Perse Coding Team Challenge: Gold in Round 1 and Bronze in the Final Round at international level.',
        image: null,
      },
      {
        text:
          'Volunteered at Willing Hearts and at SST Open House 2024 for SSTInc. GrowCalth had its first public launch in school with ~800 sign-ups, ~12,000 km walked and ~16 million steps, receiving very positive feedback. Completed O Levels.',
        image: null,
      },
    ],
  },
  {
    year: '2023',
    items: [
      {
        text:
          'Became Blue House Vice-Captain. Led and helped coordinate Inter-House Cheer & Dance rehearsals and competitions, and chaired S2 OEE training, recce and hike.',
        image: null,
      },
      {
        text:
          'Took part in a wide range of school activities (Games Carnival, Inter-House Cheerleading, Inter-House Games – Upper Sec, OBS, SEP Dragonboat, Sec 2 OEE Camp as facilitator, Basic Ethics Workshop, Technopreneurship Programme).',
        image: null,
      },
      {
        text:
          'Represented SST at NSG Football Championships B Division Boys (League 5) and in the international C.B. Paul Science Quiz.',
        image: null,
      },
      {
        text:
          'Represented SST internationally in SASMO (participation), and earned Gold (Round 1) and Bronze (Final) in the Perse Coding Team Challenge. Volunteered at Engineering Good for service learning.',
        image: null,
      },
      {
        text:
          'GrowCalth was selected as one of the top 3 projects in SSTInc, leading to a learning trip to San Francisco and DeveloperWeek 2023. Received the Eagles Award and joined Nanyang CSN Football Club (later Westville Rovers), training regularly on Sundays.',
        image: null,
      },
    ],
  },
  {
    year: '2022',
    items: [
      {
        text:
          'Served as Blue House Junior House Leader (JHL), helping to organise Inter-House Cheerleading and Outdoor Education Expedition (OEE) while also participating.',
        image: null,
      },
      {
        text:
          'Completed two leadership modules and represented SST again at NSG Football Championships C Division Boys (West Zone).',
        image: null,
      },
      {
        text:
          'Participated in Sec 2 Learning Alliance Beyond Borders (LABB) with Penabur Secondary Tanjung Duren, contributing to community service efforts.',
        image: null,
      },
      {
        text:
          'Started working on GrowCalth with friends, laying the groundwork for the later launches.',
        image: null,
      },
    ],
  },
  {
    year: '2021',
    items: [
      {
        text:
          'Joined SST (School of Science and Technology, Singapore) through DSA and represented the school at NSG Football Championships C Division Boys (West Zone).',
        image: null,
      },
      {
        text:
          'Joined SSTInc, the school’s incubation programme, to deepen programming skills under mentorship and work on real projects.',
        image: null,
      },
    ],
  },
];

function TimelineItem({ item }) {
  const imgSrc = item.image ? process.env.PUBLIC_URL + item.image : null;
  return (
    <div className="timeline-achievement-item">
      {imgSrc && (
        <div className="timeline-achievement-image-wrap">
          <img
            src={imgSrc}
            alt=""
            onError={(e) => {
              e.target.src = placeholder;
            }}
          />
        </div>
      )}
      <p className="timeline-achievement-text">{item.text}</p>
    </div>
  );
}

function AchievementsTimeline() {
  return (
    <section className="page-section achievements-timeline-section">
      <h2 className="section-heading">achievements</h2>
      <p className="timeline-intro">
        Milestones and highlights by year. This section will grow as you add more stories and photos.
      </p>
      <div className="timeline">
        {TIMELINE.map(({ year, items }) => (
          <div key={year} className="timeline-year-block">
            <h3 className="timeline-year">{year}</h3>
            <div className="timeline-year-items">
              {items.map((item, i) => (
                <TimelineItem key={`${year}-${i}`} item={item} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default AchievementsTimeline;

