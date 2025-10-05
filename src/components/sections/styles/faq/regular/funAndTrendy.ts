import { FAQStyle } from "../types";
import { funAndTrendyTheme as theme } from "../../shared/themes";
import { ColorTemplate } from "../../shared/themeConfig";
import { getRetroTextConfig } from "../../shared/styleHelpers";
import { getFunAndTrendyColors } from "../../shared/themeConfig";

export function getFunAndTrendyCentralFAQStyle(
  colorTemplate: ColorTemplate = 1
): FAQStyle {
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
      className: "max-w-4xl mx-auto",
      itemClassName: `${theme.borders.button} bg-white hover:shadow-[4px_4px_0_#000] transition-all duration-200`,
      itemTitleClassName: `${theme.text.bodyClass} ${theme.heading.className} text-black`,
      itemIconContainerClassName: `${colors.button} ${theme.borders.button}`,
      itemIconClassName: "text-white",
      itemContentClassName: `${theme.fonts.body.className} text-base md:text-lg text-black/80 tracking-tight uppercase font-semibold`,
    },
  };
}

export const funAndTrendyCentralFAQStyle = getFunAndTrendyCentralFAQStyle(1);
