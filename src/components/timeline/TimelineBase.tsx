"use client";

import React, { useCallback } from "react";
import Image from "next/image";
import { cls } from "@/lib/utils";
import TextRenderer from "@/components/text/TextRenderer";
import type { BaseTextConfig } from "@/components/sections/styles/shared/types";

interface TimelineItem {
  title: string;
  description: string;
  video?: string;
  image?: string;
}

interface GradientConfig {
  show?: boolean;
  inset?: string;
  rounded?: string;
  radialColor?: string;
  radialOpacity?: string;
  linearColor?: string;
  linearOpacity?: string;
}

interface TimelineProps {
  items: TimelineItem[];
  title?: string;
  titleConfig?: BaseTextConfig;
  className?: string;
  sectionClassName?: string;
  backgroundColor?: string;
  backgroundPattern?: string;
  gradient?: GradientConfig;
  gapClassName?: string;
  paddingClassName?: string;
  cardClassName?: string;
  imageContainerClassName?: string;
  mediaClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  sectionTitleClassName?: string;
}

const TimelineBase = ({
  items,
  title = "TimelineBase",
  titleConfig,
  className = "",
  sectionClassName = "relative overflow-visible h-fit px-[var(--width-10)]",
  backgroundColor = "bg-transparent",
  backgroundPattern,
  gradient,
  gapClassName = "gap-[var(--width-30)] md:gap-30",
  paddingClassName = "p-3",
  cardClassName = "bg-white/20 shadow backdrop-blur-sm rounded",
  imageContainerClassName = "bg-white rounded",
  mediaClassName = "rounded",
  titleClassName = "text-xl font-semibold leading-[110%]",
  descriptionClassName = "text-sm leading-[110%]",
  sectionTitleClassName = "text-6xl font-bold",
}: TimelineProps) => {
  const getItemClasses = useCallback(
    (index: number) => {
      const baseClasses = cls(
        "relative overflow-hidden w-60 md:w-22_5 h-fit flex flex-col gap-3",
        paddingClassName,
        cardClassName
      );

      const alignmentClass =
        index % 2 === 0 ? "self-end mr-0" : "self-start ml-0";

      const marginClasses = cls(
        index % 4 === 0 && "md:mr-10",
        index % 4 === 1 && "md:ml-20",
        index % 4 === 2 && "md:mr-15",
        index % 4 === 3 && "md:ml-0"
      );

      return cls(baseClasses, alignmentClass, marginClasses);
    },
    [paddingClassName, cardClassName]
  );
  return (
    <section
      className={cls(
        sectionClassName,
        backgroundColor,
        className
      )}
    >
      {backgroundPattern && (
        <div
          className={`absolute inset-0 opacity-20 ${backgroundPattern} bg-repeat`}
        />
      )}
      {gradient?.show && (
        <div
          className={cls(
            "absolute pointer-events-none",
            gradient.inset || 'inset-0',
            gradient.rounded || 'rounded-none',
            "bg-gradient-to-b from-transparent via-transparent to-black/20"
          )}
          style={{
            background: `radial-gradient(ellipse at center, ${gradient.radialColor || 'transparent'} ${gradient.radialOpacity || '0%'}, transparent 70%), linear-gradient(to bottom, transparent 0%, ${gradient.linearColor || 'transparent'} ${gradient.linearOpacity || '0%'})`,
          }}
        />
      )}
      <div
        className={cls(
          "relative z-10 w-full flex flex-col",
          gapClassName
        )}
      >
        {items.map((item, index) => (
          <div key={index} className={getItemClasses(index)}>
            <div
              className={cls(
                "relative overflow-hidden w-full h-auto flex items-center justify-center",
                mediaClassName,
                imageContainerClassName
              )}
            >
              {item.video ? (
                <video
                  src={item.video}
                  className="w-full h-auto"
                  autoPlay
                  muted
                  playsInline
                  loop
                />
              ) : item.image ? (
                <Image
                  src={item.image}
                  alt={item.title}
                  width={500}
                  height={300}
                  className="w-full h-auto"
                />
              ) : (
                <div className={cls("w-full h-48", "rounded")} />
              )}
            </div>
            <div className="flex flex-col gap-1 px-3 mb-3">
              <h2 className={titleClassName}>
                {item.title}
              </h2>
              <h3 className={descriptionClassName}>
                {item.description}
              </h3>
            </div>
          </div>
        ))}
      </div>
      <div className="absolute z-0 top-0 left-0 w-full h-full overflow-visible">
        <div className="sticky top-0 left-0 w-full h-screen flex items-center justify-center text-center">
          {titleConfig ? (
            <TextRenderer config={titleConfig} as="h1" />
          ) : (
            <h1 className={sectionTitleClassName}>{title}</h1>
          )}
        </div>
      </div>
    </section>
  );
};

TimelineBase.displayName = "TimelineBase";

export default React.memo(TimelineBase);
