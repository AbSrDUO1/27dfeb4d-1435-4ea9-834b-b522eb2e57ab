"use client";
import React, { memo } from "react";
import Image from "next/image";
import { useLenis } from "lenis/react";
import ExpandingMenu from "../expandingMenu/ExpandingMenu";
import ButtonTextStagger from "../../buttons/ButtonTextStagger/ButtonTextStagger";
import { useScrollDetection } from "./useScrollDetection";
import { useMenuAnimation } from "./useMenuAnimation";
import { useResponsive } from "./useResponsive";

interface NavItem {
  name: string;
  id: string;
}

interface NavbarLayoutFloatingOverlayProps {
  navItems: NavItem[];
  logoSrc?: string;
  logoWidth?: number;
  logoHeight?: number;
  buttonText?: string;
  onButtonClick?: () => void;
}

const NavbarLayoutFloatingOverlay = memo<NavbarLayoutFloatingOverlayProps>(
  function NavbarLayoutFloatingOverlay({
    navItems,
    logoSrc = "/images/logo.svg",
    logoWidth = 120,
    logoHeight = 40,
    buttonText = "Join Now",
    onButtonClick = () => {},
  }) {
    const lenis = useLenis();
    const isScrolled = useScrollDetection(50);
    const { menuOpen, buttonZIndex, handleMenuToggle, setMenuOpen } =
      useMenuAnimation();
    const isMobile = useResponsive(768);

    const handleMobileNavClick = (id: string) => {
      if (id && lenis) {
        lenis.scrollTo(`#${id}`);
      }
      setMenuOpen(false);
    };

    return (
      <nav
        role="navigation"
        aria-label="Main navigation"
        className={`
                fixed z-[100] flex items-center justify-between
                top-6 left-[var(--width-10)] w-80
                bg-white shadow
                rounded-full
                px-6 md:pr-3
                transition-all duration-500 ease-in-out
                ${isScrolled ? "" : ""}
            `}
        style={{
          height: "calc(var(--vw-0_75) + var(--vw-0_75) + var(--height-10))",
        }}
      >
        <Image
          src={logoSrc}
          width={logoWidth}
          height={logoHeight}
          className="h-[var(--text-xl)] w-auto"
          alt="Company Logo"
          priority
        />
        <div
          className="flex items-center transition-all duration-500 ease-in-out"
          style={{ paddingRight: "calc(var(--height-10) + var(--vw-0_75))" }}
        >
          {!isMobile && (
            <div className="hidden md:flex">
              <ButtonTextStagger
                text={buttonText}
                onClick={onButtonClick}
                className={`relative !text-white px-6 h-10 ${buttonZIndex}`}
                bgClassName="rounded-full !bg-black"
                aria-label={`${buttonText} - Open registration`}
              />
            </div>
          )}
          <ExpandingMenu
            isOpen={menuOpen}
            onToggle={handleMenuToggle}
            navItems={navItems}
            onNavClick={handleMobileNavClick}
            isScrolled={isScrolled}
          />
        </div>
      </nav>
    );
  }
);

export default NavbarLayoutFloatingOverlay;
