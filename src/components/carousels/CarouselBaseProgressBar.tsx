"use client";

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { EmblaCarouselType } from "embla-carousel";
import {
  PrevButton,
  NextButton,
  usePrevNextButtons,
} from "./EmblaCarouselArrowButtons";

interface CarouselBaseProgressBarProps {
  children?: React.ReactNode;
}

const CarouselBaseProgressBarComponent: React.FC<
  CarouselBaseProgressBarProps
> = ({ children }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ dragFree: true });
  const [scrollProgress, setScrollProgress] = useState(0);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  const onScroll = useCallback((emblaApi: EmblaCarouselType) => {
    const progress = Math.max(0, Math.min(1, emblaApi.scrollProgress()));
    setScrollProgress(progress * 100);
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onScroll(emblaApi);
    emblaApi
      .on("reInit", onScroll)
      .on("scroll", onScroll)
      .on("slideFocus", onScroll);

    return () => {
      emblaApi
        .off("reInit", onScroll)
        .off("scroll", onScroll)
        .off("slideFocus", onScroll);
    };
  }, [emblaApi, onScroll]);

  const items = Array.from({ length: 8 }, (_, i) => i + 1);

  return (
    <section className="relative z-10 h-fit p-0" aria-label="Progress carousel">
      <div className="w-full flex flex-col items-center">
        <div className="w-full flex flex-col gap-5">
          <div
            className="overflow-hidden w-full relative z-10 flex cursor-grab"
            ref={emblaRef}
          >
            <div className="flex gap-4 w-full">
              <div className="flex-none w-[calc(var(--width-10)-var(--vw-1))] min-w-0" />

              {children
                ? children
                : items.map((item) => (
                    <div
                      key={item}
                      className="flex-none w-70 lg:w-25 relative h-110 overflow-hidden rounded card"
                    >
                      <div className="flex items-center justify-center h-full">
                        <span className="text-4xl">{item}</span>
                      </div>
                    </div>
                  ))}

              <div className="flex-none w-10 min-w-0" />
            </div>
          </div>

          <div className="flex justify-between items-center w-full px-[var(--width-10)]">
            <div
              className="rounded-full bg-white relative h-1 w-40 overflow-hidden"
              role="progressbar"
              aria-label="Carousel progress"
              aria-valuenow={Math.round(scrollProgress)}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <div
                className="bg-blue absolute w-full top-0 bottom-0 -left-full rounded-full"
                style={{ transform: `translate3d(${scrollProgress}%,0px,0px)` }}
              />
            </div>

            <div className="flex items-center gap-3">
              <PrevButton
                onClick={onPrevButtonClick}
                disabled={prevBtnDisabled}
              />
              <NextButton
                onClick={onNextButtonClick}
                disabled={nextBtnDisabled}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const CarouselBaseProgressBar = React.memo(
  CarouselBaseProgressBarComponent
);
