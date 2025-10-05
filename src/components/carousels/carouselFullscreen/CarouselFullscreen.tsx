'use client';

import React, { useCallback } from 'react';
import Image from 'next/image';
import { useCarouselFullscreen } from './useCarouselFullscreen';
const defaultSlides = [
  '/images/placeholderwide1.jpg',
  '/images/placeholderwide2.jpg',
  '/images/placeholderwide3.jpg',
  '/images/placeholderwide4.jpg'
];

interface CarouselFullscreenProps {
  children?: React.ReactNode;
}

const CarouselFullscreenComponent: React.FC<CarouselFullscreenProps> = ({ children }) => {
  const slidesCount = children ? React.Children.count(children) : defaultSlides.length;
  
  const { 
    currentSlide, 
    progressRefs, 
    goToSlide
  } = useCarouselFullscreen({ 
    totalSlides: slidesCount 
  });
  
  const setProgressRef = useCallback((el: HTMLDivElement | null, index: number) => {
    progressRefs.current[index] = el;
  }, [progressRefs]);

  return (
    <section 
      className="relative h-screen w-full overflow-hidden"
      aria-label="Fullscreen image carousel">
      <div 
        className="relative w-full h-full"
      >
        {children ? React.Children.map(children, (child, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-600 ${
              currentSlide === index ? 'opacity-100' : 'opacity-0'
            }`}
            aria-hidden={currentSlide !== index}
          >
            {child}
          </div>
        )) : defaultSlides.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-600 ${
              currentSlide === index ? 'opacity-100' : 'opacity-0'
            }`}
            aria-hidden={currentSlide !== index}
          >
            <Image 
              src={image} 
              alt={`Slide ${index + 1}`} 
              fill
              className="object-cover"
              priority={index === 0}
              loading={index === 0 ? 'eager' : 'lazy'}
            />
          </div>
        ))}
      </div>

      <div className="absolute bottom-0 left-0 p-12 w-full flex gap-3">
        {Array.from({ length: slidesCount }, (_, index) => (
          <button
            key={index}
            className="relative cursor-pointer h-1 w-full rounded-full overflow-hidden bg-white/10 backdrop-blur-sm"
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={currentSlide === index ? 'true' : 'false'}
          >
            <div
              ref={el => setProgressRef(el, index)}
              className="absolute inset-0 bg-white rounded-full"
              style={{ transform: 'translateX(-100%)' }}
            />
          </button>
        ))}
      </div>
    </section>
  );
};

export const CarouselFullscreen = React.memo(CarouselFullscreenComponent);