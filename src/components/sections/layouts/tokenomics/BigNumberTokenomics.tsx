"use client";

import React, { memo } from "react";
import TextRenderer from "@/components/text/TextRenderer";
import dynamic from "next/dynamic";
import { TokenomicsStyle } from "@/components/sections/styles/tokenomics/types";
import { getFunAndTrendyTokenomicsStyle } from "../../styles/tokenomics/minimal/funAndTrendy";
import { getFuturisticTokenomicsStyle } from "../../styles/tokenomics/minimal/futuristicAndOutOfBox";
import { useSiteTheme, getThemeStyle } from "../../ThemeProvider";
import { LucideIcon, DollarSign, Users, Briefcase } from "lucide-react";
import TextboxLayoutHorizontal from "@/components/textbox/TextboxLayoutHorizontal";
import BentoKPIStandard from "@/components/bento/BentoKPIStandard";

const Spotlight = dynamic(() => import("@/components/background/Spotlight"), {
  ssr: false,
});

interface TokenomicsProps {
  title?: string;
  description?: string;
  kpiItems?: Array<{
    value: string;
    description: string;
    longDescription?: string;
    icon?: LucideIcon;
  }>;
}

const Tokenomics = ({
  title = "Tokenomics",
  description = "With zero taxes, locked liquidity, and renounced ownership, Polly is built for the community—fair, transparent, and unstoppable.",
  kpiItems = [
    {
      value: "100",
      description: "million",
      longDescription:
        "dollars in client revenue driven by our tailored solutions and strategies.",
      icon: DollarSign,
    },
    {
      value: "700",
      description: "thousand",
      longDescription:
        "unique visitors engaging with the websites we build every month.",
      icon: Users,
    },
    {
      value: "250",
      description: "projects",
      longDescription: "successfully delivered across multiple industries.",
      icon: Briefcase,
    },
  ],
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
        <BentoKPIStandard
          items={kpiItems.map((item, index) => ({
            ...item,
            ...style.bento.items?.[index],
            button: style.bento.button,
          }))}
          className={style.bento.className}
          gridClassName={style.bento.gridClassName}
          itemClassName={style.bento.itemClassName}
          valueClassName={style.bento.valueClassName}
          descriptionClassName={style.bento.descriptionClassName}
          iconContainerClassName={style.bento.iconContainerClassName}
          iconClassName={style.bento.iconClassName}
          color={style.bento.gradientColors?.from}
          longDescriptionClassName={style.bento.longDescriptionClassName}
        />
      </div>
    </section>
  );
};

Tokenomics.displayName = "Tokenomics";

export default memo(Tokenomics);
