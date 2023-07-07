import React from 'react';
import { bindClassNames } from '../../utils/classNames';
import { forwardRefWithAs } from '../../utils/forwardRefWithAsProp';

import styles from './Box.module.scss';
import { BoxProps } from './types';

const cx = bindClassNames(styles);

/**
 * Wraps any content in a Box with styling (elevation, outline, overflow, variants...).
 *
 * Used as a basic block for other components with shared style / semantic.
 */
export const Box = forwardRefWithAs<BoxProps, 'div'>((props, ref) => {
  const { as, className, pad, elevation, children, outlined, hideOverflow, ...otherProps } = props;

  const Element = as || 'div';

  return (
    <Element
      ref={ref}
      className={cx(
        styles.root,
        outlined && '--outlined',
        elevation && `--elevation${elevation}`,
        pad && `--pad-${pad}`,
        hideOverflow && '--hideOverflow',
        className
      )}
      {...otherProps}
    >
      {children}
    </Element>
  );
});

Box.defaultProps = {
  elevation: 0,
  pad: undefined,
};

Box.displayName = 'Box';

export default Box;
