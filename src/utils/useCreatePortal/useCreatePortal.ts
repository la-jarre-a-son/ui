import React, { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';

type Container = Element | DocumentFragment;

type CreatePortal = (
  children: React.ReactNode,
  container?: Container,
  key?: null | string
) => React.ReactPortal;

/**
 * Hook that returns a SSR safe createPortal function
 */
export function useCreatePortal(disable = false): CreatePortal {
  const [canRender, setCanRender] = useState(false);

  useEffect(() => {
    setCanRender(true);
  }, [setCanRender]);

  return useMemo(() => {
    if (disable) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (children: React.ReactNode) => children as any;
    }
    return canRender
      ? (children: React.ReactNode, container?: Container, key?: null | string) => {
          return createPortal(children, container || document.body, key);
        }
      : ((() => null) as unknown as CreatePortal);
  }, [canRender, disable]);
}

export default useCreatePortal;
