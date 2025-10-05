'use client';

import React, { memo } from 'react';

interface RetroTextProps {
    text: string;
    className?: string;
    shadowColor?: string;
    shadowOffset?: string;
    onClick?: () => void;
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
}

const RetroText = memo<RetroTextProps>(function RetroText({
    text,
    className = '',
    shadowColor = '#000000',
    shadowOffset = '0.025em',
    onClick,
    as: Component = 'h1'
}) {
    const textStyle: React.CSSProperties = {
        textShadow: `-${shadowOffset} ${shadowOffset} 0px ${shadowColor}, -${shadowOffset} ${shadowOffset} 0px ${shadowColor}`
    };

    return (
        <Component 
            className={`inline-block font-black tracking-wide select-none ${onClick ? 'cursor-pointer' : ''} ${className}`}
            style={textStyle}
            onClick={onClick}
        >
            {text}
        </Component>
    );
});

export default RetroText;