import React, { memo } from "react";
import AccordionLeftMediaTextExpand from "@/components/accordions/AccordionLeftMediaTextExpand";
import TextRenderer from "@/components/text/TextRenderer";
import { ImageFAQStyle, AccordionItem } from "../../styles/faq/types";
import { getFunAndTrendyImageFAQStyle } from "../../styles/faq/image/funAndTrendy";
import { getFuturisticImageFAQStyle } from "../../styles/faq/image/futuristicAndOutOfBox";
import { useSiteTheme, getThemeStyle } from "../../ThemeProvider";
import { cls } from "@/lib/utils";

interface ImageFAQProps {
  items: AccordionItem[];
}

const ImageFAQ = memo(function ImageFAQ({ items }: ImageFAQProps) {
  const theme = useSiteTheme();
  const style: ImageFAQStyle = getThemeStyle(theme, {
    funAndTrendy: getFunAndTrendyImageFAQStyle,
    futuristicAndOutOfBox: getFuturisticImageFAQStyle,
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
        <div className="text-center mb-8">
          <TextRenderer config={style.title} as="h1" />

          {style.description && (
            <p className={style.description.className}>
              {style.description.text}
            </p>
          )}
        </div>

        {/* FAQ Accordion with Image */}
        <AccordionLeftMediaTextExpand
          items={items}
          imageSrc={style.image.src}
          imageAlt={style.image.alt || "FAQ Image"}
          className={style.accordion.className}
          titleClassName="hidden"
          imageContainerClassName={style.image.containerClassName}
          imageClassName={style.image.className}
          accordionContainerClassName={style.accordion.containerClassName}
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

export default ImageFAQ;
