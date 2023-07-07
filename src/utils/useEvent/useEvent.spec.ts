import { renderHook } from '@testing-library/react';
import useEvent from './useEvent';

describe('useEvent', () => {
  it('create a stable reference callback', () => {
    const { rerender, result } = renderHook(() => {
      const handler = useEvent(() => undefined);
      return handler;
    });

    const ref1 = result.current;

    rerender();

    const ref2 = result.current;

    expect(ref1).toEqual(ref2);
  });

  it('wrapped the passed function', () => {
    const fn = jest.fn();
    const { result } = renderHook(() => {
      const handler = useEvent(fn);
      return handler;
    });

    result.current();

    expect(fn).toHaveBeenCalled();
  });
});
