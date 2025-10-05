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
    className: `${colors.secondary}`,
    columnTitleClassName: `text-white/60 ${theme.fonts.body.className}`,
    copyrightContainerClassName: `border-white/40`,
    columnItemClassName: `text-base font-bold! uppercase ${theme.fonts.body.className}`,
    privacyButtonClassName: `${theme.text.white} ${theme.fonts.body.className}`,
    copyrightTextClassName: `${theme.text.white} ${theme.fonts.body.className}`,
    gradientClassName: 'bg-black',
  };
}

export const funAndTrendyFooterStyle = getFunAndTrendyFooterStyle(1);
