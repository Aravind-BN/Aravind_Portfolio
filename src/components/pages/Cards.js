import React from 'react';
import CardItem from './CardItem';
import './Cards.css';
import img3 from '../../images/img-3.jpeg';
import img4 from '../../images/img-4.jpeg';
import img5 from '../../images/img-5.jpeg';
import img6 from '../../images/img-6.jpeg';
import img7 from '../../images/img-7.jpeg';
import img8 from '../../images/img-8.jpeg';


function Cards() {
    return (
        <div className='cards'>
            <h1>Let's Begin our Journey!</h1>
            <p>Here are some Cards which will help you to learn more about myself more easily. Click on one of these if you are interested!</p>
            <div className="cards__container">
                <div className="cards__wrapper">
                    <ul className="cards__items">
                        <CardItem
                        src={img4}
                        text="Find out more about my skills and passion which I truly like!"
                        label='Skill'
                        path='/More'
                        />
                        <CardItem
                        src={img3}
                        text="Explore some of my leadership skills that I have displayed in my school!"
                        label='Responsibilities'
                        path='/More'
                        />
                    </ul>
                    <ul className="cards__items">
                        <CardItem
                        src={img5}
                        text="Check out some of my achievements and my experience!"
                        label='Achievements'
                        path='/Achievements'
                        />
                        <CardItem
                        src={img6}
                        text="Watch out for my lifelong-journey and my reflections on some key events!"
                        label='Life Journey'
                        path='/Life'
                        />
                        <CardItem
                        src={img7}
                        text="Look out for the biggest project that I have did in my WHOLE LIFE!"
                        label='Projects'
                        path='/More'
                        />
                        <CardItem
                        src={img8}
                        text="Here are some remarks that my previous teacher left for me!"
                        label='Remarks'
                        path='/More'
                        />
                    </ul>
            </div>

        </div>
    </div>
)
}

export default Cards;