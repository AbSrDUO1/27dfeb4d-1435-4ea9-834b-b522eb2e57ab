"use client";

import React, { memo } from "react";
import BentoHoverInfoReveal from "@/components/bento/BentoHoverInfoReveal/BentoHoverInfoReveal";
import SimpleHowToBuyBento from "@/components/bento/SimpleHowToBuyBento";
import TextRenderer from "@/components/text/TextRenderer";
import dynamic from "next/dynamic";
import { getFunAndTrendyHowToBuyStyle2D } from "../../styles/howtobuy/2DRevealHTB/funAndTrendy";
import { getFuturisticHowToBuyStyle2D } from "../../styles/howtobuy/2DRevealHTB/futuristicAndOutOfBox";
import { getFunAndTrendyMinimalHowToBuyStyle2D } from "../../styles/howtobuy/2DHTB/funAndTrendy";
import { getFuturisticMinimalHowToBuyStyle2D } from "../../styles/howtobuy/2DHTB/futuristicAndOutOfBox";
import { useSiteTheme, getThemeStyle } from "../../ThemeProvider";

const Spotlight = dynamic(() => import("@/components/background/Spotlight"), {
  ssr: false,
});
import { HowToBuyStyle2D } from "@/components/sections/styles/howtobuy/types";

interface HowToBuy2DProps {
  variant?: 'reveal' | 'simple';
}

const HowToBuy2D = ({ 
  variant = 'reveal'
}: HowToBuy2DProps) => {
  const theme = useSiteTheme();
  const style: HowToBuyStyle2D = getThemeStyle(
    theme,
    variant === 'reveal' 
      ? {
          funAndTrendy: getFunAndTrendyHowToBuyStyle2D,
          futuristicAndOutOfBox: getFuturisticHowToBuyStyle2D
        }
      : {
          funAndTrendy: getFunAndTrendyMinimalHowToBuyStyle2D,
          futuristicAndOutOfBox: getFuturisticMinimalHowToBuyStyle2D
        }
  );
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
      <div className="max-w-[var(--width-100)] md:px-[var(--width-10)] mx-auto relative z-10 flex flex-col gap-6 md:gap-12">
        <div className="flex items-center justify-center overflow-hidden">
          <TextRenderer config={style.title} as="h2" />
        </div>
        {style.componentType === "reveal" && style.bento && (
          <BentoHoverInfoReveal
            items={style.bento.items}
            enableHoverAnimation={style.bento.enableHoverAnimation}
            showImages={style.bento.showImages}
            className={style.bento.className}
            gridClassName={style.bento.gridClassName}
            itemClassName={style.bento.itemClassName}
          />
        )}
        {style.componentType === "simple" && style.simpleBento && (
          <SimpleHowToBuyBento
            items={style.simpleBento.items}
            className={style.simpleBento.className}
            gridClassName={style.simpleBento.gridClassName}
            itemClassName={style.simpleBento.itemClassName}
            iconClassName={style.simpleBento.iconClassName}
            titleClassName={style.simpleBento.titleClassName}
            descriptionClassName={style.simpleBento.descriptionClassName}
          />
        )}
      </div>
    </section>
  );
};

HowToBuy2D.displayName = "HowToBuy2D";

export default memo(HowToBuy2D);
