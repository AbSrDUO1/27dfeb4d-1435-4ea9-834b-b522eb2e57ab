"use client";

import React, { memo } from "react";
import BaseFooterBase from "@/components/footer/FooterBase";
import { FooterStyle } from "../../styles/footer/types";
import { getFunAndTrendyFooterStyle } from "../../styles/footer/simple/funAndTrendy";
import { getFuturisticFooterStyle } from "../../styles/footer/simple/futuristicAndOutOfBox";
import { useSiteTheme, getThemeStyle } from "../../ThemeProvider";

interface FooterColumn {
  title: string;
  items: Array<{
    label: string;
    onClick?: () => void;
  }>;
}

interface FooterBaseProps {
  columns?: FooterColumn[];
  copyrightText?: string;
  onPrivacyClick?: () => void;
}

const FooterBase = memo<FooterBaseProps>(function FooterBase({
  columns = [],
  copyrightText = "© 2025 | Webild",
  onPrivacyClick,
}) {
  const theme = useSiteTheme();
  const style: FooterStyle = getThemeStyle(theme, {
    funAndTrendy: getFunAndTrendyFooterStyle,
    futuristicAndOutOfBox: getFuturisticFooterStyle,
  });

  return (
    <BaseFooterBase
      logoSrc={style.logoSrc}
      logoWidth={style.logoWidth}
      logoHeight={style.logoHeight}
      columns={columns}
      copyrightText={copyrightText}
      onPrivacyClick={onPrivacyClick}
      className={style.className}
      containerClassName={style.containerClassName}
      logoClassName={style.logoClassName}
      columnsClassName={style.columnsClassName}
      columnClassName={style.columnClassName}
      columnTitleClassName={style.columnTitleClassName}
      columnItemClassName={style.columnItemClassName}
      copyrightContainerClassName={style.copyrightContainerClassName}
      copyrightTextClassName={style.copyrightTextClassName}
      privacyButtonClassName={style.privacyButtonClassName}
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
});

export default FooterBase;
