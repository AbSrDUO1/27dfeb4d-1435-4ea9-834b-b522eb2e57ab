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
      className: `mt-4 ${theme.description.className} max-w-3xl text-off-white`,
    },
    bento: {
      items: [],
      className: "",
      gridClassName: "gap-3 md:gap-6",
      itemClassName: `${getFuturisticCardStyle(
        colorTemplate
      )} p-8 md:p-10 !gap-1 md:!gap-3 justify-center items-center`,
      valueClassName: `${theme.tokenomics.value.small} font-semibold ${theme.heading.className}`,
      ...getTextFillGradientConfig(),
      descriptionClassName: `${theme.tokenomics.description.medium} font-medium ${theme.description.className} text-off-white`,
    },
  };
}

export const futuristicTokenomicsStyle = getFuturisticTokenomicsStyle(1);
