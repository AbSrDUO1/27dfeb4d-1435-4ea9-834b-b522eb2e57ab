import React, { ReactNode, memo } from "react";
import {
  DEFAULT_TITLE_CLASSES,
  DEFAULT_DESCRIPTION_CLASSES,
} from "./constants";

/**
 * TextboxLayoutHorizontal Component
 *
 * @example Basic usage with strings:
 * <TextboxLayoutHorizontal
 *   title="Welcome"
 *   description="This is a description"
 * />
 *
 * @example With text components (recommended patterns):
 * <TextboxLayoutHorizontal
 *   title={<TextScrollEntranceSlide text="Animated Title" variant="scrub" />}
 *   description={<TextScrollRevealBlur text="Blurred Description" variant="words-scrub" />}
 * />
 *
 * @example With multiple text components in description:
 * <TextboxLayoutHorizontal
 *   title={<TextScrollEntranceSlide text="Title" variant="scrub" />}
 *   description={
 *     <div className="flex flex-col gap-2">
 *       <TextScrollBackgroundHighlight text="First paragraph" variant="words-trigger" />
 *       <TextScrollBackgroundHighlight text="Second paragraph" variant="words-trigger" />
 *     </div>
 *   }
 * />
 *
 * @example Layout variations:
 * <TextboxLayoutHorizontal
 *   title="Title"
 *   description="Description"
 *   reverseLayout={true}  // Swaps title and description positions
 * />
 *
 * <TextboxLayoutHorizontal
 *   title="Title"
 *   description="Description"
 *   alignStart={true}  // Aligns both title and description to start
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
export interface TextboxLayoutHorizontalProps {
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
  reverseLayout?: boolean;
  alignStart?: boolean;
}

const TextboxLayoutHorizontal = memo(function TextboxLayoutHorizontal({
  title,
  description,
  className = "",
  titleClassName = "",
  descriptionClassName = "",
  reverseLayout = false,
  alignStart = false,
}: TextboxLayoutHorizontalProps) {
  const layoutClass = reverseLayout ? "md:flex-row-reverse" : "md:flex-row";
  const alignClass = reverseLayout
    ? "items-start"
    : alignStart
    ? "items-start"
    : "items-end";

  return (
    <div
      className={`w-full flex flex-col gap-2 md:gap-6 justify-between ${layoutClass} ${alignClass} ${className}`}
    >
      <div
        className={`w-full md:w-1/2 ${DEFAULT_TITLE_CLASSES} ${titleClassName}`}
      >
        {title}
      </div>
      <div
        className={`w-full md:w-[31%] ${DEFAULT_DESCRIPTION_CLASSES} ${descriptionClassName}`}
      >
        {description}
      </div>
    </div>
  );
});

export default TextboxLayoutHorizontal;
