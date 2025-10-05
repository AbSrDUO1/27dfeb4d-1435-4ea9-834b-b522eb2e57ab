"use client";

import { memo } from "react";
import TextRenderer from "@/components/text/TextRenderer";
import { AboutStyle } from "@/components/sections/styles/about/types";
import { getFunAndTrendyAboutMomocoinStyle } from "../../styles/about/socialsAbout/funAndTrendy";
import { getFuturisticAboutStyle } from "../../styles/about/socialsAbout/futuristicAndOutOfBox";
import { useSiteTheme, getThemeStyle } from "../../ThemeProvider";
import Image from "next/image";
import VerticalTextbox from "@/components/textbox/Verticaltextbox";
import {
  Framer,
  Github,
  Instagram,
  Twitter,
  type LucideIcon,
} from "lucide-react";
import SideGlowGradientBackground from "@/components/background/SideGlowGradientBackground";
import ButtonPressDepth from "@/components/buttons/ButtonPressDepth";

interface SocialsAboutProps {
  title?: string;
  descriptions?: string[];
}

const SocialsAbout = ({
  title = "About",
  descriptions = [
    "MOMO IS BONKS CHEEKY LITTLE SISTER - PASTEL PINK ENERGY READY TO POUNCE BORN ON SOLANA. BUILT FOR FUN. BY THE PEOPLE. FOR THE PEOPLE. 100% FAIR LAUNCHED, NO CABAL, NO BUNDLES.",
  ],
}: SocialsAboutProps) => {
  const theme = useSiteTheme();
  const style: AboutStyle = getThemeStyle(theme, {
    funAndTrendy: getFunAndTrendyAboutMomocoinStyle,
    futuristicAndOutOfBox: getFuturisticAboutStyle,
  });
  const socialIcons: Array<LucideIcon> = [Github, Instagram, Framer, Twitter];

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
            descriptionClassName={style.layout.descriptionClassName}
          />
          <div className="flex gap-6 mt-2 md:mt-0">
            {socialIcons.map((Icon, idx) => (
              <ButtonPressDepth
                key={idx}
                type="button"
                variant={style.button?.variant || "side"}
                className={style.button?.className}
                frontClassName={style.button?.childClassName}
                ariaLabel={`Social icon ${idx + 1}`}
              >
                <Icon
                  strokeWidth={1.25}
                  className={style.button?.iconClassName}
                />
              </ButtonPressDepth>
            ))}
          </div>
        </div>
        <div className={style.image?.parentClassName}>
          <Image
            src={"/sections/images/momo-about.png"}
            alt="momo about"
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

SocialsAbout.displayName = "SocialsAbout";

export default memo(SocialsAbout);
