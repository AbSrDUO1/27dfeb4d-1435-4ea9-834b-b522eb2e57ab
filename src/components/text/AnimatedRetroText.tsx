"use client";

import React, { memo } from "react";
import RetroText from "./RetroText";
import TextScrollEntranceSlide from "./TextScrollEntranceSlide";
import TextScrollTransformRotate from "./TextScrollTransformRotate";
import TextScrollBackgroundHighlight from "./TextScrollBackgroundHighlight";
import TextScrollRevealBlur from "./TextScrollRevealBlur";
import TextScrollTransformScale from "./TextScrollTransformScale";
import TextScrollExpand from "./TextScrollExpand";
import TextScrollFlipThreeD from "./TextScrollFlipThreeD";

interface AnimatedRetroTextProps {
  text: string;
  className?: string;
  animation?:
    | "slide"
    | "rotate"
    | "highlight"
    | "blur"
    | "scale"
    | "expand"
    | "flip"
    | "none";
  shadowColor?: string;
  shadowOffset?: string;
  animationProps?: {
    duration?: number;
    stagger?: number;
    start?: string;
    end?: string;
    variant?: "scrub" | "trigger" | "words-scrub" | "words-trigger";
  };
  gradientColors?: {
    from: string;
    to: string;
  };
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
}

const AnimatedRetroText = ({
  text,
  className = "",
  animation = "none",
  shadowColor,
  shadowOffset,
  animationProps = {},
  as = "h1",
}: AnimatedRetroTextProps) => {
  const retroText = (
    <RetroText
      text={text}
      className={className}
      shadowColor={shadowColor}
      shadowOffset={shadowOffset}
      as={as}
    />
  );

  switch (animation) {
    case "slide":
      return (
        <TextScrollEntranceSlide {...animationProps}>
          {retroText}
        </TextScrollEntranceSlide>
      );
    case "rotate":
      return (
        <TextScrollTransformRotate {...animationProps}>
          {retroText}
        </TextScrollTransformRotate>
      );
    case "highlight":
      return (
        <TextScrollBackgroundHighlight {...animationProps}>
          {retroText}
        </TextScrollBackgroundHighlight>
      );
    case "blur":
      return (
        <TextScrollRevealBlur {...animationProps}>
          {retroText}
        </TextScrollRevealBlur>
      );
    case "scale":
      return (
        <TextScrollTransformScale {...animationProps}>
          {retroText}
        </TextScrollTransformScale>
      );
    case "expand":
      return (
        <TextScrollExpand {...animationProps}>{retroText}</TextScrollExpand>
      );
    case "flip":
      return (
        <TextScrollFlipThreeD {...animationProps}>
          {retroText}
        </TextScrollFlipThreeD>
      );
    default:
      return retroText;
  }
};

AnimatedRetroText.displayName = "AnimatedRetroText";

export default memo(AnimatedRetroText);
