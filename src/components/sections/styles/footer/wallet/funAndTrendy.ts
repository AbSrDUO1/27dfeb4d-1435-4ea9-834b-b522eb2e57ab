import { FooterStyle } from "../types";
import { funAndTrendyTheme as theme } from "../../shared/themes";
import { ColorTemplate } from "../../shared/themeConfig";
import { getFunAndTrendyColors } from "../../shared/themeConfig";

export function getFunAndTrendyWalletFooterStyle(
  colorTemplate: ColorTemplate = 1
): FooterStyle {
  const colors = getFunAndTrendyColors(colorTemplate);

  return {
    logoSrc: "/images/logowhite.svg",
    className: `${colors.secondary} border-t-4 py-6 md:py-10`,
    containerClassName: "max-w-none px-4 md:px-6",
    logoTextClassName: `text-white text-xl md:text-2xl font-bold uppercase ${theme.fonts.heading.className}`,
    walletContainerClassName: `py-2 md:py-3 px-4 md:px-6 text-slate-800/80 bg-white border-2 flex flex-row items-center justify-between gap-3  max-w-full sm:max-w-[var(--width-30)] shadow-[4px_4px_0px_rgba(0,0,0)] ${theme.heading.className}`,
    walletAddressClassName:
      "truncate text-xs sm:text-sm md:text-lg w-full sm:w-auto text-center sm:text-left -translate-y-0 sm:-translate-y-0.5",
    copyButtonClassName:
      "text-xs sm:text-sm md:text-base transition-colors duration-200 flex items-center gap-2 hover:text-black justify-center -translate-y-0 sm:-translate-y-0.5",
    copyIconClassName:
      "cursor-pointer h-3 sm:h-[var(--text-sm)] md:h-[var(--text-base)] w-auto mt-0 sm:mt-1",
    bottomContainerClassName: `border-t border-white/70 pt-4 md:pt-6 mt-12 md:mt-24 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0`,
    copyrightTextClassName: `${colors.textSecondary} font-bold uppercase ${theme.fonts.body.className} text-xs md:text-sm text-center sm:text-left`,
    socialContainerClassName:
      "gap-3 md:gap-6 flex justify-center sm:justify-end",
    socialButtonClassName: "!rounded-full bg-blue ring-2 ring-inset ring-black",
    socialButtonChildClassName:
      "!px-0 h-10 md:h-13 lg:!h-15 w-auto aspect-square rounded-full bg-white ring-2 ring-inset ring-black",
    socialIconClassName: "h-[35%] md:h-[40%] w-auto text-black",
  };
}

export const funAndTrendyWalletFooterStyle =
  getFunAndTrendyWalletFooterStyle(1);
