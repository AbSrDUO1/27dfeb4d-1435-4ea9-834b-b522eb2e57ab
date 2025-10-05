import { funAndTrendyTheme as theme } from "../../shared/themes";
import { ColorTemplate } from "../../shared/themeConfig";
import { getFunAndTrendyColors } from "../../shared/themeConfig";

export function getFunAndTrendyTimelineYearlyStyle(
  colorTemplate: ColorTemplate = 1
) {
  const colors = getFunAndTrendyColors(colorTemplate);

  return {
    sectionClassName: `${theme.spacing.sectionPadding} px-[var(--width-10)]`,
    backgroundColor: `${colors.primary} shadow-[4px_4px_0_#000] border-4 border-black`,
    backgroundPattern: theme.backgrounds.texture,
    gradient: {
      show: false,
      inset: "inset-0",
      rounded: "rounded-none",
      radialOpacity: "0%",
      linearOpacity: "0%",
      radialColor: "",
      linearColor: "",
    },
    showAurora: false,
    lineClassName: colors.timelineInactive,
    activeLineClassName: colors.timelineActive,
    dotClassName: `${colors.timelineActive} shadow-[2px_1px_0_#000]`,
    yearClassName: `${theme.heading.sizes.year} font-extrabold uppercase leading-[100%] ${theme.fonts.heading.className} ${colors.textSecondary} mb-3 md:mb-0 block`,
    titleClassName: `text-xl uppercase font-bold leading-[120%] ${theme.fonts.heading.className} ${colors.textSecondary}`,
    descriptionClassName: `text-sm md:text-base font-bold uppercase leading-[120%] ${theme.fonts.body.className} ${colors.textSecondary}/90`,
    gapClassName: "gap-[var(--width-10)] md:gap-10",
    paddingClassName: "p-[calc(var(--width-10)/2)] pl-[var(--width-10)] md:pl-[calc(var(--width-10)/2)]",
    marginClassName: "mb-[var(--width-10)] md:mb-10 last:mb-0",
  };
}
