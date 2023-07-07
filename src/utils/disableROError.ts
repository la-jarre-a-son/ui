let alreadyDisabled = false;

/**
 * catch and stop propagation of ResizeObserver loop limit exceeded errors
 * https://stackoverflow.com/questions/49384120/resizeobserver-loop-limit-exceeded
 */
export function disableROError() {
  if (window && !alreadyDisabled) {
    window.addEventListener(
      'error',
      function ignoreResizeObserverLoopLimitError(e: ErrorEvent) {
        if (e.message === 'ResizeObserver loop limit exceeded') {
          e.stopImmediatePropagation();
          e.stopPropagation();
          return;
        }
      },
      true
    );
    alreadyDisabled = true;
  }
}

export default disableROError;
