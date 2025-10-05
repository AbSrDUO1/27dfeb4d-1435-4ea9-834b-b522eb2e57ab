"use client";

import React, { memo } from "react";
import { AnimateNumber } from "motion-number";

interface TextNumberCountProps {
  value: number;
  format?: Omit<Intl.NumberFormatOptions, "notation"> & {
    notation?: Exclude<
      Intl.NumberFormatOptions["notation"],
      "scientific" | "engineering"
    >;
  };
  locales?: Intl.LocalesArgument;
  className?: string;
  suffix?: string;
  prefix?: string;
}

const TextNumberCount = ({
  value,
  format,
  locales = "en-US",
  className = "",
  suffix,
  prefix,
}: TextNumberCountProps) => {
  return (
    <AnimateNumber
      format={format}
      locales={locales}
      className={className}
      suffix={suffix}
      prefix={prefix}
    >
      {value}
    </AnimateNumber>
  );
};

TextNumberCount.displayName = "TextNumberCount";

export default memo(TextNumberCount);
