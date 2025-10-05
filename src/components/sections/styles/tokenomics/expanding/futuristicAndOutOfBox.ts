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
      )} gap-16! md:gap-20!`,
      valueClassName: `${theme.tokenomics.value.large} font-semibold ${theme.heading.className}`,
      ...getTextFillGradientConfig(),
      descriptionClassName: `${theme.tokenomics.description.small} font-medium ${theme.description.className} text-off-white`,
    },
    expandingCards: {
      cardClassName:
        "relative md:h-90 w-full flex flex-col rounded-[var(--border-radius)] overflow-hidden p-8 md:p-10 transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] cursor-pointer select-none",
      activeCardClassName: `${getFuturisticCardStyle(
        colorTemplate
      )} opacity-100`,
      inactiveCardClassName: `${getFuturisticCardStyle(
        colorTemplate
      )} opacity-60 hover:opacity-90`,
      numberClassName:
        "text-sm font-medium text-white/50 uppercase tracking-wide",
      titleClassName: `${theme.tokenomics.value.large} font-semibold ${theme.heading.className} text-white`,
      descriptionClassName: `text-white pb-7 md:pb-0 md:mt-2 md:text-lg text-base`,
      buttonClassName:
        "!p-0 !bg-transparent !border-0 !shadow-none hover:!translate-y-0",
      buttonContentClassName:
        "!bg-white/10 !border !border-white/20 !rounded-full !size-10 !p-0 flex items-center justify-center !shadow-none",
      buttonIconClassName: "md:size-8 size-6 text-white",
    },
  };
}

export const futuristicTokenomicsStyle = getFuturisticTokenomicsStyle(1);
