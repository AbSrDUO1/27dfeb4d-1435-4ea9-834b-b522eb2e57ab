"use client";

import React from "react";
import { cls } from "@/lib/utils";

interface ButtonSlideBackgroundProps {
  text?: string;
  onClick?: () => void;
  className?: string;
  contentClassName?: string;
  bgColor?: string;
  hoverBgColor?: string;
  textColor?: string;
  hoverTextColor?: string;
}

const ButtonSlideBackground = ({
  text = "Reserve",
  onClick,
  className = "",
  contentClassName = "",
  bgColor = "bg-white",
  hoverBgColor = "after:bg-black",
  textColor = "text-black",
  hoverTextColor = "after:text-white",
}: ButtonSlideBackgroundProps) => {
  const cubicBezier = "cubic-bezier(0.4, 0, 0, 1)";

  return (
    <button
      className={cls(
        "group relative flex items-center justify-center h-9 w-fit px-6 shadow border-0 rounded-sm overflow-hidden cursor-pointer outline-none pointer-events-auto",
        "after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-full",
        "after:translate-y-[101%] after:rounded-t-[50%] hover:after:translate-y-0 hover:after:rounded-none",
        "after:transition-all after:duration-500",
        bgColor,
        hoverBgColor,
        className
      )}
      onClick={onClick}
      style={{
        transform: "scaleX(1)",
        transition: `transform 0.5s ${cubicBezier}`,
      }}
    >
      <span
        className={cls(
          "inline-block text-sm overflow-hidden relative",
          "after:content-[attr(data-text)] after:w-full after:h-full after:inline-block after:absolute",
          "after:left-1/2 after:bottom-0 after:z-[1] after:-translate-x-1/2 after:translate-y-full group-hover:after:translate-y-0",
          "after:transition-transform after:duration-500 after:ease-[cubic-bezier(0.2,0,0,1)]",
          textColor,
          hoverTextColor,
          contentClassName
        )}
        data-text={text}
      >
        {text}
      </span>
    </button>
  );
};

ButtonSlideBackground.displayName = "ButtonSlideBackground";

export default React.memo(ButtonSlideBackground);
