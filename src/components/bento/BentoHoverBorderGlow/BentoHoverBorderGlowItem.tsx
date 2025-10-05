'use client'

import { memo } from 'react'
import { LucideIcon } from 'lucide-react'
import { GlowingEffect } from '@/components/background/GlowingEffect'
import { GLOWING_EFFECT_PROPS } from './constants'

export interface BentoHoverBorderGlowItemData {
  icon: LucideIcon
  title: string
  description: string
}

interface BentoHoverBorderGlowItemProps {
  item: BentoHoverBorderGlowItemData
  rowIndex: number
  itemIndex: number
  className?: string
}

function BentoHoverBorderGlowItem({ item, rowIndex, itemIndex, className = '' }: BentoHoverBorderGlowItemProps) {
  const Icon = item.icon
  
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
      <GlowingEffect {...GLOWING_EFFECT_PROPS} />
    </article>
  )
}

BentoHoverBorderGlowItem.displayName = 'BentoHoverBorderGlowItem'

export default memo(BentoHoverBorderGlowItem)