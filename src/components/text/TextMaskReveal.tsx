"use client";

import React, {
  useRef,
  useEffect,
  memo,
  useState,
  useMemo,
  useCallback,
} from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface TextMaskRevealProps {
  text: string;
  className?: string;
  direction?: "left" | "right";
  ariaLabel?: string;
}

const TextMaskReveal = ({
  text,
  className = "",
  direction = "left",
  ariaLabel,
}: TextMaskRevealProps) => {
  const xPercentFrom = direction === "left" ? -25 : 25;
  const xPercentTo = direction === "left" ? 25 : -25;
  const start = "top bottom";
  const end = "bottom top";
  const scrub = true;
  const textRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLSpanElement>(null);
  const [repetitions, setRepetitions] = useState(3);

  const calculateRepetitions = useCallback(() => {
    if (!measureRef.current || !containerRef.current) return;

    const textWidth = measureRef.current.offsetWidth;
    const containerWidth = containerRef.current.offsetWidth;

    if (textWidth === 0) return;

    const requiredWidth = containerWidth * 2;
    const reps = Math.ceil(requiredWidth / textWidth);
    setRepetitions(Math.max(2, reps));
  }, []);

  useEffect(() => {
    calculateRepetitions();

    const container = containerRef.current;
    if (!container) return;

    let timeoutId: NodeJS.Timeout;
    const debouncedCalculate = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(calculateRepetitions, 100);
    };

    const resizeObserver = new ResizeObserver(debouncedCalculate);
    resizeObserver.observe(container);

    return () => {
      clearTimeout(timeoutId);
      resizeObserver.disconnect();
    };
  }, [text, calculateRepetitions]);

  useEffect(() => {
    if (!textRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        textRef.current,
        {
          xPercent: xPercentFrom,
        },
        {
          xPercent: xPercentTo,
          ease: "none",
          scrollTrigger: {
            trigger: textRef.current,
            start: start,
            end: end,
            scrub: scrub,
            invalidateOnRefresh: true,
          },
        }
      );
    }, textRef);

    return () => {
      ctx.revert();
    };
  }, [direction, scrub, xPercentFrom, xPercentTo]);

  const repeatedText = useMemo(() => {
    return Array.from({ length: repetitions }, () => text).join("\u00A0");
  }, [text, repetitions]);

  return (
    <div
      ref={containerRef}
      className="relative w-full flex items-center justify-center"
      style={{
        maskImage:
          "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
      }}
    >
      <span
        ref={measureRef}
        className={`absolute invisible whitespace-nowrap ${className}`}
        aria-hidden="true"
      >
        {text + "\u00A0"}
      </span>
      <div
        ref={textRef}
        className={`horizontal-text whitespace-nowrap leading-[120%] ${className}`}
        aria-label={ariaLabel || text}
      >
        {repeatedText}
      </div>
    </div>
  );
};

TextMaskReveal.displayName = "TextMaskReveal";

export default memo(TextMaskReveal);
