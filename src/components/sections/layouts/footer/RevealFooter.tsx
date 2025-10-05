"use client";

import React, { memo } from "react";
import BaseFooterBaseReveal from "@/components/footer/FooterBaseReveal";
import { FooterStyle } from "../../styles/footer/types";
import { getFunAndTrendyFooterStyle } from "../../styles/footer/reveal/funAndTrendy";
import { getFuturisticFooterStyle } from "../../styles/footer/reveal/futuristicAndOutOfBox";
import { useSiteTheme, getThemeStyle } from "../../ThemeProvider";

interface FooterColumn {
  title: string;
  items: Array<{
    label: string;
    onClick?: () => void;
  }>;
}

interface FooterBaseRevealProps {
  columns?: FooterColumn[];
  copyrightText?: string;
  onPrivacyClick?: () => void;
}

const FooterBaseReveal = memo<FooterBaseRevealProps>(function FooterBaseReveal({
  columns = [],
  copyrightText,
  onPrivacyClick,
}) {
  const theme = useSiteTheme();
  const style: FooterStyle = getThemeStyle(theme, {
    funAndTrendy: getFunAndTrendyFooterStyle,
    futuristicAndOutOfBox: getFuturisticFooterStyle,
  });

  return (
    <BaseFooterBaseReveal
      logoSrc={style.logoSrc}
      logoWidth={style.logoWidth}
      logoHeight={style.logoHeight}
      columns={columns}
      copyrightText={copyrightText}
      onPrivacyClick={onPrivacyClick}
      className={style.className}
      wrapperClassName={style.wrapperClassName}
      containerClassName={style.containerClassName}
      footerClassName={style.footerClassName}
      footerContainerClassName={style.footerContainerClassName}
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

export default FooterBaseReveal;
