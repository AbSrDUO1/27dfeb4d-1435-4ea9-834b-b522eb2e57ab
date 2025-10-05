"use client";
import React, { useState, memo, useCallback } from "react";
import Image from "next/image";
import { useLenis } from "lenis/react";
import MobileMenu from "../mobileMenu/MobileMenu";
import ButtonHoverDirectional from "@/components/buttons/ButtonHoverDirectional/ButtonHoverDirectional";
import { Plus } from "lucide-react";
import { NavbarProps } from "@/types/navigation";
import { useScrollState } from "./useScrollState";

const SCROLL_THRESHOLD = 50;

const NavbarStyleApple = ({
  navItems,
  logoSrc,
  logoAlt = "",
  brandName = "Webild",
}: NavbarProps) => {
  const lenis = useLenis();
  const isScrolled = useScrollState(SCROLL_THRESHOLD);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavClick = useCallback(
    (id: string, closeMenu = false) => {
      if (id && lenis) {
        lenis.scrollTo(`#${id}`);
      }
      if (closeMenu) {
        setMenuOpen(false);
      }
    },
    [lenis]
  );

  const handleMenuToggle = useCallback(() => {
    setMenuOpen((prev) => !prev);
  }, []);

  return (
    <nav
      className={`
        fixed z-[1000] top-0 left-0 w-full transition-all duration-500 ease-in-out px-[var(--width-10)]
        ${
          isScrolled
            ? "bg-white/80 backdrop-blur-sm h-15"
            : "bg-white/0 backdrop-blur-0 h-20"
        }
      `}
    >
      <div className="flex items-center justify-between h-full max-w-[var(--width-100)] mx-auto w-full">
        <div className="flex items-center transition-all duration-500 ease-in-out">
          {logoSrc ? (
            <div className="relative h-[var(--text-xl)] w-auto">
              <Image
                src={logoSrc}
                alt={logoAlt}
                width={100}
                height={24}
                className="h-full w-auto object-contain"
                priority
              />
            </div>
          ) : (
            <>
              <div className="relative h-[var(--text-xl)] w-[var(--text-xl)]">
                <Image
                  src="/images/logo-dot.svg"
                  alt="Logo"
                  width={24}
                  height={24}
                  className="h-full w-full object-contain"
                  priority
                />
              </div>
              <h2 className="text-xl font-medium text-black">{brandName}</h2>
            </>
          )}
        </div>

        <div
          className="hidden md:flex items-center gap-6 transition-all duration-500 ease-in-out"
          role="navigation"
        >
          {navItems.map((item, index) => (
            <ButtonHoverDirectional
              key={index}
              text={item.name}
              onClick={() => handleNavClick(item.id)}
              className="!text-base"
              aria-label={`Navigate to ${item.name}`}
            />
          ))}
        </div>

        <button
          className="flex md:hidden shrink-0 h-8 aspect-square rounded-sm bg-black items-center justify-center cursor-pointer"
          onClick={handleMenuToggle}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          <Plus
            className={`
              w-1/2 h-1/2 text-white transition-transform duration-300
              ${menuOpen ? "rotate-45" : "rotate-0"}
            `}
            strokeWidth={1.5}
            aria-hidden="true"
          />
        </button>
      </div>

      <MobileMenu
        menuOpen={menuOpen}
        onMenuToggle={handleMenuToggle}
        navItems={navItems}
        onNavClick={(id) => handleNavClick(id, true)}
      />
    </nav>
  );
};

export default memo(NavbarStyleApple);
