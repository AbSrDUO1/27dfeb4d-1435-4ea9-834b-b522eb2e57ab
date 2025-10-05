import { funAndTrendyTheme as theme } from "../../shared/themes";
import { ColorTemplate } from "../../shared/themeConfig";
import { getFunAndTrendyColors } from "../../shared/themeConfig";

export function getFunAndTrendyTimelineCardStackStyle(
  colorTemplate: ColorTemplate = 1
) {
  const colors = getFunAndTrendyColors(colorTemplate);

  return {
    sectionClassName: `relative overflow-visible h-fit p-[var(--width-10)]`,
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
    gapClassName: "gap-[var(--width-25)] md:gap-[6.25vh]",
    cardClassName: `${colors.cardInactive} ${colors.shadow} ${colors.border} rounded border-4`,
    cardHeight: "h-[150vw] md:h-[75vh]",
    cardStickyPosition: "top-[20vw] md:top-[12.5vh]",
    stepNumberClassName: `${colors.button} border-1 shadow-[2px_1px_0_#000]`,
    stepNumberSize: "h-8 w-[var(--height-8)]",
    titleClassName: `text-4xl md:text-5xl font-extrabold uppercase leading-[100%] ${colors.textPrimary} ${theme.fonts.heading.className}`,
    descriptionClassName: `text-base leading-[110%] ${colors.textPrimary} ${theme.fonts.body.className}`,
    contentGapClassName: "gap-3 md:gap-6",
    imageContainerClassName: "border-4 border-white shadow-[4px_4px_0px_#000] overflow-hidden rounded-lg",
    imageClassName: "object-cover",
  };
}
