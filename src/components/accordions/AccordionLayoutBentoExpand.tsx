import React, { useState, useCallback, memo } from "react";
import SharedAccordion from "./SharedAccordion";
import { cls } from "@/lib/utils";

interface AccordionItem {
  title: string;
  content: string;
}

interface AccordionLayoutBentoExpandProps {
  items: AccordionItem[];
  title?: string;
  className?: string;
  containerClassName?: string;
  titleClassName?: string;
  gridClassName?: string;
  itemClassName?: string;
  itemTitleClassName?: string;
  itemIconContainerClassName?: string;
  itemIconClassName?: string;
  itemContentClassName?: string;
}

const AccordionLayoutBentoExpand = memo(function AccordionLayoutBentoExpand({
  items,
  title = "Frequently asked questions",
  className = "",
  containerClassName = "",
  titleClassName = "",
  gridClassName = "",
  itemClassName = "",
  itemTitleClassName = "",
  itemIconContainerClassName = "",
  itemIconClassName = "",
  itemContentClassName = "",
}: AccordionLayoutBentoExpandProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleToggle = useCallback((index: number) => {
    setActiveIndex((prevActiveIndex) =>
      prevActiveIndex === index ? null : index
    );
  }, []);

  const halfLength = Math.ceil(items.length / 2);
  const firstHalf = items.slice(0, halfLength);
  const secondHalf = items.slice(halfLength);

  return (
    <div
      className={cls(
        "w-full px-[var(--width-10)] flex flex-col gap-4",
        className
      )}
    >
      <h2
        className={cls(
          "text-6xl font-semibold text-center mb-4",
          titleClassName
        )}
      >
        {title}
      </h2>
      <div
        className={cls(
          "w-full p-4 bg-white/50 shadow rounded",
          containerClassName
        )}
      >
        <div className={cls("flex flex-col md:flex-row gap-4", gridClassName)}>
          <div className="flex-1 flex flex-col gap-4">
            {firstHalf.map((item, index) => (
              <SharedAccordion
                key={index}
                index={index}
                title={item.title}
                content={item.content}
                isActive={activeIndex === index}
                onToggle={handleToggle}
                className={itemClassName}
                titleClassName={itemTitleClassName}
                iconContainerClassName={itemIconContainerClassName}
                iconClassName={itemIconClassName}
                contentClassName={itemContentClassName}
              />
            ))}
          </div>
          {secondHalf.length > 0 && (
            <div className="flex-1 flex flex-col gap-4">
              {secondHalf.map((item, index) => {
                const actualIndex = index + halfLength;
                return (
                  <SharedAccordion
                    key={actualIndex}
                    index={actualIndex}
                    title={item.title}
                    content={item.content}
                    isActive={activeIndex === actualIndex}
                    onToggle={handleToggle}
                    className={itemClassName}
                    titleClassName={itemTitleClassName}
                    iconContainerClassName={itemIconContainerClassName}
                    iconClassName={itemIconClassName}
                    contentClassName={itemContentClassName}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

export default AccordionLayoutBentoExpand;
