import React, { ReactNode, memo } from "react";
import {
  DEFAULT_TITLE_CLASSES,
  DEFAULT_DESCRIPTION_CLASSES,
} from "./constants";
import { cls } from "../../lib/utils";

/**
 * VerticalTextbox Component
 *
 * @example Basic usage with strings:
 * <VerticalTextbox
 *   title="Welcome"
 *   description="This is a description"
 * />
 *
 * @example With text components (recommended patterns):
 * <VerticalTextbox
 *   title={<TextScrollEntranceSlide text="Animated Title" variant="scrub" />}
 *   description={<TextScrollRevealBlur text="Blurred Description" variant="words-scrub" />}
 * />
 *
 * @example With multiple text components in description:
 * <VerticalTextbox
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
 * <VerticalTextbox
 *   title="Title"
 *   description="Description"
 *   reverseLayout={true}  // Places description above title
 * />
 *
 * <VerticalTextbox
 *   title="Title"
 *   description="Description"
 *   alignStart={true}  // Aligns content to start instead of end
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
export interface VerticalTextboxProps {
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

const VerticalTextbox = memo(function VerticalTextbox({
  title,
  description,
  className = "",
  titleClassName = "",
  descriptionClassName = "",
  reverseLayout = false,
  alignStart = false,
}: VerticalTextboxProps) {
  const layoutClass = reverseLayout ? "flex-col-reverse" : "";
  const alignClass = reverseLayout
    ? "items-start"
    : alignStart
    ? "items-start"
    : "items-end";

  return (
    <div
      className={cls(
        "w-full flex flex-col gap-2 md:gap-6",
        layoutClass,
        alignClass,
        className
      )}
    >
      <div
        className={cls(
          "w-full md:w-3/4",
          DEFAULT_TITLE_CLASSES,
          titleClassName
        )}
      >
        {title}
      </div>
      <div
        className={cls(
          "w-full md:w-11/12",
          DEFAULT_DESCRIPTION_CLASSES,
          descriptionClassName
        )}
      >
        {description}
      </div>
    </div>
  );
});

export default VerticalTextbox;
