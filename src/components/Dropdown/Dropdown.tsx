import React, { cloneElement, isValidElement } from 'react';

import {
  bindClassNames,
  forwardRefWithAs,
  getChildRef,
  useForkRef,
  useMergeRef,
  usePopoverContainer,
  useAnimationDuration,
  useCreatePortal,
  usePopoverTrigger,
  attemptFocus,
  useEvent,
} from '../../utils';

import { ModalStack } from '../ModalStack';
import Popper from '../Popper';
import { DropdownProps } from './types';
import { CloseDropdownOptions, DropdownContext, useDropdown } from './DropdownContext';

import styles from './Dropdown.module.scss';

const cx = bindClassNames(styles);

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

Dropdown.defaultProps = {
  open: undefined, // uncontrolled
  disablePortal: false,
  disableStacking: false,
  disableFocusTrap: false,
  closeOnTab: false,
  placement: 'bottom-start',
};

export default Dropdown;
