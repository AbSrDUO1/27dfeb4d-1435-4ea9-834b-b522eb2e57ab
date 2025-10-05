'use client'

import { memo, useMemo } from 'react'
import { BorderFillBackground } from '@/components/background/BorderFillBackground'
import { LucideIcon } from 'lucide-react'

export interface BorderFillItem {
  icon: LucideIcon
  title: string
  description: string
}

interface BorderFillItemProps {
  item: BorderFillItem
  rowIndex: number
  itemIndex: number
  className?: string
}

const BorderFillItem = memo(function BorderFillItem({ item, rowIndex, itemIndex, className = '' }: BorderFillItemProps) {
  const Icon = item.icon
  
  const scrollTriggerOptions = useMemo(() => ({
    start: "top center",
    end: "bottom center",
    scrub: 1,
  }), [])
  
  return (
    <article 
      key={`${rowIndex}-${itemIndex}`} 
      className={`relative bg-white rounded shadow h-80 ${className}`}
      aria-label={item.title}
    >
      <div className="w-full h-full p-[calc(var(--width-10)/2)] md:p-[calc(var(--width-10)/4)] flex flex-col justify-between">
        <div className="h-15 w-[3.75rem] aspect-square rounded bg-white shadow flex items-center justify-center">
          <Icon className="w-[35%] aspect-square" strokeWidth={1} aria-hidden="true" />
        </div>
        <div className="flex flex-col gap-2 text-black">
          <h2 className="text-2xl md:text-3xl leading-[110%]">{item.title}</h2>
          <p className="text-sm leading-[120%]">{item.description}</p>
        </div>
      </div>
      <BorderFillBackground
        scrollTriggerOptions={scrollTriggerOptions}
      />
    </article>
  )
})

BorderFillItem.displayName = 'BorderFillItem'

export default BorderFillItem