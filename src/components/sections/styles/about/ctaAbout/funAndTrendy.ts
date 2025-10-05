import { AboutStyle } from "../types";
import { funAndTrendyTheme as theme } from "../../shared/themes";
import { ColorTemplate } from "../../shared/themeConfig";
import { getRetroTextConfig } from "../../shared/styleHelpers";
import { getFunAndTrendyColors } from "../../shared/themeConfig";

export function getFunAndTrendyAboutPudgyStyle(
  colorTemplate: ColorTemplate = 1
): AboutStyle {
  const colors = getFunAndTrendyColors(colorTemplate);
  return {
    section: {
      className: `${theme.spacing.sectionPadding} ${theme.borders.section}`,
      backgroundColor: colors.secondary,
      backgroundPattern: theme.backgrounds.texture,
    },
    title: {
      className: `${theme.heading.sizes.hero} lg:!text-[clamp(4.75rem,7.7vw,8rem)] leading-none uppercase tracking-tight mb-6 ${theme.text.headingClass} ${theme.text.white} ${theme.heading.className}`,
      ...getRetroTextConfig(),
    },
    descriptions: {
      className: `${theme.text.white} md:text-2xl ${theme.description.className}`,
      containerClassName: theme.spacing.containerGap,
    },
    layout: {
      alignStart: theme.layout.alignStart,
      descriptionClassName: "w-full",
      textboxClassName: "!gap-3 md:!gap-6",
    },
    button: {
      className: " bg-blue ring-2 ring-inset ring-black",
      childClassName:
        "h-13 md:!h-15 w-auto bg-white ring-2 ring-inset ring-black text-black font-bold tracking-wide text-base md:text-xl",
    },
    image: {
      parentClassName: "w-full mx-auto md:h-[60vh]",
      className:
        "rounded-xl border-4 border-black object-contain h-full w-full shadow-[6px_6px_0px_rgba(0,0,0)] bg-white/80 ",
    },
  };
}

export const funAndTrendyCtaAboutStyle = getFunAndTrendyAboutPudgyStyle(1);
