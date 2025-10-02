import React from 'react';

import { bindClassNames } from '../../utils/classNames';
import { forwardRefWithAs } from '../../utils/forwardRef';
import { MergeProps } from '../../utils/typeUtils';

import { Box, BoxProps } from '../Box';

import styles from './Toolbar.module.scss';

const cx = bindClassNames(styles);

/* Props */

export type ToolbarPosition = 'relative' | 'sticky' | 'fixed';

export type ToolbarPlacement = 'top' | 'bottom';

export type ToolbarProps = MergeProps<
  {
    /**
     * The positioning of the top bar.
     */
    position?: ToolbarPosition;
    /**
     * The placement of the top bar.
     */
    placement?: ToolbarPlacement;
    /**
     * The top bar content
     */
    children?: React.ReactNode;
  },
  BoxProps
>;

/**
 * Renders a bar sticked to the top of the page, with customizable styling.
 */
export const Toolbar = forwardRefWithAs<ToolbarProps, 'div'>((props, ref) => {
  const {
    children,
    className,
    position = 'relative',
    placement = 'top',
    elevation = 1,
    ...otherProps
  } = props;

  return (
    <Box
      ref={ref}
      className={cx('root', position && `--${position}`, placement && `--${placement}`, className)}
      elevation={elevation}
      {...otherProps}
    >
      {children}
    </Box>
  );
});

Toolbar.displayName = 'Toolbar';

export default Toolbar;
