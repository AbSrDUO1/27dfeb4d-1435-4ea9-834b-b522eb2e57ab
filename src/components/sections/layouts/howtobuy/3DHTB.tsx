
'use client';

import React, { memo } from 'react';
import BentoDepthThreeD from '@/components/bento/BentoDepthThreeD/BentoDepthThreeD';
import TextRenderer from '@/components/text/TextRenderer';
import dynamic from 'next/dynamic';
import { getFunAndTrendyHowToBuyStyle } from "../../styles/howtobuy/3DHTB/funAndTrendy";
import { getFuturisticHowToBuyStyle } from "../../styles/howtobuy/3DHTB/futuristicAndOutOfBox";
import { useSiteTheme, getThemeStyle } from "../../ThemeProvider";

const Spotlight = dynamic(() => import('@/components/background/Spotlight'), {
  ssr: false
});
import { HowToBuyStyle } from '@/components/sections/styles/howtobuy/types';

interface HowToBuy3DProps {
    title?: string;
    steps?: Array<{
        title: string;
        description: string;
        image: string;
        position: 'left' | 'center' | 'right';
        isCenter?: boolean;
    }>;
}

const HowToBuy3D = ({
    title = "HOW TO BUY",
    steps = [
        {
            position: 'left',
            image: '/sections/images/character1.webp',
            title: 'Step 1: Create Wallet',
            description: 'Download and set up MetaMask or your preferred crypto wallet to store.'
        },
        {
            position: 'center',
            image: '/sections/images/character2.webp',
            title: 'Step 2: Get ETH',
            description: 'Purchase Ethereum from an exchange and transfer it to your wallet address.',
            isCenter: true
        },
        {
            position: 'right',
            image: '/sections/images/character3.webp',
            title: 'Step 3: Swap for $PUDGY',
            description: 'Connect to Uniswap decentralized exchange and swap your ETH.'
        }
    ]
}: HowToBuy3DProps) => {
    const theme = useSiteTheme();
    const style: HowToBuyStyle = getThemeStyle(
        theme,
        {
            funAndTrendy: getFunAndTrendyHowToBuyStyle,
            futuristicAndOutOfBox: getFuturisticHowToBuyStyle
        }
    );
    return (
        <section className={`w-full relative overflow-hidden ${style.section.backgroundColor} ${style.section.className}`}>
            {style.section.backgroundPattern && (
                <div className={`absolute inset-0 opacity-20 ${style.section.backgroundPattern} bg-repeat`} />
            )}
            {style.section.spotlight && (
                <Spotlight {...style.section.spotlight} />
            )}
            <div className=" max-w-[var(--width-100)] px-[var(--width-10)] mx-auto relative z-10 flex flex-col gap-6 md:gap-12">
                <div className="flex items-center justify-center overflow-hidden" >
                    <TextRenderer config={{...style.title, text: title}} as="h2" />
                </div>
                <BentoDepthThreeD
                    items={steps.map(step => ({
                        position: step.position,
                        image: step.image,
                        titleEN: step.title,
                        descriptionEN: step.description,
                        isCenter: step.isCenter
                    }))}
                    enableAnimation={style.bento.enableAnimation}
                    className={style.bento.className}
                    gridClassName={style.bento.gridClassName}
                    itemClassName={style.bento.itemClassName}
                    imageContainerClassName={style.bento.imageContainerClassName}
                    imageClassName={style.bento.imageClassName}
                    textContainerClassName={style.bento.textContainerClassName}
                    titleClassName={style.bento.titleClassName}
                    descriptionClassName={style.bento.descriptionClassName}
                />
            </div>
        </section>
    );
};

HowToBuy3D.displayName = 'HowToBuy3D';

export default memo(HowToBuy3D);