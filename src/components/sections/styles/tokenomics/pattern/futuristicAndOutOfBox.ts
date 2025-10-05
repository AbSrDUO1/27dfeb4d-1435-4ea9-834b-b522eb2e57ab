import { TokenomicsStyle } from "../types";
import { futuristicTheme as theme } from "../../shared/themes";
import { ColorTemplate } from "../../shared/themeConfig";
import { getFuturisticColors } from "../../shared/themeConfig";
import {
  getTextFillGradientConfig,
  getStandardSpotlight,
  getFuturisticCardStyle,
} from "../../shared/styleHelpers";

export function getFuturisticTokenomicsStyle(
  colorTemplate: ColorTemplate = 1
): TokenomicsStyle {
  const colors = getFuturisticColors(colorTemplate);

  return {
    section: {
      className: theme.spacing.sectionPadding,
      backgroundColor: colors.primary,
      spotlight: getStandardSpotlight(colorTemplate),
    },
    title: {
      className: `text-6xl md:text-8xl leading-none tracking-tight ${theme.text.headingClass} ${theme.fonts.heading.className}`,
      ...getTextFillGradientConfig(),
    },
    description: {
      className: `mt-4 text-lg font-medium max-w-3xl ${theme.fonts.body.className} text-off-white`,
    },
    bento: {
      button: {
        className: `aspect-square flex items-center justify-center cursor-pointer inset-shadow-2xs inset-shadow-blue/30 ${colors.cardBg} backdrop-blur-3xl futuristic-card-border z-10`,
        childClassName:
          "bg-transparent !px-0 h-12 md:h-15 w-auto aspect-square",
        iconClassName: "h-[35%] w-auto text-white",
        variant: "none" as const,
      },
      items: [],
      className: "px-0!",
      itemClassName: `${getFuturisticCardStyle(colorTemplate)} h-90!`,
      valueClassName: `text-white! font-semibold ${theme.fonts.heading.className}`,
      descriptionClassName: `font-medium ${theme.fonts.body.className} text-off-white`,
      gradientClassName: colors.patternGradient,
    },
  };
}

export const futuristicTokenomicsStyle = getFuturisticTokenomicsStyle(1);
