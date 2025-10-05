import { funAndTrendyTheme as theme } from "../../shared/themes";
import { ColorTemplate } from "../../shared/themeConfig";
import { getFunAndTrendyColors } from "../../shared/themeConfig";
import { getButtonConfig, getRetroTextConfig } from "../../shared/styleHelpers";
import { SimpleHeroStyle } from "../types";

export function getFunAndTrendyHeroStyle(
  colorTemplate: ColorTemplate = 1
): SimpleHeroStyle {
  const colors = getFunAndTrendyColors(colorTemplate);

  return {
    section: {
      className: `pt-25 pb-8 md:py-19 px-6 sm:px-[var(--width-10)] flex flex-col ${colors.primary}`,
      height: "h-svh md:h-screen",
      imageClassName: "border-4 border-white shadow-[6px_6px_0px_rgba(0,0,0)]",
      imageSrc: "/images/flokiplaceholder.png",
      imageContainerClassName: "w-full h-full absolute z-0",
      backgroundPattern: theme.backgrounds.texture,
    },
    overlayClassName: `bg-gradient-to-tr from-black md:from-black/80 via-black/50 md:via-black/30 to-transparent `,
    descriptions: {
      className: `${theme.text.white} ${theme.description.className}`,
      containerClassName: "flex flex-col gap-3 md:gap-4",
    },
    layout: {
      alignStart: true,
      descriptionClassName: "w-full",
      textboxClassName: "!gap-4 sm:!gap-5 !text-center md:!text-left",
      titleClassName: "!text-center md:!text-left",
    },
    title: {
      className: `text-5xl md:text-8xl !tracking-normal ${theme.text.headingClass} ${theme.text.white} ${theme.fonts.heading.className}`,
      ...getRetroTextConfig(),
    },
    buttons: getButtonConfig('funAndTrendy', 'primary', colorTemplate),
    secondaryButton: getButtonConfig('funAndTrendy', 'secondary', colorTemplate)
  };
}

export const funandtrendyStyle = getFunAndTrendyHeroStyle(1);
