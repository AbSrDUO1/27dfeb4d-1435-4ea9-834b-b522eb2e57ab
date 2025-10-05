'use client'

import { memo, useMemo } from 'react'
import { LucideIcon } from 'lucide-react'
import RevealItem from './BentoContentRevealItem'

export interface BentoContentRevealItem {
  icon: LucideIcon
  text: string
}

interface BentoContentRevealProps {
  items: BentoContentRevealItem[]
  className?: string
  rowClassName?: string
  itemClassName?: string
}

function BentoContentReveal({ items, className = '', rowClassName = '', itemClassName = '' }: BentoContentRevealProps) {
  const rows = useMemo(() => {
    if (!items || items.length === 0) return []

    const result: BentoContentRevealItem[][] = []
    let currentIndex = 0

    while (currentIndex < items.length) {
      const remaining = items.length - currentIndex
      let rowSize
      
      if (remaining <= 3) {
        rowSize = remaining
      } else if (remaining === 4) {
        rowSize = 2
      } else {
        rowSize = 3
      }
      
      result.push(items.slice(currentIndex, currentIndex + rowSize))
      currentIndex += rowSize
    }

    return result
  }, [items])

  if (rows.length === 0) return null

  return (
    <div className={`w-full px-[var(--width-10)] ${className}`}>
      {rows.map((row, rowIndex) => (
        <div 
          key={rowIndex} 
          className={`grid grid-cols-1 ${row.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3'} gap-6 ${rowIndex > 0 ? 'mt-6' : ''} ${rowClassName}`}
        >
          {row.map((item, itemIndex) => (
            <RevealItem 
              key={`${rowIndex}-${itemIndex}`} 
              icon={item.icon} 
              text={item.text}
              className={itemClassName}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

export default memo(BentoContentReveal)