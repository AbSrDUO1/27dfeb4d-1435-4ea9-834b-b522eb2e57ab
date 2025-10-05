/**
 * IMPORTANT: All sections in a website must use the same styleVariant and colorTemplate
 * Do not mix different styles or color templates across sections
 */

export type StyleVariant = 'funAndTrendy' | 'futuristicAndOutOfBox';

export type ColorTemplate = 1 | 2;

export interface BaseSectionProps {
  styleVariant?: StyleVariant;
  colorTemplate?: ColorTemplate;
}

export function getSectionStyle<T>(
  styleVariant: StyleVariant,
  colorTemplate: ColorTemplate,
  styleGetters: {
    funAndTrendy: (colorTemplate: ColorTemplate) => T;
    futuristicAndOutOfBox: (colorTemplate: ColorTemplate) => T;
  }
): T {
  return styleGetters[styleVariant](colorTemplate);
}