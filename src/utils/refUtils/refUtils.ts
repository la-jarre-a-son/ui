import React, { RefCallback, useMemo, useState, useRef } from 'react';

export type Ref<R> = React.RefCallback<R> | React.MutableRefObject<R> | undefined | null;

/**
 * Set the given ref regardless of its type
 */
export function setRef<T>(ref?: Ref<T>, el?: T | null) {
  if (!ref) return;
  if (typeof ref === 'function' && el !== undefined) {
    ref(el);
  } else if (typeof ref === 'object') {
    (ref as React.MutableRefObject<T | null | undefined>).current = el;
  }
}

/**
 * Merge multiple ref into a single callback
 */
export function mergeRef<T>(ref1: Ref<T>, ref2: Ref<T>, ref3?: Ref<T>): RefCallback<T> {
  return (el: T) => {
    setRef(ref1, el);
    setRef(ref2, el);
    setRef(ref3, el);
  };
}

/**
 * Hook that return a merged callback ref with the
 * refs passed in argument
 */
export function useMergeRef<T>(ref1: Ref<T>, ref2: Ref<T>, ref3?: Ref<T>): RefCallback<T> {
  return useMemo(() => mergeRef(ref1, ref2, ref3), [ref1, ref2, ref3]);
}

/**
 * Make a fork of the given ref
 */
export function useForkCallbackRef<R>(ref: Ref<R>, otherRef?: Ref<R>): [R | null, RefCallback<R>] {
  const [el, ref2] = useState<R | null>(null);
  const mergedRef = useMemo(() => mergeRef(ref, ref2 as Ref<R>, otherRef), [ref, ref2, otherRef]);
  return [el, mergedRef];
}

/**
 * Make a fork of the given ref
 */
export function useForkRef<R>(
  ref: Ref<R>,
  otherRef?: Ref<R>
): [React.RefObject<R | null>, RefCallback<R>] {
  const ownRef = useRef<R | null>(null);
  const mergedRef = useMemo(() => mergeRef(ref, ownRef, otherRef), [ref, ownRef, otherRef]);
  return [ownRef, mergedRef];
}

/**
 * Return the current ref on the given React node
 */
export function getChildRef<T>(child: React.ReactNode | unknown): Ref<T> {
  return React.isValidElement(child) && Object.prototype.hasOwnProperty.call(child, 'ref')
    ? (child as React.FunctionComponentElement<unknown>)?.ref
    : null;
}
