import { CyclopsHeroStyle } from "../types";
import { futuristicTheme as theme } from "../../shared/themes";
import { ColorTemplate } from "../../shared/themeConfig";
import { getFuturisticColors } from "../../shared/themeConfig";
import {
  getTextFillGradientConfig,
  getSideGlowGradient,
} from "../../shared/styleHelpers";

export function getFuturisticCyclopsHeroStyle(
  colorTemplate: ColorTemplate = 1
): CyclopsHeroStyle {
  const colors = getFuturisticColors(colorTemplate);

  const sideGlowGradient = getSideGlowGradient(colorTemplate);

  return {
    section: {
      className: `${colors.primary}`,
      contentAlignment: "items-center justify-center",
      sideGlowGradient: sideGlowGradient,
      textContainerClassName: `${theme.text.white}`,
      sparkles: {
        particleColor: "#ffffff",
        particleDensity: 80,
        minSize: 0.5,
        maxSize: 1.5,
        speed: 2,
      },
    },
    heading: {
      className: `${theme.heading.sizes.large} !tracking-tight ${theme.text.headingClass} text-center mx-auto md:mx-0 md:text-start leading-[1.14] ${theme.text.white} ${theme.heading.className}`,
      ...getTextFillGradientConfig(),
    },
    subheading: {
      className: `max-w-[90%] leading-[1.3] ${theme.description.className}`,
    },
    characterImage: {
      src: "/sections/images/cyclops.png",
      alt: "Cyclops Cat Character",
      className: "w-full h-auto rounded shadow-lg",
      containerClassName:
        "relative p-4 md:p-8 futuristic-template-2-card-bg futuristic-card-border",
      width: 600,
      height: 600,
    },
    buttons: {
      primary: {
        className: theme.buttons.primary.className,
        textClassName: `${theme.buttons.primary.contentClassName} ${theme.buttons.primary.text}`,
        bgColor: theme.buttons.primary.base,
      },
      secondary: {
        className: theme.buttons.secondary.className,
        textClassName: `${theme.buttons.secondary.contentClassName} ${theme.buttons.secondary.text}`,
        bgColor: theme.buttons.secondary.base,
      },
      containerClassName: "flex-row flex-wrap gap-4 md:gap-6 mt-3",
    },
    layout: {
      textSectionClassName: "text-left md:pr-8 w-1/2 !gap-6",
      imageSectionClassName: "size-full px-4",
    },
  };
}

export const futuristicCyclopsStyle = getFuturisticCyclopsHeroStyle(1);
