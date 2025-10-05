"use client";

import React, { memo } from "react";
import BaseNavbarStyleMinimal from "@/components/navigation/NavbarStyleMinimal";
import { NavbarStyleMinimalStyle } from "../../styles/navigation/types";
import { getFunAndTrendyNavbarStyle } from "../../styles/navigation/minimal/funAndTrendy";
import { getFuturisticNavbarStyle } from "../../styles/navigation/minimal/futuristicAndOutOfBox";
import { useSiteTheme, getThemeStyle } from "../../ThemeProvider";

interface NavbarStyleMinimalProps {
  buttonText?: string;
  onButtonClick?: () => void;
  buttonType?: "slide" | "default";
}

const NavbarStyleMinimal = memo<NavbarStyleMinimalProps>(
  function NavbarStyleMinimal({
    buttonText = "Menu",
    onButtonClick,
    buttonType = "slide",
  }) {
    const theme = useSiteTheme();
    const style: NavbarStyleMinimalStyle = getThemeStyle(theme, {
      funAndTrendy: getFunAndTrendyNavbarStyle,
      futuristicAndOutOfBox: getFuturisticNavbarStyle,
    });

    return (
      <BaseNavbarStyleMinimal
        logoSrc={style.logoSrc}
        logoHeight={100}
        logoWidth={500}
        logoClassName={style.logoClassName}
        className={style.className}
        buttonText={buttonText}
        onButtonClick={onButtonClick}
        buttonType={buttonType}
        buttonClassName={style.buttonClassName}
        buttonContentClassName={style.buttonContentClassName}
        buttonBgColor={style.buttonBgColor}
        buttonHoverBgColor={style.buttonHoverBgColor}
        buttonTextColor={style.buttonTextColor}
        buttonHoverTextColor={style.buttonHoverTextColor}
      />
    );
  }
);

export default NavbarStyleMinimal;
