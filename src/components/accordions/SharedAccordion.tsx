import { Plus } from "lucide-react";
import React, { useEffect, useRef, useState, useCallback, memo } from "react";
import { cn } from "@/lib/utils";

interface AccordionProps {
    index: number;
    isActive: boolean;
    onToggle: (index: number) => void;
    title: string;
    content: string;
    className?: string;
    titleClassName?: string;
    iconContainerClassName?: string;
    iconClassName?: string;
    contentClassName?: string;
}

const Accordion = memo(function Accordion({ 
    index, 
    isActive, 
    onToggle, 
    title, 
    content,
    className,
    titleClassName,
    iconContainerClassName,
    iconClassName,
    contentClassName
}: AccordionProps) {
    const contentRef = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState("0px");

    useEffect(() => {
        setHeight(isActive ? `${contentRef.current?.scrollHeight}px` : "0px");
    }, [isActive]);

    const handleClick = useCallback(() => {
        onToggle(index);
    }, [index, onToggle]);

    return (
        <div
            className={cn(
                "bg-white cursor-pointer p-4 flex flex-col items-center justify-between transition-all duration-500 rounded shadow select-none group",
                className
            )}
            onClick={handleClick}
            aria-expanded={isActive}
        >
            <div className="flex flex-row items-center justify-between w-full">
                <h2 className={cn("text-base md:text-xl font-medium text-black", titleClassName)}>{title}</h2>
                <div className={cn(
                    "h-8 aspect-square flex items-center justify-center rounded-sm bg-black transition-all duration-300",
                    iconContainerClassName
                )}>
                    <Plus 
                        className={cn(
                            "w-[40%] aspect-square text-white transition-transform duration-500 md:group-hover:rotate-90",
                            isActive && "rotate-45",
                            iconClassName
                        )}
                    />
                </div>
            </div>
            <div
                ref={contentRef}
                style={{ maxHeight: height }}
                className="overflow-hidden transition-[max-height] duration-500 w-full flex flex-col"
            >
                <div
                    className={cn("text-base text-black pt-2", contentClassName)}
                    dangerouslySetInnerHTML={{ __html: content }}
                />
            </div>
        </div>
    );
});

export default Accordion;