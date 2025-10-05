'use client'

import React from 'react'
import { BentoDepthThreeDProps, CONTAINER_STYLES } from './constants'
import { useThreeDAnimation } from './useThreeDAnimation'
import BentoDepthThreeDItem from './BentoDepthThreeDItem'

const BentoDepthThreeD: React.FC<BentoDepthThreeDProps> = ({ 
    items, 
    enableAnimation = true, 
    className = '', 
    gridClassName = '', 
    itemClassName = '',
    imageContainerClassName = '',
    imageClassName = '',
    textContainerClassName = '',
    titleClassName = '',
    descriptionClassName = ''
}) => {
    const { sectionRef, setItemRef } = useThreeDAnimation(items, enableAnimation)

    return (
        <div className={`w-full ${className}`} ref={sectionRef}>
            <div
                className={`w-full grid grid-cols-1 md:grid-cols-3 gap-6 ${gridClassName}`}
                style={CONTAINER_STYLES}
            >
                {items.map((item, index) => (
                    <BentoDepthThreeDItem
                        key={index}
                        ref={(el) => setItemRef(el, index)}
                        item={item}
                        index={index}
                        className={itemClassName}
                        imageContainerClassName={imageContainerClassName}
                        imageClassName={imageClassName}
                        textContainerClassName={textContainerClassName}
                        titleClassName={titleClassName}
                        descriptionClassName={descriptionClassName}
                    />
                ))}
            </div>
        </div>
    )
}

BentoDepthThreeD.displayName = 'BentoDepthThreeD'

export default React.memo(BentoDepthThreeD)