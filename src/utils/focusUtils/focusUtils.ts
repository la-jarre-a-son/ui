type El = HTMLElement | HTMLButtonElement | HTMLAnchorElement | HTMLInputElement;

type FocusOptions = {
  preventScroll?: boolean;
};

/**
 * Test if an DOM element is focusable
 *
 * @param element The element to test
 * @param allowNegativeTabIndex Indicate if elements with tabIndex "-1" must be considered focusable
 */
export function isFocusable<T extends El>(element: T, allowNegativeTabIndex = false): boolean {
  if (!element) return false;

  if (
    element.tabIndex > 0 ||
    (element.tabIndex === 0 && element.getAttribute('tabIndex') !== null) ||
    (allowNegativeTabIndex && element.tabIndex === -1 && element.getAttribute('tabIndex') !== null)
  ) {
    return true;
  }
  if ((element as HTMLButtonElement).disabled) {
    return false;
  }
  switch (element.nodeName) {
    case 'A':
      return (
        !!(element as HTMLAnchorElement).href && (element as HTMLAnchorElement).rel !== 'ignore'
      );
    case 'INPUT':
      return (
        (element as HTMLInputElement).type !== 'hidden' &&
        (element as HTMLInputElement).type !== 'file'
      );
    case 'BUTTON':
    case 'SELECT':
    case 'TEXTAREA':
      return true;
    default:
      return false;
  }
}

/**
 * Try to focus a given DOM elements
 * @param element Element to focus
 * @param allowNegativeTabIndex Indicate if elements with tabIndex "-1" must be considered focusable
 * @returns true if focus went well, false if the element was not focusable or if an error occured
 */
export function attemptFocus<T extends El>(
  element?: T | null,
  allowNegativeTabIndex = false,
  options?: FocusOptions
): boolean {
  if (!element || !isFocusable(element, allowNegativeTabIndex)) {
    return false;
  }
  try {
    element.focus(options);
  } catch (e) {
    return false;
  }
  return document.activeElement === element;
}

/**
 * Focus the first focusable descendant of a given DOM element
 * @param element The parent element
 * @param includeNegativeTabIndex Indicate if elements with tabIndex "-1" must be considered focusable
 * @return true if the focus went well, false if no focusable element was found
 */
export function focusFirstDescendant<T extends El>(
  element: T,
  includeNegativeTabIndex = false,
  options?: FocusOptions
): boolean {
  if (element && element.childNodes) {
    for (let i = 0; i < element.childNodes.length; i += 1) {
      const child = element.childNodes[i] as El;
      if (
        attemptFocus(child, includeNegativeTabIndex, options) ||
        focusFirstDescendant(child, includeNegativeTabIndex, options)
      ) {
        return true;
      }
    }
  }
  return false;
}

/**
 * Focus the last focusable descendant of a given DOM element
 * @param element The parent element
 * @param includeNegativeTabIndex Indicate if elements with tabIndex "-1" must be considered focusable
 * @return true if the focus went well, false if no focusable element was found
 */
export function focusLastDescendant<T extends El>(
  element: T,
  includeNegativeTabIndex = false,
  options?: FocusOptions
): boolean {
  if (element && element.childNodes) {
    for (let i = element.childNodes.length - 1; i >= 0; i -= 1) {
      const child = element.childNodes[i] as El;
      if (
        attemptFocus(child, includeNegativeTabIndex, options) ||
        focusLastDescendant(child, includeNegativeTabIndex, options)
      ) {
        return true;
      }
    }
  }
  return false;
}

/**
 * Return the first focusable descendant of the given element
 */
export function getFirstFocusableDescendant(
  element?: HTMLElement | null,
  allowNegativeTabIndex?: boolean
): HTMLElement | undefined {
  if (element && element.childNodes) {
    for (let i = 0; i < element.childNodes.length; i += 1) {
      const child = element.childNodes[i] as El;
      if (isFocusable(child, allowNegativeTabIndex)) {
        return child;
      } else {
        const nestedFocusable = getFirstFocusableDescendant(child, allowNegativeTabIndex);
        if (nestedFocusable) {
          return nestedFocusable;
        }
      }
    }
  }
}

/**
 * Return the last focusable descendant of the given element
 */
export function getLastFocusableDescendant(
  element?: HTMLElement | null,
  allowNegativeTabIndex?: boolean
): HTMLElement | undefined {
  if (element && element.childNodes) {
    for (let i = element.childNodes.length - 1; i >= 0; i -= 1) {
      const child = element.childNodes[i] as El;
      if (isFocusable(child, allowNegativeTabIndex)) {
        return child;
      } else {
        const nestedFocusable = getLastFocusableDescendant(child, allowNegativeTabIndex);
        if (nestedFocusable) {
          return nestedFocusable;
        }
      }
    }
  }
}

/**
 * Return the next focusable sibling element
 */
export function getNextFocusable(
  element?: HTMLElement | null,
  allowNegativeTabIndex?: boolean
): Element | undefined {
  if (!element) return;
  const nextSibling = element.nextElementSibling as HTMLElement;
  if (!nextSibling) return;
  return isFocusable(nextSibling, allowNegativeTabIndex)
    ? nextSibling
    : getNextFocusable(nextSibling, allowNegativeTabIndex);
}

/**
 * Return the previous focusable sibling
 */
export function getPreviousFocusable(
  element?: HTMLElement | null,
  allowNegativeTabIndex?: boolean
): Element | undefined {
  if (!element) return;
  const previousSibling = element.previousSibling as HTMLElement;
  if (!previousSibling) return;
  return isFocusable(previousSibling, allowNegativeTabIndex)
    ? previousSibling
    : getPreviousFocusable(previousSibling, allowNegativeTabIndex);
}

/**
 * Test is the given element is outside the given container
 */
export function isOutside(
  container: HTMLElement | null,
  element: HTMLElement | null
): boolean | undefined {
  if (!container || !element) return undefined;
  return container !== element && !container.contains(element);
}

type FocusByTextParam = {
  rootEl: HTMLElement;
  startEl?: HTMLElement;
  text: string;
};

/**
 * Function that will find and focus the next element of the given
 * container containing the given text as innterText, starting with
 * the given start element
 * @return has something been focused
 */
export function focusByText({ rootEl, startEl = rootEl, text }: FocusByTextParam): boolean {
  if (!startEl || !rootEl || !text) return false;

  let loopStartEl: HTMLElement | null = null;

  return (function findFocus(currentEl: HTMLElement, lastEl?: HTMLElement): boolean {
    // we already looped though all of the items or recurcive fucked-up
    if (currentEl === loopStartEl || lastEl === currentEl) return false;
    if (!loopStartEl) loopStartEl = currentEl;

    const next =
      currentEl === rootEl
        ? getFirstFocusableDescendant(rootEl, true)
        : (getNextFocusable(currentEl, true) as HTMLElement);

    if (!next) {
      // loop to the first element
      return findFocus(rootEl, currentEl);
    } else if (next?.textContent?.toUpperCase()?.startsWith(text?.toUpperCase())) {
      // the text are matching
      return attemptFocus(next, true);
    }
    // trying next element
    return findFocus(next, currentEl);
  })(startEl);
}
