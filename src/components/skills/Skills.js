import React from 'react';
import './Skills.css';
import useInView from '../../hooks/useInView';

const SKILLS = [
  'JavaScript',
  'React',
  'HTML',
  'CSS',
  'Python',
  'Figma',
  'Leadership',
  'Communication',
  'Collaboration',
];

function Skills() {
  const [ref, inView] = useInView();

  return (
    <section
      id="skills"
      ref={ref}
      className={`page-section skills-section reveal${inView ? ' in-view' : ''}`}
    >
      <h2 className="section-heading">~/skills</h2>
      <div className="skills-wrap">
        {SKILLS.map((skill) => (
          <span key={skill} className="skill-tag">
            {skill}
          </span>
        ))}
      </div>
    </section>
  );
}

export default Skills;