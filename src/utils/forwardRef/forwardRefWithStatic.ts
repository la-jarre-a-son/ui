/* eslint-disable @typescript-eslint/ban-types */

import React from 'react';

export function forwardRefWithStatic<T, P = {}, S = unknown>(
  render: React.ForwardRefRenderFunction<T, React.PropsWithoutRef<P>>
) {
  return React.forwardRef(render) as unknown as React.ForwardRefExoticComponent<
    React.PropsWithoutRef<P> & React.RefAttributes<T>
  > &
    S;
}
