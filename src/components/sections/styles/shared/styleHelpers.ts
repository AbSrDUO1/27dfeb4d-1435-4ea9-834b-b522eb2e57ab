import { funAndTrendyTheme, futuristicTheme } from "./themes";
import {
  getFunAndTrendyColors,
  getFuturisticColors,
  ColorTemplate,
} from "./themeConfig";
import { BaseTextConfig, SpotlightConfig } from "./types";

export interface ButtonConfig {
  buttonBgColor: string;
  buttonHoverBgColor: string;
  buttonTextColor: string;
  buttonHoverTextColor: string;
  buttonClassName: string;
  buttonContentClassName: string;
}

export const getButtonConfig = (
  theme: "funAndTrendy" | "futuristic",
  variant: "primary" | "secondary" = "primary",
  colorTemplate: ColorTemplate = 1
): ButtonConfig => {
  if (theme === "funAndTrendy") {
    const colors = getFunAndTrendyColors(colorTemplate);
    const buttonConfig = funAndTrendyTheme.buttons[variant];
    return {
      buttonBgColor: variant === "primary" ? colors.button : buttonConfig.base,
      buttonHoverBgColor: colors.buttonHover,
      buttonTextColor: buttonConfig.text,
      buttonHoverTextColor: colors.buttonHoverText,
      buttonClassName: buttonConfig.className,
      buttonContentClassName: buttonConfig.contentClassName,
    };
  } else {
    const buttonConfig = futuristicTheme.buttons[variant];
    return {
      buttonBgColor: buttonConfig.base,
      buttonHoverBgColor: buttonConfig.hover,
      buttonTextColor: buttonConfig.text,
      buttonHoverTextColor: buttonConfig.hoverText,
      buttonClassName: buttonConfig.className,
      buttonContentClassName: buttonConfig.contentClassName,
    };
  }
};

export const getRetroTextConfig = (): Partial<BaseTextConfig> => ({
  shadowColor: funAndTrendyTheme.shadows.retro.color,
  shadowOffset: funAndTrendyTheme.shadows.retro.offset,
  animationProps: {
    duration: funAndTrendyTheme.animations.duration,
    stagger: funAndTrendyTheme.animations.stagger,
    start: "top 80%",
    end: "top 20%",
    variant: funAndTrendyTheme.animations.variant,
  },
});

export const getTextFillGradientConfig = (): Partial<BaseTextConfig> => ({
  gradientColors: futuristicTheme.gradients.text,
  animationProps: {
    duration: futuristicTheme.animations.duration,
    stagger: futuristicTheme.animations.stagger,
    start: "top 80%",
    end: "top 20%",
    variant: futuristicTheme.animations.variant,
  },
});

export const getStandardSpotlight = (
  colorTemplate: ColorTemplate = 1
): SpotlightConfig => {
  const colors = getFuturisticColors(colorTemplate);
  return {
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
  };
};

export const getSideGlowGradient = (colorTemplate: ColorTemplate = 1) => {
  const colors = getFuturisticColors(colorTemplate);
  return {
    radialColor: futuristicTheme.backgrounds.gradient.radialColor,
    linearColor: colors.gradientLinear,
    radialOpacity: futuristicTheme.backgrounds.gradient.radialOpacity,
    linearOpacity: futuristicTheme.backgrounds.gradient.linearOpacity,
  };
};

export const getFuturisticCardStyle = (colorTemplate: ColorTemplate = 1) => {
  const colors = getFuturisticColors(colorTemplate);
  return `${colors.cardBg} futuristic-card-border`;
};
