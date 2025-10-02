import React, { cloneElement, isValidElement } from 'react';

import { MergeProps } from '../../utils/typeUtils';
import { bindClassNames } from '../../utils/classNames';
import { forwardRefWithAs } from '../../utils/forwardRefWithAsProp';
import { getChildRef, useMergeRef, useForkRef } from '../../utils/refUtils';
import { attemptFocus } from '../../utils/focusUtils';
import useEvent from '../../utils/useEvent';
import useCreatePortal from '../../utils/useCreatePortal';
import usePopoverContainer from '../../utils/usePopoverContainer';
import usePopoverTrigger from '../../utils/usePopoverTrigger';
import useAnimationDuration from '../../utils/useAnimationDuration';

import { ModalStack } from '../ModalStack';
import Popper, { PopperProps } from '../Popper';

import { CloseDropdownOptions, DropdownContext, useDropdown } from './DropdownContext';

import styles from './Dropdown.module.scss';

const cx = bindClassNames(styles);

/* Props */

export type DropdownInternal = {
  handleClose: () => void;
  triggerEl?: HTMLElement | null;
};

export type DropdownTriggerInternal = {
  open: boolean;
  triggerRef: React.Ref<HTMLElement>;
  handleClose: () => void;
};

export type DropdownProps = MergeProps<
  {
    /**
     * The dropdown trigger element. Accepts a render function
     */
    trigger?: React.ReactNode | ((internals: DropdownTriggerInternal) => React.ReactNode);
    /**
     * The content of the dropdown. Accepts a render function
     */
    children?: React.ReactNode | ((internals: DropdownInternal) => React.ReactNode);
    /**
     * Controls the dropdown open state.
     *
     * Dropdown is controlled internally if `undefined`
     */
    open?: boolean;
    /**
     * Optional anchor element used as a reference for the placement
     */
    anchorEl?: HTMLElement | null;
    /**
     * Optional trigger element to attache event to manage openning
     */
    triggerEl?: HTMLElement | null;
    /**
     * Callback fired when dropdown is closed
     */
    onClose?: () => void;
    /**
     * Callback fired when dropdown is open
     */
    onOpen?: () => void;
    /**
     * Disables the use of a portal
     */
    disablePortal?: boolean;
    /**
     * Disables the popover stacking management for this dropdown
     */
    disableStacking?: boolean;
    /**
     * Disables the focus trapping behaviour
     */
    disableFocusTrap?: boolean;
    /**
     * Overrides the list of key event codes (; separated) to trigger the focused dropdown opening
     */
    triggerKeys?: string[];
    /**
     * Close the dropdown when tabing
     */
    closeOnTab?: boolean;
    /**
     * Callback fired when the dropdown enter/ecit animation end
     */
    onAnimationEnd?: () => void;
    /**
     * On exit transition end callback
     */
    onExited?: () => void;
    /**
     * On enter transition end callback
     */
    onEntered?: () => void;
    /**
     * An addition ref to merge onto the oassed trigger element
     */
    triggerRef?: React.Ref<HTMLElement>;
    /**
     * Disable the auto focuseing of the first focusable element on open
     */
    disableAutoFocus?: boolean;
  },
  PopperProps
>;

/**
 * Wraps any content to be conditionally displayed in a temporary box relative to an anchor element.
 *
 * The open state can be uncontrolled or controlled.
 */
export const Dropdown = forwardRefWithAs<DropdownProps, 'div'>((props, ref) => {
  const {
    onOpen,
    onClose,
    trigger,
    onExited,
    children,
    onEntered,
    className,
    triggerRef,
    closeOnTab,
    matchWidth,
    triggerKeys,
    disablePortal,
    open: openProp,
    onAnimationEnd,
    disableStacking,
    disableFocusTrap,
    disableAutoFocus,
    anchorEl: anchorElProp,
    triggerEl: triggerElProp,
    placement = 'bottom-start',
    ...popperProps
  } = props;

  const [ownTriggerRef, setOwntriggerEl] = useForkRef<HTMLElement | null>(
    getChildRef(trigger),
    triggerRef
  );
  const triggerEl = triggerElProp ?? ownTriggerRef.current;
  const anchorEl = anchorElProp ?? ownTriggerRef.current;

  // trigger management
  const { handleClose, open } = usePopoverTrigger({
    open: openProp,
    triggerKeys,
    triggerEl,
    onClose,
    onOpen,
  });

  // keyboard navigation management
  const containerRef = usePopoverContainer({
    refocusOnClose: true,
    autoFocus: !disableAutoFocus,
    onClose: handleClose,
    disableFocusTrap,
    closeOnTab,
    triggerEl,
    open,
  });

  const [show, handleAnimationEnd] = useAnimationDuration(open, {
    onAnimationEnd,
    onEntered,
    onExited,
  });

  const createPortal = useCreatePortal(disablePortal);

  // manage the manual closing of the dropdown by a child
  const closeParentDropdown = useDropdown();
  const handleManualClose = useEvent((options?: CloseDropdownOptions) => {
    const { bubble, refocus } = options || {};
    if (bubble && closeParentDropdown) closeParentDropdown(options);
    handleClose();
    // refocus the trigger of the last parent dropdpown
    if (refocus && !closeParentDropdown) attemptFocus(triggerEl);
  });

  const mergedContainerRef = useMergeRef(ref, containerRef);

  // the trigger element can be a render-prop
  const triggerElement =
    typeof trigger === 'function'
      ? trigger({
          open: show,
          triggerRef: setOwntriggerEl,
          handleClose,
        })
      : isValidElement(trigger) &&
        cloneElement<React.ComponentPropsWithRef<React.ElementType>>(trigger, {
          ref: setOwntriggerEl,
        });

  // children element can be a render-prop
  const childrenElement =
    typeof children === 'function'
      ? children({
          handleClose,
          triggerEl,
        })
      : children;

  return (
    <DropdownContext.Provider value={handleManualClose}>
      {triggerElement}
      {show &&
        createPortal(
          <ModalStack disableStacking={disableStacking}>
            <Popper
              as="aside"
              matchWidth={matchWidth}
              ref={mergedContainerRef}
              anchorEl={anchorEl}
              onAnimationEnd={handleAnimationEnd}
              placement={placement}
              {...popperProps}
              className={cx('container', open ? '--show' : '--hide', className)}
            >
              {childrenElement}
            </Popper>
          </ModalStack>
        )}
    </DropdownContext.Provider>
  );
});

Dropdown.displayName = 'Dropdown';

export default Dropdown;
