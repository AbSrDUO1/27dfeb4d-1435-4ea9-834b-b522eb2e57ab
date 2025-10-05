import { HeroStyle } from "../types";
import { futuristicTheme as theme } from "../../shared/themes";
import { ColorTemplate } from "../../shared/themeConfig";
import { getFuturisticColors } from "../../shared/themeConfig";
import {
  getTextFillGradientConfig,
  getSideGlowGradient,
} from "../../shared/styleHelpers";

export function getFuturisticPepeHeroStyle(
  colorTemplate: ColorTemplate = 1
): HeroStyle {
  const colors = getFuturisticColors(colorTemplate);

  const sideGlowGradient = {
    ...getSideGlowGradient(colorTemplate),
    rounded: "rounded-4xl",
  };

  return {
    section: {
      className: colors.primary,
      height: "h-svh md:h-screen",
      contentAlignment: "justify-center",
      sideGlowGradient: sideGlowGradient,
      textContainerClassName: `${theme.text.white} ${theme.fonts.heading.className} md:max-w-3/4 gap-3 md:gap-6`,
      gapClassName: theme.spacing.gap,
      sparkles: {
        particleColor: "#ffffff",
        particleDensity: 80,
        minSize: 0.5,
        maxSize: 1.5,
        speed: 2,
      },
    },
    heading: {
      className: `text-6xl md:text-[clamp(5rem,7vw,8rem)] !leading-[1.1] mx-auto text-center w-full md:w-5/6 ${theme.text.headingClass} ${theme.fonts.heading.className}`,
      ...getTextFillGradientConfig(),
    },
    subheading: {
      className: `w-full md:w-5/7 leading-[1.2] ${theme.description.className}`,
    },
    ctaStyle: {
      containerClassName: `mt-3 md:mt-5 w-full py-4 px-6 ${colors.cardBg} flex items-center justify-between sm:max-w-[var(--width-30)] mx-auto rounded-lg shadow-xl futuristic-card-border ${theme.fonts.heading.className}`,
      addressClassName:
        "text-white/70 truncate text-sm md:text-lg tracking-wider font-semibold uppercase",
      buttonClassName: `text-sm md:text-base shrink-0 transition-colors duration-200 flex uppercase font-semibold items-center gap-2 ${theme.text.muted}`,
      iconClassName:
        "cursor-pointer h-[var(--text-sm)] md:h-[var(--text-base)] w-auto",
    },
  };
}

export const futuristicPepeStyle = getFuturisticPepeHeroStyle(1);
