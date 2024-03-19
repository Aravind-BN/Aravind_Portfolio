import React from 'react';
import '../../App.css';
import image from '../../images/img-7.jpeg';
import '../morepage/MorePage.css';
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import OverviewPage from './OverviewPage';
import Testimonials from './Testimonials';
import Footer from '../commonitems/Footer';

export default function MorePage() {
  return (
    <div className="more-page">
      <div className="text-container">
        <h1 className="more">More</h1>
        <p className="introduction-p">WHO AM I</p>
        <p className="introduction">Brief Introduction</p>
        <p className="introduction-text">I am Aravind, a motivated and ambitious individual with a strong ability to work both independently and collaboratively with others. I have encountered numerous enriching experiences in my life, which I have embraced as opportunities for personal growth. This website serves as a platform to showcase my achievements and share the valuable insights I have gained throughout my journey.</p>
      </div>
      <div className="image-container">
        <img src={image} alt="Image" className="image" />
      </div>
      <div className="timeline-intro-text">
          <p className="Topic">WHAT I HAVE ACCOMPLISHED IN MY LIFE SO FAR</p>
          <h2 className="Topic-s">Life Overview</h2>
      </div>
      <div className="timeline">
        <VerticalTimeline>
          <VerticalTimelineElement
            contentStyle={{
              background: '#1d1836',
              color: '#fff',
            }}
            contentArrowStyle={{ borderRight: '7px solid #232631' }}
            date="2008"
          >
            <div className="timeline-content">
              <h3 className="timeline-title-left">19/10/2008</h3>
              <p className="timeline-description-left">I was born in Kumbakonam, India, into an awesome family. This was about to be the start of a very interesting life.</p>
            </div>
          </VerticalTimelineElement>
          <VerticalTimelineElement
            contentStyle={{
              background: '#1d1836',
              color: '#fff',
            }}
            contentArrowStyle={{ borderRight: '7px solid #232631' }}
            date="2011"
          >
            <div className="timeline-content">
              <h3 className="timeline-title-right">2011</h3>
              <p className="timeline-description-right">I have joined Kindergarten and a new member joined in my family. At this point, I had already got my Singaporean Citizenship.</p>
            </div>
          </VerticalTimelineElement>
          <VerticalTimelineElement
            contentStyle={{
              background: '#1d1836',
              color: '#fff',
            }}
            contentArrowStyle={{ borderRight: '7px solid #232631' }}
            date="2015"
          >
            <div className="timeline-content">
              <h3 className="timeline-title-left">03/01/2015</h3>
              <p className="timeline-description-left">I joined West Grove Primary School, studying there for 6 amazing years and gaining enriching experiences.</p>
            </div>
          </VerticalTimelineElement>
          <VerticalTimelineElement
            contentStyle={{
              background: '#1d1836',
              color: '#fff',
            }}
            contentArrowStyle={{ borderRight: '7px solid #232631' }}
            date="2019"
          >
            <div className="timeline-content">
              <h3 className="timeline-title-right">2019</h3>
              <p className="timeline-description-right">I was involved in two camps. One of them being the Overseaseas China Emersion Trip and the other one being a Primary 5 camp. These were the first time I spent a night without my parents and not in our house. </p>
            </div>
          </VerticalTimelineElement>
          <VerticalTimelineElement
            contentStyle={{
              background: '#1d1836',
              color: '#fff',
            }}
            contentArrowStyle={{ borderRight: '7px solid #232631' }}
            date="2020"
          >
            <div className="timeline-content">
              <h3 className="timeline-title-left"> Start of 2020</h3>
              <p className="timeline-description-left">This was one of my most life-changing years. Firstly, there was Covid-19 which was a really bad experience for me. At that same point of time, I also had PSLE(Primary Students Learning Examination) which was a really important exam which would basically determine my future. </p>
            </div>
          </VerticalTimelineElement>
          <VerticalTimelineElement
            contentStyle={{
              background: '#1d1836',
              color: '#fff',
            }}
            contentArrowStyle={{ borderRight: '7px solid #232631' }}
            date="2020"
          >
            <div className="timeline-content">
              <h3 className="timeline-title-right">Mid to End of 2020</h3>
              <p className="timeline-description-right">However, the most life-changing event was DSA (Direct School Application). DSA helped me to enrol into SST without the need to be stressing too much over PSLE. This made me calmed and less stressed during that point of time.</p>
            </div>
          </VerticalTimelineElement>
          <VerticalTimelineElement
            contentStyle={{
              background: '#1d1836',
              color: '#fff',
            }}
            contentArrowStyle={{ borderRight: '7px solid #232631' }}
            date="2021/2022"
          >
            <div className="timeline-content">
              <h3 className="timeline-title-left">2021/2022</h3>
              <p className="timeline-description-left">I joined SST and was in the class of S1-06. I went through a lot of activities and projects with this class for 2 years before saying goodbye. I also made some really good friends along the way.</p>
            </div>
          </VerticalTimelineElement>
          <VerticalTimelineElement
            contentStyle={{
              background: '#1d1836',
              color: '#fff',
            }}
            contentArrowStyle={{ borderRight: '7px solid #232631' }}
            date="2022"
          >
            <div className="timeline-content">
              <h3 className="timeline-title-right">2022</h3>
              <p className="timeline-description-right">I volunteered myself to be the Blue House JHL who would eventually become a captain in the next year. </p>
            </div>
          </VerticalTimelineElement>
          <VerticalTimelineElement
            contentStyle={{
              background: '#1d1836',
              color: '#fff',
            }}
            contentArrowStyle={{ borderRight: '7px solid #232631' }}
            date="2022"
          >
            <div className="timeline-content">
              <h3 className="timeline-title-left">Mid of 2022</h3>
              <p className="timeline-description-left">I joined SSTinc and was working on a project to serve the community with 3 other groupmates (Caleb, Felix, Gerald). You can find further details on this project on the 'Learn-More' Page.</p>
            </div>
          </VerticalTimelineElement>
          <VerticalTimelineElement
            contentStyle={{
              background: '#1d1836',
              color: '#fff',
            }}
            contentArrowStyle={{ borderRight: '7px solid #232631' }}
            date="2023"
          >
            <div className="timeline-content">
              <h3 className="timeline-title-right"> Early 2023</h3>
              <p className="timeline-description-right">I eventually became the Blue-House Vice-Captain and the project I was working on was one of the best that year for SSTinc which made to have a chance to go to San Francisco. You can find further details on these achievements on the 'Achievements' Page.</p>
            </div>
          </VerticalTimelineElement>
          <VerticalTimelineElement
            contentStyle={{
              background: '#1d1836',
              color: '#fff',
            }}
            contentArrowStyle={{ borderRight: '7px solid #232631' }}
            date="2023"
          >
            <div className="timeline-content">
              <h3 className="timeline-title-left">Mid 2023</h3>
              <p className="timeline-description-left">Right before the June Holidays, I was involved in a lot of activities in my school. Math competitions, computing competitions and OEE & OBS. But at the same point of time, I was learning a new language that I am using to create this personal portfolio.</p>
            </div>
          </VerticalTimelineElement>
        </VerticalTimeline>
        <div className="text-container">
            <p className="introduction-p">Introduction</p>
            <p className="introduction">Overview</p>
            <p className="overview-text">I am a skilled software developer and software designer with experiences in JavaScript, CSS, Figma, Python and expertise in frameworks such as React and React-Native. I'm a quick learner and a good listener. I also have the ability to collaborate well with others efficiently to achieve the desired solution. I have a good relationship among my peers and groupmates which often makes it easier to share my feeling and though processes with them.</p>
        </div>
        <div>
           <OverviewPage />
        </div>
        <div className="text-container">
            <p className="introduction-p">WHAT OTHERS HAVE TO SAY ABOUT ME</p>
            <p className="introduction">Testimonials</p>
        </div>
        <div>
            <Testimonials />
        </div>
        <div>
            <Footer />
        </div>
      </div>
    </div>
  );
}
