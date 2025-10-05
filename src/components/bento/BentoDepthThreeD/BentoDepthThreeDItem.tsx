'use client'

import React, { forwardRef, useMemo } from 'react'
import Image from 'next/image'
import { BentoDepthThreeDItemProps, TRANSFORM_VALUES, CONTAINER_STYLES } from './constants'

const BentoDepthThreeDItem = forwardRef<HTMLDivElement, BentoDepthThreeDItemProps>(
    ({ 
        item, 
        className = '',
        imageContainerClassName = '',
        imageClassName = '',
        textContainerClassName = '',
        titleClassName = '',
        descriptionClassName = ''
    }, ref) => {
        const transformStyle = useMemo((): React.CSSProperties => {
            const styleMap: Record<string, React.CSSProperties> = {
                left: { transform: TRANSFORM_VALUES.left },
                right: { transform: TRANSFORM_VALUES.right },
                center: CONTAINER_STYLES
            }
            return styleMap[item.position] || {}
        }, [item.position])

        return (
            <div
                ref={ref}
                className={`relative w-full h-fit p-[calc(var(--width-10)/2)] md:p-[calc(var(--width-10)/4)] rounded bg-white shadow flex flex-col gap-6 ${className}`}
                style={transformStyle}
            >
                <div className={`w-full h-auto rounded ${imageContainerClassName}`} >
                    <Image
                        src={item.image}
                        height={1000}
                        width={1000}
                        alt={item.titleEN}
                        className={`w-full h-auto rounded ${imageClassName}`}
                    />
                </div>
                <div className={`flex flex-col gap-2 ${textContainerClassName}`}>
                    <h3 className={`text-2xl md:text-3xl leading-[110%] ${titleClassName}`}>{item.titleEN}</h3>
                    <p className={`text-sm leading-[120%] ${descriptionClassName}`}>{item.descriptionEN}</p>
                </div>
            </div>
        )
    }
)

BentoDepthThreeDItem.displayName = 'BentoDepthThreeDItem'

export default React.memo(BentoDepthThreeDItem)