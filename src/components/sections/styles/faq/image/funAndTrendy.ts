import { ImageFAQStyle } from "../types";
import { funAndTrendyTheme as theme } from "../../shared/themes";
import { ColorTemplate } from "../../shared/themeConfig";
import { getRetroTextConfig } from '../../shared/styleHelpers';
import { getFunAndTrendyColors } from "../../shared/themeConfig";

export function getFunAndTrendyImageFAQStyle(
  colorTemplate: ColorTemplate = 1
): ImageFAQStyle {
  const colors = getFunAndTrendyColors(colorTemplate);

  return {
    section: {
      className: `${theme.spacing.sectionPadding} relative`,
      backgroundColor: colors.primary,
      backgroundPattern: theme.backgrounds.texture,
      showBorder: true,
    },
    title: {
      text: "F.A.Q.",
      className: `${theme.heading.sizes.large} ${theme.text.headingClass} ${theme.heading.className} ${theme.text.white} mb-7`,
      ...getRetroTextConfig(),
    },
    description: {
      text: "Find answers to common questions about our platform and services.",
      className: `${theme.description.className} ${theme.text.white} max-w-2xl mx-auto`,
    },
    accordion: {
      className: "max-w-6xl mx-auto",
      itemClassName: `${theme.borders.button} bg-white hover:shadow-[4px_4px_0_#000] transition-all duration-200`,
      itemTitleClassName: `${theme.text.bodyClass} ${theme.heading.className} text-black`,
      itemIconContainerClassName: `${colors.button} ${theme.borders.button}`,
      itemIconClassName: "text-white",
      itemContentClassName: `${theme.fonts.body.className} text-base md:text-lg text-black/80 tracking-tight uppercase font-semibold`,
    },
    image: {
      src: "/images/placeholder7.avif",
      alt: "FAQ Illustration",
      containerClassName: `${colors.secondary} ${theme.borders.button} shadow-[3px_3px_0_#000]`,
      className: "w-full h-auto max-w-md object-contain p-2 rounded-xl",
    },
  };
}

export const funAndTrendyImageFAQStyle = getFunAndTrendyImageFAQStyle(1);
