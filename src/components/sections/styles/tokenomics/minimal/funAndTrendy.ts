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
      className: `${theme.text.white} ${theme.description.className} ${theme.text.bodyClass}`,
    },
    bento: {
      longDescriptionClassName: `text-sm !font-medium uppercase ${theme.fonts.body.className}`,
      button: {
        className: "!rounded-full bg-blue ring-2 ring-inset ring-black !absolute left-6 bottom-6",
        childClassName: "!px-0 h-8 md:!h-12 w-auto aspect-square rounded-full bg-white ring-2 ring-inset ring-black",
        iconClassName: "h-[40%] w-auto text-black",
      },
      items: [],
      className: "!mt-0",
      gridClassName: "gap-3 md:gap-6",
      itemClassName:
        "bg-white border-4 rounded-2xl justify-center items-center",
      valueClassName: `${theme.tokenomics.value.small} font-bold ${theme.heading.className}`,
      descriptionClassName: `${theme.tokenomics.description.medium} !font-bold uppercase ${theme.description.className}`,
    },
  };
}

export const funAndTrendyTokenomicsStyle = getFunAndTrendyTokenomicsStyle(1);
