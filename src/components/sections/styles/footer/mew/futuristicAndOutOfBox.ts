import { FooterStyle } from "../types";
import { futuristicTheme as theme } from "../../shared/themes";
import { ColorTemplate } from "../../shared/themeConfig";
import { getFuturisticColors } from "../../shared/themeConfig";
import { getFuturisticCardStyle } from "../../shared/styleHelpers";

export function getFuturisticFooterStyle(
  colorTemplate: ColorTemplate = 1
): FooterStyle {
  const colors = getFuturisticColors(colorTemplate);

  return {
    titleClassName: `text-4xl font-semibold md:font-bold ${theme.fonts.heading.className} md:text-6xl bg-gradient-to-br from-white via-white/80 to-white/50 bg-clip-text text-transparent tracking-tight py-1.5`,
    gradient: {
      show: true,
      inset: "inset-0",
      rounded: "rounded-none",
      radialOpacity: "0%",
      linearOpacity: "40%",
      linearOpacityMobile: "60%",
      radialColor: theme.backgrounds.gradient.radialColor,
      linearColor: colors.gradientLinear,
    },
    className: `${colors.primary}`,
    button: {
      className: `h-12 md:h-15 w-auto aspect-square flex items-center justify-center cursor-pointer inset-shadow-2xs inset-shadow-blue/30 ${getFuturisticCardStyle(colorTemplate)} hover:bg-white/5`,
      childClassName: "bg-transparent !px-0 h-12 md:h-15 w-auto aspect-square",
      iconClassName: "h-[35%] w-auto text-white",
      variant: "none" as const,
    },
  };
}

export const futuristicFooterStyle = getFuturisticFooterStyle(1);
