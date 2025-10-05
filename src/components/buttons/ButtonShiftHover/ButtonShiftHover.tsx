"use client";

import React, { useRef } from "react";
import { useShiftAnimation } from "./useShiftAnimation";
import "./ShiftButton.css";

interface ButtonShiftHoverProps {
  text?: string;
  onClick?: () => void;
  className?: string;
  bgClassName?: string;
  textClassName?: string;
}

const ButtonShiftHover = ({
  text = "Get Started",
  onClick,
  className = "",
  bgClassName = "",
  textClassName = "",
}: ButtonShiftHoverProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useShiftAnimation(buttonRef, text);

  return (
    <button
      ref={buttonRef}
      onClick={onClick}
      className={`shift-button group relative cursor-pointer flex gap-2 items-center justify-center bg-transparent border-none leading-none no-underline h-9 px-5 pr-4 w-fit rounded-full text-black ${className}`}
    >
      <div
        className={`shift-button-bg absolute inset-0 rounded-full transition-transform duration-[600ms] bg-white shadow ${bgClassName}`}
      ></div>
      <span
        data-button-animate-chars=""
        className={`shift-button-text relative text-sm inline-block overflow-hidden whitespace-nowrap ${textClassName}`}
      >
        {text}
      </span>
      <div className="relative h-[var(--text-sm)] w-auto aspect-square rounded-full border border-black scale-65 transition-all duration-300 md:group-hover:bg-black md:group-hover:scale-40" />
    </button>
  );
};

ButtonShiftHover.displayName = "ButtonShiftHover";

export default React.memo(ButtonShiftHover);
