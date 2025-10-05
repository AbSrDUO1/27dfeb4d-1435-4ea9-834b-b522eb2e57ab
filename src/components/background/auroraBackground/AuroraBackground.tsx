'use client';

import React, { useEffect, useState } from 'react';
import './AuroraBackground.css';

interface AuroraBackgroundProps {
  className?: string;
}

const AuroraBackground = ({ className = '' }: AuroraBackgroundProps) => {
  const [isSafariOrIOS, setIsSafariOrIOS] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && navigator) {
      const userAgent = navigator.userAgent;
      const isSafari = /^((?!chrome|android).)*safari/i.test(userAgent);
      const isIOS = /iPad|iPhone|iPod/.test(userAgent) && !('MSStream' in window);
      setIsSafariOrIOS(isSafari || isIOS);
    }
  }, []);

  if (isSafariOrIOS) {
    return null;
  }

  return (
    <div className={`absolute z-0 top-0 right-0 w-full h-screen overflow-hidden ${className}`}>
      <div className="absolute top-0 left-0 z-10 w-full h-full backdrop-blur-sm"></div>
      <div className="aurora-background">
        <div className="aurora-background-inner" />
      </div>
    </div>
  );
};

AuroraBackground.displayName = 'AuroraBackground';

export default React.memo(AuroraBackground);