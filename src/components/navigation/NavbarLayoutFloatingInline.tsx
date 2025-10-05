"use client";
import React, { memo, useCallback } from "react";
import Image from "next/image";
import { useLenis } from "lenis/react";
import ButtonTextStagger from "../buttons/ButtonTextStagger/ButtonTextStagger";
import ButtonHoverDirectional from "../buttons/ButtonHoverDirectional/ButtonHoverDirectional";
import { useScrollDetection } from "./NavbarLayoutFloatingOverlay/useScrollDetection";
import { NavItem } from "@/types/navigation";

/**
 * NavbarLayoutFloatingInline Component
 *
 * The button components (ButtonTextStagger/ButtonHoverDirectional) can be replaced with any button component from @/components/buttons/
 *
 * @example Replace with different button:
 * Instead of ButtonTextStagger or ButtonHoverDirectional, you can use:
 * - ButtonIconArrow from '@/components/buttons/ButtonIconArrow'
 * - BubbleButton from '@/components/buttons/BubbleButton'
 * - ButtonHoverDirectional from '@/components/buttons/directionalHoverButton/ButtonHoverDirectional'
 * - ButtonExpandHover from '@/components/buttons/ButtonExpandHover'
 * - ButtonHoverMagnetic from '@/components/buttons/magneticButton/ButtonHoverMagnetic'
 * - ButtonBorderAnimated from '@/components/buttons/movingBorderButton/ButtonBorderAnimated'
 * - ButtonPressDepth from '@/components/buttons/ButtonPressDepth'
 * - ButtonIconRotate from '@/components/buttons/ButtonIconRotate/ButtonIconRotate'
 * - ButtonShiftHover from '@/components/buttons/shiftButton/ButtonShiftHover'
 * - ButtonSlideBackground from '@/components/buttons/ButtonSlideBackground'
 */
interface NavbarLayoutFloatingInlineProps {
  navItems: NavItem[];
  logoSrc?: string;
  logoWidth?: number;
  logoHeight?: number;
  buttonText?: string;
  onButtonClick?: () => void;
  className?: string;
  buttonClassName?: string;
  buttonBgClassName?: string;
  navItemClassName?: string;
}

const NavbarLayoutFloatingInline = memo<NavbarLayoutFloatingInlineProps>(
  function NavbarLayoutFloatingInline({
    navItems,
    logoSrc = "/images/logo.svg",
    logoWidth = 120,
    logoHeight = 40,
    buttonText = "Join Now",
    onButtonClick = () => {},
    className = "",
    buttonClassName = "",
    buttonBgClassName = "",
    navItemClassName = "",
  }) {
    const lenis = useLenis();
    const isScrolled = useScrollDetection(50);

    const handleNavClick = useCallback(
      (id: string) => {
        if (id && lenis) {
          lenis.scrollTo(`#${id}`);
        }
      },
      [lenis]
    );

    return (
      <nav
        role="navigation"
        aria-label="Main navigation"
        className={`
                fixed z-[100] flex items-center justify-between
                top-6 left-[var(--width-10)] w-80
                bg-white shadow
                rounded-full
                p-3
                pl-6
                h-fit
                transition-all duration-500 ease-in-out
                ${isScrolled ? "" : ""}
                ${className}
            `}
      >
        <Image
          src={logoSrc}
          width={logoWidth}
          height={logoHeight}
          className="h-[var(--text-xl)] w-auto"
          alt="Company Logo"
          priority
        />

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:flex gap-6 items-center">
          {navItems.map((item, index) => (
            <ButtonHoverDirectional
              key={index}
              text={item.name}
              onClick={() => handleNavClick(item.id)}
              className={`!text-base ${navItemClassName}`}
              aria-label={`Navigate to ${item.name}`}
            />
          ))}
        </div>

        <ButtonTextStagger
          text={buttonText}
          onClick={onButtonClick}
          className={`relative px-6 h-10 z-[100] ${buttonClassName}`}
          bgClassName={`rounded-full ${buttonBgClassName}`}
          aria-label={buttonText}
        />
      </nav>
    );
  }
);

export default NavbarLayoutFloatingInline;
