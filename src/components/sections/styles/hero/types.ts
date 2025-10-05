import {
  BaseSection,
  BaseTextConfig,
  GradientConfig,
} from "../shared/types";

export interface CtaStyle {
  containerClassName?: string;
  addressText?: string;
  addressClassName?: string;
  buttonText?: string;
  buttonClassName?: string;
  iconClassName?: string;
}

export interface ButtonConfig {
  text?: string;
  className?: string;
  bgColor?: string;
  textColor?: string;
  hoverBgColor?: string;
  hoverTextColor?: string;
  hoverClassName?: string;
  textClassName?: string;
  onClick?: () => void;
}

export interface CharacterImageConfig {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  width?: number;
  height?: number;
}

export interface HeroStyle {
  section: BaseSection & {
    height?: string;
    contentAlignment?: string;
    customGradient?: string;
    sideGlowGradient?: GradientConfig;
    textContainerClassName?: string;
    gapClassName?: string;
  };
  heading: BaseTextConfig;
  subheading: Pick<BaseTextConfig, "text" | "className">;
  ctaStyle?: CtaStyle;
}

export interface CyclopsHeroStyle extends HeroStyle {
  characterImage: CharacterImageConfig;
  buttons: {
    primary: ButtonConfig;
    secondary: ButtonConfig;
    containerClassName?: string;
  };
  layout: {
    textSectionClassName?: string;
    imageSectionClassName?: string;
  };
}

export interface VoidHeroStyle extends HeroStyle {
  radialGradient: {
    color: string;
  };
  tag: {
    label?: string;
    className: string;
    labelClassName?: string;
  };
  title: BaseTextConfig;
  description: BaseTextConfig & {
    text?: string;
  };
  buttons: {
    primary: {
      text?: string;
      className: string;
      buttonBgColor?: string;
      buttonHoverBgColor?: string;
      buttonTextColor?: string;
      buttonHoverTextColor?: string;
      buttonClassName?: string;
      buttonContentClassName?: string;
    };
    secondary: {
      text?: string;
      className: string;
      buttonBgColor?: string;
      buttonHoverBgColor?: string;
      buttonTextColor?: string;
      buttonHoverTextColor?: string;
      buttonClassName?: string;
      buttonContentClassName?: string;
    };
  };
}

export interface SimpleHeroStyle {
  section: BaseSection & {
    height?: string;
    contentAlignment?: string;
    customGradient?: string;
    sideGlowGradient?: GradientConfig;
    imageClassName?: string;
    imageSrc?: string;
    backgroundPattern?: string;
    imageContainerClassName?: string;
  };
  overlayClassName: string;
  title: BaseTextConfig;
  descriptions: {
    className?: string;
    containerClassName?: string;
  };
  layout: {
    alignStart?: boolean;
    descriptionClassName?: string;
    textboxClassName?: string;
    titleClassName?: string;
  };
  buttons: {
    buttonBgColor?: string;
    buttonHoverBgColor?: string;
    buttonTextColor?: string;
    buttonHoverTextColor?: string;
    buttonClassName: string;
    buttonContentClassName?: string;
    buttonHoverClassName?: string;
  };
  secondaryButton?: {
    buttonBgColor?: string;
    buttonHoverBgColor?: string;
    buttonTextColor?: string;
    buttonHoverTextColor?: string;
    buttonClassName?: string;
    buttonContentClassName?: string;
  }
}
