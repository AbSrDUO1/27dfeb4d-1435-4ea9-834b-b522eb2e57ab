import { useState, useEffect, useRef, useCallback } from 'react'
import { 
  CARD_TOP_THRESHOLD, 
  CARD_BOTTOM_THRESHOLD, 
  SCROLL_THROTTLE_MS, 
  RESIZE_DEBOUNCE_MS,
  MOBILE_BREAKPOINT 
} from './constants'

export function useMobileInView() {
  const [mobileInView, setMobileInView] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const itemRef = useRef<HTMLDivElement>(null)
  const mediaQueryRef = useRef<MediaQueryList | null>(null)
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const resizeTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const lastScrollTime = useRef<number>(0)

  const checkIfMobileAndInView = useCallback(() => {
    if (!mediaQueryRef.current) {
      mediaQueryRef.current = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`)
    }
    
    const isMobileDevice = mediaQueryRef.current.matches
    setIsMobile(isMobileDevice)
    
    if (!isMobileDevice || !itemRef.current) {
      setMobileInView(false)
      return
    }

    const rect = itemRef.current.getBoundingClientRect()
    const viewportCenter = window.innerHeight / 2
    const cardTop = rect.top
    const cardTopThreshold = cardTop + (rect.height * CARD_TOP_THRESHOLD)
    const cardBottomThreshold = cardTop + (rect.height * CARD_BOTTOM_THRESHOLD)
    
    const isInTargetZone = viewportCenter >= cardTopThreshold && viewportCenter <= cardBottomThreshold
    setMobileInView(isInTargetZone)
  }, [])

  const throttledScrollHandler = useCallback(() => {
    const now = Date.now()
    if (now - lastScrollTime.current >= SCROLL_THROTTLE_MS) {
      lastScrollTime.current = now
      checkIfMobileAndInView()
    } else {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
      scrollTimeoutRef.current = setTimeout(() => {
        checkIfMobileAndInView()
      }, SCROLL_THROTTLE_MS)
    }
  }, [checkIfMobileAndInView])

  const debouncedResizeHandler = useCallback(() => {
    if (resizeTimeoutRef.current) {
      clearTimeout(resizeTimeoutRef.current)
    }
    resizeTimeoutRef.current = setTimeout(checkIfMobileAndInView, RESIZE_DEBOUNCE_MS)
  }, [checkIfMobileAndInView])

  useEffect(() => {
    checkIfMobileAndInView()
    window.addEventListener('scroll', throttledScrollHandler)
    window.addEventListener('resize', debouncedResizeHandler)
    
    return () => {
      window.removeEventListener('scroll', throttledScrollHandler)
      window.removeEventListener('resize', debouncedResizeHandler)
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current)
      }
    }
  }, [throttledScrollHandler, debouncedResizeHandler, checkIfMobileAndInView])

  return { mobileInView, isMobile, itemRef }
}