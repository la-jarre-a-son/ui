import { useEffect, useState } from 'react';

type UseAutoScrollOptions = {
  targetQuerySelector?: string;
  targetElement?: HTMLElement | null;
  delayScroll?: number;
};

export function useAutoScroll<T extends HTMLElement>(
  containerEl: T | undefined | null,
  options?: UseAutoScrollOptions
) {
  const [inited, setInited] = useState(false);
  const {
    targetQuerySelector = '[aria-selected=true]',
    targetElement,
    delayScroll = 0,
  } = options || {};

  // Should be call at each render, and particularly after first mount
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (containerEl) {
        const scrollToElement: HTMLElement | null =
          targetElement === undefined
            ? containerEl.querySelector(targetQuerySelector)
            : targetElement;

        if (scrollToElement) {
          // NOTE: scrollIntoView is not limited to direct parent, so it will scroll the whole page
          // to the element... so scrollTo method is prefered here
          // scrollToElement.scrollIntoView({ behavior, block: 'nearest', inline: 'nearest' });

          let top = 0,
            left = 0;

          if (containerEl.scrollTop > scrollToElement.offsetTop) {
            top = scrollToElement.offsetTop;
          } else if (
            containerEl.scrollTop + containerEl.offsetHeight <
            scrollToElement.offsetTop + scrollToElement.offsetHeight
          ) {
            top = scrollToElement.offsetTop;
          } else {
            top = containerEl.scrollTop;
          }

          if (containerEl.scrollLeft > scrollToElement.offsetLeft) {
            left = scrollToElement.offsetLeft;
          } else if (
            containerEl.scrollLeft + containerEl.offsetWidth <
            scrollToElement.offsetLeft + scrollToElement.offsetWidth
          ) {
            left = scrollToElement.offsetLeft;
          } else {
            left = containerEl.scrollLeft;
          }

          containerEl.scrollTo({ top, left });
        }
      }
    }, delayScroll);

    if (!inited) {
      setInited(true);
    }
    return () => clearTimeout(timeout);
  });
}

export default useAutoScroll;
