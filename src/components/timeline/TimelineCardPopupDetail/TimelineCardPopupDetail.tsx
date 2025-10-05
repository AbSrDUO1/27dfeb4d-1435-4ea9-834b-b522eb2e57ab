'use client';

import React, { useCallback, useState } from 'react';
import Image from 'next/image';
import { ArrowUpRight, Plus } from 'lucide-react';
import TimelinePopup from './TimelinePopup';

interface TimelineItem {
  title: string;
  description: string;
  video?: string;
  image?: string;
}

interface TimelineCardPopupDetailProps {
  items: TimelineItem[];
  title?: string;
  className?: string;
}

const TimelineCardPopupDetail = ({
  items,
  title = 'TimelineBase',
  className = ''
}: TimelineCardPopupDetailProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const textHeight = 'calc(var(--text-xl) + var(--text-sm) + var(--vw-1))'; // ensure box is a bit taller than the text and aligned with the text
  
  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleItemClick = (index: number) => {
    setSelectedIndex(index);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setSelectedIndex(null);
  };

  const getItemClasses = useCallback((index: number) => {
    const baseClasses = `group relative cursor-pointer overflow-hidden w-60 md:w-22_5 h-fit flex flex-col rounded bg-white/20 shadow backdrop-blur-sm`;
    const alignmentClass = index % 2 === 0 ? 'self-end mr-0' : 'self-start ml-0';
    const marginClasses = [
      index % 4 === 0 ? 'md:mr-10' : '',
      index % 4 === 1 ? 'md:ml-20' : '',
      index % 4 === 2 ? 'md:mr-15' : '',
      index % 4 === 3 ? 'md:ml-0' : ''
    ].filter(Boolean).join(' ');

    return `${baseClasses} ${alignmentClass} ${marginClasses}`;
  }, []);
  
  return (
    <>
      <section className={`relative overflow-visible h-fit px-[var(--width-10)] ${className}`}>
        <div className="relative z-10 w-full flex flex-col gap-[var(--width-30)] md:gap-30">
          {items.map((item, index) => (
            <div
              key={index}
              className={getItemClasses(index)}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => handleItemClick(index)}
            >
              <div className="relative z-20 overflow-hidden w-full h-auto rounded flex items-center justify-center bg-white">
                {item.video ? (
                  <video
                    src={item.video}
                    className="w-full h-auto"
                    autoPlay
                    muted
                    playsInline
                    loop
                  />
                ) : item.image ? (
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={500}
                    height={300}
                    className="w-full h-auto transition-all duration-400 md:group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-48 rounded" />
                )}
              </div>
              <div className="relative w-full flex gap-3 p-6">
                <div
                  className="absolute z-0 bottom-6 left-6 bg-black rounded-sm flex items-center justify-center transition-all duration-400 md:group-hover:bottom-0 md:group-hover:left-0"
                  style={{
                    height: !isMobile && hoveredIndex === index ? 'calc(100% + var(--vw-1))' : textHeight,
                    width: !isMobile && hoveredIndex === index ? '100%' : textHeight
                  }}
                >
                  <div className="absolute bottom-0 left-0 flex items-center justify-center transition-all duration-400 md:group-hover:opacity-0 md:group-hover:bottom-6 md:group-hover:left-6" style={{ height: textHeight, width: textHeight }}>
                    <Plus className="h-[var(--text-xl)] w-auto text-white" />
                  </div>
                  <div className="absolute bottom-0 right-0 opacity-0 flex items-center justify-center transition-all duration-400 md:group-hover:opacity-100 md:group-hover:bottom-6 md:group-hover:right-6" style={{ height: textHeight, width: textHeight }}>
                    <ArrowUpRight className="h-[var(--text-xl)] w-auto text-white" />
                  </div>
                </div>
                <div className="relative z-10 ml-[calc(var(--height-10)+var(--vw-2))] md:ml-[calc(var(--height-10)+var(--vw-1))] mr-0 min-w-0 flex-1 flex flex-col justify-center gap-1 transition-all duration-400 text-black md:group-hover:text-white md:group-hover:ml-0 md:group-hover:mr-[calc(var(--height-10)+var(--vw-1))]" style={{ height: textHeight }}>
                  <h2 className="text-xl font-semibold leading-[110%] truncate">{item.title}</h2>
                  <h3 className="text-sm leading-[110%] truncate">{item.description}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="absolute z-0 top-0 left-0 w-full h-full overflow-visible">
          <div className="sticky top-0 left-0 w-full h-screen flex items-center justify-center text-center">
            <h1 className="text-6xl font-bold">{title}</h1>
          </div>
        </div>
      </section>
      
      <TimelinePopup 
        isOpen={isOpen}
        item={selectedIndex !== null ? items[selectedIndex] : null}
        onClose={handleClose}
      />
    </>
  );
};

TimelineCardPopupDetail.displayName = 'TimelineCardPopupDetail';

export default React.memo(TimelineCardPopupDetail);