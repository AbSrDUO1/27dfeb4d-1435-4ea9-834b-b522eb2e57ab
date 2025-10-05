"use client";
import React, { memo } from "react";
import Image from "next/image";
import ButtonTextStagger from "../../buttons/ButtonTextStagger/ButtonTextStagger";
import ButtonSelectorState from "../../buttons/ButtonSelectorState";
import { NavItem } from "@/types/navigation";
import { useScrollNavigation } from "./useScrollNavigation";

/**
 * NavbarLayoutSplitBottom Component
 *
 * The button component (ButtonTextStagger) can be replaced with any button component from @/components/buttons/
 *
 * @example Replace with different button:
 * Instead of ButtonTextStagger, you can use:
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
 * - ButtonHoverDirectional from '@/components/buttons/ButtonHoverDirectional'
 */
interface NavbarLayoutSplitBottomProps {
  logoSrc?: string;
  logoWidth?: number;
  logoHeight?: number;
  buttonText?: string;
  onButtonClick?: () => void;
  navItems: NavItem[];
  defaultSelectorValue?: string;
  onSelectorChange?: (value: string) => void;
  className?: string;
  enableScrollDetection?: boolean;
}

const NavbarLayoutSplitBottom = memo<NavbarLayoutSplitBottomProps>(
  function NavbarLayoutSplitBottom({
    logoSrc = "/images/logo.svg",
    logoWidth = 120,
    logoHeight = 40,
    buttonText = "Join Now",
    onButtonClick = () => {},
    navItems,
    defaultSelectorValue,
    onSelectorChange,
    className = "",
    enableScrollDetection = true,
  }) {
    const { selectedValue, selectorOptions, handleSelectorChange } =
      useScrollNavigation(
        navItems,
        defaultSelectorValue,
        onSelectorChange,
        enableScrollDetection
      );

    const MASK_GRADIENT = "linear-gradient(to top, transparent, black 40%)";

    return (
      <>
        <nav
          role="navigation"
          aria-label="Main navigation"
          className={`
                    absolute z-100 flex items-center justify-between
                    top-0 left-0 right-0
                    transition-all duration-500 ease-in-out
                    ${className}
                `}
        >
          <div className="relative z-10 w-full px-[var(--width-10)] flex items-center justify-between py-6 md:py-8">
            <Image
              src={logoSrc}
              width={logoWidth}
              height={logoHeight}
              className="h-[var(--text-xl)] w-auto"
              alt="Company Logo"
              priority
            />

            <ButtonTextStagger
              text={buttonText}
              onClick={onButtonClick}
              className="relative px-6 h-10 z-[100]"
              bgClassName="rounded-full"
              aria-label={buttonText}
            />
          </div>

          <div
            className="absolute z-0 top-0 left-0 right-0 h-30 backdrop-blur-xl"
            style={{ maskImage: MASK_GRADIENT }}
          />
        </nav>

        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-100 w-fit p-0.5 bg-white shadow rounded-full">
          <ButtonSelectorState
            options={selectorOptions}
            activeValue={selectedValue}
            onValueChange={handleSelectorChange}
            className="rounded-full whitespace-nowrap !shadow-none"
            hoverClassName="rounded-full"
          />
        </div>
      </>
    );
  }
);

export default NavbarLayoutSplitBottom;
