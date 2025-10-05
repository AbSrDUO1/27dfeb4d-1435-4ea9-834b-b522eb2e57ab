"use client";

import { memo } from "react";
import SideGlowGradientBackground from "@/components/background/SideGlowGradientBackground";
import dynamic from "next/dynamic";
import { HeroStyle } from "../../styles/hero/types";
import { getFunAndTrendyHeroStyle } from "../../styles/hero/pepe/funAndTrendy";
import { getFuturisticPepeHeroStyle } from "../../styles/hero/pepe/futuristicAndOutOfBox";
import { useSiteTheme, getThemeStyle } from "../../ThemeProvider";
import { cls } from "@/lib/utils";
import Image from "next/image";
import TextRenderer from "../../../text/TextRenderer";
import { Copy } from "lucide-react";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";

const SparklesCore = dynamic(
  () =>
    import("@/components/background/Sparkles").then((mod) => ({
      default: mod.SparklesCore,
    })),
  {
    ssr: false,
  }
);

interface PepeHeroProps {
  title?: string;
  subtitle?: string;
  contractAddress?: string;
  copyButtonText?: string;
  copiedText?: string;
}

const PepeHero = ({ 
  title = "Pepo's On The Blockchain",
  subtitle = "Pepo leaps to the moon with meme magic & Sui speed.",
  contractAddress = "0x6982508145454ce325ddbe47a25d4ec3d2311933",
  copyButtonText = "Copy",
  copiedText = "Copied!"
}: PepeHeroProps) => {
  const theme = useSiteTheme();
  const style: HeroStyle = getThemeStyle(theme, {
    funAndTrendy: getFunAndTrendyHeroStyle,
    futuristicAndOutOfBox: getFuturisticPepeHeroStyle
  });
  const { copied, copy } = useCopyToClipboard();

  const handleCopy = () => {
    if (contractAddress) {
      copy(contractAddress);
    }
  };

  return (
      <section
        className={cls(
          "w-full relative overflow-hidden",
          style.section.height,
          style.section.className
        )}
      >
        {style.section.sideGlowGradient ? (
          <>
            <SideGlowGradientBackground
              radialColor={style.section.sideGlowGradient.radialColor}
              linearColor={style.section.sideGlowGradient.linearColor}
              radialOpacity={style.section.sideGlowGradient.radialOpacity}
              linearOpacity={style.section.sideGlowGradient.linearOpacity}
              rounded={style.section.sideGlowGradient.rounded}
            />
            {style.section.sparkles && (
              <div className="absolute inset-3 md:inset-8 rounded-xl opacity-40">
                <SparklesCore
                  {...style.section.sparkles}
                  className="absolute inset-0"
                  background="transparent"
                />
              </div>
            )}
          </>
        ) : style.section.customGradient ? (
          <div
            className="absolute inset-3 md:inset-8 rounded-xl overflow-hidden"
            style={{ background: style.section.customGradient }}
          >
            {style.section.sparkles && (
              <div className="absolute inset-0 opacity-40">
                <SparklesCore
                  {...style.section.sparkles}
                  className="absolute inset-0"
                  background="transparent"
                />
              </div>
            )}
          </div>
        ) : (
          <div
            className={`absolute inset-0 opacity-30 ${style.section.backgroundPattern} bg-repeat`}
          />
        )}
        <div
          className={cls(
            "max-w-[var(--width-100)] px-[var(--width-10)] w-full h-svh flex flex-col items-center relative mx-auto z-20",
            style.section.contentAlignment
          )}
        >
          <div className={cls("w-full flex flex-col text-center items-center", style.section.textContainerClassName)}>
            <TextRenderer
              config={{
                text: title,
                className: style.heading.className,
                shadowColor: style.heading.shadowColor,
                shadowOffset: style.heading.shadowOffset,
                animationProps: style.heading.animationProps,
                gradientColors: style.heading.gradientColors,
              }}
            />
            <div className={style.subheading.className}>
              {subtitle}
            </div>
            {style.ctaStyle && (
              <div className="w-full">
                <div className={style.ctaStyle.containerClassName}>
                  <span className={style.ctaStyle.addressClassName}>
                    {contractAddress}
                  </span>
                  <button className={style.ctaStyle.buttonClassName} onClick={handleCopy}>
                    <span className="relative inline-block cursor-pointer">
                      <span className={`inline-block transition-all duration-300 ${copied ? 'opacity-0' : 'opacity-100'}`}>
                        {copyButtonText}
                      </span>
                      <span className={`absolute right-0 inline-block transition-all duration-300 ${copied ? 'opacity-100' : 'opacity-0'}`}>
                        {copiedText}
                      </span>
                    </span>
                    <Copy className={style.ctaStyle.iconClassName} strokeWidth="3" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        {style.section.backgroundImage && (
          <div className="md:w-screen w-[220vw] absolute z-0 bottom-0 left-1/2 -translate-x-1/2">
            <Image
              src={style.section.backgroundImage}
              width={1400}
              height={1000}
              alt="Background decoration"
              className="w-full h-auto [mask-image:linear-gradient(to_bottom,transparent_0%,black_30%,black_80%,transparent_100%,)] [-webkit-mask-image:linear-gradient(to_bottom,transparent_0%,black_40%,black_80%,transparent_100%)]"
            />
          </div>
        )}
      </section>
  );
};

PepeHero.displayName = "PepeHero";

export default memo(PepeHero);
