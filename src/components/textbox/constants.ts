export const DEFAULT_TITLE_CLASSES = "text-3xl md:text-6xl font-semibold leading-[100%]";
export const DEFAULT_DESCRIPTION_CLASSES = "text-sm md:text-base leading-[120%]";

export const INLINE_TITLE_CLASSES = "text-sm md:text-base leading-[120%]";
export const INLINE_DESCRIPTION_CLASSES = "text-xl md:text-4xl font-light leading-[130%]";

export const GSAP_FADE_CONFIG = {
  from: { opacity: 0 },
  to: {
    opacity: 1,
    duration: 0.8,
    ease: 'power1.in'
  }
};

export const GSAP_SCROLL_TRIGGER_CONFIG = {
  start: 'top 80%',
  toggleActions: 'play none none none'
};