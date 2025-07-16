import { useState, useEffect, useRef } from "react";

/**
 * Custom hook to hide navbar when scrolling down past 50px,
 * and show it when scrolling up.
 *
 * @returns {boolean} isVisible – whether the navbar should be shown.
 */
export function useNavbarHide() {
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    function onScroll() {
      const currentScrollY = window.scrollY;

      // If scrolled down more than 50px and scrolling down → hide
      if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
        setIsVisible(false);
      }
      // If scrolling up → show
      else if (currentScrollY < lastScrollY.current) {
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    }

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return isVisible;
}
