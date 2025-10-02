import React, { useEffect, useRef } from 'react';
import useEvent from '../useEvent';

// used to globally disable animation on the UI
// for unit test purpose or css prefers-reduced-motion enabled
let animationDisabled = false;

/**
 * Globally disable UI animation
 */
export const disableAnimation = () => {
  animationDisabled = true;
};

/**
 * Globally enable UI animation
 */
export const enableAnimation = () => {
  animationDisabled = false;
};

/**
 * Check the current animation enabling
 */
export const isAnimationDisabled = () => animationDisabled;

export type AnimationDurationOptions = {
  /**
   * The on animation end callback
   */
  onAnimationEnd?: (e?: React.AnimationEvent<HTMLElement>) => void;
  /**
   * An optionnal animation duration.
   * Setting this option will make this hook work with timer rather than onAnimationEnd callback.
   */
  duration?: number;
  /**
   * On entering animation end
   */
  onEntered?: () => void;
  /**
   * On exieting animation end
   */
  onExited?: () => void;
};

/**
 * Hook that defer the raise of a boolean trigger
 * after the end of an animation
 * @param start the element entry flag
 * @param options the duration options
 */
export function useAnimationDuration(start = false, options?: AnimationDurationOptions) {
  const { duration, onAnimationEnd, onEntered, onExited } = options || {};

  const [show, setShow] = React.useState(false);
  const hidding = useRef(false);
  const timer = useRef<NodeJS.Timeout | null>(null);

  const handleAnimationEnd = useEvent((e?: React.AnimationEvent<HTMLElement>) => {
    if (hidding.current) {
      setShow(false);
      hidding.current = false;
      if (onExited) onExited();
    } else {
      if (onEntered) onEntered();
    }
    if (onAnimationEnd) onAnimationEnd(e);
  });

  useEffect(() => {
    if (start) {
      setShow(true);
      hidding.current = false;
    } else {
      hidding.current = true;
    }

    // immediate disapearing if animation disabled
    if (animationDisabled) {
      handleAnimationEnd();
    } else if (duration) {
      // working with animation duration
      timer.current = setTimeout(() => {
        handleAnimationEnd();
      });
    }
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [start, handleAnimationEnd, duration]);

  useEffect(
    () => () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    },
    []
  );

  return [show, handleAnimationEnd] as const;
}

export default useAnimationDuration;
