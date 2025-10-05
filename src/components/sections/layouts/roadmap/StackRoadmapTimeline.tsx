'use client';

import React from 'react';
import TimelineCardStackComponent from '@/components/timeline/TimelineCardStack';
import type { TimelineCardStackItem } from '@/types/timeline';
import { getFunAndTrendyTimelineCardStackStyle } from "../../styles/roadmap/stackTimeline/funAndTrendy";
import { getFuturisticTimelineCardStackStyle } from "../../styles/roadmap/stackTimeline/futuristicAndOutOfBox";
import { useSiteTheme } from "../../ThemeProvider";

interface StackRoadmapTimelineProps {
  items: TimelineCardStackItem[];
  className?: string;
}

const StackRoadmapTimeline = ({ 
  items, 
  className = "" 
}: StackRoadmapTimelineProps) => {
  const theme = useSiteTheme();
  const style = theme.styleVariant === 'funAndTrendy'
    ? getFunAndTrendyTimelineCardStackStyle(theme.colorTemplate)
    : getFuturisticTimelineCardStackStyle(theme.colorTemplate);
  return (
    <TimelineCardStackComponent 
      items={items}
      {...style}
      className={className}
    />
  );
};

StackRoadmapTimeline.displayName = 'StackRoadmapTimeline';

export default React.memo(StackRoadmapTimeline);