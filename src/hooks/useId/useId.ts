import React, { useEffect, useState } from 'react';

let cpt = 0;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useReactId: (() => string) | undefined = (React as any)['useId'];

/**
 * Hook to use to au-generate an id
 * @param defaultId the provided id to use
 */
export function useId(defaultId?: string) {
  const [id, setId] = useState(defaultId);

  // don't care about the 'rule of hook' here cause the existence of useReactId
  // depend only on the current version of React, so it is not invariant at runtime
  if (useReactId) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const generated = useReactId();
    return defaultId || generated;
  }

  // if React < 18, we generate the id on client-size only
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (id == null) {
      setId(`ljas-${cpt++}`);
    }
  }, [id, setId]);

  return id;
}

export default useId;
