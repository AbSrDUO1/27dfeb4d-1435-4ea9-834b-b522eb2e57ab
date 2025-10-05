import { useCallback, useEffect, useRef } from 'react'
import {
    BentoItem,
    ANIMATION_SPEED,
    ROTATION_SPEED,
    MOBILE_BREAKPOINT,
    MOUSE_MULTIPLIER,
    ROTATION_MULTIPLIER,
    TRANSFORM_VALUES
} from './constants'

export const useThreeDAnimation = (items: BentoItem[], enableAnimation: boolean = true) => {
    const sectionRef = useRef<HTMLDivElement>(null)
    const floatingBoxRef1 = useRef<HTMLDivElement>(null)
    const itemRefs = useRef<(HTMLDivElement | null)[]>([])

    const getBaseTransform = useCallback((position: 'left' | 'center' | 'right'): string => {
        return TRANSFORM_VALUES[position]
    }, [])

    const setItemRef = useCallback((el: HTMLDivElement | null, index: number): void => {
        itemRefs.current[index] = el
        if (index === 1) floatingBoxRef1.current = el
    }, [])

    useEffect(() => {
        if (!enableAnimation) {
            return
        }
        
        let animationFrameId: number
        let isAnimating = false

        const resetTransforms = () => {
            itemRefs.current.forEach((ref) => {
                if (ref) {
                    ref.style.transform = ''
                }
            })
        }

        const handleResize = () => {
            const isMobile = window.innerWidth <= MOBILE_BREAKPOINT
            if (isMobile && isAnimating) {
                if (animationFrameId) {
                    cancelAnimationFrame(animationFrameId)
                }
                isAnimating = false
                resetTransforms()
            } else if (!isMobile && !isAnimating) {
                setupAnimation()
            }
        }

        const setupAnimation = () => {
            const isMobile = window.innerWidth <= MOBILE_BREAKPOINT

            if (!isMobile && enableAnimation) {
                isAnimating = true
                let mouseX = 0
                let mouseY = 0
                let isMouseInSection = false

                let box1X = 0
                let box1Y = 0
                let box1RotationX = 0
                let box1RotationY = 0

                const handleMouseMove = (event: MouseEvent): void => {
                    if (sectionRef.current) {
                        const rect = sectionRef.current.getBoundingClientRect()
                        isMouseInSection = (
                            event.clientX >= rect.left &&
                            event.clientX <= rect.right &&
                            event.clientY >= rect.top &&
                            event.clientY <= rect.bottom
                        )
                    }

                    if (isMouseInSection) {
                        mouseX = (event.clientX / window.innerWidth) * 100 - 50
                        mouseY = (event.clientY / window.innerHeight) * 100 - 50
                    }
                }

                const animate = (): void => {
                    if (!isAnimating) return

                    if (isMouseInSection) {
                        const distX1 = (mouseX * MOUSE_MULTIPLIER) - box1X
                        const distY1 = (mouseY * MOUSE_MULTIPLIER) - box1Y
                        box1X += distX1 * ANIMATION_SPEED
                        box1Y += distY1 * ANIMATION_SPEED

                        const distRotX1 = (-mouseY * ROTATION_MULTIPLIER) - box1RotationX
                        const distRotY1 = (mouseX * ROTATION_MULTIPLIER) - box1RotationY
                        box1RotationX += distRotX1 * ROTATION_SPEED
                        box1RotationY += distRotY1 * ROTATION_SPEED
                    } else {
                        box1X += -box1X * ANIMATION_SPEED
                        box1Y += -box1Y * ANIMATION_SPEED
                        box1RotationX += -box1RotationX * ROTATION_SPEED
                        box1RotationY += -box1RotationY * ROTATION_SPEED
                    }

                    if (floatingBoxRef1.current) {
                        floatingBoxRef1.current.style.transform = `translate(${box1X}px, ${box1Y}px) rotateX(${box1RotationX}deg) rotateY(${box1RotationY}deg)`
                    }

                    itemRefs.current.forEach((ref, index) => {
                        if (!ref || index === 1) return
                        const item = items[index]
                        const baseTransform = getBaseTransform(item.position)
                        if (baseTransform) {
                            ref.style.transform = `${baseTransform} translate(${box1X}px, ${box1Y}px) rotateX(${box1RotationX}deg) rotateY(${box1RotationY}deg)`
                        }
                    })

                    animationFrameId = requestAnimationFrame(animate)
                }

                animate()
                window.addEventListener('mousemove', handleMouseMove)

                return () => {
                    window.removeEventListener('mousemove', handleMouseMove)
                }
            } else {
                resetTransforms()
            }
        }

        setupAnimation()
        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId)
            }
            isAnimating = false
        }
    }, [items, getBaseTransform, enableAnimation])

    return {
        sectionRef,
        setItemRef
    }
}