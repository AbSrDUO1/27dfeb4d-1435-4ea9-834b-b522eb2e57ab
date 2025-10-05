import { NavbarStyleMinimalStyle } from "../types";
import { ColorTemplate } from "../../shared/themeConfig";
import { getButtonConfig } from "../../shared/styleHelpers";

export function getFuturisticNavbarStyle(
  colorTemplate: ColorTemplate = 1
): NavbarStyleMinimalStyle {
  const buttonConfig = getButtonConfig("futuristic", "primary", colorTemplate);

  return {
    logoSrc: "/images/logowhite.svg",
    className: "",
    logoClassName: "h-6 md:h-7",
    ...buttonConfig,
  };
}

export const futuristicNavbarStyle = getFuturisticNavbarStyle(1);
