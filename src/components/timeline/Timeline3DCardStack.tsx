'use client';

import Image from 'next/image';
import React from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import type { TimelineCardStackItem } from '@/types/timeline';

interface Timeline3DCardStackProps {
  items: TimelineCardStackItem[];
  className?: string;
}

interface TimelineCardProps {
  item: TimelineCardStackItem;
  index: number;
  scale: MotionValue<number>;
  totalItems: number;
}

const TimelineCard = React.memo(({ item, index, scale, totalItems }: TimelineCardProps) => {
  const topValue = `${index * 25}px`;

  const shouldReduceMotion = typeof window !== 'undefined' && 
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <div 
      className="h-screen flex justify-center sticky top-[20vw] md:top-[12.5vh] p-[var(--width-10)] pt-0"
      role="listitem"
      aria-label={`TimelineBase item ${index + 1} of ${totalItems}: ${item.title}`}
    >
      <motion.div
        style={{
          scale: shouldReduceMotion ? 1 : scale,
          top: topValue
        }}
        className="relative w-full h-[150vw] md:h-[75vh] bg-white shadow rounded p-[calc(var(--width-10)/2)] flex flex-col md:flex-row justify-between items-center gap-[calc(var(--width-10)/2)]"
      >
        <div className="w-full md:w-1/2 2xl:max-w-[40%] h-fit md:h-full flex flex-col justify-center">
          <div className="w-fit flex flex-col gap-3 md:gap-6">
            <div 
              className="h-8 w-[var(--height-8)] rounded-full bg-black flex items-center justify-center"
              aria-label={`Item number ${item.id}`}
            >
              <p className="text-sm text-white">{item.id}</p>
            </div>
            <h2 className="text-4xl md:text-5xl font-semibold leading-[100%]">
              {item.title}
            </h2>
            <p className="text-base leading-[110%]">{item.description}</p>
          </div>
        </div>
        <div className="w-full md:w-1/2 h-full overflow-hidden rounded">
          <Image
            src={item.image}
            height={1000}
            width={1000}
            alt={`${item.title} illustration`}
            className="w-full h-full object-cover"
            priority={index === 0}
            sizes="(max-width: 768px) 100vw, 50vw"
            loading={index === 0 ? 'eager' : 'lazy'}
          />
        </div>
      </motion.div>
    </div>
  );
});

TimelineCard.displayName = 'TimelineCard';

const Timeline3DCardStack = ({ items, className = '' }: Timeline3DCardStackProps) => {
  const containerRef = React.useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  const scale0 = useTransform(scrollYProgress, [0, 1], [1, 1 - (items.length * 0.025)]);
  const scale1 = useTransform(scrollYProgress, [1 / items.length, 1], [1, 1 - ((items.length - 1) * 0.025)]);
  const scale2 = useTransform(scrollYProgress, [2 / items.length, 1], [1, 1 - ((items.length - 2) * 0.025)]);
  const scale3 = useTransform(scrollYProgress, [3 / items.length, 1], [1, 1 - ((items.length - 3) * 0.025)]);
  const scale4 = useTransform(scrollYProgress, [4 / items.length, 1], [1, 1 - ((items.length - 4) * 0.025)]);

  const scales = [scale0, scale1, scale2, scale3, scale4].slice(0, items.length);

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div 
      ref={containerRef} 
      className={`relative ${className}`}
      role="list"
      aria-label="TimelineBase of events"
    >
      {items.map((item, index) => (
        <TimelineCard
          key={item.id}
          item={item}
          index={index}
          scale={scales[index]}
          totalItems={items.length}
        />
      ))}
    </div>
  );
};

Timeline3DCardStack.displayName = 'Timeline3DCardStack';

export default React.memo(Timeline3DCardStack);