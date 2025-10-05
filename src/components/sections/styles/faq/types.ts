import { BaseSection, BaseTextConfig } from "../shared/types";

export interface AccordionItem {
  title: string;
  content: string;
}

export interface FAQStyle {
  section: BaseSection & {
    innerClassName?: string;
    showBorder?: boolean;
    fadeBottom?: boolean;
  };
  gradient?: {
    show?: boolean;
    radialColor?: string;
    linearColor?: string;
    radialOpacity?: string;
    linearOpacity?: string;
    linearOpacityMobile?: string;
    className?: string;
    inset?: string;
    rounded?: string;
  };
  title: BaseTextConfig;
  description?: {
    text?: string;
    className?: string;
  };
  accordion: {
    className?: string;
    titleClassName?: string;
    itemClassName?: string;
    itemTitleClassName?: string;
    itemIconContainerClassName?: string;
    itemIconClassName?: string;
    itemContentClassName?: string;
    containerClassName?: string;
    gridClassName?: string;
    dividerClassName?: string;
  };
  layout?: {
    alignStart?: boolean;
    textSectionClassName?: string;
    accordionSectionClassName?: string;
  };
}

export interface ImageFAQStyle extends FAQStyle {
  image: {
    src: string;
    alt?: string;
    className?: string;
    containerClassName?: string;
  };
}

export interface BentoFAQStyle extends FAQStyle {
  bento: {
    containerClassName?: string;
    gridClassName?: string;
  };
}
