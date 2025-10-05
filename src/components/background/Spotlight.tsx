'use client';

import React, { memo, useEffect, useState } from 'react';

export interface SpotlightProps {
    className?: string;
    spotlightClassName?: string;
    width?: string;
    height?: string;
    left?: string;
    top?: string;
    rotate?: string;
    color?: string;
    blur?: string;
    opacity?: number;
    mobileWidth?: string;
    mobileHeight?: string;
    mobileLeft?: string;
    mobileTop?: string;
    mobileRotate?: string;
}

const Spotlight = ({
    className = '',
    spotlightClassName = '',
    width = '25%',
    height = '150%',
    left = '0%',
    top = '-30%',
    rotate = '-60deg',
    color = 'rgba(254, 254, 255, 0.16)',
    blur = '100px',
    opacity = 1,
    mobileWidth,
    mobileHeight,
    mobileLeft,
    mobileTop,
    mobileRotate
}: SpotlightProps) => {
    const [isMobile, setIsMobile] = useState(false);
    
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);
    
    const finalWidth = isMobile && mobileWidth ? mobileWidth : width;
    const finalHeight = isMobile && mobileHeight ? mobileHeight : height;
    const finalLeft = isMobile && mobileLeft ? mobileLeft : left;
    const finalTop = isMobile && mobileTop ? mobileTop : top;
    const finalRotate = isMobile && mobileRotate ? mobileRotate : rotate;
    
    return (
        <div 
            className={`absolute z-0 inset-0 [mask-image:linear-gradient(to_bottom,transparent_0%,black_20%,black_100%)] ${className}`}
        >
            <div 
                className={`absolute rounded-full ${spotlightClassName}`}
                style={{
                    width: finalWidth,
                    height: finalHeight,
                    backgroundColor: color,
                    filter: `blur(${blur})`,
                    opacity,
                    left: finalLeft,
                    marginTop: finalTop,
                    transform: `rotate(${finalRotate})`,
                    zIndex: 0
                }}
            />
        </div>
    );
};

Spotlight.displayName = 'Spotlight';

export default memo(Spotlight);