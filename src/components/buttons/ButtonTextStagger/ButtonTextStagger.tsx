"use client";

import React, { useRef } from "react";
import { useStaggerAnimation } from "./useStaggerAnimation";
import "./StaggerButton.css";

export interface ButtonTextStaggerProps {
  text?: string;
  onClick?: () => void;
  className?: string;
  bgClassName?: string;
}

const ButtonTextStagger = ({
  text = "Get Started",
  onClick,
  className = "",
  bgClassName = "",
}: ButtonTextStaggerProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useStaggerAnimation(buttonRef, text);

  return (
    <button
      ref={buttonRef}
      onClick={onClick}
      className={`stagger-button relative cursor-pointer flex items-center justify-center bg-transparent border-none leading-none no-underline h-9 px-4 w-fit rounded text-black ${className}`}
    >
      <div
        className={`stagger-button-bg absolute inset-0 rounded transition-transform duration-[600ms] bg-white shadow ${bgClassName}`}
      ></div>
      <span
        data-button-animate-chars=""
        className="stagger-button-text relative text-sm inline-block overflow-hidden whitespace-nowrap"
      >
        {text}
      </span>
    </button>
  );
};

ButtonTextStagger.displayName = "ButtonTextStagger";

export default React.memo(ButtonTextStagger);
