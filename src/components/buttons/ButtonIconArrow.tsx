'use client';

import { ArrowRight } from 'lucide-react';
import React from 'react';

interface ButtonIconArrowProps {
    text?: string;
    onClick?: () => void;
    className?: string;
    textClassName?: string;
    iconClassName?: string;
}

const ButtonIconArrow = ({
    text = 'Button',
    onClick,
    className = '',
    textClassName = '',
    iconClassName = ''
}: ButtonIconArrowProps) => {
    return (
        <button
            onClick={onClick}
            className={`group cursor-pointer h-9 bg-white shadow rounded px-4 text-sm flex items-center gap-3 ${className}`}
        >
            <span className={`inline-block md:transition-transform md:duration-[600ms] md:[transition-timing-function:cubic-bezier(.25,.8,.25,1)] md:group-hover:[transform:translateX(calc(var(--height-9)/4))] ${textClassName}`}>
                {text}
            </span>
            <div className={`h-5 w-[var(--height-5)] aspect-square rounded-sm flex items-center justify-center bg-black text-white md:transition-transform md:duration-[600ms] md:[transition-timing-function:cubic-bezier(.25,.8,.25,1)] md:group-hover:scale-[0.2] md:group-hover:rotate-90 ${iconClassName}`}>
                <ArrowRight className="h-1/2 w-1/2 md:transition-opacity md:duration-[600ms] md:[transition-timing-function:cubic-bezier(.25,.8,.25,1)] md:group-hover:opacity-0" />
            </div>
        </button>
    );
};

ButtonIconArrow.displayName = 'ButtonIconArrow';

export default React.memo(ButtonIconArrow);