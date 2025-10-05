export type ColorTemplate = 1 | 2;

export interface ColorThemeProps {
  colorTemplate?: ColorTemplate;
}

export interface TimelineStyle {
  section: {
    className: string;
    backgroundColor: string;
    title?: string;
    showBorder?: boolean;
    fadeBottom?: boolean;
  };
  gradient?: {
    show: boolean;
    inset: string;
    rounded: string;
    radialOpacity: string;
    linearOpacity: string;
    linearOpacityMobile?: string;
    radialColor: string;
    linearColor: string;
  };
  timeline: {
    lineColor: string;
    activeLineColor: string;
    itemBackground: string;
    itemActiveBackground: string;
    dotColor: string;
    dotActiveColor: string;
  };
  typography: {
    titleClassName: string;
    descriptionClassName: string;
    yearClassName?: string;
    listItemClassName?: string;
  };
  colors: {
    textPrimary: string;
    textSecondary: string;
    border: string;
    shadow: string;
  };
  spacing: {
    gap: string;
    padding: string;
    margin: string;
  };
  effects?: {
    backdrop?: string;
    glow?: string;
    glass?: string;
  };
}

export interface TimelineYearlyStyle extends TimelineStyle {
  yearDisplay: {
    className: string;
    textColor: string;
    backgroundColor?: string;
  };
}

export interface TimelineProcessFlowStyle extends TimelineStyle {
  processStep: {
    numberBackground: string;
    numberTextColor: string;
    iconBackground: string;
    iconTextColor: string;
  };
  card: {
    background: string;
    activeBackground: string;
    border: string;
    shadow: string;
  };
}

export interface RegularTimelineStyle extends TimelineStyle {
  card: {
    background: string;
    activeBackground: string;
    border: string;
    shadow: string;
    imageContainer: string;
  };
  media: {
    borderRadius: string;
    shadow: string;
  };
}

export interface TimelineCardStackStyle extends TimelineStyle {
  card: {
    background: string;
    activeBackground: string;
    border: string;
    shadow: string;
    height: string;
    stickyPosition: string;
  };
  stepNumber: {
    background: string;
    textColor: string;
    size: string;
  };
  content: {
    titleClassName: string;
    descriptionClassName: string;
    gap: string;
  };
  image: {
    containerClassName: string;
    className: string;
  };
}