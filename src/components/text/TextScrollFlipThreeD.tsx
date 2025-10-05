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

interface TextScrollFlipThreeDProps {
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

const OPACITY_FROM = 0;
const OPACITY_TO = 1;
const ROTATION_X_FROM = -90;
const ROTATION_X_TO = 0;
const Z_FROM = -200;
const Z_TO = 0;

const TextScrollFlipThreeD = ({
  text = "",
  children,
  className = "",
  duration = 1,
  start = "top 80%",
  end = "top 20%",
  variant = "scrub",
  ariaLabel,
  gradientColors,
}: TextScrollFlipThreeDProps) => {
  const textRef = useRef<HTMLDivElement>(null);
  const splitRef = useRef<SplitText | null>(null);

  useEffect(() => {
    if (!textRef.current) return;

    const ctx = gsap.context(() => {
      splitRef.current = new SplitText(textRef.current!, {
        type: "words,chars",
        wordsClass: "flip-word",
        charsClass: "flip-char",
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

      gsap.fromTo(
        animateTarget,
        {
          opacity: OPACITY_FROM,
          rotationX: ROTATION_X_FROM,
          z: Z_FROM,
          "will-change": "transform",
          transformOrigin: "50% 0%",
        },
        {
          opacity: OPACITY_TO,
          rotationX: ROTATION_X_TO,
          z: Z_TO,
          duration: animationDuration,
          stagger: config.stagger,
          ease: "power2.inOut",
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
      className={`flip-text ${className}`}
      aria-label={ariaLabel || text || undefined}
    >
      {children || text}
    </div>
  );
};

TextScrollFlipThreeD.displayName = "TextScrollFlipThreeD";

export default memo(TextScrollFlipThreeD);
