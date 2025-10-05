import { SpotlightProps } from "@/components/background/Spotlight";
import { BaseTextConfig } from "../shared/types";
import { LucideIcon } from "lucide-react";

export interface TokenomicsKPIItem {
  value?: string;
  description?: string;
  longDescription?: string;
  icon?: LucideIcon;
  button?: {
    variant?: "side" | "none" | "bottom";
    className?: string;
    childClassName?: string;
    iconClassName?: string;
  };
}

export interface TokenomicsStyle {
  section: {
    className?: string;
    backgroundColor?: string;
    backgroundPattern?: string;
    spotlight?: SpotlightProps;
  };
  title: BaseTextConfig;
  description: {
    text?: string;
    className?: string;
  };
bento: {
        items: TokenomicsKPIItem[];
        longDescriptionClassName?: string;
        className?: string;
        gridClassName?: string;
        itemClassName?: string;
        valueClassName?: string;
        descriptionClassName?: string;
        gradientColors?: {
            from: string;
            to: string;
        };
        iconClassName?: string;
        iconContainerClassName?: string;
        button?: {
            className?: string;
            childClassName?: string;
            iconClassName?: string;
            variant?: 'side' | 'none' | 'bottom';
        };
        gradientClassName?: string;
  };
  expandingCards?: {
    cardClassName?: string;
    activeCardClassName?: string;
    inactiveCardClassName?: string;
    numberClassName?: string;
    titleClassName?: string;
    descriptionClassName?: string;
    buttonType?: "pushable" | "slide" | "plus";
    buttonClassName?: string;
    buttonContentClassName?: string;
    buttonIconClassName?: string;
  };
}
