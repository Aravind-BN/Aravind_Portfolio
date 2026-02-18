import React from 'react';
import './Skills.css';

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
  return (
    <section id="skills" className="page-section skills-section">
      <h2 className="section-heading">skills</h2>
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
