// components/CarouselBanner.js
import React, { useState, useEffect } from 'react';

const CarouselBanner = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [items.length]);

  return (
    <div className="banner">
      <div className="banner-v1">
        <div className="carousel-wrap style-init mcd siblings" data-auto="true" data-delay="500">
          <div className="cdk-drag item-drag" style={{ transform: `translate3d(-${currentIndex * 100}%, 0px, 0px)` }}>
            <div className="item-left">
              <div className="item-wrap">
                {items.map((item, index) => (
                  <div key={item.id} className="item" idx={index} message-id={item.messageId}>
                    <div className="item-pic" style={{ backgroundImage: `url(${item.image})` }}></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <ul className="dot-group style-bar">
          {items.map((item, index) => (
            <li key={item.id} href="#" value="3" idx={index} className={index === currentIndex ? 'active' : ''}>
              <span className="dot-progress" style={{ animationDuration: '3000ms' }}></span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CarouselBanner;