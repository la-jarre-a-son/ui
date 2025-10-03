/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

/**
 * Omit function that manage union types
 */
export type DistributiveOmit<T, K extends keyof any> = T extends any ? Omit<T, K> : never;

/**
 * Merge P2 in P1. inject in P1 all properties of P2 that are not in P1
 */
export type MergeProps<P1 = {}, P2 = {}> = DistributiveOmit<P2, keyof P1> & P1;

/**
 * The element type of the as prop
 */
export type As<T = any> = React.ElementType<T>;

/**
 * Add the as prop to the given type
 */
export type WithAs<T extends As, P = {}> = MergeProps<{ as?: T }, P>;

/**
 * Type to use to manage an "as" prop for polymorphic components
 */
export type PropsType = React.PropsWithoutRef<any> | null;

export type PropsWithAs<T extends As, P extends PropsType> = MergeProps<
  WithAs<T, P>,
  React.ComponentPropsWithRef<T>
>;

export type OwnPropsWithAs<T extends As, P extends PropsType> = MergeProps<
  WithAs<T, P>,
  React.ComponentPropsWithoutRef<T>
>;
