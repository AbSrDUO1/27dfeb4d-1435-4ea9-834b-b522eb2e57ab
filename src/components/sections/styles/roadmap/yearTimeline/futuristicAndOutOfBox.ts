import { futuristicTheme as theme } from "../../shared/themes";
import { ColorTemplate } from "../../shared/themeConfig";
import { getFuturisticColors } from "../../shared/themeConfig";

export function getFuturisticTimelineYearlyStyle(
  colorTemplate: ColorTemplate = 1
) {
  const colors = getFuturisticColors(colorTemplate);

  return {
    sectionClassName: `${theme.spacing.sectionPadding} overflow-visible px-[var(--width-10)]`,
    backgroundColor: colors.primary,
    backgroundPattern: "",
    gradient: {
      show: true,
      inset: "inset-0",
      rounded: "rounded-none",
      radialOpacity: "0%",
      linearOpacity: "90%",
      radialColor: "",
      linearColor: colors.gradientLinear,
    },
    showAurora: true,
    lineClassName: colors.timelineInactive,
    activeLineClassName: colors.timelineActive,
    dotClassName: colors.timelineActive,
    yearClassName: `${theme.heading.sizes.year} font-semibold leading-[100%] ${theme.fonts.heading.className} ${colors.textPrimary} mb-3 md:mb-0 block tracking-tightest`,
    titleClassName: `text-xl font-light leading-[120%] ${theme.fonts.heading.className} ${colors.textPrimary}`,
    descriptionClassName: `text-sm md:text-base font-light leading-[120%] ${theme.fonts.body.className} ${colors.textSecondary}`,
    gapClassName: "gap-[var(--width-10)] md:gap-10",
    paddingClassName: "p-[calc(var(--width-10)/2)] pl-[var(--width-10)] md:pl-[calc(var(--width-10)/2)]",
    marginClassName: "mb-[var(--width-10)] md:mb-10 last:mb-0",
  };
}
