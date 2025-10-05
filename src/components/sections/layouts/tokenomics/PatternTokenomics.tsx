"use client";

import React, { memo } from "react";
import TextRenderer from "@/components/text/TextRenderer";
import dynamic from "next/dynamic";
import { TokenomicsStyle } from "@/components/sections/styles/tokenomics/types";
import { getFunAndTrendyTokenomicsStyle } from "../../styles/tokenomics/pattern/funAndTrendy";
import { getFuturisticTokenomicsStyle } from "../../styles/tokenomics/pattern/futuristicAndOutOfBox";
import { useSiteTheme, getThemeStyle } from "../../ThemeProvider";
import TextboxLayoutHorizontal from "@/components/textbox/TextboxLayoutHorizontal";
import BentoHoverPattern from "@/components/bento/BentoHoverPattern/BentoHoverPattern";
import { LucideIcon } from "lucide-react";
import { Boxes, Code2, Palette, Rocket, Shield, Zap } from "lucide-react";

const Spotlight = dynamic(() => import("@/components/background/Spotlight"), {
  ssr: false,
});

interface TokenomicsProps {
  title?: string;
  description?: string;
  kpiItems?: Array<{
    value: string;
    description: string;
    icon?: LucideIcon;
  }>;
}

const PatternTokenomics = ({
  title = "Tokenomics",
  description = "With zero taxes, locked liquidity, and renounced ownership, Polly is built for the community—fair, transparent, and unstoppable.",
  kpiItems = [
    {
      icon: Boxes,
      value: "Architecture",
      description:
        "Building scalable and maintainable application structures with modern design patterns and best practices.",
    },
    {
      icon: Code2,
      value: "Development",
      description:
        "Creating robust features with clean code, comprehensive testing, and continuous integration workflows.",
    },
    {
      icon: Palette,
      value: "Design",
      description:
        "Crafting beautiful user interfaces with intuitive interactions and accessible experiences for all users.",
    },
    {
      icon: Rocket,
      value: "Performance",
      description:
        "Optimizing applications for speed and efficiency with code splitting, lazy loading, and caching strategies.",
    },
    {
      icon: Shield,
      value: "Security",
      description:
        "Implementing secure authentication, data encryption, and protection against common vulnerabilities.",
    },
    {
      icon: Zap,
      value: "Innovation",
      description:
        "Exploring cutting-edge technologies and methodologies to deliver next-generation digital experiences.",
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
        <BentoHoverPattern
          items={kpiItems}
          button={style.bento.button}
          className={style.bento.className}
          itemClassName={style.bento.itemClassName}
          valueClassName={style.bento.valueClassName}
          descriptionClassName={style.bento.descriptionClassName}
          gradientClassName={style.bento.gradientClassName}
        />
      </div>
    </section>
  );
};

PatternTokenomics.displayName = "Tokenomics";

export default memo(PatternTokenomics);
