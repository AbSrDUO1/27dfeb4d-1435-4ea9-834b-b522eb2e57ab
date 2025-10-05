"use client";

import React, { useRef, useState } from "react";
import { useDirectionalHover } from "./useDirectionalHover";

interface ButtonHoverDirectionalProps {
  text?: string;
  onClick?: () => void;
  className?: string;
  textClassName?: string;
  bgClassName?: string;
  circleClassName?: string;
}

const ButtonHoverDirectional = ({
  text = "Button",
  onClick,
  className = "",
  textClassName = "",
  bgClassName = "",
  circleClassName = "",
}: ButtonHoverDirectionalProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useDirectionalHover(buttonRef);

  return (
    <button
      ref={buttonRef}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`directional-hover-button relative flex justify-center items-center h-9 px-5 rounded cursor-pointer no-underline group ${className}`}
    >
      <div
        className={`absolute inset-0 rounded bg-white shadow ${bgClassName}`}
      />
      <div className="absolute inset-0 rounded overflow-hidden hidden md:block">
        <div
          className={`directional-hover-button-circle pointer-events-none bg-blue rounded-full w-full block absolute top-1/2 left-1/2 ${circleClassName}`}
          style={{
            transition: "transform 0.7s cubic-bezier(0.625, 0.05, 0, 1)",
            transform: isHovered
              ? "translate(-50%, -50%) scale(1) rotate(0.001deg)"
              : "translate(-50%, -50%) scale(0) rotate(0.001deg)",
          }}
        >
          <div className="block pt-[100%]" />
        </div>
      </div>
      <div
        className={`relative z-20 flex items-center text-black md:group-hover:text-white ${textClassName}`}
        style={{
          transition: "color 0.7s cubic-bezier(0.625, 0.05, 0, 1)",
        }}
      >
        <p className="whitespace-nowrap mb-0 text-sm">{text}</p>
      </div>
    </button>
  );
};

ButtonHoverDirectional.displayName = "ButtonHoverDirectional";

export default React.memo(ButtonHoverDirectional);
