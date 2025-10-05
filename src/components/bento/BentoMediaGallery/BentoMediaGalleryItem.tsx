'use client'

import { memo } from 'react'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { MASK_GRADIENT } from './constants'

export interface BentoMediaGalleryItemData {
  title: string
  image: string
}

interface BentoMediaGalleryItemProps {
  item: BentoMediaGalleryItemData
  layoutClass: string
  dimensions: {
    width: number
    height: number
  }
  priority: boolean
}

function BentoMediaGallery({ item, layoutClass, dimensions, priority }: BentoMediaGalleryItemProps) {
  return (
    <article
      className={`${layoutClass} relative overflow-hidden rounded group focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2`}
      aria-label={item.title}
      tabIndex={0}
    >
      <div className="absolute bottom-6 left-6 right-6 flex justify-between items-center text-white z-20 opacity-100 md:opacity-0 transition-opacity duration-500 md:group-hover:opacity-100 md:group-focus-visible:opacity-100">
        <h1 className="text-sm">{item.title}</h1>
        <ArrowUpRight className="h-[var(--text-sm)] w-auto" aria-hidden="true" />
      </div>
      <div 
        className="absolute z-10 bottom-0 left-0 right-0 h-30 backdrop-blur-xl opacity-100 md:opacity-0 transition-opacity duration-500 md:group-hover:opacity-100 md:group-focus-visible:opacity-100" 
        style={{ maskImage: MASK_GRADIENT }}
        aria-hidden="true"
      />
      <Image
        src={item.image}
        className="w-full h-full object-cover transition-transform duration-500 md:group-hover:scale-105 md:group-focus-visible:scale-105"
        width={dimensions.width}
        height={dimensions.height}
        alt={item.title}
        priority={priority}
      />
    </article>
  )
}

export default memo(BentoMediaGallery)