import { useMemo, useRef } from 'react';
import {
  useFloating,
  flip,
  shift,
  UseFloatingProps,
  autoUpdate as autoUpdateFunc,
  Rect,
  Placement,
  Strategy,
  size,
} from '@floating-ui/react-dom';
import { Middleware } from '@floating-ui/core';

import disableROError from '../../utils/disableROError';

disableROError();

export const defaultMiddleware = [flip(), shift()];

/* Options */

export type PopperOptions = {
  /**
   * The popper placement
   */
  placement?: Placement;
  /**
   * Automatically update the placement when
   * reference change size/position/scroll
   * (note that auto update as some performance overhead)
   */
  autoUpdate?: boolean;
  /**
   * The floating-ui popper placement strategy
   */
  strategy?: Strategy;
  /**
   * The floating-ui middleware to use, override the defaults ones
   */
  middleware?: Middleware[];
  /**
   * Match the width of the popper with the one of the
   * reference element
   */
  matchWidth?: boolean;
  /**
   * Set a max height to the popper container equal to the available space
   * When passing a number, use this value as a minimal height limit
   */
  limitHeight?: boolean | number;
};

/**
 * Hook used to position an element relatively to a
 * given refence element
 */
export function usePopper(popperOptions?: PopperOptions) {
  const {
    strategy,
    placement,
    matchWidth,
    autoUpdate = true,
    limitHeight = false,
    middleware = defaultMiddleware,
  } = popperOptions || {};

  const rect = useRef<Rect | null>(null);

  const defaultOptions = useMemo(() => {
    const otps: UseFloatingProps = {
      strategy,
      placement,
      middleware: [
        ...middleware,
        {
          name: 'measureReference',
          fn(params) {
            // middleware that copy the reference rect
            rect.current = params.rects.reference;
            return params;
          },
        },
      ],
      whileElementsMounted: autoUpdate ? autoUpdateFunc : undefined,
    };

    if (matchWidth) {
      otps.middleware?.push(
        size({
          apply({ rects, elements }) {
            Object.assign(elements.floating.style, {
              minWidth: `${rects.reference.width}px`,
              maxWidth: `${rects.reference.width}px`,
            });
          },
        })
      );
    }

    if (limitHeight) {
      otps.middleware?.push(
        size({
          apply({ availableHeight, elements }) {
            const maxHeight =
              typeof limitHeight === 'number'
                ? Math.min(availableHeight - 8, limitHeight)
                : availableHeight - 8;
            Object.assign(elements.floating.style, {
              maxHeight: `${maxHeight}px`,
            });
          },
        })
      );
    }

    return otps;
  }, [placement, autoUpdate, strategy, middleware, matchWidth, limitHeight]);

  const floating = useFloating(defaultOptions);

  return {
    ...floating,
    rect: rect.current,
  };
}

export default usePopper;
