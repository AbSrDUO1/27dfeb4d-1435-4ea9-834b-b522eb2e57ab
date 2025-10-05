import { useState, useEffect, useCallback } from 'react';

interface UseResponsiveOptions {
  breakpoint?: number;
  debounceDelay?: number;
}

export const useResponsive = ({ 
  breakpoint = 768, 
  debounceDelay = 150 
}: UseResponsiveOptions = {}) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const checkViewport = useCallback(() => {
    setIsMobile(window.innerWidth < breakpoint);
    setIsLoaded(true);
  }, [breakpoint]);

  useEffect(() => {
    checkViewport();
    
    let timeoutId: NodeJS.Timeout;
    
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(checkViewport, debounceDelay);
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', handleResize);
    };
  }, [checkViewport, debounceDelay]);

  return { isMobile, isLoaded };
};