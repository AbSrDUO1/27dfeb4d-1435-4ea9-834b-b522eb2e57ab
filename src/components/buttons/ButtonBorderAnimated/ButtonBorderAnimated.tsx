"use client";

import React from "react";
import MovingBorder from "./MovingBorder";

interface ButtonBorderAnimatedProps {
  text?: string;
  onClick?: () => void;
  className?: string;
  borderRadius?: string;
  containerClassName?: string;
  borderClassName?: string;
  duration?: number;
}

const ButtonBorderAnimated = ({
  text = "Button",
  onClick,
  className = "",
  borderRadius = "var(--vw-0_5)",
  containerClassName = "",
  borderClassName = "",
  duration = 3000,
}: ButtonBorderAnimatedProps) => {
  return (
    <button
      className={`relative h-9 w-fit overflow-hidden bg-transparent p-[1px] text-xl ${containerClassName}`}
      style={{
        borderRadius: borderRadius,
      }}
      onClick={onClick}
    >
      <div
        className="absolute inset-0"
        style={{ borderRadius: `calc(${borderRadius} * 0.96)` }}
      >
        <MovingBorder duration={duration} rx="30%" ry="30%">
          <div
            className={`h-20 w-20 bg-[radial-gradient(#5A71E6_40%,transparent_60%)] opacity-[0.8] ${borderClassName}`}
          />
        </MovingBorder>
      </div>

      <div
        className={`relative flex h-full w-full px-6 items-center justify-center bg-white shadow text-sm text-black antialiased ${className}`}
        style={{
          borderRadius: `calc(${borderRadius} * 0.96)`,
        }}
      >
        {text}
      </div>
    </button>
  );
};

ButtonBorderAnimated.displayName = "ButtonBorderAnimated";

export default React.memo(ButtonBorderAnimated);
