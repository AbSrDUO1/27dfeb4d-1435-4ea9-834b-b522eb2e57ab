"use client";

import React, { memo } from "react";
import { ArrowRight } from "lucide-react";
import "./RotatingIconButton.css";

interface ButtonIconRotateProps {
  text: string;
  onClick?: () => void;
  className?: string;
}

const ButtonIconRotate = ({
  text,
  onClick,
  className = "",
}: ButtonIconRotateProps) => {
  return (
    <button
      onClick={onClick}
      className={`rotating-icon-button gap-2 text-blue text-base leading-tight no-underline flex bg-transparent border-none p-0 font-inherit cursor-pointer ${className}`}
      type="button"
    >
      <div className="rotating-icon-button-content gap-[2.25vw] lg:gap-[0.5rem] text-black bg-white shadow rounded flex items-center px-4 pr-[2.25vw] lg:pr-[0.5rem] h-9 relative overflow-hidden">
        <div className="rotating-icon-button-content-mask z-10 flex-none flex items-center relative overflow-hidden">
          <span className="rotating-icon-button-content-text text-sm">
            {text}
          </span>
        </div>
        <div className="z-10 flex-none flex justify-center items-center h-5 w-[var(--height-5)] aspect-square relative">
          <div className="rotating-icon-button-icon-bg bg-current rounded-sm w-full h-full absolute" />
          <div className="rotating-icon-button-icon-wrap text-blue flex justify-end items-center w-full h-full relative overflow-hidden">
            <div className="rotating-icon-button-icon-list flex-none flex justify-start items-center h-full">
              {[...Array(3)].map((_, index) => (
                <ArrowRight
                  key={index}
                  className="rotating-icon-button-icon-arrow flex-none h-5 w-[var(--height-5)] p-[7.5%] text-white"
                />
              ))}
            </div>
          </div>
        </div>
        <div className="rotating-icon-button-content-bg z-0 bg-blue w-[120%] h-full absolute bottom-0 -left-[10%]"></div>
      </div>
    </button>
  );
};

ButtonIconRotate.displayName = "ButtonIconRotate";

export default memo(ButtonIconRotate);
