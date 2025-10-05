"use client";

import React, { memo, useRef, useEffect, useState } from "react";
import FooterBase from "./FooterBase";

interface FooterColumn {
  title: string;
  items: Array<{
    label: string;
    onClick?: () => void;
  }>;
}

interface FooterBaseRevealProps {
  logoSrc?: string;
  logoWidth?: number;
  logoHeight?: number;
  columns: FooterColumn[];
  copyrightText?: string;
  onPrivacyClick?: () => void;
  className?: string;
  wrapperClassName?: string;
  containerClassName?: string;
  footerClassName?: string;
  footerContainerClassName?: string;
  logoClassName?: string;
  columnsClassName?: string;
  columnClassName?: string;
  columnTitleClassName?: string;
  columnItemClassName?: string;
  copyrightContainerClassName?: string;
  copyrightTextClassName?: string;
  privacyButtonClassName?: string;
  gradientClassName?: string;
  gradientStyle?: React.CSSProperties;
  backgroundBlobClassName?: string;
  backgroundBlobStyle?: React.CSSProperties;
  hideGradient?: boolean;
  hideBackgroundBlob?: boolean;
}

const FooterBaseReveal = memo<FooterBaseRevealProps>(function FooterBaseReveal({
  logoSrc,
  logoWidth,
  logoHeight,
  columns,
  copyrightText,
  onPrivacyClick,
  className = "",
  wrapperClassName = "",
  containerClassName = "",
  footerClassName,
  footerContainerClassName,
  logoClassName,
  columnsClassName,
  columnClassName,
  columnTitleClassName,
  columnItemClassName,
  copyrightContainerClassName,
  copyrightTextClassName,
  privacyButtonClassName,
  gradientClassName,
  gradientStyle,
  backgroundBlobClassName,
  backgroundBlobStyle,
  hideGradient,
  hideBackgroundBlob,
}) {
  const footerRef = useRef<HTMLDivElement>(null);
  const [footerHeight, setFooterHeight] = useState<number>(0);

  useEffect(() => {
    const updateHeight = () => {
      if (footerRef.current) {
        const height = footerRef.current.offsetHeight;
        setFooterHeight(height);
      }
    };

    updateHeight();

    const resizeObserver = new ResizeObserver(updateHeight);
    const currentFooter = footerRef.current;

    if (currentFooter) {
      resizeObserver.observe(currentFooter);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <section
      className={`relative z-0 w-full ${className}`}
      style={{
        height: footerHeight ? `${footerHeight}px` : "auto",
        clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)",
      }}
    >
      <div
        className={`fixed bottom-0 w-full flex items-center justify-center overflow-hidden ${wrapperClassName}`}
        style={{ height: footerHeight ? `${footerHeight}px` : "auto" }}
      >
        <div ref={footerRef} className={`w-full ${containerClassName}`}>
          <FooterBase
            logoSrc={logoSrc}
            logoWidth={logoWidth}
            logoHeight={logoHeight}
            columns={columns}
            copyrightText={copyrightText}
            onPrivacyClick={onPrivacyClick}
            className={footerClassName}
            containerClassName={footerContainerClassName}
            logoClassName={logoClassName}
            columnsClassName={columnsClassName}
            columnClassName={columnClassName}
            columnTitleClassName={columnTitleClassName}
            columnItemClassName={columnItemClassName}
            copyrightContainerClassName={copyrightContainerClassName}
            copyrightTextClassName={copyrightTextClassName}
            privacyButtonClassName={privacyButtonClassName}
            gradientClassName={gradientClassName}
            gradientStyle={gradientStyle}
            backgroundBlobClassName={backgroundBlobClassName}
            backgroundBlobStyle={backgroundBlobStyle}
            hideGradient={hideGradient}
            hideBackgroundBlob={hideBackgroundBlob}
          />
        </div>
      </div>
    </section>
  );
});

export default FooterBaseReveal;
