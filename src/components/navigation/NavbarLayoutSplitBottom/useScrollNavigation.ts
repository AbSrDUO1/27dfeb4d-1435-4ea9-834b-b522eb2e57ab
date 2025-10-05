import { useState, useEffect, useCallback, useMemo } from "react";
import { useLenis } from "lenis/react";
import { NavItem } from "@/types/navigation";
import { SelectorOption } from "@/components/buttons/ButtonSelectorState";

export const useScrollNavigation = (
  navItems: NavItem[],
  defaultSelectorValue?: string,
  onSelectorChange?: (value: string) => void,
  enableScrollDetection: boolean = true
) => {
  const [selectedValue, setSelectedValue] = useState(
    defaultSelectorValue || (navItems[0]?.id ?? "")
  );
  const lenis = useLenis();

  const selectorOptions: SelectorOption[] = useMemo(
    () =>
      navItems.map((item) => ({
        value: item.id,
        label: item.name,
      })),
    [navItems]
  );

  const handleSelectorChange = useCallback(
    (value: string) => {
      setSelectedValue(value);
      onSelectorChange?.(value);

      const element = document.getElementById(value);
      if (element) {
        if (lenis) {
          lenis.scrollTo(`#${value}`, { offset: 0 });
        } else {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    },
    [lenis, onSelectorChange]
  );

  useEffect(() => {
    if (!enableScrollDetection) return;

    const observerOptions = {
      root: null,
      rootMargin: "-50% 0px -50% 0px",
      threshold: 0,
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          setSelectedValue(sectionId);
        }
      });
    };

    const observer = new IntersectionObserver(
      handleIntersection,
      observerOptions
    );

    navItems.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [navItems, enableScrollDetection]);

  return {
    selectedValue,
    selectorOptions,
    handleSelectorChange,
  };
};
