import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Draggable } from 'gsap/Draggable';

gsap.registerPlugin(Draggable);

interface UseCarouselDragScrollProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
}

export const useCarouselDragScroll = ({ containerRef }: UseCarouselDragScrollProps) => {
  const dragFirst = useRef<Draggable | null>(null);
  const dragSecond = useRef<Draggable | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const easeBeforeRelease = { duration: 0.2, ease: 'Power2.easeOut' };
    const easeAfterRelease = { duration: 1, ease: 'elastic.out(1,0.75)' };

    let activeDeg = 4;
    let inactiveDeg = -4;

    const list = container;
    let firstEl: HTMLElement | null, secondEl: HTMLElement | null;
    let full: number, t: number;
    let isAnimating = false;

    function restack() {
      const items = Array.from(list.querySelectorAll(':scope > [data-stacked-cards-card]')) as HTMLElement[];
      items.forEach(function (item) {
        item.classList.remove('is--active', 'is--second');
      });

      if (items[0]) {
        items[0].style.zIndex = '3';
        items[0].style.transform = `rotate(${activeDeg}deg)`;
        items[0].style.pointerEvents = 'auto';
        items[0].classList.add('is--active');
      }

      if (items[1]) {
        items[1].style.zIndex = '2';
        items[1].style.transform = `rotate(${inactiveDeg}deg)`;
        items[1].style.pointerEvents = 'none';
        items[1].classList.add('is--second');
      }

      if (items[2]) {
        items[2].style.zIndex = '1';
        items[2].style.transform = `rotate(${activeDeg}deg)`;
      }

      items.slice(3).forEach(function (item) {
        item.style.zIndex = '0';
        item.style.transform = `rotate(${inactiveDeg}deg)`;
      });
    }

    function setupDraggables() {
      restack();

      const items = Array.from(list.querySelectorAll(':scope > [data-stacked-cards-card]')) as HTMLElement[];
      firstEl = items[0];
      secondEl = items[1];

      if (!firstEl || !secondEl) return;

      const width = firstEl.getBoundingClientRect().width;
      full = width * 1.15;
      t = width * 0.1;

      if (dragFirst.current) {
        dragFirst.current.kill();
        dragFirst.current = null;
      }
      if (dragSecond.current) {
        dragSecond.current.kill();
        dragSecond.current = null;
      }

      dragFirst.current = Draggable.create(firstEl, {
        type: 'x',
        onPress() {
          firstEl!.classList.add('is--dragging');
        },
        onRelease() {
          firstEl!.classList.remove('is--dragging');
        },
        onDrag() {
          let raw = this.x;
          if (Math.abs(raw) > full) {
            const over = Math.abs(raw) - full;
            raw = (raw > 0 ? 1 : -1) * (full + over * 0.1);
          }
          const currentRotation = gsap.getProperty(firstEl!, "rotation");
          gsap.set(firstEl!, { x: raw, rotation: currentRotation });
        },
        onDragEnd() {
          const x = this.x;
          const dir = x > 0 ? 'right' : 'left';

          this.disable();
          dragSecond.current?.enable();
          firstEl!.style.pointerEvents = 'none';
          secondEl!.style.pointerEvents = 'auto';

          if (Math.abs(x) <= t) {
            gsap.to(firstEl!, {
              x: 0, rotation: activeDeg,
              ...easeBeforeRelease,
              onComplete: resetCycle
            });
          }
          else if (Math.abs(x) <= full) {
            flick(dir, false, x);
          }
          else {
            flick(dir, true);
          }
        }
      })[0];

      dragSecond.current = Draggable.create(secondEl, {
        type: 'x',
        onPress() {
          secondEl!.classList.add('is--dragging');
        },
        onRelease() {
          secondEl!.classList.remove('is--dragging');
        },
        onDrag() {
          let raw = this.x;
          if (Math.abs(raw) > full) {
            const over = Math.abs(raw) - full;
            raw = (raw > 0 ? 1 : -1) * (full + over * 0.2);
          }
          const currentRotation = gsap.getProperty(secondEl!, "rotation");
          gsap.set(secondEl!, { x: raw, rotation: currentRotation });
        },
        onDragEnd() {
          gsap.to(secondEl!, {
            x: 0, rotation: inactiveDeg,
            ...easeBeforeRelease
          });
        }
      })[0];

      dragFirst.current?.enable();
      dragSecond.current?.disable();
      firstEl.style.pointerEvents = 'auto';
      secondEl.style.pointerEvents = 'none';
    }

    function flick(dir: string, skipHome = false, releaseX = 0, fromButton = false) {
      if (!(dir === 'left' || dir === 'right')) {
        dir = activeDeg > 0 ? 'right' : 'left';
      }

      if (fromButton && isAnimating) return;
      if (fromButton) isAnimating = true;

      dragFirst.current?.disable();

      const card = list.querySelector('[data-stacked-cards-card]') as HTMLElement;
      const exitX = dir === 'right' ? full : -full;

      if (skipHome) {
        const visualX = gsap.getProperty(card, 'x');
        const currentRotation = gsap.getProperty(card, 'rotation');
        list.appendChild(card);
        [activeDeg, inactiveDeg] = [inactiveDeg, activeDeg];
        restack();
        gsap.fromTo(
          card,
          { x: visualX, rotation: currentRotation },
          {
            x: 0, rotation: activeDeg, ...easeAfterRelease, onComplete: () => {
              resetCycle();
              if (fromButton) isAnimating = false;
            }
          }
        );
      } else {
        const currentRotation = gsap.getProperty(card, 'rotation');
        gsap.fromTo(
          card,
          { x: releaseX, rotation: currentRotation },
          {
            x: exitX,
            rotation: currentRotation,
            ...easeBeforeRelease,
            onComplete() {
              gsap.set(card, { x: 0, rotation: activeDeg });
              list.appendChild(card);
              [activeDeg, inactiveDeg] = [inactiveDeg, activeDeg];
              resetCycle();
              gsap.fromTo(
                card,
                { x: exitX, rotation: activeDeg },
                {
                  x: 0, rotation: activeDeg, ...easeAfterRelease, onComplete: () => {
                    resetCycle();
                    if (fromButton) isAnimating = false;
                  }
                }
              );
            }
          }
        );
      }
    }

    function resetCycle() {
      list.querySelectorAll('[data-stacked-cards-card].is--dragging').forEach(function (el) {
        el.classList.remove('is--dragging');
      });
      setupDraggables();
    }

    setupDraggables();

    const nextBtn = container.parentElement?.querySelector('[data-stacked-cards="next"]');
    const prevBtn = container.parentElement?.querySelector('[data-stacked-cards="prev"]');

    if (nextBtn) {
      (nextBtn as HTMLElement).onclick = function () { flick('right', false, 0, true); };
    }

    if (prevBtn) {
      (prevBtn as HTMLElement).onclick = function () { flick('left', false, 0, true); };
    }

    return () => {
      if (dragFirst.current) {
        dragFirst.current.kill();
        dragFirst.current = null;
      }
      if (dragSecond.current) {
        dragSecond.current.kill();
        dragSecond.current = null;
      }
    };
  }, [containerRef]);
};