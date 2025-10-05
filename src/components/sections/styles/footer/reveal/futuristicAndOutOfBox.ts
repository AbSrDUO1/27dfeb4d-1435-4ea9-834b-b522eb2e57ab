import { FooterStyle } from "../types";
import { futuristicTheme as theme } from "../../shared/themes";
import { ColorTemplate } from "../../shared/themeConfig";
import { getFuturisticColors } from "../../shared/themeConfig";

export function getFuturisticFooterStyle(
  colorTemplate: ColorTemplate = 1
): FooterStyle {
  const colors = getFuturisticColors(colorTemplate);

  return {
    columnTitleClassName: `${theme.text.muted} ${theme.fonts.body.className}`,
    logoSrc: "/images/logowhite.svg",
    className: colors.primary,
    copyrightContainerClassName: `border-white/20`,
    privacyButtonClassName: `${theme.text.muted} ${theme.fonts.body.className}`,
    copyrightTextClassName: `${theme.text.muted} ${theme.fonts.body.className}`,
    gradientClassName: colors.gradientLinear,
    svgClassName: colors.spotlight,
    columnItemClassName: `${theme.fonts.body.className}`
  };
}

export const futuristicFooterStyle = getFuturisticFooterStyle(1);
