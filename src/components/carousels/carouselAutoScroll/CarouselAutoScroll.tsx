'use client';

import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import AutoScroll from 'embla-carousel-auto-scroll';

interface CarouselAutoScrollProps {
  children?: React.ReactNode;
}

const CarouselAutoScrollComponent: React.FC<CarouselAutoScrollProps> = ({ children }) => {
  const [emblaRef] = useEmblaCarousel(
    { 
      loop: true,
      watchDrag: false
    },
    [
      AutoScroll({ 
        playOnInit: true,
        speed: 1,
        stopOnInteraction: false,
        stopOnMouseEnter: false,
        stopOnFocusIn: false,
        startDelay: 0
      })
    ]
  );

  const items = Array.from({ length: 8 }, (_, i) => i + 1);

  return (
    <section 
      className="relative z-10 h-fit p-0"
      aria-label="Auto-scrolling carousel"
      aria-live="off">
      <div className="w-full flex flex-col items-center">
        <div className="w-full flex flex-col gap-10">
          <div className="overflow-hidden w-full relative z-10 flex" ref={emblaRef}>
            <div className="flex gap-4 w-full">
              <div className="flex-none w-0 min-w-0" />
              {children ? children : items.map((item) => (
                <div 
                  key={item} 
                  className="flex-none w-70 lg:w-25 relative h-110 overflow-hidden rounded card">
                  <div className="flex items-center justify-center h-full">
                    <span className="text-4xl">{item}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const CarouselAutoScroll = React.memo(CarouselAutoScrollComponent);