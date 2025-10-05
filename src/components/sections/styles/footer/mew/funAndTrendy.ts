import { FooterStyle } from "../types";
import { funAndTrendyTheme as theme } from "../../shared/themes";
import { ColorTemplate } from "../../shared/themeConfig";
import { getFunAndTrendyColors } from "../../shared/themeConfig";

export function getFunAndTrendyFooterStyle(
  colorTemplate: ColorTemplate = 1
): FooterStyle {
  const colors = getFunAndTrendyColors(colorTemplate);

  return {
    titleClassName: `uppercase text-5xl font-bold ${theme.fonts.heading.className} md:text-7xl`,
    section: {
      backgroundPattern: theme.backgrounds.texture,
    },
    className: `${colors.tertiary} border-black border-y-4`,
    button: {
      variant: "side" as const,
      className: "!rounded-full bg-blue ring-2 ring-inset ring-black",
      childClassName:
        "!px-0 h-13 md:!h-15 w-auto aspect-square rounded-full bg-white ring-2 ring-inset ring-black",
      iconClassName: "h-[40%] w-auto text-black",
    },
  };
}

export const funAndTrendyFooterStyle = getFunAndTrendyFooterStyle(1);
