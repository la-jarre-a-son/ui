import React from 'react';
import { MergeProps } from '../../utils/typeUtils';
import { PopperProps } from '../Popper/types';

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
