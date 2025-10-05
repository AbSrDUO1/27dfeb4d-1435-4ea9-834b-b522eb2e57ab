"use client";

import React, { memo } from "react";
import AnimatedRetroText from "@/components/text/AnimatedRetroText";
import TextScrollEntranceSlide from "@/components/text/TextScrollEntranceSlide";
import TextScrollTransformRotate from "@/components/text/TextScrollTransformRotate";
import TextScrollBackgroundHighlight from "@/components/text/TextScrollBackgroundHighlight";
import TextScrollRevealBlur from "@/components/text/TextScrollRevealBlur";
import TextScrollTransformScale from "@/components/text/TextScrollTransformScale";
import TextScrollExpand from "@/components/text/TextScrollExpand";
import TextScrollFlipThreeD from "@/components/text/TextScrollFlipThreeD";
import { BaseTextConfig } from "@/components/sections/styles/shared/types";
import { useSiteTheme } from "@/components/sections/ThemeProvider";

/**
 * TextRenderer Component
 *
 * The TextScrollEntranceSlide component can be replaced with any text component from @/components/text/
 *
 * @example Replace with different text component:
 * Instead of TextScrollEntranceSlide, you can use:
 * - TextFillGradient from '@/components/text/TextFillGradient'
 * - TextScrollBackgroundHighlight from '@/components/text/TextScrollBackgroundHighlight'
 * - TextScrollTransformRotate from '@/components/text/TextScrollTransformRotate'
 * - TextScrollRevealBlur from '@/components/text/TextScrollRevealBlur'
 * - TextScrollTransformScale from '@/components/text/TextScrollTransformScale'
 * - TextScrollExpand from '@/components/text/TextScrollExpand'
 * - TextScrollFlipThreeD from '@/components/text/TextScrollFlipThreeD'
 * - MaskText from '@/components/text/MaskText'
 * - TextScrollCharacterWave from '@/components/text/TextScrollCharacterWave'
 * - TextRevealColor from '@/components/text/TextRevealColor'
 * - RetroText from '@/components/text/RetroText'
 */
interface TextRendererProps {
  config: BaseTextConfig;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p";
}

const TextRenderer = ({ config, as = "h2" }: TextRendererProps) => {
  const theme = useSiteTheme();

  if (!config || !config.text) return null;

  // futuristicAndOutOfBox style uses the text component directly based on textAnimation
  if (theme.styleVariant === "futuristicAndOutOfBox") {
    const animationProps = {
      text: config.text,
      className: config.className,
      variant: config.animationProps?.variant,
      duration: config.animationProps?.duration,
      stagger: config.animationProps?.stagger,
      start: config.animationProps?.start,
      end: config.animationProps?.end,
      gradientColors: config.gradientColors,
    };

    switch (theme.textAnimation) {
      case "rotate":
        return <TextScrollTransformRotate {...animationProps} />;
      case "highlight":
        return <TextScrollBackgroundHighlight {...animationProps} />;
      case "blur":
        return <TextScrollRevealBlur {...animationProps} />;
      case "scale":
        return <TextScrollTransformScale {...animationProps} />;
      case "expand":
        return <TextScrollExpand {...animationProps} />;
      case "flip":
        return <TextScrollFlipThreeD {...animationProps} />;
      case "slide":
      case "none":
      default:
        return <TextScrollEntranceSlide {...animationProps} />;
    }
  }

  // funAndTrendy style always uses AnimatedRetroText with the theme's animation
  return (
    <AnimatedRetroText
      text={config.text}
      className={config.className}
      animation={theme.textAnimation}
      shadowColor={config.shadowColor}
      shadowOffset={config.shadowOffset}
      animationProps={config.animationProps}
      as={as}
    />
  );
};

TextRenderer.displayName = "TextRenderer";

export default memo(TextRenderer);
