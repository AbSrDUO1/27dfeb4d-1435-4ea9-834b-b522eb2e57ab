import { AboutStyle } from '../types';
import { funAndTrendyTheme as theme } from '../../shared/themes';
import { ColorTemplate } from '../../shared/themeConfig';
import { getFunAndTrendyColors } from '../../shared/themeConfig';
import { getRetroTextConfig } from '../../shared/styleHelpers';

export function getFunAndTrendyAboutStyle(colorTemplate: ColorTemplate = 1): AboutStyle {
    const colors = getFunAndTrendyColors(colorTemplate);
    
    return {
        section: {
            className: `${theme.spacing.sectionPadding} ${theme.borders.section}`,
            backgroundColor: colors.primary,
            backgroundPattern: theme.backgrounds.texture
        },
        title: {
            className: `${theme.heading.sizes.hero} !tracking-normal ${theme.text.headingClass} ${theme.text.white} ${theme.heading.className}`,
            ...getRetroTextConfig()
        },
        descriptions: {
            className: `${theme.text.white} md:text-2xl ${theme.description.className}`,
            containerClassName: theme.spacing.containerGap
        },
        layout: {
            alignStart: theme.layout.alignStart,
            descriptionClassName: theme.layout.halfWidth
        }
    };
}

export const funAndTrendyAboutStyle = getFunAndTrendyAboutStyle(1);