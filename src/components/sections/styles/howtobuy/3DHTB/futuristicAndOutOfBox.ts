import { HowToBuyStyle } from "../types";
import { futuristicTheme as theme } from "../../shared/themes";
import { ColorTemplate } from "../../shared/themeConfig";
import { getFuturisticColors } from "../../shared/themeConfig";
import {
  getFuturisticCardStyle,
  getTextFillGradientConfig,
} from "../../shared/styleHelpers";

export function getFuturisticHowToBuyStyle(
  colorTemplate: ColorTemplate = 1
): HowToBuyStyle {
  const colors = getFuturisticColors(colorTemplate);

  return {
    section: {
      className: theme.spacing.sectionPadding,
      backgroundColor: colors.primary,
      spotlight: {
        width: "25%",
        height: "150%",
        left: "0%",
        top: "-30%",
        rotate: "-60deg",
        color: colors.spotlight,
        blur: "100px",
        opacity: 1,
        mobileWidth: "55%",
        mobileHeight: "70%",
        mobileLeft: "-10%",
        mobileTop: "-60%",
        mobileRotate: "-30deg",
      },
    },
    title: {
      className: `text-7xl md:text-8xl text-center ${theme.text.headingClass} leading-[1.1] ${theme.heading.className}`,
      ...getTextFillGradientConfig(),
    },
    bento: {
      className: "",
      gridClassName: "",
      itemClassName: `${getFuturisticCardStyle(colorTemplate)} ${
        theme.text.white
      }`,
      textContainerClassName: "gap-1",
      imageContainerClassName: "!h-70 bg-white/10 flex items-end",
      imageClassName: "!h-3/4 w-auto object-contain",
      titleClassName: `${theme.heading.className} text-xl md:!text-2xl font-bold`,
      descriptionClassName: `${theme.description.className} text-sm md:!text-base`,
      enableAnimation: true,
    },
  };
}

export const futuristicAndOutOfBoxStyle = getFuturisticHowToBuyStyle(1);
