'use client';

import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCarouselDragScroll } from './useCarouselDragScroll';

interface CarouselDragScrollProps {
  children?: React.ReactNode;
}

const CarouselDragScrollComponent: React.FC<CarouselDragScrollProps> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useCarouselDragScroll({ containerRef });

  const slides = Array.from({ length: 5 }, (_, i) => i + 1);

  return (
    <section 
      className="relative z-10 h-fit p-0"
      aria-label="Draggable carousel">
      <div className="w-full flex flex-col items-center">
        <div className="relative w-90 lg:w-40 mx-auto">
          <div className="relative flex flex-col items-center justify-center gap-12 p-20">
            <button
              data-stacked-cards="prev"
              className="absolute rounded cursor-pointer left-0 top-1/2 -translate-y-1/2 z-10 white-button white-button-rounded h-10 aspect-square flex items-center justify-center"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-1/2 h-1/2" />
            </button>

            <button
              data-stacked-cards="next"
              className="absolute rounded cursor-pointer right-0 top-1/2 -translate-y-1/2 z-10 white-button white-button-rounded h-10 aspect-square flex items-center justify-center"
              aria-label="Next slide"
            >
              <ChevronRight className="w-1/2 h-1/2" />
            </button>

            <div ref={containerRef} data-stacked-cards="" className="relative w-60 lg:w-20 h-100">
              {children ? React.Children.map(children, (child, index) => (
                <div
                  key={index}
                  data-stacked-cards-card=""
                  className="absolute top-0 left-0 w-full h-full rounded cursor-grab active:cursor-grabbing [&.is--dragging]:cursor-grabbing"
                >
                  {child}
                </div>
              )) : slides.map((slideNumber) => (
                <div
                  key={slideNumber}
                  data-stacked-cards-card=""
                  className="absolute top-0 left-0 w-full h-full card backdrop-blur-sm rounded cursor-grab active:cursor-grabbing flex items-center justify-center [&.is--dragging]:cursor-grabbing"
                >
                  <span className="text-4xl">{slideNumber}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const CarouselDragScroll = React.memo(CarouselDragScrollComponent);