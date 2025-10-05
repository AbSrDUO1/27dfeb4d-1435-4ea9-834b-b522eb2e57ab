'use client';

import React, { useCallback, useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

import { EmblaCarouselType } from 'embla-carousel';

export const usePrevNextButtons = (emblaApi: EmblaCarouselType | undefined) => {
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true)
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true)

  const onPrevButtonClick = useCallback(() => {
    if (!emblaApi) return
    emblaApi.scrollPrev()
  }, [emblaApi])

  const onNextButtonClick = useCallback(() => {
    if (!emblaApi) return
    emblaApi.scrollNext()
  }, [emblaApi])

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setPrevBtnDisabled(!emblaApi.canScrollPrev())
    setNextBtnDisabled(!emblaApi.canScrollNext())
  }, [])

  useEffect(() => {
    if (!emblaApi) return

    onSelect(emblaApi)
    emblaApi.on('reInit', onSelect).on('select', onSelect)
    
    return () => {
      emblaApi.off('reInit', onSelect).off('select', onSelect)
    }
  }, [emblaApi, onSelect])

  return {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  }
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  className?: string;
}

export const PrevButton = React.memo((props: ButtonProps) => {
  const { children, className, ...restProps } = props

  return (
    <button
      className={`relative white-button white-button-rounded h-8 aspect-square flex items-center justify-center text-white rounded-full cursor-pointer transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${className || ''}`}
      type="button"
      aria-label="Previous slide"
      {...restProps}
    >
      <ChevronLeft className="h-[35%] w-auto aspect-square" />
      {children}
    </button>
  )
})

PrevButton.displayName = 'PrevButton'

export const NextButton = React.memo((props: ButtonProps) => {
  const { children, className, ...restProps } = props

  return (
    <button
      className={`relative white-button white-button-rounded h-8 aspect-square flex items-center justify-center text-white rounded-full cursor-pointer transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${className || ''}`}
      type="button"
      aria-label="Next slide"
      {...restProps}
    >
      <ChevronRight className="h-[35%] w-auto aspect-square" />
      {children}
    </button>
  )
})

NextButton.displayName = 'NextButton'