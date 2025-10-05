"use client";

import { memo } from "react";
import Image from "next/image";
import ButtonPressDepth from "@/components/buttons/ButtonPressDepth";
import {
  Framer,
  Github,
  Instagram,
  Twitter,
  type LucideIcon,
} from "lucide-react";
import SideGlowGradientBackground from "@/components/background/SideGlowGradientBackground";

interface GradientConfig {
  show?: boolean;
  inset?: string;
  rounded?: string;
  radialColor?: string;
  linearColor?: string;
  radialOpacity?: string;
  linearOpacity?: string;
  linearOpacityMobile?: string;
}

interface ButtonConfig {
  variant?: "side" | "bottom" | string;
  className?: string;
  childClassName?: string;
  iconClassName?: string;
}

interface SectionConfig {
  backgroundPattern?: string;
}

interface MewFooterProps {
  title?: string;
  imageSrc?: string;
  imageAlt?: string;
  socialIcons?: Array<LucideIcon>;
  className?: string;
  titleClassName?: string;
  gradient?: GradientConfig;
  button?: ButtonConfig;
  section?: SectionConfig;
  onSocialClick?: (index: number) => void;
}

const MewFooter = memo<MewFooterProps>(function MewFooter({
  title = "Let's come together and put an end to their tyranny… The dog days are done.",
  imageSrc = "/sections/images/character2.webp",
  imageAlt = "Mew Footer",
  socialIcons = [Github, Instagram, Framer, Twitter],
  className = "",
  titleClassName = "",
  gradient,
  button,
  section,
  onSocialClick,
}) {
  return (
    <footer
      role="contentinfo"
      aria-label="Site footer"
      className={`relative overflow-hidden w-full pt-10 sm:py-10 px-[var(--width-5)] ${className}`}
    >
      {gradient?.show && (
        <SideGlowGradientBackground
          inset={gradient.inset}
          rounded={gradient.rounded}
          radialColor={gradient.radialColor}
          linearColor={gradient.linearColor}
          radialOpacity={gradient.radialOpacity}
          linearOpacity={gradient.linearOpacity}
          linearOpacityMobile={gradient.linearOpacityMobile}
        />
      )}
      {section?.backgroundPattern && (
        <div
          className={`absolute inset-0 opacity-20 ${section.backgroundPattern} bg-repeat`}
        />
      )}
      <div className="relative z-10 w-full sm:w-5/7">
        <p className={titleClassName}>{title}</p>
        <div className="flex gap-6 mt-6 sm:mt-10">
          {socialIcons.map((Icon, idx) => (
            <ButtonPressDepth
              key={idx}
              type="button"
              variant={
                (button?.variant as "bottom" | "side" | "none") || "side"
              }
              className={button?.className}
              frontClassName={button?.childClassName}
              ariaLabel={`Social icon ${idx + 1}`}
              onClick={() => onSocialClick?.(idx)}
            >
              <Icon strokeWidth={1.25} className={button?.iconClassName} />
            </ButtonPressDepth>
          ))}
        </div>
      </div>
      <div className="sm:absolute bottom-0 md:w-2/7 right-0 sm:h-full flex items-end justify-center z-10 relative mt-6 w-full sm:w-auto">
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={1000}
          height={1000}
          className="sm:w-auto w-full sm:h-11/12 object-contain object-bottom"
        />
      </div>
    </footer>
  );
});

export default MewFooter;
