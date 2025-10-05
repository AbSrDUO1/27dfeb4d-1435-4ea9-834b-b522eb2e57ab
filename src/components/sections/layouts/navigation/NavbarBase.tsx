"use client";

import React, { memo } from "react";
import BaseNavbarBase from "@/components/navigation/NavbarBase";
import { NavbarBaseStyle } from "../../styles/navigation/types";
import { getFunAndTrendyNavbarStyle } from "../../styles/navigation/simple/funAndTrendy";
import { getFuturisticNavbarStyle } from "../../styles/navigation/simple/futuristicAndOutOfBox";
import { useSiteTheme, getThemeStyle } from "../../ThemeProvider";

interface NavbarBaseProps {
  leftButtonText?: string;
  rightButtonText?: string;
  onLeftButtonClick?: () => void;
  onRightButtonClick?: () => void;
}

const NavbarBase = memo<NavbarBaseProps>(function NavbarBase({
  leftButtonText = "Menu",
  rightButtonText = "Contact",
  onLeftButtonClick,
  onRightButtonClick,
}) {
  const theme = useSiteTheme();
  const style: NavbarBaseStyle = getThemeStyle(theme, {
    funAndTrendy: getFunAndTrendyNavbarStyle,
    futuristicAndOutOfBox: getFuturisticNavbarStyle,
  });

  return (
    <BaseNavbarBase
      logoSrc={style.logoSrc || "/brand/logo.svg"}
      logoClassName={style.logoClassName}
      leftButtonText={leftButtonText}
      rightButtonText={rightButtonText}
      onLeftButtonClick={onLeftButtonClick}
      onRightButtonClick={onRightButtonClick}
      className={style.className}
      containerClassName={style.containerClassName}
      buttonBgColor={style.buttonBgColor}
      buttonHoverBgColor={style.buttonHoverBgColor}
      buttonTextColor={style.buttonTextColor}
      buttonHoverTextColor={style.buttonHoverTextColor}
      buttonClassName={style.buttonClassName}
      buttonContentClassName={style.buttonContentClassName}
    />
  );
});

export default NavbarBase;
