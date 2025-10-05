import { FooterStyle } from "../types";
import { funAndTrendyTheme as theme } from "../../shared/themes";
import { ColorTemplate } from "../../shared/themeConfig";
import { getFunAndTrendyColors } from "../../shared/themeConfig";

export function getFunAndTrendyFooterStyle(
  colorTemplate: ColorTemplate = 1
): FooterStyle {
  const colors = getFunAndTrendyColors(colorTemplate);

  return {
    logoSrc: "/images/logowhite.svg",
    className: `${colors.secondary} border-t-4 border-t-black ${theme.fonts.body.className}`,
    buttonClassName: "text-white!",
    gradientClassName: colors.patternGradient
  };
}

export const funAndTrendyFooterStyle = getFunAndTrendyFooterStyle(1);
