import React, { useState, useCallback, memo } from "react";
import SharedAccordion from "./SharedAccordion";

interface AccordionItem {
  title: string;
  content: string;
}

interface AccordionLayoutSideTextExpandProps {
  items: AccordionItem[];
  title?: string;
  description?: string;
  className?: string;
  gridClassName?: string;
  sideContainerClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  accordionContainerClassName?: string;
  dividerClassName?: string;
  itemClassName?: string;
  itemTitleClassName?: string;
  itemIconContainerClassName?: string;
  itemIconClassName?: string;
  itemContentClassName?: string;
}

const AccordionLayoutSideTextExpand = memo(
  function AccordionLayoutSideTextExpand({
    items,
    title = "Frequently asked questions",
    description = "Don't see the answer you're looking for? Get in touch.",
    className = "",
    gridClassName = "",
    sideContainerClassName = "",
    titleClassName = "",
    descriptionClassName = "",
    accordionContainerClassName = "",
    dividerClassName = "",
    itemClassName = "",
    itemTitleClassName = "",
    itemIconContainerClassName = "",
    itemIconClassName = "",
    itemContentClassName = "",
  }: AccordionLayoutSideTextExpandProps) {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const handleToggle = useCallback((index: number) => {
      setActiveIndex((prevActiveIndex) =>
        prevActiveIndex === index ? null : index
      );
    }, []);

    return (
      <div
        className={`w-full px-[var(--width-10)] flex flex-col gap-4 ${className}`}
      >
        <div
          className={`grid grid-cols-1 md:grid-cols-5 gap-4 2xl:gap-0 md:auto-rows-fr ${gridClassName}`}
        >
          <div
            className={`overflow-hidden col-span-1 md:col-span-2 flex flex-col gap-4 md:h-auto text-center md:text-left ${sideContainerClassName}`}
          >
            <h2
              className={`text-6xl font-semibold max-w-full md:max-w-[90%] 2xl:max-w-[70%] ${titleClassName}`}
            >
              {title}
            </h2>
            <p
              className={`text-base max-w-full md:max-w-[90%] 2xl:max-w-[70%] leading-[120%] ${descriptionClassName}`}
            >
              {description}
            </p>
          </div>
          <div
            className={`col-span-1 md:col-span-3 flex flex-col gap-2 ${accordionContainerClassName}`}
          >
            {items.map((item, index) => (
              <React.Fragment key={index}>
                <SharedAccordion
                  index={index}
                  title={item.title}
                  content={item.content}
                  isActive={activeIndex === index}
                  onToggle={handleToggle}
                  className={`!bg-transparent !shadow-none ${itemClassName}`}
                  titleClassName={itemTitleClassName}
                  iconContainerClassName={itemIconContainerClassName}
                  iconClassName={itemIconClassName}
                  contentClassName={itemContentClassName}
                />
                {index < items.length - 1 && (
                  <div
                    className={`w-full h-px bg-black/10 ${dividerClassName}`}
                  />
                )}
              </React.Fragment>
            ))}
            <div className={`w-full h-px bg-black/10 ${dividerClassName}`} />
          </div>
        </div>
      </div>
    );
  }
);

export default AccordionLayoutSideTextExpand;
