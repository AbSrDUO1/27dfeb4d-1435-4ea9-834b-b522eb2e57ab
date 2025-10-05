import { futuristicTheme as theme } from "../../shared/themes";
import { ColorTemplate } from "../../shared/themeConfig";
import { getFuturisticColors } from "../../shared/themeConfig";
import {
  getButtonConfig,
  getTextFillGradientConfig,
  getFuturisticCardStyle,
} from "../../shared/styleHelpers";
import { SimpleHeroStyle } from "../types";

export function getFuturisticHeroStyle(
  colorTemplate: ColorTemplate = 1
): SimpleHeroStyle {
  const colors = getFuturisticColors(colorTemplate);

  return {
    section: {
      className: `pt-22 pb-8 md:py-19 px-6 sm:px-[var(--width-10)] flex flex-col ${colors.primary}`,
      height: "h-svh md:h-screen",
      imageSrc: "/images/flokiplaceholder.png",
      imageContainerClassName: `w-full h-full !absolute !z-0 ${getFuturisticCardStyle(
        colorTemplate
      )} !rounded-md p-4 md:p-6`,
      // Optional
      // sideGlowGradient: {
      //   radialColor: theme.backgrounds.gradient.radialColor,
      //   linearColor: colors.gradientLinear,
      //   radialOpacity: theme.backgrounds.gradient.radialOpacity,
      //   linearOpacity: theme.backgrounds.gradient.linearOpacity,
      // },
      sparkles: {
        particleColor: "#ffffff",
        particleDensity: 80,
        minSize: 0.5,
        maxSize: 1.5,
        speed: 2,
      },
    },
    title: {
      className: `text-5xl md:text-7xl !text-white ${theme.text.headingClass} !font-bold ${theme.fonts.heading.className}`,
      ...getTextFillGradientConfig(),
    },
    overlayClassName: `bg-gradient-to-tr from-black md:from-black/80 via-black/50  !inset-4 md:!inset-6`,
    descriptions: {
      className: theme.description.className,
      containerClassName: "flex flex-col gap-3 md:gap-4",
    },
    layout: {
      alignStart: true,
      descriptionClassName: "w-full",
      textboxClassName: "!gap-4 sm:!gap-5 !text-center md:!text-left",
      titleClassName: "!text-center md:!text-left",
    },
    buttons: getButtonConfig("futuristic", "primary", colorTemplate),
    secondaryButton: {
      ...getButtonConfig("futuristic", "secondary", colorTemplate),
      buttonHoverBgColor: colors.secondaryButtonHover,
    },
  };
}

export const futuristicAndOutOfBoxStyle = getFuturisticHeroStyle(1);
