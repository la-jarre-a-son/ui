import React from 'react';

import { bindClassNames } from '../../utils/classNames';
import { forwardRefWithAs } from '../../utils/forwardRefWithAsProp';

import { DotProps } from './types';

import styles from './Dot.module.scss';

const cx = bindClassNames(styles);

/**
 * Renders an Dot with an active state to highlight updates or status
 */
export const Dot = forwardRefWithAs<DotProps, 'span'>((props, ref) => {
  const { as, className, intent, size, active, ...otherProps } = props;
  const Element = as || 'span';

  return (
    <Element
      ref={ref}
      className={cx(
        'root',
        intent && `--${intent}`,
        size && `--${size}`,
        active && `--active`,
        className
      )}
      aria-hidden={otherProps?.['aria-label'] ? 'false' : 'true'}
      {...otherProps}
    />
  );
});

Dot.displayName = 'Dot';

Dot.defaultProps = {};

export default Dot;
