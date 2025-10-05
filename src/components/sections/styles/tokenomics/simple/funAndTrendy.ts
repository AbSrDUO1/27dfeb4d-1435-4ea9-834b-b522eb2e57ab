import { TokenomicsStyle } from "../types";
import { funAndTrendyTheme as theme } from "../../shared/themes";
import { ColorTemplate } from "../../shared/themeConfig";
import { getFunAndTrendyColors } from "../../shared/themeConfig";
import { getRetroTextConfig } from "../../shared/styleHelpers";

export function getFunAndTrendyTokenomicsStyle(
  colorTemplate: ColorTemplate = 1
): TokenomicsStyle {
  const colors = getFunAndTrendyColors(colorTemplate);

  return {
    section: {
      className: `${theme.spacing.sectionPadding} ${theme.borders.section}`,
      backgroundColor: colors.secondary,
      backgroundPattern: theme.backgrounds.texture,
    },
    title: {
      className: `${theme.heading.sizes.hero} leading-none uppercase tracking-tight mb-6 ${theme.text.headingClass} ${theme.text.white} ${theme.heading.className}`,
      ...getRetroTextConfig(),
    },
    description: {
      className: `${theme.text.white} ${theme.description.className} !text-black ${theme.text.bodyClass}`,
    },
    bento: {
      items: [],
      className: "!mt-0",
      gridClassName: "gap-3 md:gap-5",
      itemClassName: "bg-white border-4 rounded-2xl !gap-14",
      valueClassName: `${theme.tokenomics.value.large} font-bold ${theme.heading.className}`,
      descriptionClassName: `${theme.tokenomics.description.small} font-medium ${theme.description.className}`,
    },
  };
}

export const funAndTrendyTokenomicsStyle = getFunAndTrendyTokenomicsStyle(1);
