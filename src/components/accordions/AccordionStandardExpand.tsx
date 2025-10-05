import React, { useState, useCallback, memo } from "react";
import SharedAccordion from "./SharedAccordion";

interface AccordionItem {
  title: string;
  content: string;
}

interface AccordionStandardExpandProps {
  items: AccordionItem[];
  title?: string;
  className?: string;
  titleClassName?: string;
  itemClassName?: string;
  itemTitleClassName?: string;
  itemIconContainerClassName?: string;
  itemIconClassName?: string;
  itemContentClassName?: string;
}

const AccordionStandardExpand = memo(function AccordionStandardExpand({
  items,
  title = "Frequently asked questions",
  className = "",
  titleClassName = "",
  itemClassName = "",
  itemTitleClassName = "",
  itemIconContainerClassName = "",
  itemIconClassName = "",
  itemContentClassName = "",
}: AccordionStandardExpandProps) {
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
  );
});

export default AccordionStandardExpand;
