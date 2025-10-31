import React, { useState, useEffect, useRef, useCallback } from 'react';

const Carousel = ({ 
  items, 
  autoPlay = true, 
  delay = 5000,
  showDots = true,
  showArrows = true,
  draggable = true
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const carouselRef = useRef(null);
  const autoPlayRef = useRef(null);

  const nextSlide = useCallback(() => {
    setCurrentIndex(prev => (prev + 1) % items.length);
    setTranslateX(0);
  }, [items.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex(prev => (prev - 1 + items.length) % items.length);
    setTranslateX(0);
  }, [items.length]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
    setTranslateX(0);
  };

  // Auto-play with pause on hover
  useEffect(() => {
    if (!autoPlay || items.length <= 1) return;

    const startAutoPlay = () => {
      autoPlayRef.current = setInterval(nextSlide, delay);
    };

    const stopAutoPlay = () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };

    startAutoPlay();

    // Pause on hover
    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener('mouseenter', stopAutoPlay);
      carousel.addEventListener('mouseleave', startAutoPlay);
    }

    return () => {
      stopAutoPlay();
      if (carousel) {
        carousel.removeEventListener('mouseenter', stopAutoPlay);
        carousel.removeEventListener('mouseleave', startAutoPlay);
      }
    };
  }, [autoPlay, delay, nextSlide, items.length]);

  // Drag functionality
  const handleDragStart = (e) => {
    if (!draggable) return;
    setIsDragging(true);
    setStartX(e.type.includes('mouse') ? e.clientX : e.touches[0].clientX);
  };

  const handleDragMove = (e) => {
    if (!isDragging || !draggable) return;
    const currentX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
    setTranslateX(currentX - startX);
  };

  const handleDragEnd = () => {
    if (!isDragging || !draggable) return;
    setIsDragging(false);
    
    const dragThreshold = 100;
    if (Math.abs(translateX) > dragThreshold) {
      if (translateX > 0) {
        prevSlide();
      } else {
        nextSlide();
      }
    }
    setTranslateX(0);
  };

  return (
    <div className="mcd-carousel-banner" ref={carouselRef}>
      <div dir="ltr" className="banner">
        <div className="banner-v1">
          <div className="carousel-wrap style-init mcd siblings">
            {/* Navigation Arrows */}
            {/* {showArrows && items.length > 1 && (
              <>
                <button 
                  className="carousel-arrow carousel-arrow-prev"
                  onClick={prevSlide}
                  aria-label="Previous slide"
                >
                  ‹
                </button>
                <button 
                  className="carousel-arrow carousel-arrow-next"
                  onClick={nextSlide}
                  aria-label="Next slide"
                >
                  ›
                </button>
              </>
            )} */}
            
            <div 
              className="cdk-drag item-drag"
              style={{ transform: `translate3d(${translateX}px, 0px, 0px)` }}
              onMouseDown={handleDragStart}
              onMouseMove={handleDragMove}
              onMouseUp={handleDragEnd}
              onMouseLeave={handleDragEnd}
              onTouchStart={handleDragStart}
              onTouchMove={handleDragMove}
              onTouchEnd={handleDragEnd}
            >
              <div className="item-left">
                <div 
                  className="item-wrap"
                  style={{ 
                    transform: `translateX(-${currentIndex * 100}%)`,
                    transition: isDragging ? 'none' : 'transform 0.3s ease'
                  }}
                >
                  {items.map((item, index) => (
                    <div
                      key={item.id || index}
                      className="item"
                      style={{ width: '100%' }}
                    >
                      <div
                        className="item-pic"
                        style={{ backgroundImage: `url("${item.imageUrl}")` }}
                        onClick={() => item.onClick && item.onClick(item)}
                        role="button"
                        tabIndex={0}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter' && item.onClick) {
                            item.onClick(item);
                          }
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Dot Navigation */}
            {showDots && items.length > 1 && (
              <ul className="dot-group style-bar">
                {items.map((_, index) => (
                  <li
                    key={index}
                    className={index === currentIndex ? 'active' : ''}
                    onClick={() => goToSlide(index)}
                  >
                    <span 
                      className="dot-progress" 
                      style={{ 
                        animationDuration: index === currentIndex ? `${delay}ms` : '0ms'
                      }}
                    />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carousel;