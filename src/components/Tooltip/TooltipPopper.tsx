import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { arrow as arrowMiddleware, flip, Middleware, offset, shift } from '@floating-ui/react-dom';

import { bindClassNames } from '../../utils/classNames';
import { forwardRefWithAs } from '../../utils/forwardRefWithAsProp';
import { useMergeRef } from '../../utils/refUtils';
import { usePopper } from '../Popper';

import styles from './Tooltip.module.scss';

const cx = bindClassNames(styles);

const statics = {
  top: 'bottom',
  right: 'left',
  bottom: 'top',
  left: 'right',
} as const;

type StaticSide = keyof typeof statics;

/* Props */

export type TooltipPlacement = 'top' | 'right' | 'bottom' | 'left';

export type TooltipPopperProps = {
  /**
   * The anchor element taken as a reference to place the floating element
   */
  anchorEl: HTMLElement | null;
  /**
   * The tooltip placement
   */
  placement?: TooltipPlacement;
  /**
   * SHow the content
   */
  show?: boolean;
  /**
   * The tooltip title
   */
  title?: string;
  /**
   * The tooltip content
   */
  content?: string;
};

export const TooltipPopper = forwardRefWithAs<TooltipPopperProps, 'div'>((props, ref) => {
  const {
    as,
    className,
    anchorEl,
    show,
    placement: placementProps,
    title,
    content,
    ...otherProps
  } = props;

  const arrowRef = useRef<HTMLElement | null>(null);

  const middleware: Middleware[] = useMemo(
    () => [
      offset(6),
      flip(),
      shift(),
      arrowMiddleware({
        element: arrowRef,
      }),
    ],
    []
  );

  const {
    x,
    y,
    floating,
    reference,
    strategy,
    update,
    placement,
    middlewareData: { arrow },
  } = usePopper({
    middleware,
    autoUpdate: false,
    placement: placementProps,
  });

  useEffect(() => {
    reference(anchorEl);
  }, [anchorEl, reference]);

  const handleArrowRef = useCallback(
    (el: HTMLElement | null) => {
      arrowRef.current = el;
      update();
    },
    [update]
  );

  const mergedRef = useMergeRef(floating, ref);

  const staticSide: StaticSide = statics[placement.split('-')[0] as StaticSide];

  const Element = as || 'div';

  return (
    <>
      <Element
        className={cx('root', show ? '--show' : '--hide', className)}
        role="tooltip"
        ref={mergedRef}
        aria-live="polite"
        style={{
          position: strategy,
          top: y ?? -9999,
          left: x ?? -9999,
        }}
        {...otherProps}
      >
        <div
          ref={handleArrowRef}
          className={styles.arrow}
          style={{
            position: 'absolute',
            left: arrow?.x != null ? arrow?.x : '',
            top: arrow?.y != null ? arrow?.y : '',
            right: '',
            bottom: '',
            [staticSide]: -4,
          }}
        />
        {title && <div className={cx('title')}>{title}</div>}
        {content}
      </Element>
    </>
  );
});

TooltipPopper.displayName = 'TooltipPopper';

export default TooltipPopper;
