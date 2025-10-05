"use client";
import React, { memo } from "react";
import Image from "next/image";
import ButtonTextStagger from "../buttons/ButtonTextStagger/ButtonTextStagger";
import ButtonSlideBackground from "../buttons/ButtonSlideBackground";

/**
 * NavbarStyleMinimal Component
 *
 * The button components (ButtonTextStagger/ButtonSlideBackground) can be replaced with any button component from @/components/buttons/
 *
 * @example Replace with different button:
 * Instead of ButtonTextStagger or ButtonSlideBackground, you can use:
 * - ButtonIconArrow from '@/components/buttons/ButtonIconArrow'
 * - BubbleButton from '@/components/buttons/BubbleButton'
 * - ButtonHoverDirectional from '@/components/buttons/directionalHoverButton/ButtonHoverDirectional'
 * - ButtonExpandHover from '@/components/buttons/ButtonExpandHover'
 * - ButtonHoverMagnetic from '@/components/buttons/magneticButton/ButtonHoverMagnetic'
 * - ButtonBorderAnimated from '@/components/buttons/movingBorderButton/ButtonBorderAnimated'
 * - ButtonPressDepth from '@/components/buttons/ButtonPressDepth'
 * - ButtonIconRotate from '@/components/buttons/ButtonIconRotate/ButtonIconRotate'
 * - ButtonShiftHover from '@/components/buttons/shiftButton/ButtonShiftHover'
 * - ButtonHoverDirectional from '@/components/buttons/ButtonHoverDirectional'
 */
interface NavbarStyleMinimalProps {
  logoSrc?: string;
  logoWidth?: number;
  logoHeight?: number;
  logoClassName?: string;
  buttonText?: string;
  onButtonClick?: () => void;
  className?: string;
  buttonType?: string;
  buttonClassName?: string;
  buttonContentClassName?: string;
  buttonBgColor?: string;
  buttonHoverBgColor?: string;
  buttonTextColor?: string;
  buttonHoverTextColor?: string;
}

const NavbarStyleMinimal = memo<NavbarStyleMinimalProps>(
  function NavbarStyleMinimal({
    logoSrc = "/images/logo.svg",
    logoWidth = 120,
    logoHeight = 40,
    logoClassName = "",
    buttonText = "Join Now",
    onButtonClick = () => {},
    className = "",
    buttonType,
    buttonClassName = "",
    buttonContentClassName = "",
    buttonBgColor = "bg-white",
    buttonHoverBgColor = "hover:bg-gray-200",
    buttonTextColor = "text-black",
    buttonHoverTextColor = "hover:text-gray-800",
  }) {
    return (
      <nav
        role="navigation"
        aria-label="Main navigation"
        className={`
                fixed z-[100] flex items-center justify-between
                top-6 left-[var(--width-10)] right-[var(--width-10)]
                transition-all duration-500 ease-in-out
                ${className}
            `}
      >
        <Image
          src={logoSrc}
          width={logoWidth}
          height={logoHeight}
          className={`h-[var(--text-xl)] w-auto ${logoClassName}`}
          alt="Company Logo"
          priority
        />

        {buttonType === "slide" ? (
          <ButtonSlideBackground
            text={buttonText}
            onClick={onButtonClick}
            className={buttonClassName}
            contentClassName={buttonContentClassName}
            bgColor={buttonBgColor}
            hoverBgColor={buttonHoverBgColor}
            textColor={buttonTextColor}
            hoverTextColor={buttonHoverTextColor}
          />
        ) : (
          <ButtonTextStagger
            text={buttonText}
            onClick={onButtonClick}
            className="relative px-6 h-10 z-100"
            bgClassName="rounded-full"
            aria-label={buttonText}
          />
        )}
      </nav>
    );
  }
);

export default NavbarStyleMinimal;
