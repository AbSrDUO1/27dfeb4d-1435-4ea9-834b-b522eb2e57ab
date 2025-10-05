'use client'

import { memo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CanvasRevealEffect } from '@/components/background/CanvasRevealEffect'
import { LucideIcon } from 'lucide-react'
import { useMobileInView } from './useMobileInView'
import { MASK_GRADIENT } from './constants'

interface RevealItemProps {
  icon: LucideIcon
  text: string
  className?: string
}

const RevealItem = memo(function RevealItem({ icon: Icon, text, className = '' }: RevealItemProps) {
  const [hovered, setHovered] = useState(false)
  const { mobileInView, isMobile, itemRef } = useMobileInView()

  return (
    <div
      ref={itemRef}
      className={`group relative bg-white rounded shadow h-85 md:h-90 overflow-hidden cursor-pointer ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="absolute z-20 top-0 left-0 w-full h-full flex flex-col gap-2 md:gap-3 items-center justify-center" >
        <div className="h-20 aspect-square rounded bg-white shadow flex items-center justify-center" >
          <Icon className={`w-1/2 h-1/2 ${mobileInView ? 'text-blue' : 'text-black'} md:text-black md:group-hover:text-blue transition-colors duration-300`} strokeWidth={1} />
        </div>
        <div className={`${mobileInView ? 'h-[calc(var(--text-xl)*1.1)] opacity-100' : 'h-0 opacity-0'} md:h-0 md:opacity-0 md:group-hover:h-[calc(var(--text-xl)*1.1)] md:group-hover:opacity-100 transition-all duration-500 ease-in-out`} >
          <h2 className="text-base md:text-xl text-blue leading-[110%]" >{text}</h2>
        </div>
      </div>
      <div
        className={`absolute z-10 bottom-0 left-0 right-0 h-3/4 backdrop-blur-xs ${mobileInView ? 'opacity-100' : 'opacity-0'} md:opacity-0 transition-opacity duration-500 md:group-hover:opacity-100 md:group-focus-visible:opacity-100`}
        style={{ maskImage: MASK_GRADIENT }}
        aria-hidden="true"
      />
      <AnimatePresence>
        {(isMobile ? mobileInView : hovered) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="h-full w-full absolute inset-0 z-0"
          >
            <CanvasRevealEffect
              animationSpeed={5}
              containerClassName="bg-transparent"
              colors={[
                [59, 130, 246],
                [139, 92, 246],
              ]}
              opacities={[0.2, 0.2, 0.2, 0.2, 0.2, 0.4, 0.4, 0.4, 0.4, 1]}
              dotSize={2}
              showGradient={false}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
})

export default RevealItem