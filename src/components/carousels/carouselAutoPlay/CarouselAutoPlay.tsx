'use client';

import React, { useMemo, useCallback } from 'react';
import { useCarouselAutoPlay } from './useCarouselAutoPlay';

const SLIDES_COUNT = 5;

interface CarouselAutoPlayProps {
  children?: React.ReactNode;
}

const CarouselAutoPlayComponent: React.FC<CarouselAutoPlayProps> = ({ children }) => {
  const slides = useMemo(() => 
    Array.from({ length: SLIDES_COUNT }, (_, i) => i + 1),
    []
  );
  
  const slidesCount = children ? React.Children.count(children) : slides.length;
  
  const { 
    currentSlide, 
    progressRefs, 
    goToSlide
  } = useCarouselAutoPlay({ 
    totalSlides: slidesCount 
  });
  
  const setProgressRef = useCallback((el: HTMLDivElement | null, index: number) => {
    progressRefs.current[index] = el;
  }, [progressRefs]);

  return (
    <section 
      className="relative z-10 h-fit p-0"
      aria-label="Auto-playing carousel">
      <div className="w-full flex flex-col items-center">
        <div className="w-full flex flex-col gap-6">
          <div 
            className="relative w-90 lg:w-70 h-110 mx-auto overflow-hidden rounded"
          >
            {children ? React.Children.map(children, (child, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-600 ${
                  currentSlide === index ? 'opacity-100' : 'opacity-0'
                }`}
                aria-hidden={currentSlide !== index}>
                {child}
              </div>
            )) : slides.map((slideNumber, index) => (
              <div
                key={slideNumber}
                className={`absolute inset-0 card flex items-center justify-center transition-opacity duration-600 ${
                  currentSlide === index ? 'opacity-100' : 'opacity-0'
                }`}
                aria-hidden={currentSlide !== index}>
                <span className="text-6xl font-medium">{slideNumber}</span>
              </div>
            ))}
          </div>

          <div className="flex justify-center items-center gap-3">
            <div className="bg-white backdrop-blur-sm rounded-full p-3 flex gap-2">
              {Array.from({ length: slidesCount }, (_, index) => (
                <button
                  key={index}
                  className={`relative cursor-pointer h-2 rounded-full overflow-hidden bg-black transition-all duration-300 ${
                    currentSlide === index ? 'w-12' : 'w-2'
                  }`}
                  onClick={() => goToSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
                  aria-current={currentSlide === index ? 'true' : 'false'}
                >
                  <div
                    ref={el => setProgressRef(el, index)}
                    className="absolute inset-0 bg-blue rounded-full"
                    style={{ transform: 'translateX(-100%)' }}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const CarouselAutoPlay = React.memo(CarouselAutoPlayComponent);