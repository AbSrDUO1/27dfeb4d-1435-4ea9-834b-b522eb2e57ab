"use client";

import React from "react";
import { ArrowDownRight } from "lucide-react";

interface BubbleButtonProps {
  text?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
  contentClassName?: string;
  arrowClassName?: string;
  disabled?: boolean;
  ariaLabel?: string;
  type?: "button" | "submit" | "reset";
}

const BubbleButton = ({
  text = "Contact Us",
  onClick,
  className = "",
  contentClassName = "",
  arrowClassName = "",
  disabled = false,
  ariaLabel,
  type = "button",
}: BubbleButtonProps) => {
  const arrowClasses = `flex justify-center items-center h-9 aspect-square text-black bg-white rounded-full shadow ${arrowClassName}`;
  const arrowIconClasses =
    "h-[35%] w-auto aspect-square object-contain transition-transform duration-700 group-hover:rotate-[-45deg]";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel || text}
      className={`group bubble-button flex justify-center items-center rounded-full relative cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    >
      <div
        className={`${arrowClasses} relative transition-transform duration-700 ease-[cubic-bezier(0.625,0.05,0,1)] scale-0 origin-left group-hover:scale-100`}
      >
        <ArrowDownRight strokeWidth={1.5} className={arrowIconClasses} />
      </div>
      <div
        className={`flex justify-center items-center h-9 px-4 text-white bg-black shadow rounded-full relative transition-transform duration-700 ease-[cubic-bezier(0.625,0.05,0,1)] -translate-x-9 group-hover:translate-x-0 ${contentClassName}`}
      >
        <span className="text-sm">{text}</span>
      </div>
      <div
        className={`${arrowClasses} absolute right-0 z-20 transition-transform duration-700 ease-[cubic-bezier(0.625,0.05,0,1)] scale-100 origin-right group-hover:scale-0`}
      >
        <ArrowDownRight strokeWidth={1.5} className={arrowIconClasses} />
      </div>
    </button>
  );
};

BubbleButton.displayName = "BubbleButton";

export default React.memo(BubbleButton);
