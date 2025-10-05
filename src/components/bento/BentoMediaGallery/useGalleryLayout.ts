import { useCallback } from 'react'
import { IMAGE_SIZE_LARGE, IMAGE_SIZE_SMALL } from './constants'

export const useGalleryLayout = () => {
  const getLayoutClasses = useCallback((itemCount: number, index: number): string => {
    if (itemCount === 1) {
      return 'col-span-full'
    }
    
    if (itemCount === 2) {
      return 'col-span-1 md:col-span-1'
    }
    
    if (itemCount === 3) {
      if (index === 0) return 'col-span-1 md:col-span-2'
      if (index === 1) return 'col-span-1 md:row-span-2'
      if (index === 2) return 'col-span-1 md:col-span-2'
      return 'col-span-1'
    }
    
    if (itemCount === 4) {
      if (index === 0) return 'col-span-1 md:col-span-2'
      if (index === 1) return 'col-span-1 md:row-span-2'
      return 'col-span-1'
    }
    
    if (itemCount === 5) {
      if (index === 0) return 'col-span-1 md:col-span-2'
      if (index === 1) return 'col-span-1 md:row-span-2'
      if (index === 4) return 'col-span-1 md:col-span-3'
      return 'col-span-1'
    }
    
    if (itemCount === 6) {
      if (index === 0) return 'col-span-1 md:col-span-4'
      if (index === 1) return 'col-span-1 md:row-span-2 md:col-span-2'
      if (index === 2) return 'col-span-1 md:col-span-2'
      if (index === 3) return 'col-span-1 md:col-span-2'
      if (index === 4) return 'col-span-1 md:col-span-3'
      if (index === 5) return 'col-span-1 md:col-span-3'
      return 'col-span-1'
    }
    
    if (itemCount === 7) {
      if (index === 0) return 'col-span-1 md:col-span-4'
      if (index === 1) return 'col-span-1 md:row-span-2 md:col-span-2'
      if (index === 2) return 'col-span-1 md:col-span-2'
      if (index === 3) return 'col-span-1 md:col-span-2'
      if (index === 4) return 'col-span-1 md:col-span-6'
      if (index === 5) return 'col-span-1 md:col-span-3'
      if (index === 6) return 'col-span-1 md:col-span-3'
      return 'col-span-1'
    }
    
    return 'col-span-1'
  }, [])

  const getGridContainerClasses = useCallback((itemCount: number): string => {
    if (itemCount === 1) {
      return 'grid grid-cols-1 grid-rows-1 gap-6 h-100 md:h-180'
    }
    if (itemCount === 2) {
      return 'grid grid-cols-1 md:grid-cols-2 grid-rows-2 md:grid-rows-1 gap-6 h-200 md:h-180'
    }
    if (itemCount === 3) {
      return 'grid grid-cols-1 md:grid-cols-3 grid-rows-3 md:grid-rows-2 gap-6 h-300 md:h-180'
    }
    if (itemCount === 4) {
      return 'grid grid-cols-1 md:grid-cols-3 grid-rows-4 md:grid-rows-2 gap-6 h-400 md:h-180'
    }
    if (itemCount === 5) {
      return 'grid grid-cols-1 md:grid-cols-3 grid-rows-5 md:grid-rows-3 gap-6 h-500 md:h-280'
    }
    if (itemCount === 6) {
      return 'grid grid-cols-1 md:grid-cols-6 grid-rows-6 md:grid-rows-3 gap-6 h-600 md:h-280'
    }
    if (itemCount === 7) {
      return 'grid grid-cols-1 md:grid-cols-6 grid-rows-7 md:grid-rows-4 gap-6 h-700 md:h-380'
    }
    
    if (itemCount >= 8) {
      const gridCols = itemCount > 10 ? 'md:grid-cols-6' : 'md:grid-cols-3'
      return `grid grid-cols-1 ${gridCols} gap-6`
    }
    
    return 'grid grid-cols-1 md:grid-cols-3 grid-rows-2 md:grid-rows-2 gap-6 h-200 md:h-180'
  }, [])
  
  const getGridStyles = useCallback((itemCount: number) => {
    if (itemCount < 8) return undefined
    
    const additionalRows = Math.ceil((itemCount - 4) / 2)
    const totalRows = 2 + additionalRows
    const heightValue = (80 + (totalRows * 100)) * 4
    const mobileHeight = itemCount * 100 * 4
    
    return {
      gridTemplateRows: `repeat(${itemCount}, minmax(0, 1fr))`,
      height: `${mobileHeight}px`,
      '@media (min-width: 768px)': {
        gridTemplateRows: `repeat(${totalRows}, minmax(0, 1fr))`,
        height: `${heightValue}px`
      }
    } as React.CSSProperties
  }, [])

  const getImageDimensions = useCallback((itemCount: number, index: number) => {
    const layoutClass = getLayoutClasses(itemCount, index)
    return {
      width: layoutClass.includes('col-span') ? IMAGE_SIZE_LARGE : IMAGE_SIZE_SMALL,
      height: layoutClass === 'row-span-2' || layoutClass === 'col-span-full' ? IMAGE_SIZE_LARGE : IMAGE_SIZE_SMALL
    }
  }, [getLayoutClasses])

  return {
    getLayoutClasses,
    getGridContainerClasses,
    getGridStyles,
    getImageDimensions
  }
}