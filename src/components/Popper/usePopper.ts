import {
  useFloating,
  flip,
  shift,
  UseFloatingProps,
  autoUpdate as autoUpdateFunc,
  Rect,
  size,
} from '@floating-ui/react-dom';
import { useMemo, useRef } from 'react';
import disableROError from '../../utils/disableROError';
import { PopperOptions } from './types';

disableROError();

export const defaultMiddleware = [flip(), shift()];

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
