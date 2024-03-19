import React from 'react';
import '../../App.css';
import Projects from '../projectspage/Projects';
import './Life.css';

export default function Life() {
  return (
    <div className="lifepage">
        <div>
            <h1 className='life'>Life</h1>
            <Projects />
        </div>
    </div>
  );
}
