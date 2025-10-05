import { useState, useEffect, useCallback } from 'react';

interface UseResponsiveReturn {
  isMobile: boolean;
  prefersReducedMotion: boolean;
}

const useResponsive = (breakpoint: number = 768): UseResponsiveReturn => {
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const checkResponsive = useCallback(() => {
    setIsMobile(window.innerWidth < breakpoint);
  }, [breakpoint]);

  const checkMotionPreference = useCallback(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
  }, []);

  useEffect(() => {
    checkResponsive();
    checkMotionPreference();

    let timeoutId: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(checkResponsive, 150);
    };

    const motionMediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleMotionChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    window.addEventListener('resize', handleResize);
    motionMediaQuery.addEventListener('change', handleMotionChange);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', handleResize);
      motionMediaQuery.removeEventListener('change', handleMotionChange);
    };
  }, [checkResponsive, checkMotionPreference]);

  return { isMobile, prefersReducedMotion };
};

export default useResponsive;