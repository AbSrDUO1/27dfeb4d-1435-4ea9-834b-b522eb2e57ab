'use client';

import React from 'react';
import TimelineYearlyComponent, { type TimelineYearlyItem } from '@/components/timeline/TimelineYearly';
import { getFunAndTrendyTimelineYearlyStyle } from "../../styles/roadmap/yearTimeline/funAndTrendy";
import { getFuturisticTimelineYearlyStyle } from "../../styles/roadmap/yearTimeline/futuristicAndOutOfBox";
import { useSiteTheme } from "../../ThemeProvider";

interface YearRoadmapTimelineProps {
  items: TimelineYearlyItem[];
  className?: string;
}

const YearRoadmapTimeline = ({ 
  items, 
  className = "" 
}: YearRoadmapTimelineProps) => {
  const theme = useSiteTheme();
  const style = theme.styleVariant === 'funAndTrendy'
    ? getFunAndTrendyTimelineYearlyStyle(theme.colorTemplate)
    : getFuturisticTimelineYearlyStyle(theme.colorTemplate);
  return (
    <TimelineYearlyComponent 
      items={items}
      {...style}
      className={className}
    />
  );
};

YearRoadmapTimeline.displayName = 'YearRoadmapTimeline';

export default React.memo(YearRoadmapTimeline);