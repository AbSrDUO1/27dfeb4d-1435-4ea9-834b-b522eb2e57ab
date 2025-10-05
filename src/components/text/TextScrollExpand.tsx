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

interface TextScrollExpandProps {
  text?: string;
  children?: React.ReactNode;
  className?: string;
  duration?: number;
  stagger?: number;
  start?: string;
  end?: string;
  variant?: "scrub" | "trigger" | "words-scrub" | "words-trigger";
  gradientColors?: {
    from: string;
    to: string;
  };
}

const ANIMATION_CONFIG = {
  scrub: {
    stagger: 0.01,
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

const ANIMATION_FROM = {
  opacity: 0,
  yPercent: 20,
  scaleY: 2.3,
  scaleX: 0.7,
  transformOrigin: "50% 0%",
} as const;

const ANIMATION_TO = {
  opacity: 1,
  yPercent: 0,
  scaleY: 1,
  scaleX: 1,
} as const;

const TextScrollExpand = ({
  text = "",
  children,
  className = "",
  duration = 1,
  start = "top 80%",
  end = "top 20%",
  variant = "scrub",
  gradientColors,
}: TextScrollExpandProps) => {
  const textRef = useRef<HTMLDivElement>(null);
  const splitRef = useRef<SplitText | null>(null);

  useEffect(() => {
    if (!textRef.current) return;

    const ctx = gsap.context(() => {
      splitRef.current = new SplitText(textRef.current!, {
        type: "lines,words,chars",
        linesClass: "expand-line",
        wordsClass: "expand-word",
        charsClass: "expand-char",
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

      const isWords = variant === "words-scrub" || variant === "words-trigger";
      const isScrub = variant === "scrub" || variant === "words-scrub";

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

      gsap.fromTo(animateTarget, ANIMATION_FROM, {
        ...ANIMATION_TO,
        duration: animationDuration,
        stagger: config.stagger,
        ease: "back.inOut(2)",
        force3D: true,
        scrollTrigger: scrollTriggerConfig,
      });
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
      className={`expand-text ${className}`}
      aria-label={text || undefined}
    >
      {children || text}
    </div>
  );
};

TextScrollExpand.displayName = "TextScrollExpand";

export default memo(TextScrollExpand);
