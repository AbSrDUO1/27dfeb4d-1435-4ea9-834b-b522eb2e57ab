import { NavItem } from "@/types/navigation";

export interface SpotlightConfig {
    width?: string;
    height?: string;
    left?: string;
    top?: string;
    rotate?: string;
    color?: string;
    blur?: string;
    opacity?: number;
    mobileWidth?: string;
    mobileHeight?: string;
    mobileLeft?: string;
    mobileTop?: string;
    mobileRotate?: string;
}

export interface SparklesConfig {
    particleColor?: string;
    particleDensity?: number;
    minSize?: number;
    maxSize?: number;
    speed?: number;
}

export interface GradientConfig {
    radialColor?: string;
    linearColor?: string;
    radialOpacity?: string;
    linearOpacity?: string;
    rounded?: string;
}

export interface AnimationProps {
    duration?: number;
    stagger?: number;
    start?: string;
    end?: string;
    variant?: 'scrub' | 'trigger' | 'words-scrub' | 'words-trigger';
}

export interface GradientColors {
    from: string;
    to: string;
}

export interface BaseSection {
    className?: string;
    backgroundColor?: string;
    backgroundPattern?: string;
    backgroundImage?: string;
    spotlight?: SpotlightConfig;
    sparkles?: SparklesConfig;
}

export interface BaseTextConfig {
    text?: string;
    className?: string;
    shadowColor?: string;
    shadowOffset?: string;
    animationProps?: AnimationProps;
    gradientColors?: GradientColors;
}

export interface NavbarConfig {
    logoSrc: string;
    className?: string;
    logoClassName?: string;
    buttonBgColor?: string;
    buttonHoverBgColor?: string;
    buttonTextColor?: string;
    buttonHoverTextColor?: string;
    buttonClassName?: string;
    buttonContentClassName?: string;
    navItems?: NavItem[];
}