"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { TimelineProcessFlowProps } from "@/types/timeline";

gsap.registerPlugin(ScrollTrigger);

interface GradientConfig {
  show?: boolean;
  inset?: string;
  rounded?: string;
  radialColor?: string;
  radialOpacity?: string;
  linearColor?: string;
  linearOpacity?: string;
}

interface ExtendedTimelineProcessFlowProps extends TimelineProcessFlowProps {
  className?: string;
  sectionClassName?: string;
  backgroundColor?: string;
  backgroundPattern?: string;
  gradient?: GradientConfig;
  lineClassName?: string;
  activeLineClassName?: string;
  itemClassName?: string;
  cardClassName?: string;
  imageClassName?: string;
  numberClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  listItemClassName?: string;
  iconContainerClassName?: string;
  iconClassName?: string;
  gapClassName?: string;
  paddingClassName?: string;
}

const TimelineProcessFlow: React.FC<ExtendedTimelineProcessFlowProps> = ({
  items,
  className = "",
  sectionClassName = "timeline-line h-fit p-0",
  backgroundColor = "bg-transparent",
  backgroundPattern,
  gradient,
  lineClassName = "bg-gray-200",
  activeLineClassName = "bg-black",
  itemClassName = "",
  cardClassName = "rounded-lg shadow",
  imageClassName = "rounded",
  numberClassName = "bg-white text-black shadow",
  titleClassName = "text-xl md:text-2xl font-semibold leading-[100%]",
  descriptionClassName = "text-base leading-[120%]",
  listItemClassName = "text-base",
  iconContainerClassName = "bg-white shadow",
  iconClassName = "text-black",
  gapClassName = "gap-20",
  paddingClassName = "px-[var(--width-10)]",
}) => {
  const processLineRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    if (!processLineRef.current) return;

    gsap.fromTo(
      processLineRef.current,
      { yPercent: -100 },
      {
        yPercent: 0,
        ease: "none",
        scrollTrigger: {
          trigger: ".timeline-line",
          start: "top center",
          end: "bottom center",
          scrub: true,
        },
      }
    );

    itemRefs.current.forEach((item) => {
      if (!item) return;

      gsap.to(item, {
        opacity: 1,
        duration: 1,
        ease: "power1",
        scrollTrigger: {
          trigger: item,
          start: "top 80%",
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div className={`${sectionClassName} ${backgroundColor} ${className}`}>
      {backgroundPattern && (
        <div
          className={`absolute inset-0 opacity-20 ${backgroundPattern} bg-repeat`}
        />
      )}
      {gradient?.show && (
        <div
          className={`absolute ${gradient.inset || 'inset-0'} ${gradient.rounded || 'rounded-none'} bg-gradient-to-b from-transparent via-transparent to-black/20 pointer-events-none`}
          style={{
            background: `radial-gradient(ellipse at center, ${gradient.radialColor || 'transparent'} ${gradient.radialOpacity || '0%'}, transparent 70%), linear-gradient(to bottom, transparent 0%, ${gradient.linearColor || 'transparent'} ${gradient.linearOpacity || '0%'})`,
          }}
        />
      )}
      <div
        className={`timeline-line pointer-events-none absolute top-0 right-[var(--width-10)] md:right-auto md:left-1/2 md:-translate-x-1/2 w-px h-full z-0 overflow-hidden ${lineClassName}`}
      >
        <div
          className={`w-full h-full ${activeLineClassName}`}
          ref={processLineRef}
        />
      </div>
      <ol className={`relative flex flex-col ${gapClassName} ${paddingClassName}`}>
        {items.map((item, index) => (
          <li
            key={item.id}
            ref={(el) => {
              itemRefs.current[index] = el;
            }}
            className={`relative z-10 w-full flex flex-col gap-6 md:gap-0 md:flex-row justify-between opacity-0 ${
              item.reverse ? "flex-col md:flex-row-reverse" : ""
            } ${itemClassName}`}
          >
            <div
              className={`relative overflow-hidden w-70 md:w-30 h-80 ${cardClassName}`}
            >
              <Image
                src={item.image}
                alt={item.title}
                width={1000}
                height={1000}
                className={`w-full h-full object-cover ${imageClassName}`}
              />
            </div>
            <div
              className={`absolute top-1/2 right-[calc(var(--height-8)/-2)] md:right-auto md:left-1/2 md:-translate-x-1/2 -translate-y-1/2 h-8 aspect-square rounded-full flex items-center justify-center z-10 ${numberClassName}`}
            >
              <p className="text-sm">{item.id}</p>
            </div>
            <div className="w-70 md:w-30 h-fit flex flex-col justify-center gap-3 md:gap-6">
              <p className={titleClassName}>
                {item.title}
              </p>
              <p className={descriptionClassName}>
                {item.description}
              </p>
              <ul className="flex flex-col m-0 mt-1 p-0 list-none gap-3">
                {item.items.map((listItem, listIndex) => {
                  const Icon = listItem.icon;
                  return (
                    <li key={listIndex} className="flex items-center gap-3">
                      <div
                        className={`shrink-0 h-8 aspect-square flex items-center justify-center rounded ${iconContainerClassName}`}
                      >
                        <Icon
                          className={`h-[45%] w-[45%] ${iconClassName}`}
                          strokeWidth={1.25}
                        />
                      </div>
                      <p className={listItemClassName}>
                        {listItem.text}
                      </p>
                    </li>
                  );
                })}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
};

TimelineProcessFlow.displayName = "TimelineProcessFlow";

export default React.memo(TimelineProcessFlow);