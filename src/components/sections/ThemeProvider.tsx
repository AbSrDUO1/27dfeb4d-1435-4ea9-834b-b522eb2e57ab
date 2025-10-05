/**
 * IMPORTANT: All sections in a website must use the same styleVariant, colorTemplate, and textAnimation
 * Do not mix different styles, color templates, or text animations across sections
 *
 * Usage:
 * Wrap your entire page with SiteThemeProvider to ensure consistent styling across all sections.
 *
 * Example:
 * <SiteThemeProvider theme={{
 *   styleVariant: 'funAndTrendy',
 *   colorTemplate: 1,
 *   textAnimation: 'slide'
 * }}>
 *   <SimpleHero />
 *   <MinimalAbout />
 *   <FooterBase />
 * </SiteThemeProvider>
 */

"use client";

import React, { createContext, useContext } from "react";

export type StyleVariant = "funAndTrendy" | "futuristicAndOutOfBox";
export type ColorTemplate = 1 | 2;
export type TextAnimation =
  | "slide"
  | "rotate"
  | "highlight"
  | "blur"
  | "scale"
  | "expand"
  | "flip"
  | "none";

export interface SiteTheme {
  styleVariant: StyleVariant;
  colorTemplate: ColorTemplate;
  textAnimation: TextAnimation;
}

const ThemeContext = createContext<SiteTheme | null>(null);

/**
 * Hook to access the site theme from any section component
 * Throws an error if used outside of SiteThemeProvider
 */
export const useSiteTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error(
      "Section components must be wrapped in <SiteThemeProvider>. " +
        "Please wrap your page or component tree with SiteThemeProvider."
    );
  }
  return context;
};

interface SiteThemeProviderProps {
  children: React.ReactNode;
  theme: SiteTheme;
}

/**
 * Provider component that sets the theme for all child section components
 * @param theme - The styleVariant and colorTemplate to apply to all sections
 * @param children - The section components to render with this theme
 */
export function SiteThemeProvider({ children, theme }: SiteThemeProviderProps) {
  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
}

/**
 * Helper function to get the appropriate style based on theme
 * Use this in your components to avoid repetitive conditionals
 */
export function getThemeStyle<T>(
  theme: SiteTheme,
  styleGetters: {
    funAndTrendy: (colorTemplate: ColorTemplate) => T;
    futuristicAndOutOfBox: (colorTemplate: ColorTemplate) => T;
  }
): T {
  return styleGetters[theme.styleVariant](theme.colorTemplate);
}
