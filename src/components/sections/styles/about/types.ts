import { BaseSection, BaseTextConfig } from "../shared/types";

export interface AboutStyle {
  section: BaseSection & {
    innerClassName?: string;
    showBorder?: boolean;
    fadeBottom?: boolean;
    secondaryBg?: string;
  };
  gradient?: {
    show?: boolean;
    radialColor?: string;
    linearColor?: string;
    radialOpacity?: string;
    linearOpacity?: string;
    linearOpacityMobile?: string;
    className?: string;
    inset?: string;
    rounded?: string;
  };
  title: BaseTextConfig;
  descriptions: {
    texts?: string[];
    className?: string;
    containerClassName?: string;
  };
  layout: {
    alignStart?: boolean;
    descriptionClassName?: string;
    textboxClassName?: string;
  };
  button?: {
    className?: string;
    childClassName?: string;
    iconClassName?: string;
    variant?: "bottom" | "side" | "none";
  };
  image?: {
    parentClassName?: string;
    className?: string;
  };
}
