"use client";

import React, { memo, useRef, useMemo } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
} from "framer-motion";
import { wrap } from "@motionone/utils";

interface TextParallaxProps {
  text: string;
  baseVelocity?: number;
  className?: string;
  textClassName?: string;
  ariaLabel?: string;
}

const TextParallax = ({
  text,
  baseVelocity = 5,
  className = "",
  textClassName = "",
  ariaLabel,
}: TextParallaxProps) => {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

  const directionFactor = useRef<number>(1);
  useAnimationFrame((_, delta) => {
    const velocity = velocityFactor.get();
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    if (velocity < 0) {
      directionFactor.current = -1;
    } else if (velocity > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocity;

    baseX.set(baseX.get() + moveBy);
  });

  const textElements = useMemo(
    () =>
      Array.from({ length: 8 }, (_, i) => (
        <span
          key={i}
          className={`block mr-8 ${textClassName}`}
          aria-hidden={i > 0 ? "true" : undefined}
        >
          {text}
        </span>
      )),
    [text, textClassName]
  );

  return (
    <div
      className={`overflow-hidden whitespace-nowrap flex flex-nowrap ${className}`}
      aria-label={ariaLabel || `Scrolling text: ${text}`}
    >
      <motion.div
        className="flex flex-nowrap"
        style={{ x, willChange: "transform" }}
      >
        {textElements}
      </motion.div>
    </div>
  );
};

TextParallax.displayName = "TextParallax";

export default memo(TextParallax);
