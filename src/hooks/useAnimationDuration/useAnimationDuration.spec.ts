import useAnimationDuration, {
  disableAnimation,
  enableAnimation,
  isAnimationDisabled,
} from './useAnimationDuration';
import React from 'react';
import { renderHook, act, waitFor } from '@testing-library/react';

describe('useAnimationDuration', () => {
  afterEach(() => {
    enableAnimation();
  });

  it('can disable transition duration', () => {
    disableAnimation();

    const { result } = renderHook(() => {
      const [state, setState] = React.useState(true);
      const [start] = useAnimationDuration(state);

      return {
        start,
        setState,
      };
    });

    expect(result.current.start).toEqual(true);
    expect(isAnimationDisabled()).toEqual(true);

    act(() => {
      result.current.setState(false);
    });

    expect(result.current.start).toEqual(false);
  });

  it('defer disapearance after the animation end', () => {
    const { result } = renderHook(() => {
      const [state, setState] = React.useState(true);
      const [start, onAnimationEnd] = useAnimationDuration(state);

      return {
        start,
        onAnimationEnd,
        setState,
      };
    });

    act(() => {
      result.current.setState(false);
    });

    expect(result.current.start).toEqual(true);

    act(() => {
      result.current.onAnimationEnd();
    });

    expect(result.current.start).toEqual(false);
  });

  it('call the given onAnimationEnd callback', () => {
    const onEnd = jest.fn();
    const { result } = renderHook(() => {
      const [state, setState] = React.useState(true);
      const [start, onAnimationEnd] = useAnimationDuration(state, {
        onAnimationEnd: onEnd,
      });

      return {
        start,
        onAnimationEnd,
        setState,
      };
    });

    act(() => {
      result.current.setState(false);
    });

    expect(result.current.start).toEqual(true);

    act(() => {
      result.current.onAnimationEnd();
    });

    expect(onEnd).toHaveBeenCalled();
  });

  it('can manage animation time', async () => {
    const onEnd = jest.fn();

    const { result } = renderHook(() => {
      const [state, setState] = React.useState(true);
      const [start, onAnimationEnd] = useAnimationDuration(state, {
        duration: 1000,
        onAnimationEnd: onEnd,
      });

      return {
        start,
        onAnimationEnd,
        setState,
      };
    });

    act(() => {
      result.current.setState(false);
      result.current.setState(true);
      result.current.setState(false);
    });

    await waitFor(() => {
      expect(result.current.start).toEqual(false);
      expect(onEnd).toHaveBeenCalledTimes(1);
    });
  });

  it('call the onEntered callback', async () => {
    const onEntered = jest.fn();

    const { result } = renderHook(() => {
      const [state, setState] = React.useState(false);
      const [start, onAnimationEnd] = useAnimationDuration(state, {
        duration: 100,
        onEntered,
      });

      return {
        start,
        onAnimationEnd,
        setState,
      };
    });

    act(() => {
      result.current.setState(true);
    });

    await waitFor(() => {
      expect(onEntered).toHaveBeenCalledTimes(1);
    });
  });

  it('call the onExited callback', async () => {
    const onExited = jest.fn();

    const { result } = renderHook(() => {
      const [state, setState] = React.useState(true);
      const [start, onAnimationEnd] = useAnimationDuration(state, {
        duration: 100,
        onExited,
      });

      return {
        start,
        onAnimationEnd,
        setState,
      };
    });

    act(() => {
      result.current.setState(false);
    });

    await waitFor(() => {
      expect(onExited).toHaveBeenCalledTimes(1);
    });
  });
});
