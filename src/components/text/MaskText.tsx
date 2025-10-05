'use client';

import React, { memo } from 'react';

interface MaskTextProps {
  text: string;
  className?: string;
  backgroundSrc: string;
  ariaLabel?: string;
}

const MaskText = ({
  text,
  className = '',
  backgroundSrc,
  ariaLabel
}: MaskTextProps) => {
  return (
    <span
      className={`inline-block bg-cover bg-center text-transparent bg-clip-text leading-[120%] ${className}`}
      style={{
        backgroundImage: `url(${backgroundSrc})`,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent'
      }}
      aria-label={ariaLabel || text}
    >
      {text}
    </span>
  );
};

MaskText.displayName = 'MaskText';

export default memo(MaskText);