import { AboutStyle } from "../types";
import { futuristicTheme as theme } from "../../shared/themes";
import { ColorTemplate } from "../../shared/themeConfig";
import { getFuturisticColors } from "../../shared/themeConfig";
import { getTextFillGradientConfig } from "../../shared/styleHelpers";

export function getFuturisticAboutStyle(
  colorTemplate: ColorTemplate = 1
): AboutStyle {
  const colors = getFuturisticColors(colorTemplate);
  return {
    section: {
      className: `${theme.spacing.sectionPadding} !pb-0`,
      backgroundColor: colors.primary,
      showBorder: true,
    },
    title: {
      className: `${theme.heading.sizes.hero} ${theme.text.headingClass} leading-[1.1] ${theme.heading.className}`,
      ...getTextFillGradientConfig(),
    },
    descriptions: {
      className: `${theme.description.className}`,
      containerClassName: theme.spacing.containerGap,
    },
    layout: {
      alignStart: theme.layout.alignStart,
      descriptionClassName: theme.layout.halfWidth,
    },
  };
}

export const futuristicAndOutOfBoxAboutStyle = getFuturisticAboutStyle(1);
