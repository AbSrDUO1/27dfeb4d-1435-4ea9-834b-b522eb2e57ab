import { funAndTrendyTheme as theme } from "../../shared/themes";
import { ColorTemplate } from "../../shared/themeConfig";
import { getFunAndTrendyColors } from "../../shared/themeConfig";

export function getFunAndTrendyTimelineProcessFlowStyle(
  colorTemplate: ColorTemplate = 1
) {
  const colors = getFunAndTrendyColors(colorTemplate);

  return {
    sectionClassName: `${theme.spacing.sectionPadding} h-fit p-0 relative overflow-visible`,
    backgroundColor: colors.primary,
    backgroundPattern: theme.backgrounds.texture,
    gradient: {
      show: false,
      inset: "inset-0",
      rounded: "rounded-none",
      radialColor: "",
      radialOpacity: "0%",
      linearColor: "",
      linearOpacity: "0%",
    },
    lineClassName: colors.timelineInactive,
    activeLineClassName: colors.timelineActive,
    cardClassName: `${colors.shadow} border-2 ${colors.border} rounded-lg`,
    imageClassName: "rounded-lg",
    numberClassName: `${colors.cardInactive} ${colors.shadow} ${colors.textPrimary}`,
    titleClassName: `text-2xl md:text-4xl font-extrabold uppercase leading-[110%] ${theme.fonts.heading.className} ${colors.textPrimary} ${theme.text.white}`,
    descriptionClassName: `text-sm md:text-base font-bold uppercase leading-[120%] ${theme.fonts.body.className} ${colors.textPrimary} ${theme.text.white} opacity-90`,
    listItemClassName: `text-lg ${theme.text.white} opacity-90`,
    iconContainerClassName: `${colors.cardInactive} ${colors.shadow}`,
    iconClassName: colors.textPrimary,
    gapClassName: "gap-20",
    paddingClassName: "px-[var(--width-10)]",
  };
}