"use client";

import React, { useRef, useEffect, memo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

interface TextScrollCharacterWaveProps {
  text: string;
  className?: string;
  primaryColor?: string;
  secondaryColor?: string;
  start?: string;
  stagger?: number;
  duration?: number;
  ease?: string;
  ariaLabel?: string;
}

const TextScrollCharacterWave = ({
  text,
  className = "",
  primaryColor = "#5A71E6",
  secondaryColor = "#000",
  start = "top 95%",
  stagger = 0.15,
  duration = 1,
  ease = "sine",
  ariaLabel,
}: TextScrollCharacterWaveProps) => {
  const textRef = useRef<HTMLDivElement>(null);
  const splitRef = useRef<SplitText | null>(null);

  useEffect(() => {
    const element = textRef.current;
    if (!element) return;

    const ctx = gsap.context(() => {
      splitRef.current = new SplitText(element, { type: "words" });

      gsap.set(splitRef.current.words, { willChange: "opacity, color" });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: element,
          start: start,
          markers: false,
        },
      });

      timeline.fromTo(
        splitRef.current.words,
        {
          opacity: 0.2,
          color: secondaryColor,
        },
        {
          opacity: 1,
          color: primaryColor,
          stagger: stagger,
          duration: duration,
          ease: ease,
          force3D: true,
        }
      );

      timeline.to(
        splitRef.current.words,
        {
          color: secondaryColor,
          stagger: stagger,
          duration: duration,
          ease: ease,
          force3D: true,
        },
        "-=75%"
      );

      timeline.set(splitRef.current.words, { willChange: "auto" }, "+=0");
    }, element);

    return () => {
      if (splitRef.current) {
        splitRef.current.revert();
        splitRef.current = null;
      }
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === element) {
          trigger.kill();
        }
      });
      ctx.revert();
    };
  }, [text, primaryColor, secondaryColor, start, stagger, duration, ease]);

  return (
    <div ref={textRef} className={className} aria-label={ariaLabel || text}>
      {text}
    </div>
  );
};

TextScrollCharacterWave.displayName = "TextScrollCharacterWave";

export default memo(TextScrollCharacterWave);
