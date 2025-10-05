"use client";

import React, { memo } from "react";
import ButtonTextUnderline from "@/components/buttons/ButtonTextUnderline";
import { ChevronRight } from "lucide-react";
import FooterLogo from "./FooterLogo";

interface FooterColumn {
  items: Array<{
    label: string;
    onClick?: () => void;
  }>;
}

interface FooterLogoEmphasisProps {
  logoSrc?: string;
  logoAlt?: string;
  columns: FooterColumn[];
  logoText?: string;
  className?: string;
  containerClassName?: string;
  logoClassName?: string;
  columnsClassName?: string;
  columnClassName?: string;
  itemClassName?: string;
  iconClassName?: string;
  buttonClassName?: string;
  gradientClassName?: string;
  gradientStyle?: React.CSSProperties;
  backgroundBlobClassName?: string;
  backgroundBlobStyle?: React.CSSProperties;
  hideGradient?: boolean;
  hideBackgroundBlob?: boolean;
}

const FooterLogoEmphasis = memo<FooterLogoEmphasisProps>(
  function FooterLogoEmphasis({
    logoSrc,
    logoAlt = "Logo",
    columns,
    logoText = "Webild",
    className = "",
    containerClassName = "",
    logoClassName = "",
    columnsClassName = "",
    columnClassName = "",
    itemClassName = "",
    iconClassName = "",
    buttonClassName = "",
    gradientClassName = "",
    gradientStyle,
    backgroundBlobClassName = "",
    backgroundBlobStyle,
    hideGradient = false,
    hideBackgroundBlob = false,
  }) {
    return (
      <footer
        className={`w-full ${
          logoSrc ? "py-15" : "pt-0 pb-15"
        } px-[var(--width-10)] flex justify-center relative overflow-hidden ${
          className
            ? className
            : "bg-white shadow text-black rounded-t-[var(--width-10)] md:rounded-t-[calc(var(--width-10)/2)]"
        }`}
        role="contentinfo"
        aria-label="Site footer"
      >
        {!hideGradient && (
          <div
            aria-hidden="true"
            className={`absolute z-10 top-0 left-0 w-full h-1 ${gradientClassName}`}
            style={gradientStyle}
          />
        )}
        {!hideBackgroundBlob && (
          <div
            aria-hidden="true"
            className={`absolute z-0 top-0 -translate-y-1/2 left-0 w-full h-200 md:h-140 blur-2xl rounded-[100%] ${backgroundBlobClassName}`}
            style={backgroundBlobStyle}
          />
        )}
        <div
          className={`w-full max-w-[var(--width-100)] flex flex-col ${
            logoSrc ? "gap-10 md:gap-20" : "gap-0"
          } relative z-10 ${containerClassName}`}
        >
          <FooterLogo
            logoSrc={logoSrc}
            logoAlt={logoAlt}
            logoText={logoText}
            className={logoClassName}
          />

          <div
            className={`w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-[var(--width-10)] md:gap-[calc(var(--width-10)/2)] mb-10 ${columnsClassName}`}
          >
            {columns.map((column, index) => (
              <div
                key={`column-${index}`}
                className={`flex items-start flex-col gap-4 ${columnClassName}`}
              >
                {column.items.map((item) => (
                  <div
                    key={`${item.label}-${index}`}
                    className={`flex items-center gap-2 ${itemClassName}`}
                  >
                    <ChevronRight
                      className={`h-[var(--text-base)] w-auto text-blue ${iconClassName}`}
                      strokeWidth={3}
                    />
                    <ButtonTextUnderline
                      text={item.label}
                      onClick={item.onClick}
                      className={`!text-base font-medium ${buttonClassName}`}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </footer>
    );
  }
);

export default FooterLogoEmphasis;
