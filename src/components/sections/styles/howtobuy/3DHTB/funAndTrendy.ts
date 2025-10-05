
import { HowToBuyStyle } from '../types';
import { funAndTrendyTheme as theme } from '../../shared/themes';
import { ColorTemplate } from '../../shared/themeConfig';
import { getRetroTextConfig } from '../../shared/styleHelpers';
import { getFunAndTrendyColors } from '../../shared/themeConfig';

export function getFunAndTrendyHowToBuyStyle(colorTemplate: ColorTemplate = 1): HowToBuyStyle {
    const colors = getFunAndTrendyColors(colorTemplate);
    
    return {
        section: {
            className: `${theme.spacing.sectionPadding} ${theme.borders.section}`,
            backgroundColor: colors.tertiary,
            backgroundPattern: theme.backgrounds.texture
        },
        title: {
            className: `text-8xl md:!text-[clamp(4.75rem,7.5vw,7.5rem)] text-center ${theme.text.headingClass} ${theme.text.white} ${theme.heading.className}`,
            ...getRetroTextConfig(),
        },
        bento: {
            className: '',
            gridClassName: '',
            itemClassName: '',
            textContainerClassName: 'gap-3',
            imageContainerClassName: `!h-70 ${colors.tertiary} flex items-end`,
            imageClassName: '!h-3/4 w-auto object-contain',
            titleClassName: `${theme.heading.className} text-xl md:!text-2xl font-bold`,
            descriptionClassName: `${theme.description.className} text-sm md:!text-base`,
            enableAnimation: true
        }
    };
}

export const funandtrendyStyle = getFunAndTrendyHowToBuyStyle(1);