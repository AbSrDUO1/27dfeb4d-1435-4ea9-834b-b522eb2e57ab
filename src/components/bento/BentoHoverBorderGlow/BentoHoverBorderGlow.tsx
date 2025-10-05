'use client'

import { memo, useMemo } from 'react'
import BentoHoverBorderGlowItem, { type BentoHoverBorderGlowItemData } from './BentoHoverBorderGlowItem'
import { ITEMS_PER_ROW } from './constants'

export type { BentoHoverBorderGlowItemData as BentoHoverBorderGlowItem }

interface BentoHoverBorderGlowProps {
  items: BentoHoverBorderGlowItemData[]
  className?: string
  rowClassName?: string
  itemClassName?: string
}

function BentoHoverBorderGlow({ items, className = '', rowClassName = '', itemClassName = '' }: BentoHoverBorderGlowProps) {
  const rows = useMemo(() => {
    const rowCount = Math.ceil(items.length / ITEMS_PER_ROW)
    return Array.from({ length: rowCount }).map((_, rowIndex) => {
      const startIdx = rowIndex * ITEMS_PER_ROW
      return items.slice(startIdx, startIdx + ITEMS_PER_ROW)
    })
  }, [items])

  return (
    <section className={`w-full px-[var(--width-10)] space-y-6 ${className}`}>
      {rows.map((rowItems, rowIndex) => (
        <div key={rowIndex} className={`grid grid-cols-1 md:grid-cols-3 gap-6 ${rowClassName}`}>
          {rowItems.map((item, itemIndex) => (
            <BentoHoverBorderGlowItem 
              key={`${rowIndex}-${itemIndex}`}
              item={item} 
              rowIndex={rowIndex} 
              itemIndex={itemIndex}
              className={itemClassName}
            />
          ))}
        </div>
      ))}
    </section>
  )
}

BentoHoverBorderGlow.displayName = 'BentoHoverBorderGlow'

export default memo(BentoHoverBorderGlow)