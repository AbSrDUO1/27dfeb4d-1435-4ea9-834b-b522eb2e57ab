"use client";

import { memo } from "react";
import TextRenderer from "@/components/text/TextRenderer";
import dynamic from "next/dynamic";
import { TokenomicsStyle } from "@/components/sections/styles/tokenomics/types";
import { getFunAndTrendyTokenomicsStyle } from "../../styles/tokenomics/expanding/funAndTrendy";
import { getFuturisticTokenomicsStyle } from "../../styles/tokenomics/expanding/futuristicAndOutOfBox";
import { useSiteTheme, getThemeStyle } from "../../ThemeProvider";
import TextboxLayoutHorizontal from "@/components/textbox/TextboxLayoutHorizontal";
import ExpandingBento from "@/components/bento/ExpandingBento";

const Spotlight = dynamic(() => import("@/components/background/Spotlight"), {
  ssr: false,
});

interface TokenomicsProps {
  title?: string;
  description?: string;
  cardItems?: Array<{
    id: number;
    title: string;
    description: string;
  }>;
}

const Tokenomics = ({
  title = "Tokenomics",
  description = "With zero taxes, locked liquidity, and renounced ownership, Polly is built for the community—fair, transparent, and unstoppable.",
  cardItems,
}: TokenomicsProps) => {
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
      <div className="max-w-[var(--width-100)] px-[var(--width-10)] mx-auto relative z-10 flex flex-col gap-8">
        <TextboxLayoutHorizontal
          title={
            <TextRenderer config={{ ...style.title, text: title }} as="h1" />
          }
          description={
            <p className={style.description.className}>{description}</p>
          }
          className="!gap-0 md:!gap-6"
        />
        <ExpandingBento style={style} cardItems={cardItems || []} />
      </div>
    </section>
  );
};

Tokenomics.displayName = "Tokenomics";

export default memo(Tokenomics);
