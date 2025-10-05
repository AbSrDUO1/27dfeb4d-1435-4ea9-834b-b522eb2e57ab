import { useState, useCallback, useRef, useEffect, RefObject } from 'react';

interface CursorPosition {
  x: number;
  y: number;
}

interface MaskPosition {
  cx: string;
  cy: string;
}

interface UseCursorTrackingReturn {
  cursor: CursorPosition;
  maskPosition: MaskPosition;
  hovered: boolean;
  handleMouseEnter: () => void;
  handleMouseLeave: () => void;
  handleMouseMove: (e: React.MouseEvent<SVGSVGElement>) => void;
}

const useCursorTracking = (
  svgRef: RefObject<SVGSVGElement | null>,
  isDisabled: boolean = false
): UseCursorTrackingReturn => {
  const [cursor, setCursor] = useState<CursorPosition>({ x: 0, y: 0 });
  const [maskPosition, setMaskPosition] = useState<MaskPosition>({ cx: '50%', cy: '50%' });
  const [hovered, setHovered] = useState(false);
  const rafId = useRef<number | undefined>(undefined);

  const updateMaskPosition = useCallback((cursorPos: CursorPosition) => {
    if (!svgRef.current || isDisabled) return;

    const svgRect = svgRef.current.getBoundingClientRect();
    const cxPercentage = ((cursorPos.x - svgRect.left) / svgRect.width) * 100;
    const cyPercentage = ((cursorPos.y - svgRect.top) / svgRect.height) * 100;
    
    setMaskPosition({
      cx: `${cxPercentage}%`,
      cy: `${cyPercentage}%`,
    });
  }, [svgRef, isDisabled]);

  useEffect(() => {
    if (cursor.x !== 0 || cursor.y !== 0) {
      updateMaskPosition(cursor);
    }
  }, [cursor, updateMaskPosition]);

  const handleMouseEnter = useCallback(() => {
    if (!isDisabled) {
      setHovered(true);
    }
  }, [isDisabled]);

  const handleMouseLeave = useCallback(() => {
    if (!isDisabled) {
      setHovered(false);
    }
  }, [isDisabled]);

  const handleMouseMove = useCallback((e: React.MouseEvent<SVGSVGElement>) => {
    if (isDisabled) return;

    if (rafId.current) {
      cancelAnimationFrame(rafId.current);
    }

    rafId.current = requestAnimationFrame(() => {
      setCursor({ x: e.clientX, y: e.clientY });
    });
  }, [isDisabled]);

  useEffect(() => {
    return () => {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, []);

  return {
    cursor,
    maskPosition,
    hovered,
    handleMouseEnter,
    handleMouseLeave,
    handleMouseMove,
  };
};

export default useCursorTracking;