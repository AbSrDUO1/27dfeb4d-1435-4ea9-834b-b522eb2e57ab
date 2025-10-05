import { futuristicTheme as theme } from "../../shared/themes";
import { ColorTemplate, getFuturisticColors } from "../../shared/themeConfig";
import { getTextFillGradientConfig } from "../../shared/styleHelpers";

export function getFuturisticTimelineStyle(colorTemplate: ColorTemplate = 1) {
  const colors = getFuturisticColors(colorTemplate);

  return {
    sectionClassName: `${theme.spacing.sectionPadding} relative overflow-visible px-[var(--width-10)]`,
    backgroundColor: colors.primary,
    backgroundPattern: "",
    gradient: {
      show: true,
      inset: "inset-0",
      rounded: "rounded-none",
      radialOpacity: "0%",
      linearOpacity: "30%",
      radialColor: "",
      linearColor: colors.gradientLinear,
    },
    gapClassName: "gap-[var(--width-30)] md:gap-30",
    paddingClassName: "p-3",
    cardClassName: `${colors.cardBg} futuristic-card-border ${theme.effects.backdrop} ${colors.shadow} ${theme.timeline.radius}`,
    imageContainerClassName: `${theme.effects.glass} ${theme.timeline.radius}`,
    mediaClassName: theme.timeline.radius,
    titleClassName: `text-xl md:text-2xl font-semibold leading-[110%] ${theme.fonts.heading.className} ${colors.textPrimary}`,
    descriptionClassName: `text-sm md:text-base leading-[120%] ${theme.fonts.body.className} ${colors.textSecondary}`,
    sectionTitleClassName: `text-4xl md:text-6xl leading-none uppercase tracking-tight font-bold ${theme.text.white} ${theme.fonts.heading.className}`,
    ...getTextFillGradientConfig(),
  };
}
