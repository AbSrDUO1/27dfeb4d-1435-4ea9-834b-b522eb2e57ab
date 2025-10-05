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
      className: `text-8xl md:!text-[clamp(4.75rem,7.5vw,7.5rem)] leading-none uppercase tracking-tight mb-6 ${theme.text.headingClass} ${theme.text.white} ${theme.fonts.heading.className}`,
      ...getRetroTextConfig(),
    },
    description: {
      className: `${theme.text.white} text-base md:text-xl ${theme.text.bodyClass} ${theme.fonts.body.className}`,
    },
    bento: {
      button: {
        variant: "side" as const,
        className: "!rounded-lg bg-blue ring-2 ring-inset ring-black z-10",
        childClassName:
          "!px-0 h-15 md:!h-18 bg-white w-auto aspect-square rounded-lg bg-white ring-2 ring-inset ring-black",
        iconClassName: "h-[40%] w-auto text-black bg-white",
      },
      items: [],
      className: "px-0!",
      itemClassName: "bg-white border-4 rounded-2xl p-5 md:p-6 !gap-4",
      valueClassName: `font-semibold ${theme.fonts.heading.className}`,
      descriptionClassName: `font-medium ${theme.fonts.body.className} uppercase`,
      gradientClassName: colors.patternGradient,
    },
  };
}

export const funAndTrendyTokenomicsStyle = getFunAndTrendyTokenomicsStyle(1);
