import React from 'react';
import '../../App.css';
import icon1 from '../../images/icon1.png';
import icon2 from '../../images/icon2.png';
import icon3 from '../../images/icon3.png';
import icon4 from '../../images/icon4.png';
import './OverviewPage.css';

const OverviewPage = () => {
  const boxes = [
    { icon: icon1, text: "Web Designer" },
    { icon: icon2, text: "Web Creator" },
    { icon: icon3, text: "Confident Leader" },
    { icon: icon4, text: "Kind Leader" }
  ];

  return (
    <div className="overviewpage">
      {boxes.map((box, index) => (
        <div className="box" key={index}>
          <div className="box-icon">
            <img src={box.icon} alt="Icon" width="50" height="50" />
          </div>
          <div className="box-text">
            {box.text}
          </div>
        </div>
      ))}
    </div>
  );
}

export default OverviewPage;
