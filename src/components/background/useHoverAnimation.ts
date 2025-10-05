import { useState } from 'react'

interface HoverAnimationOptions {
    moveMultiplier?: number
    duration?: number
    delay?: number
    easing?: string
    mobileBreakpoint?: number
}

export const useHoverAnimation = (options: HoverAnimationOptions = {}) => {
    const {
        moveMultiplier = -0.08,
        duration = 0.4,
        delay = 250,
        easing = 'cubic-bezier(0.25, 0.1, 0.25, 1)',
        mobileBreakpoint = 768
    } = options

    const [, setAnimatingItems] = useState<Set<number>>(new Set())

    const handleMouseEnter = (index: number, e: React.MouseEvent<HTMLDivElement>) => {
        if (window.innerWidth <= mobileBreakpoint) return

        setAnimatingItems(prev => new Set(prev).add(index))

        const rect = e.currentTarget.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        const centerX = rect.width / 2
        const centerY = rect.height / 2
        const size = Math.max(rect.width, rect.height)

        const calculatedMoveX = (x - centerX) * moveMultiplier * (size / rect.width)
        const calculatedMoveY = (y - centerY) * moveMultiplier * (size / rect.height)

        const maxMove = window.innerWidth * 0.015
        const moveX = Math.sign(calculatedMoveX) * Math.min(Math.abs(calculatedMoveX), maxMove)
        const moveY = Math.sign(calculatedMoveY) * Math.min(Math.abs(calculatedMoveY), maxMove)

        const element = e.currentTarget as HTMLDivElement
        element.style.transform = `translate(${moveX}px, ${moveY}px)`
        element.style.transition = `transform ${duration}s ${easing}`

        setTimeout(() => {
            element.style.transform = 'translate(0px, 0px)'
            element.style.transition = `transform ${duration}s ${easing}`

            setTimeout(() => {
                setAnimatingItems(prev => {
                    const newSet = new Set(prev)
                    newSet.delete(index)
                    return newSet
                })
            }, duration * 1000)
        }, delay)
    }

    const handleMouseLeave = (index: number) => {
        setAnimatingItems(prev => {
            const newSet = new Set(prev)
            newSet.delete(index)
            return newSet
        })
    }

    return { handleMouseEnter, handleMouseLeave }
}