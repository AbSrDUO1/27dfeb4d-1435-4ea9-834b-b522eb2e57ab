import { AboutStyle } from "../types";
import { funAndTrendyTheme as theme } from "../../shared/themes";
import { ColorTemplate } from "../../shared/themeConfig";
import { getFunAndTrendyColors } from "../../shared/themeConfig";
import { getRetroTextConfig } from "../../shared/styleHelpers";

export function getFunAndTrendyAboutMomocoinStyle(
  colorTemplate: ColorTemplate = 1
): AboutStyle {
  const colors = getFunAndTrendyColors(colorTemplate);

  return {
    section: {
      className: `${theme.spacing.sectionPadding} ${theme.borders.section}`,
      backgroundColor: colors.primary,
      backgroundPattern: theme.backgrounds.texture,
    },
    title: {
      className: `${theme.heading.sizes.hero} px-2 !tracking-normal ${theme.text.headingClass} ${theme.text.white} ${theme.heading.className}`,
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
      className: "!rounded-full bg-blue ring-2 ring-inset ring-black",
      childClassName:
        "!px-0 h-13 md:!h-15 w-auto aspect-square rounded-full bg-white ring-2 ring-inset ring-black",
      iconClassName: "h-[40%] w-auto text-black",
    },
    image: {
      parentClassName: "w-full md:w-11/12 mx-auto",
      className:
        "rounded-xl border-4 border-black object-cover size-full shadow-[6px_6px_0px_rgba(0,0,0)]",
    },
  };
}

export const funAndTrendyMomocoinAboutStyle =
  getFunAndTrendyAboutMomocoinStyle(1);
