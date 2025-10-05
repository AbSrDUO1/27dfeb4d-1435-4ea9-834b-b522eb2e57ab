import { HeroStyle } from "../types";
import { funAndTrendyTheme as theme } from "../../shared/themes";
import { ColorTemplate } from "../../shared/themeConfig";
import { getFunAndTrendyColors } from "../../shared/themeConfig";
import { getRetroTextConfig } from "../../shared/styleHelpers";

export function getFunAndTrendyHeroStyle(
  colorTemplate: ColorTemplate = 1
): HeroStyle {
  const colors = getFunAndTrendyColors(colorTemplate);

  return {
    section: {
      className: colors.primary,
      height: "h-svh md:h-[130vh]",
      contentAlignment: "pt-[35%] md:pt-0 md:justify-center",
      backgroundPattern: theme.backgrounds.texture,
      backgroundImage: "/sections/images/pepohero.jpeg",
      textContainerClassName: `${theme.text.white} ${theme.fonts.heading.className} md:!max-w-3/4 gap-6 md:gap-10`,
      gapClassName: theme.spacing.gap,
    },
    heading: {
      className: `text-5xl md:text-[clamp(5rem,7vw,8rem)] mx-auto text-center tracking-tight ${theme.text.white} ${theme.text.headingClass} ${theme.heading.className}`,
      ...getRetroTextConfig(),
    },
    subheading: {
      className: `w-full md:w-5/7 md:text-3xl ${theme.description.className} text-white`,
    },
    ctaStyle: {
      containerClassName: `w-full py-3 px-6 text-slate-800/80 bg-white border-2 flex items-center justify-between sm:max-w-[var(--width-30)] shadow-[4px_4px_0px_rgba(0,0,0)] mx-auto ${theme.heading.className}`,
      addressClassName: "truncate text-sm md:text-lg -translate-y-0.5",
      buttonClassName:
        "text-sm md:text-base shrink-0 transition-colors duration-200 flex items-center gap-2 hover:text-black justify-center -translate-y-0.5",
      iconClassName:
        "cursor-pointer h-[var(--text-sm)] md:h-[var(--text-base)] w-auto mt-1",
    },
  };
}

export const funandtrendyStyle = getFunAndTrendyHeroStyle(1);
