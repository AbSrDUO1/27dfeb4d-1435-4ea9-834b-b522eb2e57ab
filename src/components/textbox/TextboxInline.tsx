import React, { ReactNode, memo } from "react";
import { INLINE_TITLE_CLASSES, INLINE_DESCRIPTION_CLASSES } from "./constants";

/**
 * TextboxInline Component
 *
 * @example Basic usage with strings:
 * <TextboxInline
 *   title="Welcome"
 *   description="This is a description"
 * />
 *
 * @example With text components (recommended patterns):
 * <TextboxInline
 *   title={<TextScrollEntranceSlide text="Animated Title" variant="scrub" />}
 *   description={<TextScrollRevealBlur text="Blurred Description" variant="words-scrub" />}
 * />
 *
 * @example With multiple text components in description:
 * <TextboxInline
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
export interface TextboxInlineProps {
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
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
}

const TextboxInline = memo(function TextboxInline({
  title,
  description,
  className = "",
  titleClassName = "",
  descriptionClassName = "",
}: TextboxInlineProps) {
  return (
    <div className={`block relative ${className}`}>
      <span
        className={`inline-block mr-[var(--width-15)] md:mr-[var(--width-10)] ${INLINE_TITLE_CLASSES} ${titleClassName} [&>*]:!inline`}
      >
        {title}
      </span>
      <span
        className={`inline font-light ${INLINE_DESCRIPTION_CLASSES} ${descriptionClassName} [&>*]:!inline`}
      >
        {description}
      </span>
    </div>
  );
});

export default TextboxInline;
