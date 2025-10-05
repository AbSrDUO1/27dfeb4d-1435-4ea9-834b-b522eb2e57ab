import { AboutStyle } from "../types";
import { futuristicTheme as theme } from "../../shared/themes";
import { ColorTemplate } from "../../shared/themeConfig";
import { getFuturisticColors } from "../../shared/themeConfig";
import {
  getTextFillGradientConfig,
  getFuturisticCardStyle,
} from "../../shared/styleHelpers";

export function getFuturisticAboutPudgyStyle(
  colorTemplate: ColorTemplate = 1
): AboutStyle {
  const colors = getFuturisticColors(colorTemplate);
  return {
    section: {
      className: `${theme.spacing.sectionPadding} !pb-0`,
      backgroundColor: colors.primary,
      showBorder: true,
      fadeBottom: true,
    },
    gradient: {
      show: true,
      inset: "inset-0",
      rounded: "rounded-none",
      radialOpacity: "0%",
      linearOpacity: "30%",
      linearOpacityMobile: "60%",
      radialColor: theme.backgrounds.gradient.radialColor,
      linearColor: colors.gradientLinear,
    },
    title: {
      className: `${theme.heading.sizes.hero} ${theme.text.headingClass} leading-[1.1] ${theme.heading.className}`,
      ...getTextFillGradientConfig(),
    },
    descriptions: {
      className: `${theme.description.className}`,
      containerClassName: "flex flex-col gap-3 md:gap-4",
    },
    layout: {
      alignStart: theme.layout.alignStart,
      descriptionClassName: "w-full",
      textboxClassName: "!gap-3",
    },
    button: {
      className: `h-12 md:h-15 w-auto flex items-center justify-center cursor-pointer inset-shadow-2xs inset-shadow-blue/30 ${getFuturisticCardStyle(
        colorTemplate
      )}`,
      childClassName:
        "bg-transparent h-12 md:h-15 w-auto font-medium text-base md:text-xl",
      variant: "none" as const,
    },
    image: {
      parentClassName: `relative ${getFuturisticCardStyle(
        colorTemplate
      )} p-4 md:p-6 flex items-center justify-center w-full mx-auto inset-shadow-2xs inset-shadow-blue/30 md:h-[65vh]`,
      className: "rounded object-contain h-full",
    },
  };
}

export const futuristicCtaAboutStyle = getFuturisticAboutPudgyStyle(1);
