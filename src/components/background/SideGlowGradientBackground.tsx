'use client';

import React, { memo, useState, useEffect } from 'react';

export interface SideGlowGradientBackgroundProps {
    radialColor?: string;
    linearColor?: string;
    radialOpacity?: string;
    linearOpacity?: string;
    linearOpacityMobile?: string;
    className?: string;
    inset?: string;
    rounded?: string;
}

const SideGlowGradientBackground = ({ 
    radialColor = '#141414',
    linearColor = '#5A71E6',
    radialOpacity = '0%',
    linearOpacity = '70%',
    linearOpacityMobile,
    className = '',
    inset = 'inset-3 md:inset-8',
    rounded = 'rounded-xl'
}: SideGlowGradientBackgroundProps) => {
    const [isMobile, setIsMobile] = useState(false);
    
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        
        return () => window.removeEventListener('resize', checkMobile);
    }, []);
    
    const currentOpacity = isMobile && linearOpacityMobile ? linearOpacityMobile : linearOpacity;
    const gradient = `radial-gradient(circle at center, ${radialColor} ${radialOpacity}, transparent 100%), linear-gradient(to top, ${linearColor}, transparent ${currentOpacity})`;
    
    return (
        <div 
            className={`absolute ${inset} ${rounded} ${className}`}
            style={{ background: gradient }}
        />
    );
};

SideGlowGradientBackground.displayName = 'SideGlowGradientBackground';

export default memo(SideGlowGradientBackground);