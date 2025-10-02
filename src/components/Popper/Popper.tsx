import React, { useEffect, CSSProperties } from 'react';
import { MiddlewareData } from '@floating-ui/core';

import { useMergeRef } from '../../utils/refUtils';
import { forwardRefWithAs } from '../../utils/forwardRef';

import { usePopper, PopperOptions } from './usePopper';

/* Props */

export type PopperState = {
  ref: React.ForwardedRef<HTMLDivElement>;
  arrow?: MiddlewareData['arrow'];
  style: CSSProperties;
};

export type PopperProps = {
  /**
   * The anchor element to use as a reference
   * for the popperplacement
   */
  anchorEl?: HTMLElement | null;
  /**
   * The floating content
   */
  children?: React.ReactNode | ((state: PopperState) => React.ReactNode);
} & PopperOptions;

/**
 * Utility component used to position an element relatively to an anchor element using [floating-ui](https://floating-ui.com/).
 */
export const Popper = forwardRefWithAs<PopperProps, 'div'>((props, ref) => {
  const {
    as,
    strategy,
    children,
    anchorEl,
    placement,
    matchWidth,
    middleware,
    autoUpdate,
    limitHeight,
    ...otherProps
  } = props;

  const {
    x,
    y,
    floating,
    reference,
    strategy: position,
    middlewareData: { arrow },
  } = usePopper({
    strategy,
    placement,
    middleware,
    autoUpdate,
    matchWidth,
    limitHeight,
  });

  // pass the given anchor ref to the popper hook
  useEffect(() => {
    if (anchorEl) {
      reference(anchorEl);
    }
  }, [anchorEl, reference]);

  const mergedRef = useMergeRef(ref, floating);

  const elementProps: PopperState = {
    ref: mergedRef,
    arrow,
    style: {
      ...(otherProps?.style || {}),
      position,
      top: y ?? -9999,
      left: x ?? -9999,
    },
  };

  const Element = as || 'div';

  return typeof children === 'function' ? (
    children(elementProps)
  ) : (
    <Element {...otherProps} {...elementProps}>
      {children}
    </Element>
  );
});

Popper.displayName = 'Popper';

export default Popper;
