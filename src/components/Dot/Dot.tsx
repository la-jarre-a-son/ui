import React from 'react';

import { bindClassNames } from '../../utils/classNames';
import { forwardRefWithAs } from '../../utils/forwardRef';

import styles from './Dot.module.scss';

const cx = bindClassNames(styles);

/* Props */

export const DotSizes = ['sm', 'md', 'lg'] as const;
export const DotIntents = [
  'neutral',
  'primary',
  'secondary',
  'error',
  'warning',
  'success',
] as const;

export type DotSize = (typeof DotSizes)[number];
export type DotIntent = (typeof DotIntents)[number];

export type DotProps = {
  /**
   * The Dot semantic intent
   */
  intent?: DotIntent;
  /**
   * The Dot size (in teeshirt size)
   * */
  size?: DotSize;
  /**
   * Displays an animated outline around dot - defaults to `false`
   */
  active?: boolean;
};

/**
 * Renders an Dot with an active state to highlight updates or status
 */
export const Dot = forwardRefWithAs<DotProps, 'span'>((props, ref) => {
  const { as, className, intent = 'neutral', size = 'md', active, ...otherProps } = props;

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

export default Dot;
