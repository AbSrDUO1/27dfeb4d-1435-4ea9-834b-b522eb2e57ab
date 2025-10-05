import { BentoFAQStyle } from "../types";
import { funAndTrendyTheme as theme } from "../../shared/themes";
import { ColorTemplate } from "../../shared/themeConfig";
import { getRetroTextConfig } from '../../shared/styleHelpers';
import { getFunAndTrendyColors } from "../../shared/themeConfig";

export function getFunAndTrendyBentoFAQStyle(
  colorTemplate: ColorTemplate = 1
): BentoFAQStyle {
  const colors = getFunAndTrendyColors(colorTemplate);

  return {
    section: {
      className: `${theme.spacing.sectionPadding} relative`,
      backgroundColor: colors.primary,
      backgroundPattern: theme.backgrounds.texture,
      showBorder: true,
    },
    title: {
      text: "F.A.Q.",
      className: `${theme.heading.sizes.large} ${theme.text.headingClass} ${theme.heading.className} ${theme.text.white} mb-7`,
      ...getRetroTextConfig(),
    },
    description: {
      text: "Find answers to common questions about our platform and services.",
      className: `${theme.description.className} ${theme.text.white} max-w-2xl mx-auto`,
    },
    accordion: {
      className: "max-w-6xl mx-auto",
      itemClassName: `${theme.borders.button} bg-white hover:shadow-[4px_4px_0_#000] transition-all duration-200`,
      itemTitleClassName: `${theme.text.bodyClass} ${theme.heading.className} text-black`,
      itemIconContainerClassName: `${colors.button} ${theme.borders.button}`,
      itemIconClassName: "text-white",
      itemContentClassName: `${theme.fonts.body.className} text-base text-black/80 tracking-tight uppercase font-semibold`,
    },
    bento: {
      containerClassName: `${theme.borders.button} shadow-[4px_4px_0_#000]`,
      gridClassName: "flex-col md:flex-row gap-6",
    },
  };
}

export const funAndTrendyBentoFAQStyle = getFunAndTrendyBentoFAQStyle(1);
