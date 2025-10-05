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
      className: `${theme.heading.sizes.hero} leading-none tracking-tight ${theme.text.headingClass} ${theme.heading.className}`,
      ...getTextFillGradientConfig(),
    },
    description: {
      className: `mt-4 ${theme.description.className} max-w-3xl`,
    },
    bento: {
      iconContainerClassName: `inset-shadow-2xs inset-shadow-blue/30 ${getFuturisticCardStyle(
        colorTemplate
      )} absolute!`,
      longDescriptionClassName: `text-sm text-off-white! md:text-base ${theme.fonts.body.className}`,
      iconClassName: `${theme.fonts.body.className} text-white!`,
      items: [],
      className: "",
      gridClassName: "gap-3 md:gap-6",
      itemClassName: `${getFuturisticCardStyle(
        colorTemplate
      )} py-16! md:py-20! justify-center items-center`,
      valueClassName: `${theme.tokenomics.value.small} font-semibold ${theme.heading.className}`,
      ...getTextFillGradientConfig(),
      descriptionClassName: `${theme.tokenomics.description.large} font-medium ${theme.description.className} text-white`,
    },
  };
}

export const futuristicTokenomicsStyle = getFuturisticTokenomicsStyle(1);
