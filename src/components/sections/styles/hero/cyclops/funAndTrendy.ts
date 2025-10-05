import { CyclopsHeroStyle } from "../types";
import { funAndTrendyTheme as theme } from "../../shared/themes";
import { ColorTemplate } from "../../shared/themeConfig";
import { getFunAndTrendyColors } from "../../shared/themeConfig";
import { getRetroTextConfig } from "../../shared/styleHelpers";

export function getFunAndTrendyCyclopsHeroStyle(
  colorTemplate: ColorTemplate = 1
): CyclopsHeroStyle {
  const colors = getFunAndTrendyColors(colorTemplate);

  return {
    section: {
      className: `${colors.primary} ${theme.fonts.body.className}`,
      contentAlignment: "items-center justify-center pt-10",
      backgroundPattern: theme.backgrounds.texture,
    },
    heading: {
      className: `${theme.heading.sizes.hero} px-1 text-center mx-auto md:mx-0 md:text-start !tracking-tight ${theme.text.headingClass} leading-[1.2] w-full ${theme.text.white} ${theme.heading.className}`,
      ...getRetroTextConfig(),
    },
    subheading: {
      className: `max-w-[90%] md:text-lg lg:text-xl ${theme.description.className} leading-[1.3] text-white/90`,
    },
    characterImage: {
      src: "/sections/images/cyclops.png",
      alt: "Cyclops Cat Character",
      className:
        "w-full h-auto border-4 p-4 bg-black border-white rounded shadow-[4px_4px_0px_#000] hover:shadow-[6px_6px_0px_#000]",
      containerClassName:
        "relative transform hover:scale-105 transition-all duration-300 rounded",
      width: 600,
      height: 600,
    },
    buttons: {
      primary: {
        className: theme.buttons.primary.className,
        bgColor: colors.button,
        hoverBgColor: colors.buttonHover,
        textColor: theme.text.white,
        hoverTextColor: colors.buttonHoverText,
        textClassName: theme.buttons.primary.contentClassName,
      },
      secondary: {
        className: theme.buttons.secondary.className,
        bgColor: theme.buttons.secondary.base,
        hoverBgColor: colors.buttonHover,
        textColor: theme.buttons.secondary.text,
        hoverTextColor: colors.buttonHoverText,
        textClassName: theme.buttons.secondary.contentClassName,
      },
      containerClassName: "flex-row flex-wrap gap-4 md:gap-6",
    },
    layout: {
      textSectionClassName: "text-left md:pr-8",
      imageSectionClassName: "size-full",
    },
  };
}

export const funAndTrendyCyclopsHeroStyle = getFunAndTrendyCyclopsHeroStyle(1);
