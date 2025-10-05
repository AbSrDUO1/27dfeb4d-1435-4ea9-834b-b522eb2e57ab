import React, { useState, useCallback, memo } from "react";
import SharedAccordion from "./SharedAccordion";
import Image from "next/image";

interface AccordionItem {
  title: string;
  content: string;
}

interface AccordionLeftMediaTextExpandProps {
  items: AccordionItem[];
  imageSrc: string;
  imageAlt?: string;
  title?: string;
  className?: string;
  titleClassName?: string;
  gridClassName?: string;
  imageContainerClassName?: string;
  imageClassName?: string;
  accordionContainerClassName?: string;
  itemClassName?: string;
  itemTitleClassName?: string;
  itemIconContainerClassName?: string;
  itemIconClassName?: string;
  itemContentClassName?: string;
}

const AccordionLeftMediaTextExpand = memo(
  function AccordionLeftMediaTextExpand({
    items,
    imageSrc,
    imageAlt = "",
    title = "Frequently asked questions",
    className = "",
    titleClassName = "",
    gridClassName = "",
    imageContainerClassName = "",
    imageClassName = "",
    accordionContainerClassName = "",
    itemClassName = "",
    itemTitleClassName = "",
    itemIconContainerClassName = "",
    itemIconClassName = "",
    itemContentClassName = "",
  }: AccordionLeftMediaTextExpandProps) {
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
        <h2
          className={`text-6xl font-semibold text-center mb-4 ${titleClassName}`}
        >
          {title}
        </h2>
        <div
          className={`grid grid-cols-1 md:grid-cols-5 gap-4 md:auto-rows-fr ${gridClassName}`}
        >
          <div
            className={`overflow-hidden col-span-1 md:col-span-2 bg-white shadow rounded relative h-80 md:h-auto ${imageContainerClassName}`}
          >
            <Image
              src={imageSrc}
              width={1000}
              height={1000}
              alt={imageAlt}
              className={`absolute inset-0 w-full h-full object-cover ${imageClassName}`}
            />
          </div>
          <div
            className={`col-span-1 md:col-span-3 flex flex-col gap-4 ${accordionContainerClassName}`}
          >
            {items.map((item, index) => (
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
        </div>
      </div>
    );
  }
);

export default AccordionLeftMediaTextExpand;
