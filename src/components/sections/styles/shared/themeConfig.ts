export type ColorTemplate = 1 | 2;

export interface ColorThemeProps {
  colorTemplate?: ColorTemplate;
}

export const funAndTrendyColors = {
  1: {
    primary: "bg-fun-template-1-primary",
    secondary: "bg-fun-template-1-secondary",
    tertiary: "bg-fun-template-1-tertiary",
    button: "bg-fun-template-1-button",
    buttonHover: "after:bg-fun-template-1-button-hover",
    buttonHoverText: "after:text-fun-template-1-button-hover-text",
    patternGradient: "bg-gradient-to-t from-fun-template-1-secondary to-red-500",
    timelineActive: "bg-fun-template-1-button",
    timelineInactive: "bg-white/20",
    cardActive: "bg-fun-template-1-secondary",
    cardInactive: "bg-white",
    textPrimary: "text-black",
    textSecondary: "text-white",
    border: "border-black",
    shadow: "shadow-[4px_4px_0_#000]",
  },
  2: {
    primary: "bg-fun-template-2-primary",
    secondary: "bg-fun-template-2-secondary",
    tertiary: "bg-fun-template-2-tertiary",
    button: "bg-fun-template-2-button",
    buttonHover: "after:bg-fun-template-2-button-hover",
    buttonHoverText: "after:text-fun-template-2-button-hover-text",
    patternGradient: "bg-radial via-emerald-400 from-lime-500 to-green-600",
    timelineActive: "bg-fun-template-2-button",
    timelineInactive: "bg-white/20",
    cardActive: "bg-fun-template-2-secondary",
    cardInactive: "bg-white",
    textPrimary: "text-black",
    textSecondary: "text-white",
    border: "border-black",
    shadow: "shadow-[4px_4px_0_#000]",
  },
} as const;

export const futuristicColors = {
  1: {
    primary: "bg-futuristic-template-1-primary",
    gradientLinear: "var(--color-futuristic-template-1-gradient-linear)",
    cardBg: "futuristic-template-1-card-bg",
    spotlight: "var(--color-futuristic-template-1-spotlight)",
    primaryButtonBg: "bg-futuristic-template-1-button",
    primaryButtonHover: "after:bg-futuristic-template-1-button-hover",
    primaryButtonHoverText:
      "after:text-futuristic-template-1-button-hover-text",
    tagText: "text-futuristic-template-1-tag-text",
    secondaryButtonHover: 'after:bg-futuristic-template-1-primary',
    patternGradient: "bg-radial from-purple-800 from-40% to-violet-900",
    timelineActive: "bg-white",
    timelineInactive: "bg-white/10",
    cardActive: "bg-white/10",
    cardInactive: "bg-white/5",
    textPrimary: "text-white",
    textSecondary: "text-white/75",
    border: "border-white/10",
    shadow: "shadow-lg shadow-black/20",
  },
  2: {
    primary: "bg-futuristic-template-2-primary",
    gradientLinear: "var(--color-futuristic-template-2-gradient-linear)",
    cardBg: "futuristic-template-2-card-bg",
    spotlight: "var(--color-futuristic-template-2-spotlight)",
    primaryButtonBg: "bg-futuristic-template-2-button",
    primaryButtonHover: "after:bg-futuristic-template-2-button-hover",
    primaryButtonHoverText:
      "after:text-futuristic-template-2-button-hover-text",
    tagText: "text-futuristic-template-2-tag-text",
    secondaryButtonHover: 'after:bg-futuristic-template-2-primary',
    patternGradient: "bg-radial from-blue-800 from-40% to-indigo-900",
    timelineActive: "bg-white",
    timelineInactive: "bg-white/10",
    cardActive: "bg-white/10",
    cardInactive: "bg-white/5",
    textPrimary: "text-white",
    textSecondary: "text-white/75",
    border: "border-white/10",
    shadow: "shadow-lg shadow-black/20",
  },
} as const;

export function getFunAndTrendyColors(template: ColorTemplate) {
  return funAndTrendyColors[template];
}

export function getFuturisticColors(template: ColorTemplate) {
  return futuristicColors[template];
}