"use client";

import React, { memo } from "react";
import BentoKPISimple from "@/components/bento/BentoKPISimple";
import TextRenderer from "@/components/text/TextRenderer";
import dynamic from "next/dynamic";
import { TokenomicsStyle } from "@/components/sections/styles/tokenomics/types";
import { getFunAndTrendyTokenomicsStyle } from "../../styles/tokenomics/pudgy/funAndTrendy";
import { getFuturisticTokenomicsStyle } from "../../styles/tokenomics/pudgy/futuristicAndOutOfBox";
import { useSiteTheme, getThemeStyle } from "../../ThemeProvider";
import TextboxLayoutHorizontal from "@/components/textbox/TextboxLayoutHorizontal";

const Spotlight = dynamic(() => import("@/components/background/Spotlight"), {
  ssr: false,
});

interface TextGridTokenomicsProps {
  title?: string;
  description?: string;
  tokenData?: Array<{
    value: string;
    description: string;
  }>;
}

const TextGridTokenomics = ({
  title = "Tokenomics",
  description = "With zero taxes, locked liquidity, and renounced ownership, Polly is built for the community—fair, transparent, and unstoppable.",
  tokenData = [
    { value: "Ticker", description: "$Polly" },
    { value: "Network", description: "Abstract" },
    { value: "Supply", description: "1,000,000,000" },
    { value: "Liquidity", description: "Locked" },
    { value: "Taxes", description: "None" },
    { value: "Ownership", description: "Renounced" },
  ],
}: TextGridTokenomicsProps) => {
  const theme = useSiteTheme();
  const style: TokenomicsStyle = getThemeStyle(theme, {
    funAndTrendy: getFunAndTrendyTokenomicsStyle,
    futuristicAndOutOfBox: getFuturisticTokenomicsStyle,
  });

  return (
    <section
      className={`w-full relative overflow-hidden ${style.section.backgroundColor} ${style.section.className}`}
    >
      {style.section.backgroundPattern && (
        <div
          className={`absolute inset-0 opacity-20 ${style.section.backgroundPattern} bg-repeat`}
        />
      )}
      {style.section.spotlight && <Spotlight {...style.section.spotlight} />}
      <div className="max-w-[var(--width-100)] px-[var(--width-10)] mx-auto relative z-10 flex flex-col gap-6">
        <TextboxLayoutHorizontal
          title={
            <TextRenderer config={{ ...style.title, text: title }} as="h1" />
          }
          description={
            <p className={style.description.className}>{description}</p>
          }
          className="!gap-0 md:!gap-6"
        />
        <BentoKPISimple
          items={tokenData.map((item, index) => ({
            ...item,
            ...style.bento.items?.[index],
          }))}
          className={style.bento.className}
          gridClassName={style.bento.gridClassName}
          itemClassName={style.bento.itemClassName}
          valueClassName={style.bento.valueClassName}
          descriptionClassName={style.bento.descriptionClassName}
          gradientColors={style.bento.gradientColors}
        />
      </div>
    </section>
  );
};

TextGridTokenomics.displayName = "TextGridTokenomics";

export default memo(TextGridTokenomics);
