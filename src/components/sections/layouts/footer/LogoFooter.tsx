"use client";

import React, { memo } from "react";
import BaseFooterLogoEmphasis from "@/components/footer/FooterLogoEmphasis";
import { FooterStyle } from "../../styles/footer/types";
import { getFunAndTrendyFooterStyle } from "../../styles/footer/logo/funAndTrendy";
import { getFuturisticFooterStyle } from "../../styles/footer/logo/futuristicAndOutOfBox";
import { useSiteTheme, getThemeStyle } from "../../ThemeProvider";

interface FooterColumn {
  title?: string;
  items: Array<{
    label: string;
    onClick?: () => void;
  }>;
}

interface FooterLogoEmphasisProps {
  columns?: FooterColumn[];
}

const FooterLogoEmphasis = memo<FooterLogoEmphasisProps>(
  function FooterLogoEmphasis({ columns = [] }) {
    const theme = useSiteTheme();
    const style: FooterStyle = getThemeStyle(theme, {
      funAndTrendy: getFunAndTrendyFooterStyle,
      futuristicAndOutOfBox: getFuturisticFooterStyle,
    });

    return (
      <BaseFooterLogoEmphasis
        logoSrc={style.logoSrc}
        logoAlt={style.logoAlt}
        logoText={style.logoText}
        columns={columns}
        className={style.className}
        containerClassName={style.containerClassName}
        logoClassName={style.logoClassName}
        columnsClassName={style.columnsClassName}
        columnClassName={style.columnClassName}
        itemClassName={style.itemClassName}
        iconClassName={style.iconClassName}
        buttonClassName={style.buttonClassName}
        gradientClassName={style.gradientClassName}
        gradientStyle={
          style.gradientClassName
            ? {
                backgroundImage: `linear-gradient(to right, transparent, ${style.gradientClassName}, transparent)`,
              }
            : undefined
        }
        backgroundBlobClassName=""
        backgroundBlobStyle={{ background: style.svgClassName }}
      />
    );
  }
);

export default FooterLogoEmphasis;
