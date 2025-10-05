'use client'

import { memo, useMemo } from 'react'

export interface StepItem {
  title: string
  description: string
}

interface BentoStepSimpleProps {
  items: StepItem[]
  className?: string
  containerClassName?: string
  stepClassName?: string
  numberClassName?: string
  titleClassName?: string
  descriptionClassName?: string
}

function BentoStepSimple({
  items,
  className = '',
  containerClassName = '',
  stepClassName = '',
  numberClassName = '',
  titleClassName = '',
  descriptionClassName = ''
}: BentoStepSimpleProps) {

  const getGridColumns = (count: number): string => {
    switch(count) {
      case 1: return 'grid-cols-1'
      case 2: return 'grid-cols-1 md:grid-cols-2'
      case 3: return 'grid-cols-1 md:grid-cols-3'
      case 4: return 'grid-cols-1 md:grid-cols-2'
      case 5: return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
      case 6: return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
      default: return 'grid-cols-1 md:grid-cols-3'
    }
  }

  const rows = useMemo(() => {
    const count = items.length
    
    if (count <= 3) {
      return [{ items, cols: count }]
    }
    
    if (count === 4) {
      return [
        { items: items.slice(0, 2), cols: 2 },
        { items: items.slice(2, 4), cols: 2 }
      ]
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
    
    const result = []
    let remaining = [...items]
    
    while (remaining.length > 0) {
      const take = Math.min(3, remaining.length)
      result.push({ items: remaining.slice(0, take), cols: take })
      remaining = remaining.slice(take)
    }
    
    return result
  }, [items])

  let globalIndex = 0

  return (
    <section className={`w-full ${className}`}>
      <div className={`flex flex-col gap-[var(--width-20)] md:gap-[calc(var(--width-10)/2)] ${containerClassName}`}>
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className={`grid ${getGridColumns(row.cols)} gap-[var(--width-20)] md:gap-[calc(var(--width-10)/2)]`}>
            {row.items.map((item, index) => {
              const currentIndex = globalIndex++
              return (
                <div key={index} className={`flex flex-col gap-8 ${stepClassName}`}>
                  <div className="flex flex-col gap-6" >
                    <span className={`text-black ${numberClassName}`}>
                      {String(currentIndex + 1).padStart(2, '0')}
                    </span>
                    <div className="w-full h-px bg-black/10" />
                  </div>
                  <h3 className={`text-4xl ${titleClassName}`}>
                    {item.title}
                  </h3>
                  <p className={`text-lg leading-[1.4] ${descriptionClassName}`}>
                    {item.description}
                  </p>
                </div>
              )
            })}
          </div>
        ))}
      </div>
    </section>
  )
}

BentoStepSimple.displayName = 'BentoStepSimple'

export default memo(BentoStepSimple)