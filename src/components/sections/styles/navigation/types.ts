export interface NavbarStyle {
  className?: string;
  logoSrc?: string;
  logoClassName?: string;
  buttonClassName?: string;
  buttonContentClassName?: string;
  buttonBgColor?: string;
  buttonHoverBgColor?: string;
  buttonTextColor?: string;
  buttonHoverTextColor?: string;
  containerClassName?: string;
  menuClassName?: string;
  itemClassName?: string;
  activeItemClassName?: string;
  mobileMenuClassName?: string;
  overlayClassName?: string;
}

export type NavbarStyleMinimalStyle = NavbarStyle;

export type NavbarBaseStyle = NavbarStyle;

export interface NavbarLayoutFloatingOverlayStyle extends NavbarStyle {
  floatingClassName?: string;
  scrolledClassName?: string;
}

export interface NavbarLayoutSplitBottomStyle extends NavbarStyle {
  leftClassName?: string;
  rightClassName?: string;
  centerClassName?: string;
}

export interface NavbarStyleAppleStyle extends NavbarStyle {
  blurClassName?: string;
  dropdownClassName?: string;
}
