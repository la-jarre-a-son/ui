import { hideScroll, releaseScroll } from './hideScroll';

export type ModalStackItem = {
  rootEl: HTMLElement;
  hideOnStack?: boolean;
};

/**
 * Manage a set of stacking modal
 */
function modalStackManager() {
  let stack: ModalStackItem[] = [];

  /**
   * Add the given modal on the stack
   */
  const add = ({ rootEl, hideOnStack }: ModalStackItem) => {
    if (!stack.some((s) => s.rootEl === rootEl)) {
      // manage the top aria-hidden attribute
      const top = stack[stack.length - 1];
      if (top && top.hideOnStack) {
        top.rootEl.setAttribute('aria-hidden', 'true');
      }

      // add the modal to the stack
      stack.push({
        rootEl,
        hideOnStack,
      });

      // block the scroll if needed
      if (stack.find((s) => s.hideOnStack)) {
        hideScroll();
      }
    }

    return () => {
      // remove the modal from the stack
      stack = stack.filter((s) => s.rootEl !== rootEl);

      // manage the top aria-hidden attribute
      const top = stack[stack.length - 1];
      if (top && top.rootEl.getAttribute('aria-hidden') === 'true') {
        top.rootEl.removeAttribute('aria-hidden');
      }

      // manage scroll block
      if (!stack.find((s) => s.hideOnStack)) {
        releaseScroll();
      }
    };
  };

  /**
   * Check is the modals stacked over the given modal contain
   * the given element
   */
  const contains = (modalContainer?: HTMLElement | null, el?: HTMLElement | null) => {
    if (!modalContainer || !el) return true;

    const modalIndex = stack.findIndex(
      (s) => s.rootEl === modalContainer || s.rootEl.contains(modalContainer)
    );
    if (modalIndex === -1 || modalIndex === stack.length - 1) return false;

    let nestedContains = false;
    for (let index = modalIndex + 1; index < stack.length; index++) {
      const nested = stack[index]?.rootEl;
      if (nested === el || nested.contains(el)) {
        nestedContains = true;
      }
    }
    return nestedContains;
  };

  /**
   * Check if the given element belong to a modal
   * with nested ones
   */
  const hasNested = (containerEl?: HTMLElement | null) => {
    if (!containerEl) return false;
    const modalIndex = stack.findIndex(
      (s) => s.rootEl === containerEl || s.rootEl.contains(containerEl)
    );
    return stack.length && modalIndex !== stack.length - 1;
  };

  const modal = (containerEl?: HTMLElement | null) => {
    return {
      hasNested: () => hasNested(containerEl),
      nestedContains: (el?: HTMLElement | null) => contains(containerEl, el),
    };
  };

  /**
   * Return the current stack
   */
  const getStack = () => stack;

  /**
   * Wipe the current stack
   */
  const clear = () => {
    stack = [];
  };

  return {
    hasNested,
    contains,
    getStack,
    clear,
    modal,
    add,
  };
}

export default modalStackManager;
