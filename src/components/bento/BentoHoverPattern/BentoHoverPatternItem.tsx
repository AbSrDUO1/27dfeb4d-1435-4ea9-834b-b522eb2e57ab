"use client";

import { memo, useRef } from "react";
import { LucideIcon } from "lucide-react";
import { useMotionValue } from "framer-motion";
import { CardPattern } from "@/components/background/CardPattern";
import { usePatternInteraction } from "./usePatternInteraction";
import ButtonPressDepth from "@/components/buttons/ButtonPressDepth";

export interface BentoHoverPatternItemData {
  icon?: LucideIcon;
  value: string;
  description?: string;
}

interface BentoHoverPatternItemProps {
  item: BentoHoverPatternItemData;
  rowIndex: number;
  itemIndex: number;
  className?: string;
  valueClassName?: string;
  descriptionClassName?: string;
  button?: {
    variant?: "none" | "side" | "bottom";
    className?: string;
    childClassName?: string;
    iconClassName?: string;
  };
  gradientClassName?: string;
}

const BentoHoverPatternItem = memo(function BentoHoverPatternItem({
  item,
  rowIndex,
  itemIndex,
  className = "",
  valueClassName,
  descriptionClassName,
  button,
  gradientClassName,
}: BentoHoverPatternItemProps) {
  const Icon = item.icon;
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const { state, onMouseMove } = usePatternInteraction(
    mouseX,
    mouseY,
    containerRef
  );

  return (
    <article
      key={`${rowIndex}-${itemIndex}`}
      className={`relative bg-white rounded shadow h-100 ${className}`}
      aria-label={item.value}
    >
      <div className="relative z-10 w-full h-full p-[calc(var(--width-10)/2)] md:p-6 flex flex-col gap-6 justify-between">
        <div
          ref={containerRef}
          className={`group/card ${
            state.isMobile && state.isInView ? "group/card-active" : ""
          } relative w-full h-full flex items-center justify-center`}
          onMouseMove={onMouseMove}
        >
          {button ? (
            <ButtonPressDepth
              type="button"
              variant={button?.variant || "side"}
              className={button?.className}
              frontClassName={button?.childClassName}
            >
              {Icon && (
                <Icon strokeWidth={1.25} className={button?.iconClassName} />
              )}
            </ButtonPressDepth>
          ) : (
            <div
              className={`relative z-20 h-15 w-[3.75rem] aspect-square rounded backdrop-blur-sm border border-white/50 transition-all duration-300 flex items-center justify-center ${
                state.isMobile
                  ? state.isIconActive
                    ? "bg-white/50 shadow-none"
                    : "bg-white shadow"
                  : "bg-white shadow group-hover/card:bg-white/50 group-hover/card:shadow-none"
              }`}
            >
              {Icon && (
                <Icon
                  className="w-[35%] aspect-square text-black"
                  strokeWidth={1}
                  aria-hidden="true"
                />
              )}
            </div>
          )}
          <div className="opacity-25">
            <CardPattern
              mouseX={mouseX}
              mouseY={mouseY}
              randomString={state.randomString}
              isActive={state.isMobile && state.isInView}
              gradientClassName={
                gradientClassName ||
                "bg-gradient-to-r from-blue-500 to-purple-600"
              }
            />
          </div>
        </div>
        <div className="flex flex-col gap-2 text-black">
          <h2
            className={`text-2xl md:text-3xl leading-[110%] ${valueClassName}`}
          >
            {item.value}
          </h2>
          <p className={`text-sm leading-[120%] ${descriptionClassName}`}>
            {item.description}
          </p>
        </div>
      </div>
    </article>
  );
});

BentoHoverPatternItem.displayName = "BentoHoverPatternItem";

export default BentoHoverPatternItem;
