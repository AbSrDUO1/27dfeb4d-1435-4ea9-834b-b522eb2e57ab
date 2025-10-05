import { FooterStyle } from "../types";
import { futuristicTheme as theme } from "../../shared/themes";
import { ColorTemplate } from "../../shared/themeConfig";
import { getFuturisticColors } from "../../shared/themeConfig";
import { getFuturisticCardStyle } from "../../shared/styleHelpers";

export function getFuturisticWalletFooterStyle(
  colorTemplate: ColorTemplate = 1
): FooterStyle {
  const colors = getFuturisticColors(colorTemplate);

  return {
    logoSrc: "/images/logowhite.svg",
    className: `${colors.primary} ${colors.border} py-6 md:py-10`,
    containerClassName: "max-w-none px-4 md:px-6",
    logoTextClassName: `${colors.textPrimary} text-xl md:text-2xl font-medium tracking-tight ${theme.fonts.heading.className}`,
    walletContainerClassName: `mt-3 md:mt-5 py-3 md:py-4 px-4 md:px-6 ${colors.cardBg} flex flex-row items-center justify-between gap-3 sm:gap-0 max-w-full sm:max-w-[var(--width-30)] rounded-lg shadow-xl futuristic-card-border ${theme.fonts.heading.className}`,
    walletAddressClassName:
      "text-white/70 truncate text-xs sm:text-sm md:text-lg tracking-wider font-semibold uppercase w-auto text-center sm:text-left",
    copyButtonClassName: `text-xs sm:text-sm md:text-base shrink-0 transition-colors duration-200 flex uppercase font-semibold items-center gap-2 ${theme.text.muted} w-auto justify-center sm:justify-start`,
    copyIconClassName:
      "cursor-pointer h-3 sm:h-[var(--text-sm)] md:h-[var(--text-base)] w-auto",
    bottomContainerClassName: `border-t ${colors.border} pt-4 md:pt-6 mt-12 md:mt-24 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0`,
    copyrightTextClassName: `${colors.textSecondary} font-medium ${theme.fonts.body.className} text-xs md:text-sm text-center sm:text-left`,
    socialContainerClassName:
      "gap-3 md:gap-6 flex justify-center sm:justify-end",
    socialButtonClassName: `h-10 md:h-12 lg:h-15 w-auto aspect-square flex items-center justify-center cursor-pointer inset-shadow-2xs inset-shadow-blue/30 ${getFuturisticCardStyle(
      1
    )} hover:bg-white/5`,
    socialButtonChildClassName:
      "bg-transparent !px-0 h-10 md:h-12 lg:h-15 w-auto aspect-square",
    socialIconClassName: "h-[30%] md:h-[35%] w-auto text-white",
  };
}

export const futuristicWalletFooterStyle = getFuturisticWalletFooterStyle(1);
