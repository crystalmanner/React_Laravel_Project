import React from 'react';

import bg1 from '../../../../images/bg1.jpg';
import bg2 from '../../../../images/bg2.png';

const Background = () => {
  return (
    <div className="carousel-inner">
      <div className="carousel-item active">
        <img className="d-block w-100" src={bg1} alt="First slide" />
      </div>
      <div className="carousel-item">
        <img className="d-block w-100" src={bg2} alt="Second slide" />
      </div>
    </div>
  );
};

export default Background;
