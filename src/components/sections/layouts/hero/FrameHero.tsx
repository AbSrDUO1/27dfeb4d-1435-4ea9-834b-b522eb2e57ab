import { memo } from "react";
import { SimpleHeroStyle } from "../../styles/hero/types";
import { getFunAndTrendyHeroStyle } from "../../styles/hero/simple/funAndTrendy";
import { getFuturisticHeroStyle } from "../../styles/hero/simple/futuristicAndOutOfBox";
import { useSiteTheme, getThemeStyle } from "../../ThemeProvider";
import Image from "next/image";
import VerticalTextbox from "@/components/textbox/Verticaltextbox";
import TextRenderer from "../../../text/TextRenderer";
import ButtonSlideBackground from "@/components/buttons/ButtonSlideBackground";
import SideGlowGradientBackground from "@/components/background/SideGlowGradientBackground";
import { SparklesCore } from "@/components/background/Sparkles";

interface SimpleHeroProps {
  title?: string;
  description?: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
}

const SimpleHero = ({
  title = "The People's Cryptocurrency",
  description = "FLOKI is the utility token of the Floki ecosystem.",
  primaryButtonText = "Learn More",
  secondaryButtonText = "Explore",
}: SimpleHeroProps) => {
  const theme = useSiteTheme();
  const style: SimpleHeroStyle = getThemeStyle(theme, {
    funAndTrendy: getFunAndTrendyHeroStyle,
    futuristicAndOutOfBox: getFuturisticHeroStyle,
  });
  return (
    <>
      <section
        className={`w-full relative ${style.section.className} ${style.section.height}`}
      >
        {style.section.backgroundPattern && (
          <div
            className={`absolute inset-0 opacity-30 ${style.section.backgroundPattern} bg-repeat z-0`}
          />
        )}
        <div
          className={`relative h-full max-w-[var(--width-100)] rounded-2xl sm:mt-6 w-full ${style.section.imageClassName}`}
        >
          {style.section.sideGlowGradient ? (
            <>
              <SideGlowGradientBackground
                radialColor={style.section.sideGlowGradient.radialColor}
                linearColor={style.section.sideGlowGradient.linearColor}
                radialOpacity={style.section.sideGlowGradient.radialOpacity}
                linearOpacity={style.section.sideGlowGradient.linearOpacity}
                className="w-full h-full"
                inset="inset-0!"
              />
              {style.section.sparkles && (
                <div className="opacity-40">
                  <SparklesCore
                    {...style.section.sparkles}
                    className="absolute inset-0"
                    background="transparent"
                  />
                </div>
              )}
            </>
          ) : (
            <div className={style.section.imageContainerClassName}>
              <Image
                src={style.section.imageSrc!}
                alt="Placeholder Image"
                width={500}
                height={500}
                className={`w-full h-full object-cover rounded`}
              />
              <div
                className={`absolute inset-0 z-0 rounded ${style.overlayClassName}`}
              ></div>
            </div>
          )}
          <div className="flex flex-col justify-center md:justify-end p-6 md:p-15 md:pr-4 items-center md:items-end mt-auto gap-5 md:gap-7 h-full relative z-10">
            <VerticalTextbox
              title={
                <TextRenderer
                  config={{ ...style.title, text: title }}
                  as="h2"
                />
              }
              description={
                <div className={style.descriptions.containerClassName}>
                  <p className={style.descriptions.className}>{description}</p>
                </div>
              }
              className={style.layout.textboxClassName}
              titleClassName={style.layout.titleClassName}
              alignStart={true}
              descriptionClassName={style.layout.descriptionClassName}
            />

            <div className="flex justify-center md:justify-start items-center gap-4 w-full">
              <ButtonSlideBackground
                text={primaryButtonText}
                className={style.buttons.buttonClassName}
                contentClassName={style.buttons.buttonContentClassName}
                bgColor={style.buttons.buttonBgColor}
                hoverBgColor={style.buttons.buttonHoverBgColor}
                textColor={style.buttons.buttonTextColor}
                hoverTextColor={style.buttons.buttonHoverTextColor}
              />
              <ButtonSlideBackground
                text={secondaryButtonText}
                className={style.secondaryButton?.buttonClassName}
                contentClassName={style.secondaryButton?.buttonContentClassName}
                bgColor={style.secondaryButton?.buttonBgColor}
                hoverBgColor={style.secondaryButton?.buttonHoverBgColor}
                textColor={style.secondaryButton?.buttonTextColor}
                hoverTextColor={style.secondaryButton?.buttonHoverTextColor}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

SimpleHero.displayName = "SimpleHero";

export default memo(SimpleHero);
