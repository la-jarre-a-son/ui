import React from 'react';

import { useMergeRef } from '../../utils/refUtils';
import { forwardRefWithAs } from '../../utils/forwardRef';

import { useId } from '../../hooks/useId';
import { useRefEffect } from '../../hooks/useRefEffect';
import { useCreatePortal } from '../../hooks/useCreatePortal';
import { useDelayTrigger } from '../../hooks/useDelayTrigger';
import { useAnimationDuration, AnimationDurationOptions } from '../../hooks/useAnimationDuration';

import { TooltipPopper, TooltipPlacement } from './TooltipPopper';

type TooltipStatic = {
  /**
   * Delay (in ms) before showing the tooltip
   */
  TOOLTIP_DELAY: number;
  /**
   * Media query to detect mobile
   */
  IS_MOBILE_QUERY: string;
};

/* Props */

export type TooltipProps = {
  /**
   * The tooltip content
   */
  content?: string;
  /**
   * The tooltip title
   */
  title?: string;
  /**
   * The tooltip placement
   */
  placement?: TooltipPlacement;
  /**
   * The content to decorate with a tooltip
   */
  children?: React.ReactNode;
  /**
   * Disable the portal behaviour of the tooltip content
   */
  disablePortal?: boolean;
  /**
   * Add an `aria-label` or `aria-description` to the trigger element
   * Use `none` if the trigger element already have it
   */
  describeAs?: 'label' | 'description' | 'none';
  /**
   * Props to pass to the `useAnimationDuration` hook
   */
  animationProps?: AnimationDurationOptions;

  /**
   * Forces the tooltip to show
   */
  forceOpen?: boolean;
};

/**
 * Decorates a reference element, to display complementary information
 * as a floating Box when the user interacts (hover, focus...) with it.
 *
 * The tooltip placement is automatically adapted to available space.
 *
 * All other props are passed to the `TooltipPopper` sub component.
 */
export const Tooltip = forwardRefWithAs<TooltipProps, 'div', TooltipStatic>((props, ref) => {
  const {
    as,
    id,
    title,
    content,
    children,
    placement,
    disablePortal,
    animationProps = {},
    describeAs = 'description',
    ...otherProps
  } = props;

  const createPortal = useCreatePortal(disablePortal);

  const [open, trigger] = useDelayTrigger(Tooltip.TOOLTIP_DELAY);
  const [show, onAnimationEnd] = useAnimationDuration(open, animationProps);
  const uid = useId(id);

  const ownRef = useRefEffect(
    (element) => {
      const isMobile = window.matchMedia(Tooltip.IS_MOBILE_QUERY).matches;

      function handleOpen() {
        trigger(true);
      }

      function handleClose() {
        trigger(false, true);
      }

      function handleMobileClose() {
        trigger(false);
      }

      function handleKeydown(e: KeyboardEvent) {
        if (e.key === 'Escape') handleClose();
      }

      if (element) {
        element.addEventListener('keydown', handleKeydown);
        if (isMobile) {
          element.addEventListener('touchstart', handleOpen);
          element.addEventListener('touchend', handleMobileClose);
        } else {
          element.addEventListener('focus', handleOpen);
          element.addEventListener('blur', handleClose);
          element.addEventListener('mouseenter', handleOpen);
          element.addEventListener('mouseleave', handleClose);
        }
      }
      return () => {
        if (element) {
          element.removeEventListener('focus', handleOpen);
          element.removeEventListener('blur', handleClose);
          element.removeEventListener('mouseenter', handleOpen);
          element.removeEventListener('mouseleave', handleClose);
          element.removeEventListener('keydown', handleKeydown);
          element.removeEventListener('touchstart', handleOpen);
          element.removeEventListener('touchend', handleMobileClose);
        }
      };
    },
    [trigger]
  );

  const mergedRef = useMergeRef(ref, ownRef);

  let desc = {};
  if (describeAs !== 'none' && show) {
    const descAttribute = describeAs === 'description' ? 'aria-describedby' : 'aria-labelledby';
    const childDesc = React.isValidElement(children) ? (children?.props as React.ComponentProps<any>)[descAttribute] || '' : '';
    desc = {
      [descAttribute]: `${childDesc} ${uid}`,
    };
  }

  return (
    <>
      {React.isValidElement(children) &&
        React.cloneElement<React.ComponentPropsWithRef<React.ElementType>>(children, {
          ref: mergedRef,
          ...desc,
        })}
      {show &&
        (content || title) &&
        createPortal(
          <TooltipPopper
            {...otherProps}
            id={uid}
            placement={placement}
            as={as}
            anchorEl={ownRef.nodeEl || null}
            onAnimationEnd={onAnimationEnd}
            title={title}
            content={content}
            show={open}
          />
        )}
    </>
  );
});

Tooltip.displayName = 'Tooltip';

Tooltip.TOOLTIP_DELAY = 200;
Tooltip.IS_MOBILE_QUERY = '(hover: none) and (pointer: coarse)';

export default Tooltip;
