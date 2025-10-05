export interface BentoItem {
    position: 'left' | 'center' | 'right'
    image: string
    titleEN: string
    descriptionEN: string
    isCenter?: boolean
}

export interface BentoDepthThreeDItemProps {
    item: BentoItem
    index: number
    className?: string
    imageContainerClassName?: string
    imageClassName?: string
    textContainerClassName?: string
    titleClassName?: string
    descriptionClassName?: string
}

export interface BentoDepthThreeDProps {
    items: BentoItem[]
    enableAnimation?: boolean
    className?: string
    gridClassName?: string
    itemClassName?: string
    imageContainerClassName?: string
    imageClassName?: string
    textContainerClassName?: string
    titleClassName?: string
    descriptionClassName?: string
}

export const ANIMATION_SPEED = 0.05
export const ROTATION_SPEED = 0.1
export const MOBILE_BREAKPOINT = 768
export const MOUSE_MULTIPLIER = 0.5
export const ROTATION_MULTIPLIER = 0.25

export const TRANSFORM_VALUES = {
    left: 'translateZ(calc(var(--width-15)/2 * -1)) translateX(calc(var(--width-10)/3 * -1)) rotateY(41deg)',
    right: 'translateZ(calc(var(--width-15)/2 * -1)) translateX(calc(var(--width-10)/3 * 1)) rotateY(-41deg)',
    center: ''
} as const

export const CONTAINER_STYLES = {
    perspective: '1200px',
    transformStyle: 'preserve-3d' as const
}