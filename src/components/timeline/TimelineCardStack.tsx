"use client";

import Image from "next/image";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { TimelineCardStackItem } from "@/types/timeline";
import { cls } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const ANIMATION_CONFIG = {
  OPACITY_ACTIVE: 1,
  OPACITY_INACTIVE: 0,
} as const;

interface GradientConfig {
  show?: boolean;
  inset?: string;
  rounded?: string;
  radialColor?: string;
  radialOpacity?: string;
  linearColor?: string;
  linearOpacity?: string;
}

interface TimelineCardStackProps {
  items: TimelineCardStackItem[];
  className?: string;
  sectionClassName?: string;
  backgroundColor?: string;
  backgroundPattern?: string;
  gradient?: GradientConfig;
  gapClassName?: string;
  cardClassName?: string;
  cardHeight?: string;
  cardStickyPosition?: string;
  stepNumberClassName?: string;
  stepNumberSize?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  contentGapClassName?: string;
  imageContainerClassName?: string;
  imageClassName?: string;
}

const TimelineCardStack = ({
  items,
  className = "",
  sectionClassName = "relative overflow-visible h-fit p-[var(--width-10)]",
  backgroundColor = "bg-transparent",
  backgroundPattern,
  gradient,
  gapClassName = "gap-[var(--width-25)] md:gap-[6.25vh]",
  cardClassName = "bg-white shadow rounded",
  cardHeight = "h-[150vw] md:h-[75vh]",
  cardStickyPosition = "top-[20vw] md:top-[12.5vh]",
  stepNumberClassName = "bg-black text-white",
  stepNumberSize = "h-8 w-[var(--height-8)]",
  titleClassName = "text-4xl md:text-5xl font-semibold leading-[100%]",
  descriptionClassName = "text-base leading-[110%]",
  contentGapClassName = "gap-3 md:gap-6",
  imageContainerClassName = "rounded",
  imageClassName = "object-cover",
}: TimelineCardStackProps) => {
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      itemRefs.current.forEach((ref, position) => {
        if (!ref) return;

        const isLast = position === itemRefs.current.length - 1;

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: ref,
            start: "center center",
            end: "+=100%",
            scrub: true,
          },
        });

        timeline.set(ref, { willChange: "opacity" }).to(ref, {
          ease: "none",
          opacity: isLast
            ? ANIMATION_CONFIG.OPACITY_ACTIVE
            : ANIMATION_CONFIG.OPACITY_INACTIVE,
        });
      });
    });

    return () => {
      ctx.revert();
    };
  }, [items]);

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div
      className={cls(
        sectionClassName,
        backgroundColor,
        className
      )}
    >
      {backgroundPattern && (
        <div
          className={`absolute inset-0 opacity-20 ${backgroundPattern} bg-repeat`}
        />
      )}
      {gradient?.show && (
        <div
          className={cls(
            "absolute",
            gradient.inset || 'inset-0',
            gradient.rounded || 'rounded-none',
            "bg-gradient-to-b from-transparent via-transparent to-black/20 pointer-events-none"
          )}
          style={{
            background: `radial-gradient(ellipse at center, ${gradient.radialColor || 'transparent'} ${gradient.radialOpacity || '0%'}, transparent 70%), linear-gradient(to bottom, transparent 0%, ${gradient.linearColor || 'transparent'} ${gradient.linearOpacity || '0%'})`,
          }}
        />
      )}
      <div className={cls("w-full flex flex-col", gapClassName)}>
        {items.map((item, index) => (
          <div
            key={item.id}
            ref={(el) => {
              itemRefs.current[index] = el;
            }}
            className={cls(
              cardStickyPosition,
              cardHeight,
              cardClassName,
              "sticky w-full p-[var(--width-5)] flex flex-col md:flex-row justify-between items-center gap-[var(--width-5)]"
            )}
          >
            <div className="w-full md:w-1/2 2xl:max-w-[40%] h-fit md:h-full flex flex-col justify-center">
              <div
                className={cls("w-fit flex flex-col", contentGapClassName)}
              >
                <div
                  className={cls(
                    stepNumberSize,
                    stepNumberClassName,
                    "rounded-full flex items-center justify-center"
                  )}
                >
                  <p className="text-sm">
                    {item.id}
                  </p>
                </div>
                <h2 className={titleClassName}>
                  {item.title}
                </h2>
                <p className={descriptionClassName}>
                  {item.description}
                </p>
              </div>
            </div>
            <div
              className={cls(
                "w-full md:w-1/2 h-full overflow-hidden",
                imageContainerClassName
              )}
            >
              <Image
                src={item.image}
                height={1000}
                width={1000}
                alt={item.title}
                className={cls("w-full h-full", imageClassName)}
                priority={index === 0}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

TimelineCardStack.displayName = "TimelineCardStack";

export default React.memo(TimelineCardStack);