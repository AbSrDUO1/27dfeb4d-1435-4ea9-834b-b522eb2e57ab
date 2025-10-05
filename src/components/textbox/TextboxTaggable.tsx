import React, { ReactNode, memo, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  DEFAULT_TITLE_CLASSES,
  DEFAULT_DESCRIPTION_CLASSES,
  GSAP_FADE_CONFIG,
  GSAP_SCROLL_TRIGGER_CONFIG,
} from "./constants";

gsap.registerPlugin(ScrollTrigger);

/**
 * TextboxTaggable Component
 *
 * @example Basic usage with strings:
 * <TextboxTaggable
 *   label="New"
 *   title="Welcome"
 *   description="This is a description"
 * />
 *
 * @example With text components (recommended patterns):
 * <TextboxTaggable
 *   label="New"
 *   title={<TextScrollEntranceSlide text="Animated Title" variant="scrub" />}
 *   description={<TextScrollRevealBlur text="Blurred Description" variant="words-scrub" />}
 * />
 *
 * @example With multiple text components in description:
 * <TextboxTaggable
 *   label="New"
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
export interface TextboxTaggableProps {
  icon?: ReactNode;
  /**
   * Label content (usually short text for the tag)
   */
  label: ReactNode;
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
  children?: ReactNode;
  className?: string;
  tagClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  contentClassName?: string;
  disableAnimation?: boolean;
  tagLabelClassName?: string;
}

const TextboxTaggable = memo(function TextboxTaggable({
  icon,
  label,
  title,
  description,
  children,
  className = "",
  tagClassName = "",
  titleClassName = "",
  descriptionClassName = "",
  contentClassName = "",
  disableAnimation = false,
  tagLabelClassName,
}: TextboxTaggableProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const tagRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!tagRef.current || disableAnimation) return;

    const animations: gsap.core.Tween[] = [];

    const tagAnimation = gsap.fromTo(tagRef.current, GSAP_FADE_CONFIG.from, {
      ...GSAP_FADE_CONFIG.to,
      scrollTrigger: {
        trigger: tagRef.current,
        ...GSAP_SCROLL_TRIGGER_CONFIG,
      },
    });
    animations.push(tagAnimation);

    if (contentRef.current && children) {
      const contentAnimation = gsap.fromTo(
        contentRef.current,
        GSAP_FADE_CONFIG.from,
        {
          ...GSAP_FADE_CONFIG.to,
          scrollTrigger: {
            trigger: contentRef.current,
            ...GSAP_SCROLL_TRIGGER_CONFIG,
          },
        }
      );
      animations.push(contentAnimation);
    }

    return () => {
      animations.forEach((animation) => {
        if (animation.scrollTrigger) {
          animation.scrollTrigger.kill();
        }
        animation.kill();
      });
    };
  }, [children, disableAnimation]);

  return (
    <div
      className={`w-full flex flex-col gap-2 md:gap-3 text-center items-center ${className}`}
    >
      <div
        ref={tagRef}
        className={`flex items-center gap-2 bg-white shadow p-1 px-3 rounded-full ${tagClassName}`}
      >
        {icon}
        <span className={`text-sm font-medium ${tagLabelClassName}`}>
          {label}
        </span>
      </div>
      <div
        className={`w-full md:w-1/2 ${DEFAULT_TITLE_CLASSES} ${titleClassName}`}
      >
        {title}
      </div>
      <div
        className={`w-full md:w-1/2 ${DEFAULT_DESCRIPTION_CLASSES} ${descriptionClassName}`}
      >
        {description}
      </div>
      {children && (
        <div ref={contentRef} className={`w-fit mt-2 ${contentClassName}`}>
          {children}
        </div>
      )}
    </div>
  );
});

export default TextboxTaggable;
