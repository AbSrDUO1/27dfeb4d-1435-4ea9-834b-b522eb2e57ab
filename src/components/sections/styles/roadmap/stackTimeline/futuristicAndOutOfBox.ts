import { futuristicTheme as theme } from "../../shared/themes";
import { ColorTemplate } from "../../shared/themeConfig";
import { getFuturisticColors } from "../../shared/themeConfig";

export function getFuturisticTimelineCardStackStyle(
  colorTemplate: ColorTemplate = 1
) {
  const colors = getFuturisticColors(colorTemplate);

  return {
    sectionClassName: `relative overflow-visible h-fit p-[var(--width-10)]`,
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
    gapClassName: "gap-[var(--width-25)] md:gap-[6.25vh]",
    cardClassName: `${theme.effects.glass} ${colors.shadow} ${colors.border} rounded`,
    cardHeight: "h-[150vw] md:h-[75vh]",
    cardStickyPosition: "top-[20vw] md:top-[12.5vh]",
    stepNumberClassName: `${colors.timelineActive} text-black`,
    stepNumberSize: "h-8 w-[var(--height-8)]",
    titleClassName: `text-4xl md:text-5xl font-medium leading-[100%] tracking-tight ${colors.textPrimary} ${theme.fonts.heading.className}`,
    descriptionClassName: `text-base leading-[110%] tracking-tight ${colors.textSecondary} ${theme.fonts.body.className}`,
    contentGapClassName: "gap-3 md:gap-6",
    imageContainerClassName: "p-4 rounded futuristic-template-1-card-bg futuristic-card-border",
    imageClassName: "object-cover rounded",
  };
}
