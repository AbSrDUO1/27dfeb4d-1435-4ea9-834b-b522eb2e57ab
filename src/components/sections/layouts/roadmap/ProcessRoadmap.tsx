'use client';

import React from 'react';
import TimelineProcessFlowComponent from '@/components/timeline/TimelineProcessFlow';
import type { TimelineProcessFlowItem } from '@/types/timeline';
import { getFunAndTrendyTimelineProcessFlowStyle } from "../../styles/roadmap/processTimeline/funAndTrendy";
import { getFuturisticTimelineProcessFlowStyle } from "../../styles/roadmap/processTimeline/futuristicAndOutOfBox";
import { useSiteTheme } from "../../ThemeProvider";

interface ProcessRoadmapTimelineProps {
  items: TimelineProcessFlowItem[];
  className?: string;
}

const ProcessRoadmapTimeline = ({ 
  items, 
  className = "" 
}: ProcessRoadmapTimelineProps) => {
  const theme = useSiteTheme();
  const style = theme.styleVariant === 'funAndTrendy'
    ? getFunAndTrendyTimelineProcessFlowStyle(theme.colorTemplate)
    : getFuturisticTimelineProcessFlowStyle(theme.colorTemplate);
  return (
    <TimelineProcessFlowComponent 
      items={items}
      {...style}
      className={className}
    />
  );
};

ProcessRoadmapTimeline.displayName = 'ProcessRoadmapTimeline';

export default React.memo(ProcessRoadmapTimeline);