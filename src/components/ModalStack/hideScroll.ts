export const HIDE_SCROLL_CLASS = 'ljas-hide-scroll';
export const SCROLLBAR_WIDTH_CUSTOM_PROPERTY = '--ljas-scrollbarWidth';

let isScrollBlocked = false;

/**
 * calculate the width of the scrollbar
 */
function getScrollbarWidth() {
  if (document.body.clientHeight <= window.innerHeight) return 0;

  // Creating invisible container
  const outer = document.createElement('div');
  outer.style.setProperty('visibility', 'hidden');
  outer.style.setProperty('overflow', 'scroll'); // forcing scrollbar to appear
  outer.style.setProperty('msOverflowStyle', 'scrollbar'); // needed for WinJS apps
  document.body.appendChild(outer);

  // Creating inner element and placing it in the container
  const inner = document.createElement('div');
  outer.appendChild(inner);

  // Calculating difference between container's full width and the child width
  const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;
  // Removing temporary elements from the DOM
  outer.parentNode?.removeChild(outer);

  return scrollbarWidth || 0;
}

/**
 * Hide the scroll on body
 */
export function hideScroll() {
  if (isScrollBlocked) return;

  const barWidth = getScrollbarWidth();
  const currentPadding = window.getComputedStyle(document.body)?.paddingRight;

  document.body.style.setProperty(
    SCROLLBAR_WIDTH_CUSTOM_PROPERTY,
    `calc(${currentPadding} + ${barWidth}px)`
  );
  document.body.classList.add(HIDE_SCROLL_CLASS);

  isScrollBlocked = true;
}

/**
 * Remove the scroll hidding on body
 */
export function releaseScroll() {
  document.body.classList.remove(HIDE_SCROLL_CLASS);
  document.body.style.setProperty(SCROLLBAR_WIDTH_CUSTOM_PROPERTY, `0px`);
  isScrollBlocked = false;
}
