import React, { useEffect, useRef } from 'react';

export type MouseEventRedirectOptions<R extends HTMLElement, T extends HTMLElement> = {
  /**
   * Disable the redirection behaviour
   */
  disabled?: boolean;
  /**
   * FUnction allowing to conditionnaly allow redirection
   * return a boolean telling if we need to redirect or not
   */
  checkRedirect?: (mouseEvent: MouseEvent, rootEl: R, targerEL: T | null) => boolean;
  /**
   * Redict only when clicking on a non-interactive element
   */
  nonInteractiveOnly?: boolean;
};

const INTERACTIVE_ELEMENTS_NAME = ['BUTTON', 'SELECT', 'INPUT', 'LABEL', 'OPTION', 'TEXTAREA', 'A'];

/**
 * Test if the given html element is an interactive one (an element we may click on)
 * or is contained in an interactive one
 * @param el an HTMLElement
 * @returns is the element interactive
 */
function isInteractive(rootElement: HTMLElement, el: HTMLElement | null): boolean {
  if (el && rootElement !== el) {
    return INTERACTIVE_ELEMENTS_NAME.includes(el.nodeName) || isInteractive(el, el.parentElement);
  }
  return false;
}

/**
 * Function that will attempt to fire a click to the given Element
 */
function redirectEvent(el: HTMLElement | null, e: MouseEvent) {
  if (el && !el.getAttribute('disabled') && !el.getAttribute('aria-disabled')) {
    try {
      el.dispatchEvent(new MouseEvent(e.type, e));
    } catch (error) {
      // nothing
    }
  }
}

const NOP = () => true;

/**
 * Hook used to redirect mouse event from a container to a trigger element
 */
export function useMouseEventRedirect<R extends HTMLElement, T extends HTMLElement>(
  options?: MouseEventRedirectOptions<R, T>
): [React.Ref<R>, React.Ref<T>] {
  const { checkRedirect = NOP, disabled, nonInteractiveOnly } = options || {};

  const rootRef = useRef<R>(null);
  const triggerRef = useRef<T>(null);

  useEffect(() => {
    const root = rootRef.current;

    const handleClick = (e: MouseEvent) => {
      const triggerEl = triggerRef.current;

      if (root) {
        const targetEl = e.target as HTMLElement;

        const isClickOnTrigger = triggerEl?.contains(targetEl) || triggerEl === targetEl;
        const interactiveCheck = nonInteractiveOnly ? !isInteractive(root, targetEl) : true;

        // check if the click is already on the trigger
        if (!isClickOnTrigger && interactiveCheck && checkRedirect(e, root, triggerEl)) {
          e.preventDefault();
          e.stopPropagation();
          redirectEvent(triggerEl, e);
        }
      }
    };

    if (root && !disabled) {
      root.addEventListener('click', handleClick);
      root.addEventListener('auxclick', handleClick);
    }

    return () => {
      if (root) {
        root.removeEventListener('click', handleClick);
        root.removeEventListener('auxclick', handleClick);
      }
    };
  }, [disabled, nonInteractiveOnly, checkRedirect]);

  return [rootRef, triggerRef];
}

export default useMouseEventRedirect;
