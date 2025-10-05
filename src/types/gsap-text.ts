export interface ScrollTriggerConfig {
  trigger: HTMLElement;
  start: string;
  end: string;
  markers: boolean;
  scrub?: boolean;
  toggleActions?: string;
}

export interface GSAPTextBaseProps {
  text: string;
  className?: string;
  duration?: number;
  stagger?: number;
  start?: string;
  end?: string;
  variant?: 'scrub' | 'trigger' | 'words-scrub' | 'words-trigger';
  ariaLabel?: string;
}

export const ANIMATION_CONFIG = {
  scrub: {
    stagger: 0.02,
    useDuration: true
  },
  trigger: {
    stagger: 0.0075,
    useDuration: false,
    duration: 0.6
  },
  'words-scrub': {
    stagger: 0.05,
    useDuration: true
  },
  'words-trigger': {
    stagger: 0.03,
    useDuration: false,
    duration: 0.6
  }
} as const;