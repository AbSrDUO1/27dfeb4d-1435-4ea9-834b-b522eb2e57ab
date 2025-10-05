"use client";

import { useState, memo } from "react";
import { TokenomicsStyle } from "@/components/sections/styles/tokenomics/types";
import { cls } from "@/lib/utils";
import { Plus } from "lucide-react";
import ButtonPressDepth from "@/components/buttons/ButtonPressDepth";
import { useResponsive } from "@/hooks/useResponsive";

interface ExpandingBentoProps {
  style: TokenomicsStyle;
  cardItems: Array<{
    id: number;
    title: string;
    description: string;
  }>;
}

const ExpandingBento = memo(function ExpandingBento({
  style,
  cardItems,
}: ExpandingBentoProps) {
  const [expandedIndex, setExpandedIndex] = useState<number>(0);
  const { isMobile } = useResponsive({ breakpoint: 768 });

  const toggleCard = (index: number) => {
    if (expandedIndex !== index) {
      setExpandedIndex(index);
    }
  };

  return (
    <section className="h-fit w-full">
      <div
        className={cls(
          "w-full flex md:gap-4",
          isMobile ? "flex-col" : "flex-wrap md:flex-nowrap"
        )}
      >
        {cardItems.map((item, index) => {
          const isExpanded = expandedIndex === index;
          const expandingCards = style.expandingCards;

          const cardClassName = cls(
            expandingCards?.cardClassName || "",
            "relative flex flex-col justify-between overflow-hidden cursor-pointer select-none",
            "transition-all duration-[800ms] ease-[cubic-bezier(0.4,0,0.2,1)]",
            isMobile
              ? cls("p-6 mb-4", isExpanded ? "h-80" : "h-50")
              : cls("h-100 p-8 md:p-10", isExpanded ? "w-26" : "w-17"),
            isExpanded
              ? expandingCards?.activeCardClassName
              : expandingCards?.inactiveCardClassName
          );

          return (
            <div
              key={item.id}
              className={cardClassName}
              onClick={() => toggleCard(index)}
            >
              <div className="flex flex-col gap-4">
                <h3
                  className={cls(
                    expandingCards?.titleClassName,
                    isExpanded && "!text-white"
                  )}
                >
                  {item.title}
                </h3>
                <div
                  className={cls(
                    "transition-opacity duration-500 ease-in-out",
                    isMobile
                      ? "w-full min-w-full"
                      : "w-21 min-w-[var(--width-21)]",
                    isExpanded ? "opacity-100 delay-[175ms]" : "opacity-0"
                  )}
                >
                  <p
                    className={cls(
                      expandingCards?.descriptionClassName,
                      isExpanded && "!text-white"
                    )}
                  >
                    {item.description}
                  </p>
                </div>
              </div>
              <div
                className={
                  isMobile
                    ? "absolute bottom-6 left-6"
                    : "absolute bottom-8 left-8"
                }
              >
                <ButtonPressDepth
                  variant="side"
                  className={expandingCards?.buttonClassName}
                  frontClassName={expandingCards?.buttonContentClassName}
                >
                  <Plus
                    className={cls(
                      expandingCards?.buttonIconClassName,
                      "transition-transform duration-300",
                      isExpanded ? "rotate-45" : "rotate-0"
                    )}
                    strokeWidth={2}
                  />
                </ButtonPressDepth>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
});

ExpandingBento.displayName = "ExpandingBento";

export default ExpandingBento;
