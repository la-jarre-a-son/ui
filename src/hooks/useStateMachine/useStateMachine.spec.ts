import { act, renderHook } from '@testing-library/react';
import useStateMachine from './useStateMachine';

const simpleMachine = {
  step1: {
    NEXT: 'step2',
  },
  step2: {
    NEXT: 'step1',
  },
};

describe('useStateMachine', () => {
  it('initialise the default state', () => {
    const { result } = renderHook(() => useStateMachine(simpleMachine, 'step2'));
    expect(result.current?.[0].state).toEqual('step2');
  });

  it('switch when receiving a valid event', () => {
    const { result } = renderHook(() => useStateMachine(simpleMachine, 'step2'));
    const [, dispatch] = result.current;

    act(() => {
      dispatch({
        type: 'NEXT',
      });
    });

    expect(result.current?.[0].state).toEqual('step1');
  });

  it("don't do anything when receiving an invalid event", () => {
    const { result } = renderHook(() => useStateMachine(simpleMachine, 'step2'));
    const [, dispatch] = result.current;

    act(() => {
      dispatch({
        type: 'OUPS' as any,
      });
    });

    expect(result.current?.[0].state).toEqual('step2');
  });

  it('accept function as handler', () => {
    const functionMachine = {
      step1: {
        NEXT: () => 'step2',
      },
      step2: {
        NEXT: () => 'step1',
      },
    };

    const { result } = renderHook(() => useStateMachine(functionMachine, 'step2'));
    const [, dispatch] = result.current;

    act(() => {
      dispatch({
        type: 'NEXT',
      });
    });

    expect(result.current?.[0].state).toEqual('step1');
  });

  it('initialize the context', () => {
    const machine = {
      step1: {
        NEXT: (ctx: number) => ({
          state: 'step1',
          context: ctx + 1,
        }),
      },
    };

    const { result } = renderHook(() => useStateMachine(machine, 'step1', 1));

    expect(result.current?.[0].context).toEqual(1);
  });

  it('can manage a context', () => {
    const machine = {
      step1: {
        NEXT: (ctx: number) => ({
          state: 'step1',
          context: ctx + 1,
        }),
      },
    };

    const { result } = renderHook(() => useStateMachine(machine, 'step1', 0));
    const [, dispatch] = result.current;

    expect(result.current?.[0].context).toEqual(0);

    act(() => {
      dispatch({
        type: 'NEXT',
      });
    });

    expect(result.current?.[0].context).toEqual(1);
  });
});
