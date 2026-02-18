import React from 'react';
import MainprojectItem from './mainprojectitem';
import './mainprojects.css';
import placeholder from '../../images/placeholder';
// Use real images when available from ../../images/
const img3 = placeholder;
const img5 = placeholder;
const sitimage = placeholder;
const growcalth = placeholder;


function Cards() {
    return (
        <div className='cards'>
            <h1>Let's Begin our Journey!</h1>
            <p>Here are some Cards which will help you to learn more about myself more easily. Click on one of these if you are interested!</p>
            <div className="cards__container">
                <div className="cards__wrapper">
                    <ul className="cards__items">
                        <MainprojectItem
                        src={growcalth}
                        text="A one stop platform for students to contribute to their houses through daily steps!"
                        label='GrowCalth'
                        path='/More'
                        />
                        <MainprojectItem
                        src={img3}
                        text="Canteen Ordering App (Computing+ Coursework)"
                        label='Front-end development'
                        path='/More'
                        />
                    </ul>
                    <ul className="cards__item">
                        <MainprojectItem
                        src={img5}
                        text="Homework Tracking Website"
                        label='Front-end Development'
                        path='/Achievements'
                        />
                        <MainprojectItem
                        src={img3}
                        text="Hwa Chong Student Leader Conference"
                        label='Student Leadership'
                        path='/Life'
                        />
                        <MainprojectItem
                        src={sitimage}
                        text="Project Technogates"
                        label='SIT Project'
                        path='/More'
                        />
                    </ul>
            </div>
        </div>
    </div>
)
}

export default Cards;