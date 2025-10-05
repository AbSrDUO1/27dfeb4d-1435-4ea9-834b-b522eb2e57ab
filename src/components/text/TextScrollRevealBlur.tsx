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

interface TextScrollRevealBlurProps {
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

const TextScrollRevealBlur = ({
  text = "",
  children,
  className = "",
  duration = 1,
  start = "top 80%",
  end = "top 20%",
  variant = "scrub",
  gradientColors,
}: TextScrollRevealBlurProps) => {
  const textRef = useRef<HTMLDivElement>(null);
  const splitRef = useRef<SplitText | null>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    if (!textRef.current) return;

    const ctx = gsap.context(() => {
      splitRef.current = new SplitText(textRef.current!, {
        type: "words,chars",
        wordsClass: "blur-word",
        charsClass: "blur-char",
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

      const tl = gsap.timeline({
        scrollTrigger: scrollTriggerConfig,
      });

      tl.fromTo(
        animateTarget,
        {
          autoAlpha: OPACITY_FROM,
          filter: "blur(10px)",
        },
        {
          autoAlpha: OPACITY_TO,
          filter: "blur(0px)",
          duration: animationDuration,
          stagger: config.stagger,
          ease: "power1.inOut",
          onStart: function () {
            if (this._targets && this._targets.length > 0) {
              this._targets.forEach((target: HTMLElement) => {
                target.style.willChange = "filter, opacity, transform";
              });
            }
          },
          onComplete: function () {
            if (this._targets && this._targets.length > 0) {
              this._targets.forEach((target: HTMLElement) => {
                target.style.willChange = "auto";
              });
            }
          },
        }
      );

      scrollTriggerRef.current = tl.scrollTrigger as ScrollTrigger;
    }, textRef);

    const currentTextRef = textRef.current;

    return () => {
      if (
        scrollTriggerRef.current &&
        scrollTriggerRef.current.trigger === currentTextRef
      ) {
        scrollTriggerRef.current.kill();
      }
      ctx.revert();
      if (splitRef.current) {
        splitRef.current.revert();
      }
    };
  }, [text, duration, start, end, variant, gradientColors]);

  return (
    <div
      ref={textRef}
      className={`blur-text ${className}`}
      aria-label={text || undefined}
    >
      {children || text}
    </div>
  );
};

TextScrollRevealBlur.displayName = "TextScrollRevealBlur";

export default memo(TextScrollRevealBlur);
