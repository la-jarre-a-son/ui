/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable react/display-name */
import React, { createRef, forwardRef } from 'react';
import { setRef, mergeRef, getChildRef } from './refUtils';

describe('refUtils', () => {
  describe('setRef', () => {
    it('Can set a function or an object ref', () => {
      const objectRef: React.RefObject<unknown> = { current: null };
      const funcRef = jest.fn();

      setRef(objectRef, 'test');
      setRef(funcRef, 'test');

      expect(objectRef.current).toEqual('test');
      expect(funcRef).toHaveBeenCalledWith('test');
    });

    it("Can't set malformed ref", () => {
      setRef(null, 'test');
      // @ts-ignore
      setRef([], 'test');
      // @ts-ignore
      setRef('test', 'test');
      // @ts-ignore
      setRef(true, 'test');
    });
  });

  describe('mergeRef', () => {
    it('Return a setter function', () => {
      let testVal = null;
      function testRef(v: string) {
        testVal = v;
      }

      const mergedRef = mergeRef(null, testRef);
      mergedRef('test');

      expect(typeof mergedRef).toEqual('function');
      expect(testVal).toEqual('test');
    });
  });

  describe('getChildRef', () => {
    it('return the ref of the given react node', () => {
      const fn = () => undefined;
      const El = forwardRef((_, ref: any) => <div ref={ref} />);
      const ref = createRef<HTMLDivElement>();

      const ref1 = getChildRef(<div ref={fn} />);
      const ref2 = getChildRef(<El ref={fn} />);
      const ref3 = getChildRef(<div ref={ref} />);
      const ref4 = getChildRef(<El ref={ref} />);

      expect(ref1).toEqual(fn);
      expect(ref2).toEqual(fn);
      expect(ref3).toEqual(ref);
      expect(ref4).toEqual(ref);
    });

    it('return null if no ref on the given node', () => {
      const El = forwardRef((_, ref: any) => <div ref={ref} />);

      const ref1 = getChildRef(<div />);
      const ref2 = getChildRef(null);
      const ref3 = getChildRef(<El />);

      expect(ref1).toBeNull();
      expect(ref2).toBeNull();
      expect(ref3).toBeNull();
    });
  });
});
