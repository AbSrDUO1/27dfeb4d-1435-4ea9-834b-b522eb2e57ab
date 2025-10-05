'use client'

import { memo, useMemo } from 'react'
import { Check, LucideIcon } from 'lucide-react'

export interface PricingItem {
  badge?: string
  badgeIcon?: LucideIcon
  price: string
  subtitle?: string
  features?: string[]
}

interface BentoPricingTableProps {
  items: PricingItem[]
  className?: string
  gridClassName?: string
  itemClassName?: string
  badgeClassName?: string
  priceClassName?: string
  subtitleClassName?: string
  featuresClassName?: string
  featureItemClassName?: string
}

function BentoPricingTable({
  items,
  className = '',
  gridClassName = '',
  itemClassName = '',
  badgeClassName = '',
  priceClassName = '',
  subtitleClassName = '',
  featuresClassName = '',
  featureItemClassName = ''
}: BentoPricingTableProps) {

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
    switch (cols) {
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
                className={`bg-white text-black shadow rounded-lg p-8 flex flex-col gap-6 md:gap-8 ${itemClassName}`}
              >
                {item.badge && (
                  <div className={`inline-flex items-center gap-2 px-4 py-2 w-fit bg-grey/30 shadow rounded-sm ${badgeClassName}`}>
                    {item.badgeIcon && <item.badgeIcon className="h-[var(--text-sm)] w-auto" />}
                    <span className="text-sm font-medium">{item.badge}</span>
                  </div>
                )}

                <div className="flex flex-col gap-1">
                  <div className={`text-5xl font-semibold ${priceClassName}`}>
                    {item.price}
                  </div>

                  {item.subtitle && (
                    <p className={`text-base ${subtitleClassName}`}>
                      {item.subtitle}
                    </p>
                  )}
                </div>

                <div className="w-full h-px bg-black/10" />

                {item.features && item.features.length > 0 && (
                  <div className={`flex flex-col gap-3 mt-1 ${featuresClassName}`}>
                    {item.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className={`flex items-start gap-3 ${featureItemClassName}`}>
                        <div className="h-6 aspect-square bg-grey/30 shadow rounded-sm flex items-center justify-center" >
                          <Check className="h-[40%]" />
                        </div>
                        <span className="text-base">{feature}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}

BentoPricingTable.displayName = 'BentoPricingTable'

export default memo(BentoPricingTable)