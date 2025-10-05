"use client";

import React, { memo } from "react";

interface ButtonHoverDirectionalProps {
  text: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  ariaLabel?: string;
  type?: "button" | "submit" | "reset";
}

const ButtonHoverDirectional = ({
  text,
  onClick,
  className = "",
  disabled = false,
  ariaLabel,
  type = "button",
}: ButtonHoverDirectionalProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel || text}
      className={`relative text-sm inline-block bg-transparent border-none p-0 cursor-pointer 
        after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] 
        after:bg-current after:scale-x-0 after:origin-right after:transition-transform after:duration-300
        hover:after:scale-x-100 hover:after:origin-left
        disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:after:scale-x-0
        ${className}`}
    >
      {text}
    </button>
  );
};

ButtonHoverDirectional.displayName = "ButtonHoverDirectional";

export default memo(ButtonHoverDirectional);
