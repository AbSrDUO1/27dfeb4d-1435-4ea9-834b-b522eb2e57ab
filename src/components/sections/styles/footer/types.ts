import { SideGlowGradientBackgroundProps } from "@/components/background/SideGlowGradientBackground";
import { BaseSection } from "../shared/types";

export type {
  SpotlightConfig,
  SparklesConfig,
  GradientConfig,
  AnimationProps,
  GradientColors,
  BaseTextConfig,
  NavbarConfig,
} from "../shared/types";

export interface FooterStyle {
  logoSrc?: string;
  logoAlt?: string;
  logoWidth?: number;
  logoHeight?: number;
  columns?: FooterColumn[];
  logoText?: string;
  className?: string;
  wrapperClassName?: string;
  containerClassName?: string;
  footerClassName?: string;
  footerContainerClassName?: string;
  logoClassName?: string;
  columnsClassName?: string;
  columnClassName?: string;
  columnTitleClassName?: string;
  columnItemClassName?: string;
  copyrightContainerClassName?: string;
  copyrightTextClassName?: string;
  privacyButtonClassName?: string;
  itemClassName?: string;
  iconClassName?: string;
  buttonClassName?: string;
  svgClassName?: string;
  items?: FooterItem[];
  gradientClassName?: string;
  itemsClassName?: string;
  copyrightText?: string;
  onPrivacyClick?: () => void;
  titleClassName?: string;
  button?: {
    variant?: "bottom" | "side" | "none";
    className?: string;
    childClassName?: string;
    iconClassName?: string;
  };
  section?: BaseSection;
  gradient?: {
    show?: boolean;
  } & SideGlowGradientBackgroundProps;
  // Wallet Footer specific properties
  logoTextClassName?: string;
  walletContainerClassName?: string;
  walletAddressClassName?: string;
  copyButtonClassName?: string;
  copyIconClassName?: string;
  bottomContainerClassName?: string;
  socialContainerClassName?: string;
  socialButtonClassName?: string;
  socialButtonChildClassName?: string;
  socialIconClassName?: string;
}

interface FooterColumn {
  title?: string;
  items: Array<{
    label: string;
    onClick?: () => void;
  }>;
}

interface FooterItem {
  label: string;
  onClick?: () => void;
}
