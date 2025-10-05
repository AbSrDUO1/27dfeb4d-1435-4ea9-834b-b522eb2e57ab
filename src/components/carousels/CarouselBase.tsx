"use client";

import React, { useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import {
  PrevButton,
  NextButton,
  usePrevNextButtons,
} from "./EmblaCarouselArrowButtons";

interface CarouselBaseProps {
  children?: React.ReactNode;
}

const Carousel: React.FC<CarouselBaseProps> = ({ children }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ dragFree: true });

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  const items = Array.from({ length: 8 }, (_, i) => i + 1);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!emblaApi) return;

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        emblaApi.scrollPrev();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        emblaApi.scrollNext();
      }
    },
    [emblaApi]
  );

  useEffect(() => {
    if (!emblaApi) return;

    const container = emblaApi.rootNode();
    container.addEventListener("keydown", handleKeyDown);

    return () => {
      container.removeEventListener("keydown", handleKeyDown);
    };
  }, [emblaApi, handleKeyDown]);

  return (
    <section className="relative z-10 h-fit p-0" aria-label="Image carousel">
      <div className="w-full flex flex-col items-center">
        <div className="w-full flex flex-col gap-5">
          <div
            className="overflow-hidden w-full relative z-10 flex cursor-grab py-2"
            ref={emblaRef}
            tabIndex={0}
          >
            <div className="flex gap-4 w-full">
              <div className="flex-none w-10 min-w-0" />

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

          <div className="flex justify-end items-center w-full px-[var(--width-10)]">
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

export const CarouselBase = React.memo(Carousel);
