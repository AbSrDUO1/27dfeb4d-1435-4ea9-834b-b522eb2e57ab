import { VoidHeroStyle } from "../types";
import { futuristicTheme as theme } from "../../shared/themes";
import { ColorTemplate, getFuturisticColors } from "../../shared/themeConfig";
import {
  getButtonConfig,
  getTextFillGradientConfig,
} from "../../shared/styleHelpers";

export function getFuturisticVoidHeroStyle(
  colorTemplate: ColorTemplate = 1
): VoidHeroStyle {
  const colors = getFuturisticColors(colorTemplate);

  const buttonBase = {
    className: "w-full sm:w-auto px-10",
  };

  const animationProps = {
    variant: "trigger" as const,
  };

  return {
    section: {
      className: colors.primary,
      height: "h-svh md:h-screen",
    },
    heading: {
      className: `font-medium! md:text-7xl text-4xl mt-4 mx-auto tracking-tight ${theme.fonts.heading.className}`,
    },
    subheading: {
      className: `${theme.description.className} my-4 leading-5 md:leading-8 md:max-w-[var(--width-40)] mx-auto`,
    },
    radialGradient: {
      color: colors.gradientLinear,
    },
    tag: {
      labelClassName: `font-normal!`,
      className: `mx-auto py-2 font-normal! rounded-full bg-white/5 backdrop-blur-md px-4 text-grey ${theme.borders.button}`,
    },
    title: {
      className: `font-medium! md:text-7xl text-4xl mt-4 mx-auto tracking-tight ${theme.fonts.heading.className}`,
      ...getTextFillGradientConfig(),
      animationProps,
    },
    description: {
      className: `${theme.description.className} my-4 leading-5 md:leading-8 md:max-w-[var(--width-40)] mx-auto`,
      animationProps,
    },
    buttons: {
      primary: {
        ...buttonBase,
        ...getButtonConfig("futuristic", "primary", colorTemplate),
        className: `${theme.buttons.primary.text} ${theme.buttons.primary.className}`,
      },
      secondary: {
        ...buttonBase,
        ...getButtonConfig("futuristic", "secondary", colorTemplate),
        buttonHoverBgColor: colors.secondaryButtonHover,
        className: `${theme.buttons.secondary.text} ${theme.buttons.secondary.className}`,
      },
    },
  };
}

export const futuristicVoidHeroStyle = getFuturisticVoidHeroStyle(1);
