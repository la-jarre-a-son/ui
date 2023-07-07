import React from 'react';
import { bindClassNames } from '../../utils/classNames';
import { forwardRefWithAs } from '../../utils/forwardRefWithAsProp';

import Box from '../Box';

import styles from './Toolbar.module.scss';
import { ToolbarProps } from './types';

const cx = bindClassNames(styles);

/**
 * Renders a bar sticked to the top of the page, with customizable styling.
 */
export const Toolbar = forwardRefWithAs<ToolbarProps, 'div'>((props, ref) => {
  const { children, className, position, placement, ...otherProps } = props;

  return (
    <Box
      ref={ref}
      className={cx('root', position && `--${position}`, placement && `--${placement}`, className)}
      {...otherProps}
    >
      {children}
    </Box>
  );
});

Toolbar.displayName = 'Toolbar';

Toolbar.defaultProps = {
  position: 'relative',
  placement: 'top',
  elevation: 1,
};

export default Toolbar;
