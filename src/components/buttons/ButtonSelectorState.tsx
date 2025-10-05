"use client";

import React, { useRef, useEffect, memo } from "react";

export interface SelectorOption {
  value: string;
  label: React.ReactNode;
}

export interface ButtonSelectorStateProps {
  options: SelectorOption[];
  activeValue: string;
  onValueChange: (value: string) => void;
  className?: string;
  buttonClassName?: string;
  hoverClassName?: string;
}

const ButtonSelectorState: React.FC<ButtonSelectorStateProps> = memo(
  function ButtonSelectorState({
    options,
    activeValue,
    onValueChange,
    className = "",
    buttonClassName = "",
    hoverClassName = "",
  }) {
    const hoverRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const container = containerRef.current;
      const hoverElement = hoverRef.current;

      if (!container || !hoverElement) return;

      const moveHoverBlock = (target: HTMLElement) => {
        if (!target) return;
        const targetRect = target.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();

        hoverElement.style.width = `${targetRect.width}px`;
        hoverElement.style.transform = `translateX(${
          targetRect.left - containerRect.left
        }px)`;
      };

      const updatePosition = () => {
        const activeButton = container.querySelector(
          `[data-value="${activeValue}"]`
        ) as HTMLElement;
        if (activeButton) moveHoverBlock(activeButton);
      };

      updatePosition();

      const resizeObserver = new ResizeObserver(updatePosition);
      resizeObserver.observe(container);

      return () => {
        resizeObserver.disconnect();
      };
    }, [activeValue]);

    return (
      <div
        ref={containerRef}
        className={`relative w-fit rounded bg-white shadow h-10 px-0 overflow-hidden ${className}`}
      >
        {options.map((option) => (
          <button
            key={option.value}
            data-value={option.value}
            className={`h-full w-fit px-6 rounded text-nowrap transition-all duration-300 ease-in-out cursor-pointer relative z-10 ${
              activeValue === option.value ? "" : "bg-transparent"
            } ${buttonClassName}`}
            onClick={() => onValueChange(option.value)}
          >
            <div
              className={`text-sm transition-colors duration-300 ease-in-out cursor-pointer flex items-center justify-center ${
                activeValue === option.value ? "text-white" : "text-black"
              }`}
            >
              {option.label}
            </div>
          </button>
        ))}
        <div
          ref={hoverRef}
          className="absolute top-0 left-0 h-full rounded opacity-100 pointer-events-none z-0 transition-all duration-400 ease-out"
        >
          <div className={`w-full h-full bg-black rounded ${hoverClassName}`} />
        </div>
      </div>
    );
  }
);

export default ButtonSelectorState;
