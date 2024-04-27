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
            <h1>Learn more about me!</h1>
            <div className="cards__container">
                <div className="cards__wrapper">
                    <ul className="cards__items">
                        <CardItem
                        src={img7}
                        text="First App development Project!"
                        label='Projects'
                        path='/More'
                        />
                        <CardItem
                        src={img5}
                        text="Experience and Achievements!"
                        label='Achievements'
                        path='/Achievements'
                        />
                    </ul>
                    <ul className="cards__items">
                        <CardItem
                        src={img6}
                        text="My Journey!"
                        label='Life Journey'
                        path='/Life'
                        />
                        <CardItem
                        src={img3}
                        text="Leadership Involvements!"
                        label='Responsibilities'
                        path='/More'
                        />
                        <CardItem
                        src={img4}
                        text="Skills and Passions"
                        label='Skill'
                        path='/More'
                        />
                        <CardItem
                        src={img8}
                        text="Testimonials about me"
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