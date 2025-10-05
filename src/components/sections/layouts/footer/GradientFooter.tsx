"use client";

import React, { memo } from "react";
import BaseFooterLogoEmphasisBackgroundGradient from "@/components/footer/FooterLogoEmphasisBackgroundGradient";
import { FooterStyle } from "../../styles/footer/types";
import { getFunAndTrendyFooterStyle } from "../../styles/footer/gradient/funAndTrendy";
import { getFuturisticFooterStyle } from "../../styles/footer/gradient/futuristicAndOutOfBox";
import { useSiteTheme, getThemeStyle } from "../../ThemeProvider";

interface FooterItem {
  label: string;
  onClick?: () => void;
}

interface FooterLogoEmphasisBackgroundGradientProps {
  items?: FooterItem[];
}

const FooterLogoEmphasisBackgroundGradient = memo(
  function FooterLogoEmphasisBackgroundGradient({
    items = [],
  }: FooterLogoEmphasisBackgroundGradientProps) {
    const theme = useSiteTheme();
    const style: FooterStyle = getThemeStyle(theme, {
      funAndTrendy: getFunAndTrendyFooterStyle,
      futuristicAndOutOfBox: getFuturisticFooterStyle,
    });

    const isGradientClass = style.gradientClassName?.startsWith("bg-");
    const gradientStyle =
      !isGradientClass && style.gradientClassName
        ? {
            background: style.gradientClassName,
          }
        : undefined;

    return (
      <BaseFooterLogoEmphasisBackgroundGradient
        logoSrc={style.logoSrc}
        logoAlt={style.logoAlt}
        logoText={style.logoText}
        items={items}
        className={style.className}
        containerClassName={style.containerClassName}
        gradientClassName={isGradientClass ? style.gradientClassName : ""}
        gradientStyle={gradientStyle}
        logoClassName={style.logoClassName}
        itemsClassName={style.itemsClassName}
        itemClassName={style.itemClassName}
        buttonClassName={style.buttonClassName}
      />
    );
  }
);

FooterLogoEmphasisBackgroundGradient.displayName =
  "FooterLogoEmphasisBackgroundGradient";

export default FooterLogoEmphasisBackgroundGradient;
