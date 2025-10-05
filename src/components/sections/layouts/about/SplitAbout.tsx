"use client";

import { memo } from "react";
import { AboutStyle } from "../../styles/about/types";
import { getFunAndTrendyMinimalStyle } from "../../styles/about/minimal/funAndTrendy";
import { getFuturisticMinimalPudgyStyle } from "../../styles/about/minimal/futuristicAndOutOfBox";
import { useSiteTheme, getThemeStyle } from "../../ThemeProvider";
import SideGlowGradientBackground from "@/components/background/SideGlowGradientBackground";
import ButtonPressDepth from "@/components/buttons/ButtonPressDepth";
import TextScrollEntranceSlide from "@/components/text/TextScrollEntranceSlide";
import { SparklesCore } from "@/components/background/Sparkles";

interface MinimalAboutProps {
  description?: string;
}

const MinimalAbout = ({
  description = "The Pudgy Penguins brand produces content, merchandise, toys, and digital collectables. We believe in the power of play and imagination, and we're committed to helping you unlock your inner child.",
}: MinimalAboutProps) => {
  const theme = useSiteTheme();
  const style: AboutStyle = getThemeStyle(theme, {
    funAndTrendy: getFunAndTrendyMinimalStyle,
    futuristicAndOutOfBox: getFuturisticMinimalPudgyStyle,
  });
  return (
    <section
      className={`w-full relative ${style.section.backgroundColor} ${style.section.className}`}
    >
      {style.section.sparkles && (
        <div className="absolute inset-3 md:inset-8 rounded-xl opacity-40">
          <SparklesCore
            {...style.section.sparkles}
            className="absolute inset-0"
            background="transparent"
          />
        </div>
      )}
      {style.gradient?.show && (
        <SideGlowGradientBackground
          inset={style.gradient.inset}
          rounded={style.gradient.rounded}
          radialColor={style.gradient.radialColor}
          linearColor={style.gradient.linearColor}
          radialOpacity={style.gradient.radialOpacity}
          linearOpacity={style.gradient.linearOpacity}
          linearOpacityMobile={style.gradient.linearOpacityMobile}
        />
      )}
      {style.section.backgroundPattern && (
        <div
          className={`absolute inset-0 opacity-20 ${style.section.backgroundPattern} bg-repeat`}
        />
      )}
      <div className="max-w-[var(--width-90)] px-[var(--vw-2)] md:px-12 mx-auto relative z-10 gap-8 md:gap-10">
        <div className="flex flex-col justify-center items-center gap-10 md:px-10">
          <TextScrollEntranceSlide
            end="top 30%"
            className={style.descriptions.className}
            text={description}
          />
          <div className="flex gap-6 mt-2">
            <ButtonPressDepth
              type="button"
              variant={style.button?.variant || "side"}
              className={style.button?.className}
              frontClassName={style.button?.childClassName}
            >
              JOIN NOW
            </ButtonPressDepth>
          </div>
        </div>

        {style.section.showBorder && (
          <div className="w-full h-px bg-white/10 mt-20 md:mt-30" />
        )}
      </div>
    </section>
  );
};

MinimalAbout.displayName = "MinimalAbout";

export default memo(MinimalAbout);
