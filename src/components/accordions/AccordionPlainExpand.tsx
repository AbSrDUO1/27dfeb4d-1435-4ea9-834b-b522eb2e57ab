import React, { useState, useCallback, memo } from "react";
import SharedAccordion from "./SharedAccordion";

interface AccordionItem {
  title: string;
  content: string;
}

interface AccordionPlainExpandProps {
  items: AccordionItem[];
  title?: string;
  className?: string;
  titleClassName?: string;
  dividerClassName?: string;
  itemClassName?: string;
  itemTitleClassName?: string;
  itemIconContainerClassName?: string;
  itemIconClassName?: string;
  itemContentClassName?: string;
}

const AccordionPlainExpand = memo(function AccordionPlainExpand({
  items,
  title = "Frequently asked questions",
  className = "",
  titleClassName = "",
  dividerClassName = "",
  itemClassName = "",
  itemTitleClassName = "",
  itemIconContainerClassName = "",
  itemIconClassName = "",
  itemContentClassName = "",
}: AccordionPlainExpandProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleToggle = useCallback((index: number) => {
    setActiveIndex((prevActiveIndex) =>
      prevActiveIndex === index ? null : index
    );
  }, []);

  return (
    <div
      className={`w-full px-[var(--width-10)] flex flex-col gap-2 ${className}`}
    >
      <h2
        className={`text-6xl font-semibold text-center mb-4 ${titleClassName}`}
      >
        {title}
      </h2>
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
            <div className={`w-full h-px bg-black/10 ${dividerClassName}`} />
          )}
        </React.Fragment>
      ))}
      <div className={`w-full h-px bg-black/10 ${dividerClassName}`} />
    </div>
  );
});

export default AccordionPlainExpand;
