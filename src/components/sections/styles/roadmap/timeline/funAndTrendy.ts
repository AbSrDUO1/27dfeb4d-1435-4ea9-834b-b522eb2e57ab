import { funAndTrendyTheme as theme } from "../../shared/themes";
import { ColorTemplate } from "../../shared/themeConfig";
import { getFunAndTrendyColors } from "../../shared/themeConfig";
import { getRetroTextConfig } from "../../shared/styleHelpers";

export function getFunAndTrendyTimelineStyle(
  colorTemplate: ColorTemplate = 1
) {
  const colors = getFunAndTrendyColors(colorTemplate);

  return {
    sectionClassName: `${theme.spacing.sectionPadding} relative overflow-visible px-[var(--width-10)]`,
    backgroundColor: colors.primary,
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
    gapClassName: "gap-[var(--width-30)] md:gap-30",
    paddingClassName: "p-3",
    cardClassName: `${colors.cardInactive} ${colors.shadow} ${theme.timeline.radius}`,
    imageContainerClassName: `${colors.cardInactive} ${theme.timeline.radius}`,
    mediaClassName: theme.timeline.radius,
    titleClassName: `text-xl md:text-2xl font-extrabold uppercase leading-[110%] ${theme.fonts.heading.className} ${colors.textPrimary}`,
    descriptionClassName: `text-sm md:text-base font-bold uppercase leading-[120%] ${theme.fonts.body.className} ${colors.textPrimary}`,
    sectionTitleClassName: `text-4xl md:text-6xl leading-none uppercase tracking-tight ${theme.text.headingClass} ${theme.text.white} ${theme.fonts.heading.className}`,
    ...getRetroTextConfig(),
  };
}
