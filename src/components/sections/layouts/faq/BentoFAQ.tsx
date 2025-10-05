import React, { memo } from "react";
import AccordionLayoutBentoExpand from "@/components/accordions/AccordionLayoutBentoExpand";
import TextRenderer from "@/components/text/TextRenderer";
import { BentoFAQStyle, AccordionItem } from "../../styles/faq/types";
import { getFunAndTrendyBentoFAQStyle } from "../../styles/faq/bento/funAndTrendy";
import { getFuturisticBentoFAQStyle } from "../../styles/faq/bento/futuristicAndOutOfBox";
import { useSiteTheme, getThemeStyle } from "../../ThemeProvider";
import { cls } from "@/lib/utils";

interface BentoFAQProps {
  items: AccordionItem[];
}

const BentoFAQ = memo(function BentoFAQ({ items }: BentoFAQProps) {
  const theme = useSiteTheme();
  const style: BentoFAQStyle = getThemeStyle(theme, {
    funAndTrendy: getFunAndTrendyBentoFAQStyle,
    futuristicAndOutOfBox: getFuturisticBentoFAQStyle,
  });
  return (
    <section
      className={cls(
        "min-h-screen flex items-center justify-center",
        style.section.className,
        style.section.backgroundColor
      )}
    >
      {/* Gradient Overlay */}
      {style.gradient?.show && (
        <div
          className={cls(
            "absolute pointer-events-none",
            style.gradient.inset || "inset-0",
            style.gradient.rounded || "rounded-none",
            style.gradient.className
          )}
          style={{
            background: `
                            radial-gradient(circle at center, ${
                              style.gradient.radialColor || "transparent"
                            } ${
              style.gradient.radialOpacity || "0%"
            }, transparent 70%),
                            linear-gradient(180deg, transparent 0%, ${
                              style.gradient.linearColor || "transparent"
                            } ${style.gradient.linearOpacity || "0%"})
                        `,
          }}
        />
      )}

      <div
        className={cls("relative z-10 w-full", style.section.innerClassName)}
      >
        {/* Title */}
        <div className="text-center mb-8">
          <TextRenderer config={style.title} as="h1" />

          {style.description && (
            <p className={style.description.className}>
              {style.description.text}
            </p>
          )}
        </div>

        {/* FAQ Bento Accordion */}
        <AccordionLayoutBentoExpand
          items={items}
          title=""
          className={style.accordion.className}
          titleClassName="hidden"
          containerClassName={style.bento.containerClassName}
          gridClassName={style.bento.gridClassName}
          itemClassName={style.accordion.itemClassName}
          itemTitleClassName={style.accordion.itemTitleClassName}
          itemIconContainerClassName={
            style.accordion.itemIconContainerClassName
          }
          itemIconClassName={style.accordion.itemIconClassName}
          itemContentClassName={style.accordion.itemContentClassName}
        />
      </div>
    </section>
  );
});

export default BentoFAQ;
