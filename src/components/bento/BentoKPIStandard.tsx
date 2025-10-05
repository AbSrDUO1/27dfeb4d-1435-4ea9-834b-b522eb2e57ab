"use client";

import { memo, useMemo } from "react";
import { LucideIcon } from "lucide-react";
import ButtonPressDepth from "../buttons/ButtonPressDepth";

export interface KPIItem {
  value: string;
  description: string;
  longDescription?: string;
  icon?: LucideIcon;
  button?: {
    variant?: "side" | "none" | "bottom";
    className?: string;
    childClassName?: string;
    iconClassName?: string;
  };
}

interface BentoKPIStandardProps {
  items: KPIItem[];
  className?: string;
  gridClassName?: string;
  itemClassName?: string;
  valueClassName?: string;
  descriptionClassName?: string;
  longDescriptionClassName?: string;
  iconContainerClassName?: string;
  iconClassName?: string;
  color?: string;
}

function BentoKPIStandard({
  items,
  className = "",
  gridClassName = "",
  itemClassName = "",
  valueClassName = "",
  descriptionClassName = "",
  longDescriptionClassName = "",
  iconContainerClassName = "",
  iconClassName = "",
  color = "black",
}: BentoKPIStandardProps) {
  const rows = useMemo(() => {
    const count = items.length;

    if (count === 0) {
      return [];
    }

    if (count === 1) {
      return [{ items: items, cols: 1 }];
    }

    if (count === 2) {
      return [{ items: items, cols: 2 }];
    }

    if (count === 3) {
      return [{ items: items, cols: 3 }];
    }

    if (count === 4) {
      return [
        { items: items.slice(0, 2), cols: 2 },
        { items: items.slice(2, 4), cols: 2 },
      ];
    }

    if (count === 5) {
      return [
        { items: items.slice(0, 2), cols: 2 },
        { items: items.slice(2, 5), cols: 3 },
      ];
    }

    if (count === 6) {
      return [
        { items: items.slice(0, 3), cols: 3 },
        { items: items.slice(3, 6), cols: 3 },
      ];
    }

    if (count === 7) {
      return [
        { items: items.slice(0, 3), cols: 3 },
        { items: items.slice(3, 5), cols: 2 },
        { items: items.slice(5, 7), cols: 2 },
      ];
    }

    if (count === 8) {
      return [
        { items: items.slice(0, 3), cols: 3 },
        { items: items.slice(3, 6), cols: 3 },
        { items: items.slice(6, 8), cols: 2 },
      ];
    }

    if (count === 9) {
      return [
        { items: items.slice(0, 3), cols: 3 },
        { items: items.slice(3, 6), cols: 3 },
        { items: items.slice(6, 9), cols: 3 },
      ];
    }

    const result = [];
    let remaining = [...items];

    while (remaining.length > 0) {
      const take = Math.min(3, remaining.length);
      result.push({ items: remaining.slice(0, take), cols: take });
      remaining = remaining.slice(take);
    }

    return result;
  }, [items]);

  const getGridColumns = (cols: number): string => {
    switch (cols) {
      case 1:
        return "grid-cols-1";
      case 2:
        return "grid-cols-1 md:grid-cols-2";
      case 3:
        return "grid-cols-1 md:grid-cols-3";
      default:
        return "grid-cols-1";
    }
  };

  return (
    <section className={`w-full ${className}`}>
      <div className={`flex flex-col gap-6 ${gridClassName}`}>
        {rows.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className={`grid ${getGridColumns(row.cols)} gap-6`}
          >
            {row.items.map((item, index) => (
              <div
                key={`${rowIndex}-${index}`}
                className={`relative bg-white text-black shadow rounded p-6 py-20 flex flex-col justify-center items-center ${itemClassName}`}
              >
                <div
                  className={`text-9xl md:text-8xl font-bold leading-[100%] text-white ${valueClassName}`}
                  style={{
                    backgroundImage: `linear-gradient(to bottom, ${
                      color || "black"
                    } 0%, ${
                      color || "black"
                    } 20%, transparent 70%, transparent 80%, transparent 100%)`,
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    color: "transparent",
                  }}
                >
                  {item.value}
                </div>
                <p
                  className={`mt-[calc(var(--text-4xl)*-0.85)] text-4xl font-medium text-center ${descriptionClassName}`}
                >
                  {item.description}
                </p>
                {item.longDescription && (
                  <p
                    className={`max-w-[90%] md:max-w-[70%] text-base text-center leading-[120%] mt-2 ${longDescriptionClassName}`}
                  >
                    {item.longDescription}
                  </p>
                )}
                {item.icon && !item.button && (
                  <div
                    className={`absolute left-6 bottom-6 h-8 aspect-square bg-white shadow rounded-full flex items-center justify-center ${iconContainerClassName}`}
                  >
                    <item.icon className={`h-[40%] ${iconClassName}`} />
                  </div>
                )}
                {item.button && item.icon && (
                  <ButtonPressDepth
                    type="button"
                    variant={item.button?.variant || "side"}
                    className={item.button?.className}
                    frontClassName={item.button?.childClassName}
                  >
                    <item.icon className={item.button?.iconClassName} />
                  </ButtonPressDepth>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

BentoKPIStandard.displayName = "BentoKPIStandard";

export default memo(BentoKPIStandard);
