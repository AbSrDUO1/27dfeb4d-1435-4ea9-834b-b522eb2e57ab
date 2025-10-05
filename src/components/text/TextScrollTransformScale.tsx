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

interface TextScrollTransformScaleProps {
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

const TextScrollTransformScale = ({
  text = "",
  children,
  className = "",
  duration = 1,
  start = "top 80%",
  end = "top 20%",
  variant = "scrub",
  ariaLabel,
  gradientColors,
}: TextScrollTransformScaleProps) => {
  const textRef = useRef<HTMLDivElement>(null);
  const splitRef = useRef<SplitText | null>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    const element = textRef.current;
    if (!element) return;

    const ctx = gsap.context(() => {
      splitRef.current = new SplitText(element, {
        type: "words,chars",
        wordsClass: "scale-word",
        charsClass: "scale-char",
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
      const animationDuration = config.useDuration ? duration : config.duration;

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
        trigger: element,
        start: start,
        end: end,
        markers: false,
      };

      if (isScrub) {
        scrollTriggerConfig.scrub = true;
      } else {
        scrollTriggerConfig.toggleActions = "play none none none";
      }

      const tl = gsap.fromTo(
        animateTarget,
        {
          autoAlpha: 0,
          scale: 0.6,
          force3D: true,
        },
        {
          autoAlpha: 1,
          scale: 1,
          duration: animationDuration,
          stagger: config.stagger,
          ease: "power2.inOut",
          force3D: true,
          scrollTrigger: scrollTriggerConfig,
        }
      );

      if (tl.scrollTrigger) {
        scrollTriggerRef.current = tl.scrollTrigger;
      }
    }, element);

    return () => {
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
        scrollTriggerRef.current = null;
      }

      if (splitRef.current) {
        splitRef.current.revert();
        splitRef.current = null;
      }

      ctx.revert();
    };
  }, [text, duration, start, end, variant, gradientColors]);

  return (
    <div
      ref={textRef}
      className={`scale-text ${className}`}
      aria-label={ariaLabel || text || undefined}
    >
      {children || text}
    </div>
  );
};

TextScrollTransformScale.displayName = "TextScrollTransformScale";

export default memo(TextScrollTransformScale);
