import React from 'react';
import CardItem from './mainprojectitem';
import './mainprojects.css';
import img3 from '../../images/img-3.jpeg';
import img5 from '../../images/img-5.jpeg';
import sitimage from '../../images/sitimage.png';
import growcalth from '../../images/growcalth.jpeg';


function Cards() {
    return (
        <div className='cards'>
            <h1>Let's Begin our Journey!</h1>
            <p>Here are some Cards which will help you to learn more about myself more easily. Click on one of these if you are interested!</p>
            <div className="cards__container">
                <div className="cards__wrapper">
                    <ul className="cards__items">
                        <CardItem
                        src={growcalth}
                        text="A one stop platform for students to contribute to their houses through daily steps!"
                        label='GrowCalth'
                        path='/More'
                        />
                        <CardItem
                        src={img3}
                        text="Canteen Ordering App (Computing+ Coursework)"
                        label='Front-end development'
                        path='/More'
                        />
                    </ul>
                    <ul className="cards__items">
                        <CardItem
                        src={img5}
                        text="Homework Tracking Website"
                        label='Front-end Development'
                        path='/Achievements'
                        />
                        <CardItem
                        src={img3}
                        text="Hwa Chong Student Leader Conference"
                        label='Student Leadership'
                        path='/Life'
                        />
                        <CardItem
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