'use client';

import Image from 'next/image';
import React, { memo } from 'react';
import TextRenderer from '@/components/text/TextRenderer';
import SideGlowGradientBackground from '@/components/background/SideGlowGradientBackground';
import dynamic from 'next/dynamic';
import { getFunAndTrendyHeroStyle } from '../../styles/hero/playful/funAndTrendy';
import { getFuturisticHeroStyle } from '../../styles/hero/playful/futuristicAndOutOfBox';
import { useSiteTheme, getThemeStyle } from '../../ThemeProvider';

const SparklesCore = dynamic(() => import('@/components/background/Sparkles').then(mod => ({ default: mod.SparklesCore })), {
  ssr: false
});
import { HeroStyle } from '@/components/sections/styles/hero/types';

interface PlayfulHeroProps {
    title?: string;
    subtitle?: string;
}

const PlayfulHero = ({ 
    title = "The Huddle",
    subtitle = "Pudgy Penguins is a global IP focused on proliferating the penguin, memetic culture, and good vibes."
}: PlayfulHeroProps) => {
    const theme = useSiteTheme();
    const style: HeroStyle = getThemeStyle(theme, {
        funAndTrendy: getFunAndTrendyHeroStyle,
        futuristicAndOutOfBox: getFuturisticHeroStyle
    });
    return (
            <section className={`w-full relative overflow-hidden ${style.section.height} ${style.section.className}`}>
                {style.section.sideGlowGradient ? (
                    <>
                        <SideGlowGradientBackground 
                            radialColor={style.section.sideGlowGradient.radialColor}
                            linearColor={style.section.sideGlowGradient.linearColor}
                            radialOpacity={style.section.sideGlowGradient.radialOpacity}
                            linearOpacity={style.section.sideGlowGradient.linearOpacity}
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
                    <div className={`absolute inset-0 opacity-30 ${style.section.backgroundPattern} bg-repeat`} />
                )}
                <div className={`max-w-[var(--width-100)] px-[var(--width-10)] w-full h-svh md:h-screen flex justify-center relative ${style.section.contentAlignment}`} >
                    <div className={`relative z-10 flex flex-col items-center text-center ${style.section.gapClassName} ${style.section.textContainerClassName}`} >
                        <TextRenderer config={{...style.heading, text: title}} as="h1" />
                        <h2 className={style.subheading.className}>
                            {subtitle}
                        </h2>
                    </div>
                </div>
                {style.section.backgroundImage && (
                    <div className="w-[250%] md:w-full absolute z-0 bottom-0 left-1/2 -translate-x-1/2" >
                        <Image
                            src={style.section.backgroundImage}
                            width={1000}
                            height={1000}
                            alt="Background decoration"
                            className="w-full h-auto [mask-image:linear-gradient(to_bottom,transparent_0%,black_30%,black_80%,transparent_100%,)] [-webkit-mask-image:linear-gradient(to_bottom,transparent_0%,black_30%,black_80%,transparent_100%)]"
                        />
                    </div>
                )}
            </section>
    );
};

PlayfulHero.displayName = 'PlayfulHero';

export default memo(PlayfulHero);