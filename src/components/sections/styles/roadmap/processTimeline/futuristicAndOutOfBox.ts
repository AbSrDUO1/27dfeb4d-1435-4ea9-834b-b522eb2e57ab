import { futuristicTheme as theme } from "../../shared/themes";
import { ColorTemplate } from "../../shared/themeConfig";
import { getFuturisticColors } from "../../shared/themeConfig";

export function getFuturisticTimelineProcessFlowStyle(
  colorTemplate: ColorTemplate = 1
) {
  const colors = getFuturisticColors(colorTemplate);

  return {
    sectionClassName: `${theme.spacing.sectionPadding} h-fit p-0 relative overflow-visible`,
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
    lineClassName: colors.timelineInactive,
    activeLineClassName: colors.timelineActive,
    cardClassName: `${colors.border} rounded-lg p-4 md:p-6 futuristic-card-border futuristic-card-bg ${colors.shadow}`,
    imageClassName: "rounded-lg",
    numberClassName: `${colors.timelineActive} ${colors.shadow} text-black`,
    titleClassName: `text-2xl md:text-4xl font-light leading-[110%] ${theme.fonts.heading.className} ${colors.textPrimary}`,
    descriptionClassName: `text-sm md:text-base font-light leading-[120%] ${theme.fonts.body.className} ${colors.textSecondary}`,
    listItemClassName: `text-lg font-medium ${colors.textSecondary}`,
    iconContainerClassName: `${theme.effects.glass} ${colors.shadow}`,
    iconClassName: colors.textPrimary,
    gapClassName: "gap-20",
    paddingClassName: "px-[var(--width-10)]",
  };
}
