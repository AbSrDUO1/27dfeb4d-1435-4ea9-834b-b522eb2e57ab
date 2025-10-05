import { NavbarBaseStyle } from "../types";
import { ColorTemplate } from "../../shared/themeConfig";
import { getButtonConfig } from "../../shared/styleHelpers";

export function getFunAndTrendyNavbarStyle(
  colorTemplate: ColorTemplate = 1
): NavbarBaseStyle {
  const buttonConfig = getButtonConfig(
    "funAndTrendy",
    "primary",
    colorTemplate
  );

  return {
    logoSrc: "/images/logo.svg",
    className: ``,
    logoClassName: "h-7 md:h-8",
    containerClassName: "max-w-[var(--width-100)]",
    ...buttonConfig,
  };
}

export const funAndTrendyNavbarStyle = getFunAndTrendyNavbarStyle(1);
