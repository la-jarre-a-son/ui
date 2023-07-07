import React from 'react';

import { bindClassNames } from '../../utils/classNames';
import { forwardRefWithAs } from '../../utils/forwardRefWithAsProp';

import Stack, { StackProps } from '../Stack';

import styles from './ButtonGroup.module.scss';

const cx = bindClassNames(styles);

/**
 * Wraps a set of buttons of same functional perimeter.
 */
export const ButtonGroup = forwardRefWithAs<StackProps, typeof Stack>(
  ({ className, as, children, direction = 'horizontal', ...otherProps }, ref) => {
    return (
      <Stack
        as={as}
        ref={ref}
        className={cx('root', `--${direction}`, className)}
        direction={direction}
        {...otherProps}
      >
        {children}
      </Stack>
    );
  }
);

ButtonGroup.displayName = 'ButtonGroup';

export default ButtonGroup;
