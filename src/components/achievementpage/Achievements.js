import React from 'react';
import '../../App.css';
import AchievementsComponent from './ACH.js'; // Assuming AchievementsComponent is the exported name from ACH.js

function Achievements() {
    return (
        <div>    
            <h1 className='achievements'>Achievements</h1>
            <AchievementsComponent /> {/* Use the actual component name */}
        </div>
    )
}

export default Achievements;
