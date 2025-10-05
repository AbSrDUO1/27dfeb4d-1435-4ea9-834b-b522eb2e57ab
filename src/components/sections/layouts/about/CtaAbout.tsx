"use client";

import { memo } from "react";
import TextRenderer from "@/components/text/TextRenderer";
import { AboutStyle } from "@/components/sections/styles/about/types";
import { getFunAndTrendyAboutPudgyStyle } from "../../styles/about/ctaAbout/funAndTrendy";
import { getFuturisticAboutPudgyStyle } from "../../styles/about/ctaAbout/futuristicAndOutOfBox";
import { useSiteTheme, getThemeStyle } from "../../ThemeProvider";
import Image from "next/image";
import VerticalTextbox from "@/components/textbox/Verticaltextbox";
import SideGlowGradientBackground from "@/components/background/SideGlowGradientBackground";
import ButtonPressDepth from "@/components/buttons/ButtonPressDepth";

interface CtaAboutProps {
  title?: string;
  descriptions?: string[];
}

const CtaAbout = ({
  title = "PENGU COIN",
  descriptions = [
    "The Pudgy Penguins brand produces content, merchandise, toys, and digital collectables. We believe in the power of play and imagination, and we're committed to helping you unlock your inner child.",
  ],
}: CtaAboutProps) => {
  const theme = useSiteTheme();
  const style: AboutStyle = getThemeStyle(theme, {
    funAndTrendy: getFunAndTrendyAboutPudgyStyle,
    futuristicAndOutOfBox: getFuturisticAboutPudgyStyle,
  });
  return (
    <section
      className={`w-full relative ${style.section.backgroundColor} ${
        style.section.className
      } ${
        style.section.fadeBottom
          ? "[mask-image:linear-gradient(to_bottom,black_0%,black_90%,transparent_100%)]"
          : ""
      }`}
    >
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
      <div className="max-w-[var(--width-90)] px-[var(--vw-2)] md:px-12 mx-auto relative z-10 grid md:grid-cols-2 gap-8 md:gap-10">
        <div className="flex flex-col justify-between items-start gap-4">
          <VerticalTextbox
            title={
              <TextRenderer config={{ ...style.title, text: title }} as="h2" />
            }
            description={
              <div className={style.descriptions.containerClassName}>
                {descriptions.map((description, idx) => (
                  <p key={idx} className={style.descriptions.className}>
                    {description}
                  </p>
                ))}
              </div>
            }
            className={style.layout.textboxClassName}
            alignStart={true}
            titleClassName="md:!w-full"
            descriptionClassName={style.layout.descriptionClassName}
          />
          <div className="flex gap-6 mt-2 md:mt-0">
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
        <div className={style.image?.parentClassName}>
          <Image
            src={"/sections/images/character3.webp"}
            alt="pudgy penguins about"
            width={600}
            height={500}
            className={style.image?.className}
          />
        </div>
        {style.section.showBorder && (
          <div className="w-full h-px bg-white/10 mt-20 md:mt-30" />
        )}
      </div>
    </section>
  );
};

CtaAbout.displayName = "CtaAbout";

export default memo(CtaAbout);
