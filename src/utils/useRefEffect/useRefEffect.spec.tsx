import React from 'react';
import { act, render, renderHook, waitFor } from '@testing-library/react';

import useRefEffect from './useRefEffect';

describe('useRefEffect', () => {
  it('manage effect as a callback', async () => {
    const callback1 = jest.fn();
    const callback2 = jest.fn();
    const el = document.createElement('div');
    const el2 = document.createElement('div');

    const { result } = renderHook(() => {
      return useRefEffect(() => {
        callback1();
        return callback2;
      }, []);
    });

    act(() => {
      result.current(el);
    });

    expect(callback1).toHaveBeenCalled();

    callback1.mockClear();

    act(() => {
      result.current(el2);
    });

    expect(callback2).toHaveBeenCalled();
    expect(callback1).toHaveBeenCalled();

    callback1.mockClear();
    callback2.mockClear();

    act(() => {
      result.current(null);
    });

    expect(callback2).toHaveBeenCalled();
    expect(callback1).not.toHaveBeenCalled();
  });

  it('call the cleanup on component unmount', () => {
    const cleanup = jest.fn();
    const effect = jest.fn();

    const Comp = () => {
      const ref = useRefEffect((e) => {
        effect(e);
        return cleanup;
      }, []);

      return <div ref={ref} />;
    };

    const { unmount } = render(<Comp />);

    expect(effect).toHaveBeenCalled();
    expect(cleanup).not.toHaveBeenCalled();

    effect.mockClear();

    act(() => {
      unmount();
    });

    expect(effect).not.toHaveBeenCalled();
    expect(cleanup).toHaveBeenCalled();
  });

  it('keep the same reference', () => {
    const result = renderHook(() =>
      useRefEffect(
        () => () => {
          // NOP
        },
        []
      )
    );

    const oldResult = result.result.current;

    act(() => {
      result.rerender;
    });

    expect(result.result.current).toEqual(oldResult);
  });

  it('use the last updated callback function passed', async () => {
    const fn = jest.fn();
    const result = renderHook(
      (func: () => undefined) => {
        return useRefEffect(() => {
          func();
        }, [func]);
      },
      {
        initialProps: () => undefined,
      }
    );

    const el = document.createElement('div');

    act(() => {
      result.rerender(fn);
    });

    await waitFor(() => {
      result.result.current(el);
      expect(fn).toHaveBeenCalled();
    });
  });
});
