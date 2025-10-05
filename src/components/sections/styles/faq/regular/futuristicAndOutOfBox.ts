import { FAQStyle } from "../types";
import { futuristicTheme as theme } from "../../shared/themes";
import { ColorTemplate } from "../../shared/themeConfig";
import { getFuturisticColors } from "../../shared/themeConfig";
import { getTextFillGradientConfig } from "../../shared/styleHelpers";

export function getFuturisticCentralFAQStyle(
  colorTemplate: ColorTemplate = 1
): FAQStyle {
  const colors = getFuturisticColors(colorTemplate);

  return {
    section: {
      className: `${theme.spacing.sectionPadding} relative`,
      backgroundColor: colors.primary,
      showBorder: true,
    },
    gradient: {
      show: true,
      inset: "inset-0",
      rounded: "rounded-3xl",
      radialOpacity: "0%",
      linearOpacity: "40%",
      linearOpacityMobile: "60%",
      radialColor: theme.backgrounds.gradient.radialColor,
      linearColor: colors.gradientLinear,
    },
    title: {
      text: "F.A.Q.",
      className: `${theme.heading.sizes.large} ${theme.text.headingClass} ${theme.heading.className} ${theme.text.white} mb-4`,
      ...getTextFillGradientConfig(),
    },
    description: {
      text: "Find answers to common questions about our platform and services.",
      className: `${theme.description.className} max-w-2xl mx-auto`,
    },
    accordion: {
      className: "max-w-4xl mx-auto",
      itemClassName: `bg-white/10 backdrop-blur-md ${theme.borders.button} hover:bg-white/20 transition-all duration-300`,
      itemTitleClassName: `${theme.text.bodyClass} ${theme.heading.className} ${theme.text.white}`,
      itemIconContainerClassName: `futuristic-template-1-card-bg futuristic-card-border shadow-xl`,
      itemIconClassName: `${theme.text.white}`,
      itemContentClassName: `${theme.fonts.body.className} text-base md:text-lg text-white/80 tracking-tight`,
    },
  };
}

export const futuristicCentralFAQStyle = getFuturisticCentralFAQStyle(1);
