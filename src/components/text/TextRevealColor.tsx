"use client";

import React, {
  useState,
  useEffect,
  useMemo,
  memo,
  useRef,
  Fragment,
} from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const NBSP = "\u00A0";

interface CharProps {
  char: string;
  delay: number;
  duration: number;
  colorTransition: boolean;
  colorDelay: number;
  startColor: string;
  instant: boolean;
}

const AnimatedChar = memo(
  ({
    char,
    delay,
    duration,
    colorTransition,
    colorDelay,
    startColor,
    instant,
  }: CharProps) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
      if (instant) {
        setIsVisible(true);
        return;
      }
      const timer = setTimeout(() => setIsVisible(true), delay);
      return () => clearTimeout(timer);
    }, [delay, instant]);

    const transitionStyle = instant
      ? "none"
      : colorTransition
      ? `opacity ${duration}ms, color ${duration}ms ${colorDelay}ms`
      : `opacity ${duration}ms`;

    const colorStyle = colorTransition && !isVisible ? startColor : undefined;

    return (
      <span
        className="inline-block"
        style={{
          opacity: isVisible ? 1 : 0,
          transition: transitionStyle,
          color: colorStyle,
          willChange: instant || isVisible ? "auto" : "opacity, color",
          transform: "translateZ(0)",
        }}
      >
        {char === " " ? NBSP : char}
      </span>
    );
  }
);

AnimatedChar.displayName = "AnimatedChar";

interface TextRevealColorProps {
  text: string;
  className?: string;
  charDelay?: number;
  charDuration?: number;
  colorDelay?: number;
  startColor?: string;
  colorPercentage?: number;
  instant?: boolean;
  scrollTrigger?: boolean;
  start?: string;
  ariaLabel?: string;
}

const TextRevealColor = ({
  text,
  className = "",
  charDelay = 10,
  charDuration = 600,
  colorDelay = 150,
  startColor = "#5A71E6",
  colorPercentage = 0.5,
  instant = false,
  scrollTrigger = false,
  start = "top 80%",
  ariaLabel,
}: TextRevealColorProps) => {
  const [shouldAnimate, setShouldAnimate] = useState(!scrollTrigger);
  const containerRef = useRef<HTMLDivElement>(null);

  const colorIndices = useMemo(
    () =>
      new Set(
        [...Array(text.length).keys()]
          .sort(() => Math.random() - 0.5)
          .slice(0, Math.floor(text.length * colorPercentage))
      ),
    [text.length, colorPercentage]
  );

  useEffect(() => {
    if (!scrollTrigger || !containerRef.current) return;

    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: start,
      once: true,
      onEnter: () => setShouldAnimate(true),
    });

    return () => {
      trigger.kill();
    };
  }, [scrollTrigger, start]);

  if (!shouldAnimate && scrollTrigger) {
    return (
      <div
        ref={containerRef}
        className={className}
        aria-label={ariaLabel || text}
      >
        <span style={{ opacity: 0 }}>{text}</span>
      </div>
    );
  }

  let charIndex = 0;
  const words = text.split(" ");

  return (
    <div
      ref={containerRef}
      className={className}
      aria-label={ariaLabel || text}
    >
      {words.map((word, wordIndex) => {
        const wordChars = word.split("").map((char) => {
          const currentIndex = charIndex++;
          return (
            <AnimatedChar
              key={`${currentIndex}-${shouldAnimate}`}
              char={char}
              delay={instant ? 0 : currentIndex * charDelay}
              duration={charDuration}
              colorTransition={colorIndices.has(currentIndex)}
              colorDelay={colorDelay}
              startColor={startColor}
              instant={instant}
            />
          );
        });

        if (wordIndex < words.length - 1) {
          charIndex++;
          return (
            <Fragment key={`${wordIndex}`}>
              <span className="inline-block">{wordChars}</span>
              <span> </span>
            </Fragment>
          );
        }

        return (
          <span key={`${wordIndex}`} className="inline-block">
            {wordChars}
          </span>
        );
      })}
    </div>
  );
};

TextRevealColor.displayName = "TextRevealColor";

export default memo(TextRevealColor);
