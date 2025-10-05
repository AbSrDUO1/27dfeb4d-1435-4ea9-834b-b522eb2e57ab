"use client";

import React, { useRef, useEffect, memo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

interface ScrollTriggerConfig {
  trigger: HTMLElement;
  start: string;
  end: string;
  markers: boolean;
  scrub?: boolean;
  toggleActions?: string;
}

interface TextScrollTransformRotateProps {
  text?: string;
  children?: React.ReactNode;
  className?: string;
  duration?: number;
  stagger?: number;
  start?: string;
  end?: string;
  variant?: "scrub" | "trigger" | "words-scrub" | "words-trigger";
  ariaLabel?: string;
  gradientColors?: {
    from: string;
    to: string;
  };
}

const ROTATION_FROM = -90;
const ROTATION_TO = 0;
const Y_PERCENT_FROM = 50;
const Y_PERCENT_TO = 0;
const OPACITY_FROM = 0;
const OPACITY_TO = 1;

const ANIMATION_CONFIG = {
  scrub: {
    stagger: 0.02,
    useDuration: true,
  },
  trigger: {
    stagger: 0.0075,
    useDuration: false,
    duration: 0.6,
  },
  "words-scrub": {
    stagger: 0.05,
    useDuration: true,
  },
  "words-trigger": {
    stagger: 0.03,
    useDuration: false,
    duration: 0.6,
  },
} as const;

const TextScrollTransformRotate = ({
  text = "",
  children,
  className = "",
  duration = 1,
  start = "top 80%",
  end = "top 20%",
  variant = "scrub",
  ariaLabel,
  gradientColors,
}: TextScrollTransformRotateProps) => {
  const textRef = useRef<HTMLDivElement>(null);
  const splitRef = useRef<SplitText | null>(null);

  useEffect(() => {
    if (!textRef.current) return;

    const ctx = gsap.context(() => {
      const isWords = variant === "words-scrub" || variant === "words-trigger";
      const isScrub = variant === "scrub" || variant === "words-scrub";

      splitRef.current = new SplitText(textRef.current!, {
        type: isWords ? "lines,words" : "lines,words,chars",
        linesClass: "rotate-line",
        wordsClass: "rotate-word",
        charsClass: isWords ? undefined : "rotate-char",
      });

      const lines = splitRef.current.lines;
      gsap.set(lines, {
        overflow: "hidden",
      });

      const words = splitRef.current.words;
      gsap.set(words, {
        display: "inline-block",
        whiteSpace: "nowrap",
      });

      const animateTarget = isWords
        ? splitRef.current.words
        : splitRef.current.chars;
      const config = ANIMATION_CONFIG[variant];
      const animationDuration = config.useDuration
        ? duration
        : config.duration!;

      if (gradientColors) {
        animateTarget.forEach((element) => {
          gsap.set(element as HTMLElement, {
            backgroundImage: `linear-gradient(180deg, ${gradientColors.from} 0%, ${gradientColors.to} 100%)`,
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
            display: "inline-block",
          });
        });
      }

      const scrollTriggerConfig: ScrollTriggerConfig = {
        trigger: textRef.current!,
        start: start,
        end: end,
        markers: false,
      };

      if (isScrub) {
        scrollTriggerConfig.scrub = true;
      } else {
        scrollTriggerConfig.toggleActions = "play none none none";
      }

      gsap.fromTo(
        animateTarget,
        {
          opacity: OPACITY_FROM,
          rotationX: ROTATION_FROM,
          yPercent: Y_PERCENT_FROM,
        },
        {
          opacity: OPACITY_TO,
          rotationX: ROTATION_TO,
          yPercent: Y_PERCENT_TO,
          duration: animationDuration,
          stagger: config.stagger,
          ease: "power1.inOut",
          force3D: true,
          scrollTrigger: scrollTriggerConfig,
        }
      );
    }, textRef);

    return () => {
      ctx.revert();
      if (splitRef.current) {
        splitRef.current.revert();
      }
    };
  }, [text, duration, start, end, variant, gradientColors]);

  return (
    <div
      ref={textRef}
      className={`rotate-text ${className}`}
      aria-label={ariaLabel || text || undefined}
    >
      {children || text}
    </div>
  );
};

TextScrollTransformRotate.displayName = "TextScrollTransformRotate";

export default memo(TextScrollTransformRotate);
