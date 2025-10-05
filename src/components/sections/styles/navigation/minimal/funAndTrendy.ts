import { NavbarStyleMinimalStyle } from "../types";
import { ColorTemplate } from "../../shared/themeConfig";
import { getButtonConfig } from "../../shared/styleHelpers";

export function getFunAndTrendyNavbarStyle(
  colorTemplate: ColorTemplate = 1
): NavbarStyleMinimalStyle {
  const buttonConfig = getButtonConfig(
    "funAndTrendy",
    "primary",
    colorTemplate
  );

  return {
    logoSrc: "/images/logo.svg",
    className: "",
    logoClassName: "h-6 md:h-7",
    ...buttonConfig,
  };
}

export const funAndTrendyNavbarStyle = getFunAndTrendyNavbarStyle(1);
