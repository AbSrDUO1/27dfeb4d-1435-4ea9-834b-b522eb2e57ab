'use client';

import Image from 'next/image';
import React from 'react';
import type { TimelineItem } from '@/types/timeline';
import { useTimelineHorizontal } from './useHorizontalTimeline'

interface TimelineHorizontalProps {
  items: TimelineItem[];
  className?: string;
}

const TimelineHorizontal = ({
  items,
  className = ''
}: TimelineHorizontalProps) => {
  const {
    activeIndex,
    imageOpacity,
    currentImageSrc,
    progressRefs,
    items: visibleItems,
    getItemOpacity,
    handleItemClick,
    handleImageLoad,
  } = useTimelineHorizontal({ items });

  const getGridColumns = () => {
    const length = visibleItems.length;
    if (length === 2) return 'md:grid-cols-2';
    if (length === 3) return 'md:grid-cols-3';
    return 'md:grid-cols-4';
  };

  return (
    <div className={`w-full flex flex-col gap-6 p-[var(--width-10)] ${className}`}>
      <div className="w-full bg-white shadow p-6 rounded">
        {currentImageSrc ? (
          <Image 
            src={currentImageSrc} 
            width={1000} 
            height={1000} 
            alt={items[activeIndex]?.title || ''} 
            className="w-full h-auto rounded transition-opacity duration-500" 
            style={{ opacity: imageOpacity }}
            priority={activeIndex === 0}
            onLoad={handleImageLoad}
          />
        ) : (
          <div className="w-full aspect-video bg-gray-200 rounded" />
        )}
      </div>
      <div className={`relative grid grid-cols-1 gap-6 md:gap-6 ${getGridColumns()}`}>
        {visibleItems.map((item, index) => (
          <div 
            key={index} 
            className={`p-6 bg-white rounded shadow flex flex-col gap-3 transition-all duration-300 ${
              index === activeIndex ? 'cursor-default' : 'cursor-pointer hover:shadow-lg'
            }`}
            onClick={() => handleItemClick(index)}
          >
            <h2 className="text-xl md:text-2xl">{item.title}</h2>
            <div className="relative w-full h-px overflow-hidden">
              <div className="absolute z-0 w-full h-full bg-black/20" />
              <div 
                ref={el => { 
                  if (el !== null) {
                    progressRefs.current[index] = el;
                  }
                }}
                className="absolute z-10 h-full w-full bg-black origin-left" 
                style={{ transform: 'scaleX(0)' }}
              />
            </div>
            <p className={`text-sm transition-opacity duration-500 ease-in-out ${getItemOpacity(index)}`}>
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

TimelineHorizontal.displayName = 'TimelineHorizontal';

export default React.memo(TimelineHorizontal);