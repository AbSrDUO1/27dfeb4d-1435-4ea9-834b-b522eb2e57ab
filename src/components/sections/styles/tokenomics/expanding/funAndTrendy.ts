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
      backgroundColor: colors.primary,
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
      items: [],
      className: "!mt-0",
      gridClassName: "gap-3 md:gap-5",
      itemClassName: "border-4",
      valueClassName: `${theme.tokenomics.value.large} font-bold ${theme.heading.className}`,
      descriptionClassName: `${theme.tokenomics.description.small} font-medium ${theme.description.className}`,
    },
    expandingCards: {
      cardClassName:
        "relative w-full flex flex-col rounded-2xl overflow-hidden  transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] cursor-pointer select-none",
      activeCardClassName: `${colors.primary} border-4 border-black shadow-[4px_4px_0_#000]`,
      inactiveCardClassName:
        "bg-white border-4 border-black shadow-[4px_4px_0_#000]",
      numberClassName:
        "text-sm font-medium text-gray-500 uppercase tracking-wide",
      titleClassName: `${theme.tokenomics.value.large} font-bold ${theme.heading.className} text-black`,
      descriptionClassName: `font-bold text-black pb-7 md:pb-0 md:mt-2 uppercase ${theme.fonts.body.className}`,
      buttonType: "pushable",
      buttonClassName: "!rounded-full ring-2 ring-black bg-blue ",
      buttonContentClassName:
        "!bg-black ring-2 ring-black !rounded-full !px-0 !size-10",
      buttonIconClassName: "md:size-8 size-6 text-white",
    },
  };
}

export const funAndTrendyTokenomicsStyle = getFunAndTrendyTokenomicsStyle(1);
