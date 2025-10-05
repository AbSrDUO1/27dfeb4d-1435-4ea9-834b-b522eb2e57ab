"use client";

import { memo } from "react";
import { LucideIcon } from "lucide-react";
import { cls } from "@/lib/utils";

export interface SimpleHowToBuyItem {
  title: string;
  description: string;
  icon: LucideIcon;
}

interface SimpleHowToBuyBentoProps {
  items: SimpleHowToBuyItem[];
  className?: string;
  gridClassName?: string;
  itemClassName?: string;
  iconClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
}

function SimpleHowToBuyBento({
  items,
  className = "",
  gridClassName = "",
  itemClassName = "",
  iconClassName = "",
  titleClassName = "",
  descriptionClassName = "",
}: SimpleHowToBuyBentoProps) {
  const getGridColumns = (count: number): string => {
    switch (count) {
      case 1:
        return "grid-cols-1";
      case 2:
        return "grid-cols-1 md:grid-cols-2";
      case 3:
        return "grid-cols-1 md:grid-cols-3";
      case 4:
        return "grid-cols-1 md:grid-cols-2 lg:grid-cols-4";
      default:
        return "grid-cols-1 md:grid-cols-3";
    }
  };

  return (
    <section className={cls("w-full", className)}>
      <div
        className={cls(
          "grid gap-6 md:gap-8 px-8",
          getGridColumns(items.length),
          gridClassName
        )}
      >
        {items.map((item, index) => {
          const IconComponent = item.icon;
          return (
            <div
              key={index}
              className={cls(
                "rounded-lg p-8 md:p-12 flex flex-col items-center justify-center text-center gap-6",
                itemClassName
              )}
            >
              <div
                className={cls(
                  "w-fit h-16 md:h-20 flex items-center justify-center",
                  iconClassName
                )}
              >
                <IconComponent className="w-full h-full" strokeWidth={1.5} />
              </div>
              <div className="flex flex-col gap-4">
                <h3
                  className={cls(
                    "text-xl md:text-2xl font-semibold",
                    titleClassName
                  )}
                >
                  {item.title}
                </h3>
                <p
                  className={cls(
                    "text-base md:text-lg leading-relaxed",
                    descriptionClassName
                  )}
                >
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

SimpleHowToBuyBento.displayName = "SimpleHowToBuyBento";

export default memo(SimpleHowToBuyBento);
