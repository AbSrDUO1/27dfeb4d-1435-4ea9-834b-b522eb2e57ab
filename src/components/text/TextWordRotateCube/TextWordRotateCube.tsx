"use client";

import React, { memo } from "react";
import "./TextWordRotateCube.css";

interface TextWordRotateCubeProps {
  items: [string, string, string, string];
  autoPlay?: boolean;
  duration?: number;
  ariaLabel?: string;
}

const TextWordRotateCube = ({
  items,
  autoPlay = true,
  duration = 11,
  ariaLabel,
}: TextWordRotateCubeProps) => {
  const animationStyle = autoPlay
    ? {
        animation: `cubeRotate ${duration}s infinite ease-in-out`,
      }
    : {};

  return (
    <div
      className="container relative pointer-events-none w-30 h-30 flex justify-center text-center items-center select-none"
      style={animationStyle}
      aria-label={ariaLabel || items.join(", ")}
    >
      {items.map((item, index) => (
        <span
          key={index}
          className="face absolute top-0 left-0 w-full h-full bg-black text-white flex justify-center items-center text-5xl m-0 leading-[100%]"
        >
          {item}
        </span>
      ))}
    </div>
  );
};

TextWordRotateCube.displayName = "TextWordRotateCube";

export default memo(TextWordRotateCube);
