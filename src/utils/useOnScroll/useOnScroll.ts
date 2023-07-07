import { useEffect, useRef, useState } from 'react';

type UseOnScrollOptions = {
  offset?: number;
};

export function useOnScroll(options?: UseOnScrollOptions) {
  const { offset = 0 } = options || {};

  const [scrolled, setScrolled] = useState(false);
  const lastScrolled = useRef(false);

  useEffect(() => {
    function handleScroll() {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      const isScrolled = scrollTop > offset;

      if (isScrolled !== lastScrolled.current) {
        setScrolled(isScrolled);
        lastScrolled.current = isScrolled;
      }
    }
    handleScroll();

    document.addEventListener('scroll', handleScroll, {
      passive: true,
    });

    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [offset]);

  return scrolled;
}

export default useOnScroll;
