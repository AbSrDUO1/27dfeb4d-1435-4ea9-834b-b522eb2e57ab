"use client";

import React, { memo } from "react";
import { cls } from "../../lib/utils";

interface ButtonPressDepthProps {
  text?: string;
  children?: React.ReactNode;
  onClick?: () => void;
  className?: string;
  frontClassName?: string;
  disabled?: boolean;
  ariaLabel?: string;
  type?: "button" | "submit" | "reset";
  variant?: "bottom" | "side" | "none";
}

const ButtonPressDepth = ({
  text = "Push me",
  children,
  onClick,
  className = "",
  frontClassName = "",
  disabled = false,
  ariaLabel,
  type = "button",
  variant = "bottom",
}: ButtonPressDepthProps) => {
  const buttonTransform =
    variant === "bottom"
      ? "md:hover:translate-y-[2px] active:translate-y-[2px]"
      : variant === "side"
      ? "md:hover:translate-x-[2px] active:translate-x-[2px]"
      : "";

  const spanTransform =
    variant === "bottom"
      ? "transform -translate-y-[6px] transition-transform duration-200 md:group-hover:translate-y-[-2px] active:translate-y-[-2px]"
      : variant === "side"
      ? "transform -translate-x-[6px] transition-transform duration-200 md:group-hover:translate-x-[-2px] active:translate-x-[-2px]"
      : "";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel || text}
      className={cls(
        "group relative bg-black rounded border-none p-0 cursor-pointer outline-offset-4",
        "disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200",
        buttonTransform,
        className
      )}
    >
      <span
        className={cls(
          "px-10 h-10 rounded flex items-center justify-center text-sm bg-blue text-white",
          spanTransform,
          frontClassName
        )}
      >
        {children || text}
      </span>
    </button>
  );
};

ButtonPressDepth.displayName = "ButtonPressDepth";

export default memo(ButtonPressDepth);
