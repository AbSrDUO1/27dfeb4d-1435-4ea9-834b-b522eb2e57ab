"use client";

import { memo } from "react";
import Image from "next/image";
import ButtonSlideBackground from "@/components/buttons/ButtonSlideBackground";

interface NavbarBaseProps {
  logoSrc: string;
  logoAlt?: string;
  leftButtonText?: string;
  rightButtonText?: string;
  onLeftButtonClick?: () => void;
  onRightButtonClick?: () => void;
  className?: string;
  containerClassName?: string;
  logoClassName?: string;
  buttonClassName?: string;
  buttonContentClassName?: string;
  buttonBgColor?: string;
  buttonHoverBgColor?: string;
  buttonTextColor?: string;
  buttonHoverTextColor?: string;
}

function NavbarBase({
  logoSrc,
  logoAlt = "Logo",
  leftButtonText = "Menu",
  rightButtonText = "Contact",
  onLeftButtonClick,
  onRightButtonClick,
  className = "",
  containerClassName = "",
  logoClassName = "",
  buttonClassName = "",
  buttonContentClassName = "",
  buttonBgColor,
  buttonHoverBgColor,
  buttonTextColor,
  buttonHoverTextColor,
}: NavbarBaseProps) {
  return (
    <nav className={`fixed top-8 left-0 right-0 z-50 ${className}`}>
      <div
        className={`relative flex items-center justify-between px-[var(--width-10)] ${containerClassName}`}
      >
        <ButtonSlideBackground
          text={leftButtonText}
          onClick={onLeftButtonClick}
          className={`hidden md:flex ${buttonClassName}`}
          contentClassName={buttonContentClassName}
          bgColor={buttonBgColor}
          hoverBgColor={buttonHoverBgColor}
          textColor={buttonTextColor}
          hoverTextColor={buttonHoverTextColor}
        />

        <div
          className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-6 w-auto ${logoClassName}`}
        >
          <Image
            src={logoSrc}
            alt={logoAlt}
            height={32}
            width={120}
            className="h-full w-auto object-contain"
            priority
          />
        </div>

        <ButtonSlideBackground
          text={rightButtonText}
          onClick={onRightButtonClick}
          className={`hidden md:flex ${buttonClassName}`}
          contentClassName={buttonContentClassName}
          bgColor={buttonBgColor}
          hoverBgColor={buttonHoverBgColor}
          textColor={buttonTextColor}
          hoverTextColor={buttonHoverTextColor}
        />
      </div>
    </nav>
  );
}

NavbarBase.displayName = "NavbarBase";

export default memo(NavbarBase);
