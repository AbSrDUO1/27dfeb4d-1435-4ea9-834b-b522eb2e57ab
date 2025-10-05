import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { TimelineItem as BaseTimelineItem } from '@/types/timeline';

gsap.registerPlugin(ScrollTrigger);

export interface TimelinePhoneViewItem extends Omit<BaseTimelineItem, 'title'> {
  trigger: string;
  title: React.ReactNode;
  image1: string;
  image2: string;
}

const getImageAnimationConfig = (itemIndex: number, imageIndex: number) => {
  const isFirstImage = imageIndex === 0;
  const isSecondItem = itemIndex === 1;

  if (isFirstImage) {
    return {
      from: { xPercent: -200, rotation: -45 },
      to: { rotation: isSecondItem ? 10 : -10 }
    };
  } else {
    return {
      from: { xPercent: 200, rotation: 45 },
      to: { rotation: isSecondItem ? -10 : 10 }
    };
  }
};

export const usePhoneAnimations = (items: TimelinePhoneViewItem[]) => {
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mobileImageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const titleRefs = useRef<(HTMLHeadingElement | null)[]>([]);
  const descriptionRefs = useRef<(HTMLParagraphElement | null)[]>([]);

  useEffect(() => {
    const mm = gsap.matchMedia();

    const animatePhones = (isMobile: boolean) => {
      items.forEach((item, itemIndex) => {
        const images = [item.image1, item.image2];

        images.forEach((_, imageIndex) => {
          const refIndex = itemIndex * 2 + imageIndex;
          const element = isMobile ? mobileImageRefs.current[refIndex] : imageRefs.current[refIndex];

          if (element) {
            const isFirstImage = imageIndex === 0;
            
            const fromConfig = isMobile 
              ? {
                  xPercent: isFirstImage ? -150 : 150,
                  rotation: isFirstImage ? -25 : 25,
                }
              : getImageAnimationConfig(itemIndex, imageIndex).from;

            const toConfig = isMobile
              ? {
                  xPercent: 0,
                  rotation: 0,
                  duration: 1,
                  scrollTrigger: {
                    trigger: element,
                    start: 'top 90%',
                    end: 'top 50%',
                    scrub: 1,
                  }
                }
              : {
                  xPercent: 0,
                  rotation: getImageAnimationConfig(itemIndex, imageIndex).to.rotation,
                  scrollTrigger: {
                    trigger: `.${item.trigger}`,
                    start: 'top bottom',
                    end: 'top top',
                    scrub: 1
                  }
                };

            gsap.fromTo(element, fromConfig, toConfig);
          }
        });
      });
    };

    mm.add("(max-width: 767px)", () => animatePhones(true));
    mm.add("(min-width: 768px)", () => animatePhones(false));

    return () => {
      mm.revert();
      imageRefs.current = [];
      mobileImageRefs.current = [];
      titleRefs.current = [];
      descriptionRefs.current = [];
    };
  }, [items]);

  return {
    imageRefs,
    mobileImageRefs,
    titleRefs,
    descriptionRefs
  };
};