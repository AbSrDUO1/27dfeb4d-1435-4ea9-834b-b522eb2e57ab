import { LucideIcon } from 'lucide-react';

export interface TimelineItem {
  title: string;
  description: string;
  video?: string;
  image?: string;
  mobileImage?: string;
}

export interface TimelineCardStackItem {
  id: number;
  title: string;
  description: string;
  image: string;
}

export interface TimelineProcessFlowListItem {
  icon: LucideIcon;
  text: string;
}

export interface TimelineProcessFlowItem {
  id: string;
  title: string;
  description: string;
  image: string;
  items: TimelineProcessFlowListItem[];
  reverse: boolean;
}

export interface TimelineProcessFlowProps {
  items: TimelineProcessFlowItem[];
  className?: string;
}