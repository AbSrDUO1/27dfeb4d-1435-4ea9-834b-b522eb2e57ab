"use client";

import React, { useEffect, useRef } from "react";
import { cls } from "@/lib/utils";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AuroraBackground from "@/components/background/auroraBackground/AuroraBackground";

gsap.registerPlugin(ScrollTrigger);

export interface TimelineYearlyItem {
  year: string;
  title: string;
  description: string;
}

interface GradientConfig {
  show?: boolean;
  inset?: string;
  rounded?: string;
  radialColor?: string;
  radialOpacity?: string;
  linearColor?: string;
  linearOpacity?: string;
}

interface TimelineYearlyProps {
  items: TimelineYearlyItem[];
  className?: string;
  sectionClassName?: string;
  backgroundColor?: string;
  backgroundPattern?: string;
  gradient?: GradientConfig;
  showAurora?: boolean;
  lineClassName?: string;
  activeLineClassName?: string;
  dotClassName?: string;
  yearClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  gapClassName?: string;
  paddingClassName?: string;
  marginClassName?: string;
}

const TimelineYearly = ({
  items,
  className = "",
  sectionClassName = "h-fit overflow-visible px-[var(--width-10)]",
  backgroundColor = "bg-blue",
  backgroundPattern,
  gradient,
  showAurora = false,
  lineClassName = "bg-white/10",
  activeLineClassName = "bg-white",
  dotClassName = "bg-white",
  yearClassName = "text-8xl leading-[100%] text-white mb-3 md:mb-0 block",
  titleClassName = "text-xl text-white font-semibold leading-[120%]",
  descriptionClassName = "text-sm md:text-base text-white max-w-full md:max-w-[85%] leading-[120%]",
  gapClassName = "gap-[var(--width-10)] md:gap-10",
  paddingClassName = "p-[calc(var(--width-10)/2)] pl-[var(--width-10)] md:pl-[calc(var(--width-10)/2)]",
  marginClassName = "mb-[var(--width-10)] md:mb-10 last:mb-0",
}: TimelineYearlyProps) => {
  const processLineRef = useRef<HTMLDivElement>(null);
  const timelineItemsRef = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    if (!processLineRef.current || !items?.length) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        processLineRef.current,
        { yPercent: -100 },
        {
          yPercent: 0,
          ease: "none",
          scrollTrigger: {
            trigger: "#timeline-center-line",
            start: "top center",
            end: "bottom center",
            scrub: true,
          },
        }
      );

      if (timelineItemsRef.current[0]) {
        gsap.set(timelineItemsRef.current[0], { opacity: 1 });
      }

      timelineItemsRef.current.slice(1).forEach((item) => {
        if (item) gsap.set(item, { opacity: 0.25 });
      });

      timelineItemsRef.current.forEach((item) => {
        if (!item) return;
        ScrollTrigger.create({
          trigger: item,
          start: "center center",
          end: "center center",
          onEnter: () => {
            gsap.to(timelineItemsRef.current.filter(Boolean), {
              opacity: 0.25,
              duration: 0.3,
            });
            gsap.to(item, { opacity: 1, duration: 0.3 });
          },
          onEnterBack: () => {
            gsap.to(timelineItemsRef.current.filter(Boolean), {
              opacity: 0.25,
              duration: 0.3,
            });
            gsap.to(item, { opacity: 1, duration: 0.3 });
          },
        });
      });
    });

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [items]);

  const addToRefs = (el: HTMLLIElement | null) => {
    if (el && !timelineItemsRef.current.includes(el)) {
      timelineItemsRef.current.push(el);
    }
  };

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <section
      className={cls(
        sectionClassName,
        backgroundColor,
        className
      )}
      aria-label="TimelineBase"
    >
      {backgroundPattern && (
        <div
          className={`absolute inset-0 opacity-20 ${backgroundPattern} bg-repeat`}
        />
      )}
      <div
        className={cls(
          "relative overflow-hidden w-full h-fit rounded",
          backgroundColor,
          "flex flex-col",
          gapClassName,
          paddingClassName
        )}
      >
        {showAurora && <AuroraBackground />}
        {backgroundPattern && (
          <div
            className={`absolute inset-0 opacity-20 ${backgroundPattern} bg-repeat`}
          />
        )}
        {gradient?.show && (
          <div
            className={cls(
              "absolute pointer-events-none",
              gradient.inset || 'inset-0',
              gradient.rounded || 'rounded-none',
              "bg-gradient-to-b from-transparent via-transparent to-black/20"
            )}
            style={{
              background: `radial-gradient(ellipse at center, ${gradient.radialColor || 'transparent'} ${gradient.radialOpacity || '0%'}, transparent 70%), linear-gradient(to bottom, transparent 0%, ${gradient.linearColor || 'transparent'} ${gradient.linearOpacity || '0%'})`,
            }}
          />
        )}
        <div
          id="timeline-center-line"
          className={cls(
            "absolute z-10 overflow-hidden top-[calc(var(--width-10)/2)] left-[calc(var(--width-10)/2)] md:left-1/2 -translate-x-1/2 w-px h-[calc(100%-var(--width-10))]",
            lineClassName
          )}
          aria-hidden="true"
        >
          <div
            className={cls(
              "w-full h-full",
              activeLineClassName
            )}
            ref={processLineRef}
          />
        </div>
        <ol className="list-none m-0 p-0" role="list">
          {items.map((item, index) => (
            <li
              className={cls(
                "relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center",
                marginClassName
              )}
              ref={addToRefs}
              key={`timeline-item-${index}`}
              role="listitem"
              aria-label={`${item.year}: ${item.title}`}
            >
              <time
                dateTime={item.year}
                className={yearClassName}
              >
                {item.year}
              </time>
              <article className="w-full md:w-1/2 md:pl-[calc(var(--width-10)/2)] flex flex-col gap-1 md:gap-3">
                <div className="flex items-center gap-3">
                  <div
                    className={cls(
                      "h-3.5 aspect-square rounded",
                      dotClassName
                    )}
                  />
                  <h2 className={titleClassName}>
                    {item.title}
                  </h2>
                </div>
                <p
                  className={cls(
                    descriptionClassName,
                    "max-w-full md:max-w-[85%]"
                  )}
                >
                  {item.description}
                </p>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

TimelineYearly.displayName = "TimelineYearly";

export default React.memo(TimelineYearly);
