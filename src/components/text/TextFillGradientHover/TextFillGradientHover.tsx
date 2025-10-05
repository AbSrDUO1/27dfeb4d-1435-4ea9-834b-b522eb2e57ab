"use client";

import React, { useRef, memo } from "react";
import { motion } from "framer-motion";
import { useResponsive } from "@/hooks/useResponsive";
import useCursorTracking from "./useCursorTracking";

interface TextFillGradientHoverProps {
  text: string;
  className?: string;
  fontSize?: string;
  strokeWidth?: number;
  ariaLabel?: string;
}

const TextFillGradientHover = ({
  text,
  className = "",
  fontSize = "text-7xl",
  strokeWidth = 0.3,
  ariaLabel,
}: TextFillGradientHoverProps) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const { isMobile } = useResponsive({ breakpoint: 768 });
  const isAnimationDisabled = isMobile;

  const {
    maskPosition,
    hovered,
    handleMouseEnter,
    handleMouseLeave,
    handleMouseMove,
  } = useCursorTracking(svgRef, isAnimationDisabled);

  const gradientColors = {
    color1: "var(--gradient-color-1, #eab308)",
    color2: "var(--gradient-color-2, #ef4444)",
    color3: "var(--gradient-color-3, #3b82f6)",
    color4: "var(--gradient-color-4, #06b6d4)",
    color5: "var(--gradient-color-5, #8b5cf6)",
  };

  const strokeColor = "var(--stroke-color, rgb(229 229 229))";

  return (
    <svg
      ref={svgRef}
      width="100%"
      height="100%"
      viewBox="0 0 300 100"
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      className={`select-none ${className}`}
      role="img"
      aria-label={ariaLabel || text}
    >
      <defs>
        <linearGradient
          id="textGradient"
          gradientUnits="userSpaceOnUse"
          cx="50%"
          cy="50%"
          r="25%"
        >
          <stop offset="0%" stopColor={gradientColors.color1} />
          <stop offset="25%" stopColor={gradientColors.color2} />
          <stop offset="50%" stopColor={gradientColors.color3} />
          <stop offset="75%" stopColor={gradientColors.color4} />
          <stop offset="100%" stopColor={gradientColors.color5} />
        </linearGradient>

        {!isAnimationDisabled && (
          <motion.radialGradient
            id="revealMask"
            gradientUnits="userSpaceOnUse"
            r="20%"
            initial={{ cx: "50%", cy: "50%" }}
            animate={{ cx: maskPosition.cx, cy: maskPosition.cy }}
            transition={{
              duration: 0.25,
              ease: "easeOut",
            }}
          >
            <stop offset="0%" stopColor="white" />
            <stop offset="100%" stopColor="black" />
          </motion.radialGradient>
        )}

        {isAnimationDisabled && (
          <radialGradient
            id="revealMask"
            gradientUnits="userSpaceOnUse"
            cx="50%"
            cy="50%"
            r="50%"
          >
            <stop offset="0%" stopColor="white" />
            <stop offset="100%" stopColor="white" />
          </radialGradient>
        )}

        <mask id="textMask">
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="url(#revealMask)"
          />
        </mask>
      </defs>

      {!isAnimationDisabled && (
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          strokeWidth={strokeWidth}
          className={`fill-transparent stroke-neutral-200 font-[helvetica] ${fontSize} font-bold dark:stroke-neutral-800`}
          style={{
            opacity: hovered ? 0.7 : 0,
            stroke: strokeColor,
          }}
        >
          {text}
        </text>
      )}

      <motion.text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth={strokeWidth}
        className={`fill-transparent stroke-neutral-200 font-[helvetica] ${fontSize} font-bold dark:stroke-neutral-800`}
        style={{
          stroke: strokeColor,
        }}
        initial={{ strokeDashoffset: 1000, strokeDasharray: 1000 }}
        animate={{
          strokeDashoffset: 0,
          strokeDasharray: 1000,
        }}
        transition={{
          duration: 4,
          ease: "easeInOut",
        }}
      >
        {text}
      </motion.text>

      <motion.text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        stroke={isAnimationDisabled ? "currentColor" : "url(#textGradient)"}
        strokeWidth={strokeWidth}
        mask={isAnimationDisabled ? undefined : "url(#textMask)"}
        className={`fill-transparent font-[helvetica] ${fontSize} font-bold ${
          isAnimationDisabled ? "stroke-current" : ""
        }`}
        initial={{ opacity: 0 }}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {text}
      </motion.text>
    </svg>
  );
};

TextFillGradientHover.displayName = "TextFillGradientHover";

export default memo(TextFillGradientHover);
