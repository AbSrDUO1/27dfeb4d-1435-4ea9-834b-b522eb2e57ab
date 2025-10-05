import { NavbarBaseStyle } from "../types";
import { ColorTemplate } from "../../shared/themeConfig";
import { getButtonConfig } from "../../shared/styleHelpers";

export function getFuturisticNavbarStyle(
  colorTemplate: ColorTemplate = 1
): NavbarBaseStyle {
  const buttonConfig = getButtonConfig("futuristic", "primary", colorTemplate);

  return {
    logoSrc: "/images/logowhite.svg",
    className: ``,
    logoClassName: "h-7 md:h-8",
    containerClassName: "max-w-[var(--width-100)]",
    ...buttonConfig,
  };
}

export const futuristicNavbarStyle = getFuturisticNavbarStyle(1);
