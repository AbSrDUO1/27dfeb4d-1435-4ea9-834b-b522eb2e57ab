'use client'

import React, { useEffect, useRef, useState, useMemo, memo } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const SVG_SIZE = 100
const SVG_HALF_SIZE = 50
const DEFAULT_RX_PERCENTAGE = 9
const DEFAULT_RY_PERCENTAGE = 6.5
const ANIMATION_DURATION = 1

interface BorderFillBackgroundProps {
    rx?: number
    ry?: number
    strokeColor?: string
    baseStrokeColor?: string
    fillColor?: string
    strokeWidth?: number
    scrollTriggerOptions?: {
        start?: string
        end?: string
        scrub?: number | boolean
    }
    children?: React.ReactNode
}

export const BorderFillBackground = memo(({
    rx,
    ry,
    strokeColor = "currentColor",
    baseStrokeColor = "#F7F7F7",
    fillColor = "rgba(90, 113, 230, 0.5)",
    strokeWidth = 2,
    scrollTriggerOptions = {
        start: "top center",
        end: "bottom center",
        scrub: 1
    },
    children
}: BorderFillBackgroundProps) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const [computedRx, setComputedRx] = useState(DEFAULT_RX_PERCENTAGE)
    const [computedRy, setComputedRy] = useState(DEFAULT_RY_PERCENTAGE)

    const convertToPercentage = useMemo(() => (
        value: number,
        unit: string,
        parentDimension: number
    ): number => {
        switch (unit) {
            case 'rem': {
                const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize)
                return ((value * rootFontSize) / parentDimension) * 100
            }
            case '%':
                return value
            case 'px':
            default:
                return (value / parentDimension) * 100
        }
    }, [])

    useEffect(() => {
        const container = containerRef.current
        if (!container) return

        if (rx === undefined || ry === undefined) {
            const parent = container.parentElement
            if (parent) {
                const computedStyle = window.getComputedStyle(parent)
                const borderRadius = computedStyle.borderRadius
                
                if (borderRadius && borderRadius !== '0px') {
                    const parentWidth = parent.offsetWidth
                    const parentHeight = parent.offsetHeight
                    
                    const match = borderRadius.match(/^(\d+(?:\.\d+)?)(px|%|rem)?/)
                    if (match) {
                        const radiusValue = parseFloat(match[1])
                        const unit = match[2] || 'px'
                        
                        if (rx === undefined) {
                            setComputedRx(convertToPercentage(radiusValue, unit, parentWidth))
                        }
                        if (ry === undefined) {
                            setComputedRy(convertToPercentage(radiusValue, unit, parentHeight))
                        }
                    }
                }
            }
        }

        if (rx !== undefined) setComputedRx(rx)
        if (ry !== undefined) setComputedRy(ry)

    }, [rx, ry, convertToPercentage])

    useEffect(() => {
        const container = containerRef.current
        if (!container) return

        const leftPath = container.querySelector<SVGPathElement>(".left-path")
        const rightPath = container.querySelector<SVGPathElement>(".right-path")
        const svgElement = container.querySelector<SVGElement>("svg")

        if (!leftPath || !rightPath || !svgElement) return
        
        const svgRect = svgElement.getBoundingClientRect()
        const halfPerimeter = svgRect.width + svgRect.height

        gsap.set([leftPath, rightPath], {
            strokeDasharray: `0, ${halfPerimeter}`,
            strokeDashoffset: 0
        })

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: container,
                ...scrollTriggerOptions
            }
        })

        tl.to([leftPath, rightPath], {
            strokeDasharray: `${halfPerimeter}, 0`,
            strokeDashoffset: 0,
            duration: ANIMATION_DURATION,
            ease: "none"
        })

        return () => {
            tl.kill()
            ScrollTrigger.getAll().forEach(trigger => {
                if (trigger.vars.trigger === container) {
                    trigger.kill()
                }
            })
        }
    }, [scrollTriggerOptions, computedRx, computedRy])

    const rxValue = useMemo(() => (computedRx / 100) * SVG_SIZE, [computedRx])
    const ryValue = useMemo(() => (computedRy / 100) * SVG_SIZE, [computedRy])

    const leftPathData = useMemo(() => 
        `M ${SVG_HALF_SIZE} 0
         H ${rxValue}
         Q 0 0, 0 ${ryValue}
         V ${SVG_SIZE - ryValue}
         Q 0 ${SVG_SIZE}, ${rxValue} ${SVG_SIZE}
         H ${SVG_HALF_SIZE}`,
    [rxValue, ryValue])

    const rightPathData = useMemo(() => 
        `M ${SVG_HALF_SIZE} 0
         H ${SVG_SIZE - rxValue}
         Q ${SVG_SIZE} 0, ${SVG_SIZE} ${ryValue}
         V ${SVG_SIZE - ryValue}
         Q ${SVG_SIZE} ${SVG_SIZE}, ${SVG_SIZE - rxValue} ${SVG_SIZE}
         H ${SVG_HALF_SIZE}`,
    [rxValue, ryValue])

    const pathProps = useMemo(() => ({
        strokeWidth,
        strokeLinejoin: "round" as const,
        vectorEffect: "non-scaling-stroke" as const,
        fill: "none"
    }), [strokeWidth])

    return (
        <div className="absolute inset-0 pointer-events-none" ref={containerRef}>
            <svg
                width={SVG_SIZE}
                height={SVG_SIZE}
                viewBox={`0 0 ${SVG_SIZE} ${SVG_SIZE}`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                preserveAspectRatio="none"
                className="overflow-visible w-full h-full"
                style={{ color: fillColor }}
            >
                <path
                    d={leftPathData}
                    stroke={baseStrokeColor}
                    {...pathProps}
                />

                <path
                    d={rightPathData}
                    stroke={baseStrokeColor}
                    {...pathProps}
                />

                <path
                    className="left-path"
                    d={leftPathData}
                    stroke={strokeColor}
                    {...pathProps}
                />

                <path
                    className="right-path"
                    d={rightPathData}
                    stroke={strokeColor}
                    {...pathProps}
                />
            </svg>
            {children}
        </div>
    )
})

BorderFillBackground.displayName = 'BorderFillBackground'