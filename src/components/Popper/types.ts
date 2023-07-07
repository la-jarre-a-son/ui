import { Middleware, MiddlewareData } from '@floating-ui/core';
import { Placement, Strategy } from '@floating-ui/react-dom';
import React, { CSSProperties } from 'react';

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
