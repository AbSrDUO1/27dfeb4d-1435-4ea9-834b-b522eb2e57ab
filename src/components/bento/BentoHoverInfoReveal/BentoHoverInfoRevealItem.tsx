'use client'

import React, { forwardRef, useState, useCallback } from 'react'
import Image from 'next/image'
import { Info } from 'lucide-react'
import { useHoverAnimation } from '@/components/background/useHoverAnimation'

interface InfoRevealItem {
    id: string
    title: string
    description: string
    imageSrc: string
}

interface BentoHoverInfoRevealItemProps {
    item: InfoRevealItem
    index: number
    isMobile?: boolean
    enableHoverAnimation?: boolean
    showImages?: boolean
    totalItems?: number
    className?: string
}

const MASK_GRADIENT = 'linear-gradient(to bottom, transparent, black 60%)'
const ANIMATION_DURATION = 600
const TRANSITION_DURATION = 500

const BentoHoverInfoRevealItem = React.memo(forwardRef<HTMLDivElement, BentoHoverInfoRevealItemProps>(({ item, index, isMobile = false, enableHoverAnimation = true, showImages = true, totalItems = 5, className = '' }, ref) => {
    const { handleMouseEnter } = useHoverAnimation()
    const [isActive, setIsActive] = useState(false)
    const isEnd = totalItems === 5 && index === 4
    const baseClassName = isMobile ? "relative overflow-hidden flex-[0_0_var(--width-70)] h-120 rounded group" : "info-reveal-bento-item relative overflow-hidden h-90 rounded group"
    const itemClassName = showImages ? baseClassName : `${baseClassName} bg-white shadow`

    const handleClick = useCallback(() => {
        if (isMobile) {
            setIsActive(prev => !prev)
        }
    }, [isMobile])

    return (
        <div
            ref={ref}
            className={`${itemClassName} ${isActive ? 'active' : ''} ${className}`}
            onMouseEnter={enableHoverAnimation && !isMobile ? (e) => handleMouseEnter(index, e) : undefined}
            onClick={handleClick}
            role="article"
            aria-label={`${item.title} - Solution ${item.id}`}
            tabIndex={0}
        >
            <div className="info-reveal-bento-item-box absolute z-10 flex items-center justify-center [perspective:1000px] [transform-style:preserve-3d]" style={{ top: 'calc((var(--vw-1_5) * 1.5))', left: 'calc((var(--vw-1_5) * 1.5))' }}>
                <div className={`info-reveal-bento-item-box-inner relative h-8 aspect-square rounded-full ${showImages ? 'bg-white' : 'bg-black'} transition-transform duration-[${ANIMATION_DURATION}ms] ease-[cubic-bezier(0.4,0,0.2,1)] [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] ${isActive ? '[transform:rotateY(180deg)]' : ''}`}>
                    <div className={`info-reveal-bento-item-box-front absolute w-full h-full rounded-full ${showImages ? 'bg-white' : 'bg-black'} flex items-center justify-center [backface-visibility:hidden]`}>
                        <p className={`info-reveal-description ${showImages ? 'text-black' : 'text-white'}`}>{item.id}</p>
                    </div>
                    <div className={`info-reveal-bento-item-box-back absolute w-full h-full rounded-full ${showImages ? 'bg-white' : 'bg-black'} flex items-center justify-center [backface-visibility:hidden] [transform:rotateY(180deg)]`}>
                        <Info className={`w-1/2 h-1/2 ${showImages ? 'text-black' : 'text-white'}`} />
                    </div>
                </div>
            </div>

            {showImages && (
                <>
                    <Image
                        src={item.imageSrc}
                        alt={item.title}
                        fill
                        className="relative z-0 object-cover rounded"
                        priority={index < 2}
                    />

                    <div
                        className="absolute z-10 bottom-0 left-0 right-0 h-30 backdrop-blur-xl opacity-100"
                        style={{ maskImage: MASK_GRADIENT }}
                        aria-hidden="true"
                    />
                </>
            )}

            <div
                className={`info-reveal-bento-content-wrapper absolute z-20 transition-all duration-[${TRANSITION_DURATION}ms] flex flex-col gap-2 group-hover:[transform:translateY(var(--hover-translate-y))] ${isActive ? '[transform:translateY(var(--hover-translate-y))]' : ''}`}
                style={{
                    top: 'var(--content-top-position)',
                    left: 'calc((var(--vw-1_5) * 1.5))',
                    width: isEnd ? 'calc(var(--width-30) - (var(--vw-1_5) * 4))' : 'calc(100% - (var(--vw-1_5) * 3))'
                }}
            >
                <div className="info-reveal-bento-title-row">
                    <h2 className={`info-reveal-title font-semibold leading-[110%] transition-colors ${showImages ? (isActive ? 'text-black' : 'text-white group-hover:text-black') : (isActive ? 'text-white' : 'text-black group-hover:text-white')}`}>{item.title}</h2>
                </div>
                <div className={`info-reveal-bento-description-wrapper transition-all duration-[${TRANSITION_DURATION}ms] ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                    <p className={`info-reveal-description leading-[120%] w-full ${showImages ? 'text-black' : 'text-white'}`}>{item.description}</p>
                </div>
            </div>

            <div
                className={`info-reveal-bento-white-background absolute left-0 bottom-0 ${showImages ? 'bg-white' : 'bg-black'} z-10 rounded transition-all duration-[${TRANSITION_DURATION}ms] ${isActive ? 'translate-y-0 left-[calc(var(--vw-1_5)*0.75)] bottom-[calc(var(--vw-1_5)*0.75)]' : 'translate-y-full group-hover:translate-y-0 group-hover:left-[calc(var(--vw-1_5)*0.75)] group-hover:bottom-[calc(var(--vw-1_5)*0.75)]'} ${isEnd ? '' : isActive ? 'right-[calc(var(--vw-1_5)*0.75)]' : 'right-0 group-hover:right-[calc(var(--vw-1_5)*0.75)]'}`}
                style={{
                    height: 'var(--white-bg-height)',
                    ...(isEnd ? {
                        right: 'auto',
                        width: 'calc(var(--width-30) - (var(--vw-1_5) * 2))'
                    } : {})
                }}
            ></div>
        </div>
    )
}))

BentoHoverInfoRevealItem.displayName = 'BentoHoverInfoRevealItem'

export default BentoHoverInfoRevealItem