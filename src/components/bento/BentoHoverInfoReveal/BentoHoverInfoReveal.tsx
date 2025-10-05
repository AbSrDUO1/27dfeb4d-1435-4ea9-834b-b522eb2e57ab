"use client";

import "./BentoHoverInfoReveal.css";
import React, { useRef, useCallback } from "react";
import BentoHoverInfoRevealItem from "./BentoHoverInfoRevealItem";
import { useDynamicDimensions } from "./useDynamicDimensions";
import { CarouselBase } from "@/components/carousels/CarouselBase";

export interface BentoHoverInfoRevealItem {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
}

interface BentoHoverInfoRevealProps {
  items: BentoHoverInfoRevealItem[];
  enableHoverAnimation?: boolean;
  showImages?: boolean;
  className?: string;
  gridClassName?: string;
  itemClassName?: string;
}

export const BentoHoverInfoReveal = React.memo(
  ({
    items,
    enableHoverAnimation = true,
    showImages = true,
    className = "",
    gridClassName = "",
    itemClassName = "",
  }: BentoHoverInfoRevealProps) => {
    const BentoHoverInfoRevealRefs = useRef<(HTMLDivElement | null)[]>([]);
    const mobileBentoHoverInfoRevealRefs = useRef<(HTMLDivElement | null)[]>([]);

    const setRef = useCallback(
      (refs: React.RefObject<(HTMLDivElement | null)[]>, index: number) =>
        (el: HTMLDivElement | null) => {
          if (refs.current) {
            refs.current[index] = el;
          }
        },
      []
    );

    useDynamicDimensions([BentoHoverInfoRevealRefs, mobileBentoHoverInfoRevealRefs], {
      titleSelector: ".info-reveal-bento-title-row .info-reveal-title",
      descriptionSelector:
        ".info-reveal-bento-description-wrapper .info-reveal-description",
    });

    const getGridClassName = () => {
      const itemCount = items.length;
      if (itemCount === 1) return "info-reveal-bento-container-1";
      if (itemCount === 2) return "info-reveal-bento-container-2";
      if (itemCount === 3) return "info-reveal-bento-container-3";
      if (itemCount === 4) return "info-reveal-bento-container-4";
      if (itemCount >= 5) return "info-reveal-bento-container-repeating";
      return "info-reveal-bento-container";
    };

    return (
      <section className={`h-fit px-0 md:px-[var(--width-10)] ${className}`}>
        <div className="p-0">
          <div
            className={`${getGridClassName()} gap-6 hidden md:grid ${gridClassName}`}
          >
            {items.map((item, index) => (
              <BentoHoverInfoRevealItem
                key={item.id}
                ref={setRef(BentoHoverInfoRevealRefs, index)}
                item={item}
                index={index}
                isMobile={false}
                enableHoverAnimation={enableHoverAnimation}
                showImages={showImages}
                totalItems={items.length}
                className={itemClassName}
              />
            ))}
          </div>
          <div className="w-full flex flex-col gap-6 md:hidden">
            <CarouselBase>
              {items.map((item, index) => (
                <BentoHoverInfoRevealItem
                  key={item.id}
                  ref={setRef(mobileBentoHoverInfoRevealRefs, index)}
                  item={item}
                  index={index}
                  isMobile={true}
                  enableHoverAnimation={enableHoverAnimation}
                  showImages={showImages}
                  totalItems={items.length}
                  className={itemClassName}
                />
              ))}
            </CarouselBase>
          </div>
        </div>
      </section>
    );
  }
);

BentoHoverInfoReveal.displayName = "BentoHoverInfoReveal";

export default BentoHoverInfoReveal;
