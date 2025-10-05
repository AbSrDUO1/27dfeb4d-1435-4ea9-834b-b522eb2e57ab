"use client";

import React, { memo } from "react";

interface TextFillGradientProps {
  text: string;
  className?: string;
  ariaLabel?: string;
  color1?: string;
  color2?: string;
  color3?: string;
}

const TextFillGradient = ({
  text,
  className = "",
  ariaLabel,
  color1 = "rgba(237, 125, 255, .8)",
  color2 = "rgba(108, 84, 255, .8)",
  color3 = "#1d1935",
}: TextFillGradientProps) => {
  const gradientStyle = `radial-gradient(47.08% 208.33% at 79.71% 128.33%, ${color1} 11.69%, ${color2} 35.44%, ${color3} 70.24%)`;

  return (
    <span
      className={`gradient-text ${className}`}
      style={{
        backgroundImage: gradientStyle,
        backgroundClip: "text",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        display: "inline-block",
      }}
      aria-label={ariaLabel || text}
    >
      {text}
    </span>
  );
};

TextFillGradient.displayName = "TextFillGradient";

export default memo(TextFillGradient);
