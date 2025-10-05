import { useEffect, useRef, useState, useCallback } from 'react';

interface UseCarouselAutoPlayProps {
  totalSlides: number;
  autoplayDelay?: number;
}

interface UseCarouselAutoPlayReturn {
  currentSlide: number;
  progressRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
  goToSlide: (index: number) => void;
}

export const useCarouselAutoPlay = ({ 
  totalSlides, 
  autoplayDelay = 3000 
}: UseCarouselAutoPlayProps): UseCarouselAutoPlayReturn => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const progressRefs = useRef<(HTMLDivElement | null)[]>([]);
  const animationFrameRef = useRef<number | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const resetAllProgressBars = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    
    progressRefs.current.forEach(bar => {
      if (bar) {
        bar.style.transform = 'translateX(-100%)';
      }
    });
  }, []);

  const animateProgress = useCallback((index: number) => {
    resetAllProgressBars();
    
    if (!progressRefs.current[index]) return;
    
    let startTime: number | null = null;
    
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / autoplayDelay, 1);
      
      const translateValue = -100 + (progress * 100);
      if (progressRefs.current[index]) {
        progressRefs.current[index]!.style.transform = `translateX(${translateValue}%)`;
      }
      
      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate);
      }
    };
    
    animationFrameRef.current = requestAnimationFrame(animate);
  }, [autoplayDelay, resetAllProgressBars]);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);

  useEffect(() => {
    animateProgress(currentSlide);
    
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    intervalRef.current = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % totalSlides);
    }, autoplayDelay);
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [currentSlide, totalSlides, autoplayDelay, animateProgress]);

  return {
    currentSlide,
    progressRefs,
    goToSlide
  };
};