import React, { ReactNode, memo, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  DEFAULT_TITLE_CLASSES,
  DEFAULT_DESCRIPTION_CLASSES,
  GSAP_FADE_CONFIG,
  GSAP_SCROLL_TRIGGER_CONFIG,
} from "./constants";
import { cls } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

/**
 * TextboxContentRich Component
 *
 * @example Basic usage with strings:
 * <TextboxContentRich
 *   title="Welcome"
 *   description="This is a description"
 * />
 *
 * @example With text components (recommended patterns):
 * <TextboxContentRich
 *   title={<TextScrollEntranceSlide text="Animated Title" variant="scrub" />}
 *   description={<TextScrollRevealBlur text="Blurred Description" variant="words-scrub" />}
 * />
 *
 * @example With multiple text components in description:
 * <TextboxContentRich
 *   title={<TextScrollEntranceSlide text="Title" variant="scrub" />}
 *   description={
 *     <div className="flex flex-col gap-2">
 *       <TextScrollBackgroundHighlight text="First paragraph" variant="words-trigger" />
 *       <TextScrollBackgroundHighlight text="Second paragraph" variant="words-trigger" />
 *     </div>
 *   }
 * />
 *
 * Animation Variant Guidelines (for performance):
 * - TITLE: Use 'scrub' or 'trigger'
 * - DESCRIPTION: Use 'words-scrub' or 'words-trigger'
 *
 * Compatible text components from @/components/text/:
 * - TextFillGradient from '@/components/text/TextFillGradient'
 * - TextScrollBackgroundHighlight from '@/components/text/TextScrollBackgroundHighlight'
 * - TextScrollTransformRotate from '@/components/text/TextScrollTransformRotate'
 * - TextScrollEntranceSlide from '@/components/text/TextScrollEntranceSlide'
 * - TextScrollRevealBlur from '@/components/text/TextScrollRevealBlur'
 * - TextScrollTransformScale from '@/components/text/TextScrollTransformScale'
 * - TextScrollExpand from '@/components/text/TextScrollExpand'
 * - TextScrollFlipThreeD from '@/components/text/TextScrollFlipThreeD'
 * - MaskText from '@/components/text/MaskText'
 * - TextScrollCharacterWave from '@/components/text/TextScrollCharacterWave'
 * - TextRevealColor from '@/components/text/TextRevealColor'
 * - RetroText from '@/components/text/RetroText'
 * - AnimatedRetroText from '@/components/text/AnimatedRetroText'
 */
export interface TextboxContentRichProps {
  /**
   * Title content
   * Recommended: Use text components with variant="scrub" or variant="trigger"
   * @example "Welcome" | <TextScrollEntranceSlide text="Welcome" variant="scrub" /> | <TextFillGradient text="Welcome" />
   */
  title: ReactNode;
  /**
   * Description content
   * Recommended: Use text components with variant="words-scrub" or variant="words-trigger"
   * @example "Description" | <TextScrollRevealBlur text="Description" variant="words-scrub" /> | <TextScrollBackgroundHighlight text="Description" variant="words-trigger" />
   */
  description: ReactNode;
  /**
   * Content to display below title and description (usually buttons)
   */
  children: ReactNode;
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  contentClassName?: string;
  disableAnimation?: boolean;
}

const TextboxContentRich = memo(function TextboxContentRich({
  title,
  description,
  children,
  className = "",
  titleClassName = "",
  descriptionClassName = "",
  contentClassName = "",
  disableAnimation = false,
}: TextboxContentRichProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current || disableAnimation) return;

    const animation = gsap.fromTo(contentRef.current, GSAP_FADE_CONFIG.from, {
      ...GSAP_FADE_CONFIG.to,
      scrollTrigger: {
        trigger: contentRef.current,
        ...GSAP_SCROLL_TRIGGER_CONFIG,
      },
    });

    return () => {
      if (animation.scrollTrigger) {
        animation.scrollTrigger.kill();
      }
      animation.kill();
    };
  }, [disableAnimation]);

  return (
    <div
      className={`w-full flex flex-col gap-2 md:gap-3 text-center items-center ${className}`}
    >
      <div
        className={cls(
          "w-full md:w-1/2",
          DEFAULT_TITLE_CLASSES,
          titleClassName
        )}
      >
        {title}
      </div>
      <div
        className={cls(
          "w-full md:w-1/2",
          DEFAULT_DESCRIPTION_CLASSES,
          descriptionClassName
        )}
      >
        {description}
      </div>
      <div ref={contentRef} className={cls("w-fit mt-2", contentClassName)}>
        {children}
      </div>
    </div>
  );
});

export default TextboxContentRich;
