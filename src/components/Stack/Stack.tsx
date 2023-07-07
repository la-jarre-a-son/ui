import React from 'react';
import { bindClassNames } from '../../utils/classNames';
import { forwardRefWithAs } from '../../utils/forwardRefWithAsProp';

import styles from './Stack.module.scss';
import { StackProps } from './types';

const cx = bindClassNames(styles);

/**
 * Wraps and arranges a stack of items.
 *
 * This component use the most common flex box positioning
 */
export const Stack = forwardRefWithAs<StackProps, 'div'>((props, ref) => {
  const {
    children,
    as,
    className,
    align,
    justify,
    direction,
    wrap,
    gap,
    block,
    stretch,
    ...otherProps
  } = props;

  const Element = as || 'div';

  return (
    <Element
      ref={ref}
      className={cx(
        'root',
        align && `--align-${align}`,
        justify && `--justify-${justify}`,
        gap && `--gap-${gap}`,
        wrap && '--wrap',
        block && '--block',
        stretch && '--stretch',
        direction && `--${direction}`,
        className
      )}
      {...otherProps}
    >
      {children}
    </Element>
  );
});

Stack.displayName = 'Stack';

Stack.defaultProps = {
  gap: undefined,
};

export default Stack;
