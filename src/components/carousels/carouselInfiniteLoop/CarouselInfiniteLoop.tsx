'use client';

import React, { useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { useDotButtons } from './useDotButtons';

interface CarouselInfiniteLoopProps {
  children?: React.ReactNode;
}

const CarouselInfiniteLoopComponent: React.FC<CarouselInfiniteLoopProps> = ({ children }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [activeIndex, setActiveIndex] = useState(0);

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButtons(emblaApi);

  const slides = Array.from({ length: 6 }, (_, i) => i + 1);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setActiveIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on('select', onSelect);
    onSelect();

    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi]);

  return (
    <section 
      className="relative z-10 h-fit p-0"
      aria-label="Infinite carousel">
      <div className="w-full flex flex-col items-center">
        <div className="w-full flex flex-col gap-5">
          <div className="overflow-hidden w-full relative z-10 flex cursor-grab" ref={emblaRef}>
            <div className="flex gap-4 w-full">
              {children ? React.Children.map(children, (child, index) => (
                <div
                  key={index}
                  className={`flex-none w-70 lg:w-30 relative h-110 overflow-hidden rounded transition-opacity duration-300 ${
                    activeIndex !== index ? 'opacity-50' : ''
                  } ${index === 0 ? 'ml-[var(--vw-1)]' : ''}`}
                >
                  {child}
                </div>
              )) : slides.map((slideNumber, index) => (
                <div
                  key={slideNumber}
                  className={`flex-none w-70 lg:w-30 relative h-110 overflow-hidden rounded card transition-opacity duration-300 ${
                    activeIndex !== index ? 'opacity-50' : ''
                  } ${index === 0 ? 'ml-[var(--vw-1)]' : ''}`}
                >
                  <div className="flex items-center justify-center h-full">
                    <span className="text-4xl">{slideNumber}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center gap-2" role="tablist">
            {scrollSnaps.map((_, index) => (
              <button
                key={index}
                onClick={() => onDotButtonClick(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === selectedIndex
                    ? 'w-8 bg-blue'
                    : 'w-2 bg-white'
                }`}
                role="tab"
                aria-selected={index === selectedIndex}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export const CarouselInfiniteLoop = React.memo(CarouselInfiniteLoopComponent);