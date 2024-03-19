import React, { useState, useEffect } from 'react';
import './Testimonials.css';
import teammate1 from '../../images/img11.jpeg';
import teammate2 from '../../images/img12.jpeg';
import teammate3 from '../../images/icon3.png';

function Testimonials() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimate(true);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className={`testimonials-container ${animate ? 'appear' : ''}`}>
      <div className="testimonial-box">
        <div className="testimonial-header">
          <h3>"</h3>
        </div>
        <div className="testimonial-content">
          <p>Aravind is a hardworking individual who strives and is determined to accomplish his tasks.</p>
        </div>
        <div className="testimonial-footer">
          <img src={teammate1} alt="Teammate 1" className="teammate-image" />
          <div className="teammate-details">
            <h4>Han Jeong Seu, Caleb</h4>
            <p>CEO of GrowCalth, CTO React Native</p>
          </div>
        </div>
      </div>
      <div className="testimonial-box">
        <div className="testimonial-header">
          <h3>"</h3>
        </div>
        <div className="testimonial-content">
          <p>Aravind is a bright individual who will accomplish his goals with a determined mindset.</p>
        </div>
        <div className="testimonial-footer">
          <img src={teammate2} alt="Teammate 2" className="teammate-image" />
          <div className="teammate-details">
            <h4>Felix Forbes Dimjati</h4>
            <p>CTO React Native, GrowCalth Assistant Design/Marketing Officer</p>
          </div>
        </div>
      </div>
      <div className="testimonial-box">
        <div className="testimonial-header">
          <h3>"</h3>
        </div>
        <div className="testimonial-content">
          <p>Text of testimonial 3</p>
        </div>
        <div className="testimonial-footer">
          <img src={teammate3} alt="Teammate 3" className="teammate-image" />
          <div className="teammate-details">
            <h4>Seow Jie Rui, Gerald</h4>
            <p>CTO React Native of GrowCalth</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Testimonials;
