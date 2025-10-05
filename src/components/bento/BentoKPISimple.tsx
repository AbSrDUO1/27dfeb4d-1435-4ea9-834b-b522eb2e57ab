'use client'

import { memo, useMemo } from 'react'

export interface KPIItem {
  value: string
  description: string
}

interface BentoKPISimpleProps {
  items: KPIItem[]
  className?: string
  gridClassName?: string
  itemClassName?: string
  valueClassName?: string
  descriptionClassName?: string
  gradientColors?: {
    from: string
    to: string
  }
}

function BentoKPISimple({ 
  items, 
  className = '', 
  gridClassName = '', 
  itemClassName = '',
  valueClassName = '',
  descriptionClassName = '',
  gradientColors
}: BentoKPISimpleProps) {
  
  const rows = useMemo(() => {
    const count = items.length
    
    if (count === 0) {
      return []
    }
    
    if (count === 1) {
      return [{ items, cols: 1 }]
    }
    
    if (count === 2) {
      return [{ items, cols: 2 }]
    }
    
    if (count === 3) {
      return [{ items, cols: 3 }]
    }
    
    if (count === 4) {
      return [{ items, cols: 4 }]
    }
    
    if (count === 5) {
      return [
        { items: items.slice(0, 2), cols: 2 },
        { items: items.slice(2, 5), cols: 3 }
      ]
    }
    
    if (count === 6) {
      return [
        { items: items.slice(0, 3), cols: 3 },
        { items: items.slice(3, 6), cols: 3 }
      ]
    }
    
    if (count === 7) {
      return [
        { items: items.slice(0, 4), cols: 4 },
        { items: items.slice(4, 7), cols: 3 }
      ]
    }
    
    if (count === 8) {
      return [
        { items: items.slice(0, 4), cols: 4 },
        { items: items.slice(4, 8), cols: 4 }
      ]
    }
    
    if (count === 9) {
      return [
        { items: items.slice(0, 3), cols: 3 },
        { items: items.slice(3, 6), cols: 3 },
        { items: items.slice(6, 9), cols: 3 }
      ]
    }
    
    if (count === 10) {
      return [
        { items: items.slice(0, 5), cols: 5 },
        { items: items.slice(5, 10), cols: 5 }
      ]
    }
    
    const result = []
    let remaining = [...items]
    
    while (remaining.length > 0) {
      const take = Math.min(5, remaining.length)
      result.push({ items: remaining.slice(0, take), cols: take })
      remaining = remaining.slice(take)
    }
    
    return result
  }, [items])
  
  const getGridColumns = (cols: number): string => {
    switch(cols) {
      case 1: return 'grid-cols-1'
      case 2: return 'grid-cols-1 md:grid-cols-2'
      case 3: return 'grid-cols-1 md:grid-cols-3'
      case 4: return 'grid-cols-1 md:grid-cols-4'
      case 5: return 'grid-cols-1 md:grid-cols-5'
      default: return 'grid-cols-1'
    }
  }

  return (
    <section className={`w-full ${className}`}>
      <div className={`flex flex-col gap-6 ${gridClassName}`}>
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className={`grid ${getGridColumns(row.cols)} gap-6`}>
            {row.items.map((item, index) => (
              <div 
                key={`${rowIndex}-${index}`}
                className={`bg-white text-black shadow rounded p-6 flex flex-col justify-between gap-20 ${itemClassName}`}
              >
                <h1 className={`${valueClassName}`}
                  style={gradientColors ? { background: `linear-gradient(180deg, ${gradientColors.from}, ${gradientColors.to})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' } : {}}
                >
                  {item.value}
                </h1>
                <p className={`leading-[120%] ${descriptionClassName}`}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}

BentoKPISimple.displayName = 'BentoKPISimple'

export default memo(BentoKPISimple)