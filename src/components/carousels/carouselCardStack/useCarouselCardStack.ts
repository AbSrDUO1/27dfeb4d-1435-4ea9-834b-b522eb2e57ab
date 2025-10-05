import { useEffect, useState, RefObject } from 'react';
import gsap from 'gsap';
import { Draggable } from 'gsap/Draggable';

gsap.registerPlugin(Draggable);

export const useCarouselCardStack = (
  containerRef: RefObject<HTMLDivElement | null>,
  listRef: RefObject<HTMLDivElement | null>,
  totalCards: number
) => {
  const [dragStatus, setDragStatus] = useState('grab');
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!containerRef.current || !listRef.current || totalCards < 7) {
      return;
    }

    const container = containerRef.current;
    const list = listRef.current;
    const cards = Array.from(list.querySelectorAll('[data-flick-cards-item]'));
    const sliderWidth = container.offsetWidth;
    const threshold = 0.1;
    let currentActiveIndex = 0;

    const draggers: HTMLDivElement[] = [];
    cards.forEach(card => {
      const dragger = document.createElement('div');
      dragger.setAttribute('data-flick-cards-dragger', '');
      card.appendChild(dragger);
      draggers.push(dragger);
    });

    function getConfig(i: number, currentIndex: number) {
      let diff = i - currentIndex;
      if (diff > totalCards / 2) diff -= totalCards;
      else if (diff < -totalCards / 2) diff += totalCards;

      const isMobile = window.innerWidth < 1024;

      switch (diff) {
        case  0: return { x: 0,   y: 0,   rot: 0,  s: 1,   o: 1, z: 5 };
        case  1: return { x: isMobile ? 15 : 25,  y: 1,   rot: isMobile ? 5 : 10, s: 0.9, o: 1, z: 4 };
        case -1: return { x: isMobile ? -15 : -25, y: 1,   rot: isMobile ? -5 : -10, s: 0.9, o: 1, z: 4 };
        case  2: return { x: isMobile ? 28 : 45,  y: 5,   rot: isMobile ? 8 : 15, s: 0.8, o: 1, z: 3 };
        case -2: return { x: isMobile ? -28 : -45, y: 5,   rot: isMobile ? -8 : -15, s: 0.8, o: 1, z: 3 };
        default:
          const dir = diff > 0 ? 1 : -1;
          return { x: (isMobile ? 35 : 55) * dir, y: 5, rot: (isMobile ? 10 : 20) * dir, s: 0.6, o: 0, z: 2 };
      }
    }

    function renderCards(currentIndex: number) {
      cards.forEach((card, i) => {
        const cfg = getConfig(i, currentIndex);
        let status;

        if (cfg.x === 0)        status = 'active';
        else if (cfg.x === 25)  status = '2-after';
        else if (cfg.x === -25) status = '2-before';
        else if (cfg.x === 45)  status = '3-after';
        else if (cfg.x === -45) status = '3-before';
        else                    status = 'hidden';

        card.setAttribute('data-flick-cards-item-status', status);
        (card as HTMLElement).style.zIndex = cfg.z.toString();

        gsap.to(card, {
          duration: 0.6,
          ease: 'elastic.out(1.2, 1)',
          xPercent: cfg.x,
          yPercent: cfg.y,
          rotation: cfg.rot,
          scale: cfg.s,
          opacity: cfg.o
        });
      });
    }

    renderCards(currentActiveIndex);

    let lastWidth = window.innerWidth;
    const handleResize = () => {
      const currentWidth = window.innerWidth;
      const wasAbove1024 = lastWidth >= 1024;
      const isAbove1024 = currentWidth >= 1024;
      
      if (wasAbove1024 !== isAbove1024) {
        renderCards(currentActiveIndex);
      }
      
      lastWidth = currentWidth;
    };

    window.addEventListener('resize', handleResize);

    let pressX = 0;
    let pressY = 0;

    const draggableInstances = Draggable.create(draggers, {
      type: 'x',
      edgeResistance: 0.8,
      bounds: { minX: -sliderWidth / 2, maxX: sliderWidth / 2 },
      inertia: false,

      onPress() {
        pressX = this.pointerX;
        pressY = this.pointerY;
        setDragStatus('grabbing');
      },

      onDrag() {
        const rawProgress = this.x / sliderWidth;
        const progress = Math.min(1, Math.abs(rawProgress));
        const direction = rawProgress > 0 ? -1 : 1;
        const nextIndex = (currentActiveIndex + direction + totalCards) % totalCards;

        cards.forEach((card, i) => {
          const from = getConfig(i, currentActiveIndex);
          const to = getConfig(i, nextIndex);
          const mix = (prop: string) => from[prop as keyof typeof from] + (to[prop as keyof typeof to] - from[prop as keyof typeof from]) * progress;

          gsap.set(card, {
            xPercent: mix('x'),
            yPercent: mix('y'),
            rotation: mix('rot'),
            scale: mix('s'),
            opacity: mix('o')
          });
        });
      },

      onRelease() {
        setDragStatus('grab');

        const releaseX = this.pointerX;
        const releaseY = this.pointerY;
        const dragDistance = Math.hypot(releaseX - pressX, releaseY - pressY);

        const raw = this.x / sliderWidth;
        let shift = 0;
        if (raw > threshold) shift = -1;
        else if (raw < -threshold) shift = 1;

        if (shift !== 0) {
          currentActiveIndex = (currentActiveIndex + shift + totalCards) % totalCards;
          setActiveIndex(currentActiveIndex);
          renderCards(currentActiveIndex);
        }

        gsap.to(this.target, {
          x: 0,
          duration: 0.3,
          ease: 'power1.out'
        });

        if (dragDistance < 4) {
          this.target.style.pointerEvents = 'none';

          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              const el = document.elementFromPoint(releaseX, releaseY);
              if (el) {
                const evt = new MouseEvent('click', {
                  view: window,
                  bubbles: true,
                  cancelable: true
                });
                el.dispatchEvent(evt);
              }

              this.target.style.pointerEvents = 'auto';
            });
          });
        }
      }
    });

    return () => {
      window.removeEventListener('resize', handleResize);
      draggableInstances.forEach(instance => instance.kill());
      draggers.forEach(dragger => dragger.remove());
    };
  }, [containerRef, listRef, totalCards]);

  return { dragStatus, activeIndex };
};