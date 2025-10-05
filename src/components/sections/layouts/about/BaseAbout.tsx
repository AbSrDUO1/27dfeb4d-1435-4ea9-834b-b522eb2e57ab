"use client";

import React, { memo } from "react";
import TextboxLayoutHorizontal from "@/components/textbox/TextboxLayoutHorizontal";
import TextRenderer from "@/components/text/TextRenderer";
import { AboutStyle } from "@/components/sections/styles/about/types";
import { getFunAndTrendyAboutStyle } from "../../styles/about/standard/funAndTrendy";
import { getFuturisticAboutStyle } from "../../styles/about/standard/futuristicAndOutOfBox";
import { useSiteTheme, getThemeStyle } from "../../ThemeProvider";

interface BaseAboutProps {
  title?: string;
  descriptions?: string[];
}

const BaseAbout = ({
  title = "PUDGY PENGUINS",
  descriptions = [
    "Welcome to the world of Pudgy Penguins, a web3-born brand that fosters creativity, freedom, and community.",
    "The Pudgy Penguins brand produces content, merchandise, toys, and digital collectables. We believe in the power of play and imagination, and we're committed to helping you unlock your inner child.",
    "It's a very cold place but you'll be warm with your new favorite penguin family!",
  ],
}: BaseAboutProps) => {
  const theme = useSiteTheme();
  const style: AboutStyle = getThemeStyle(theme, {
    funAndTrendy: getFunAndTrendyAboutStyle,
    futuristicAndOutOfBox: getFuturisticAboutStyle,
  });
  return (
    <section
      className={`w-full relative ${style.section.backgroundColor} ${style.section.className}`}
    >
      {style.section.backgroundPattern && (
        <div
          className={`absolute inset-0 opacity-20 ${style.section.backgroundPattern} bg-repeat`}
        />
      )}
      <div className="max-w-[var(--width-100)] px-[var(--width-10)] mx-auto relative z-10">
        <TextboxLayoutHorizontal
          title={
            <TextRenderer config={{ ...style.title, text: title }} as="h2" />
          }
          description={
            <div className={style.descriptions.containerClassName}>
              {descriptions.map((text, index) => (
                <p key={index} className={style.descriptions.className}>
                  {text}
                </p>
              ))}
            </div>
          }
          alignStart={style.layout.alignStart}
          titleClassName="mb-3 md:mt-0 md:!w-30"
          descriptionClassName={style.layout.descriptionClassName}
        />
        {style.section.showBorder && (
          <div className="w-full h-px bg-white/10 mt-20 md:mt-30" />
        )}
      </div>
    </section>
  );
};

BaseAbout.displayName = "BaseAbout";

export default memo(BaseAbout);
