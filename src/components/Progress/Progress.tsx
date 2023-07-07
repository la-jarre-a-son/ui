import React from 'react';
import { bindClassNames } from '../../utils/classNames';
import { forwardRefWithAs } from '../../utils/forwardRefWithAsProp';

import styles from './Progress.module.scss';
import { LinearProgressProps } from './types';

const cx = bindClassNames(styles);

/**
 * Renders a horizontal progress bar to give some feedback on a loading state.
 *
 * Its value can be clamped to any minimum and maximum values (e.g. 0...1, or 0...100), or indeterminate (with a looping animation).
 */
export const Progress = forwardRefWithAs<LinearProgressProps, 'div'>((props, ref) => {
  const {
    as,
    valueText,
    min = 0,
    max = 100,
    value,
    className,
    indeterminate,
    ...otherProps
  } = props;

  const Element = as || 'div';

  const clampedValue = Math.min(max, Math.max(min, value || 0));
  const percent = ((clampedValue - min) / (max - min)) * 100;
  const translate = -100 + percent;

  return (
    <Element
      ref={ref}
      className={cx('root', className)}
      {...otherProps}
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={indeterminate ? undefined : value}
      aria-valuetext={valueText}
      role="progressbar"
    >
      <div className={cx('track')} aria-hidden="true">
        <div
          aria-hidden="true"
          className={cx('bar', indeterminate && '--indeterminate')}
          style={
            !indeterminate
              ? {
                  transform: `translateX(${translate}%)`,
                }
              : undefined
          }
        />
      </div>
      {valueText && (
        <div aria-hidden="true" className={cx('text')}>
          {valueText}
        </div>
      )}
    </Element>
  );
});

Progress.displayName = 'Progress';

Progress.defaultProps = {
  value: 0,
  min: 0,
  max: 100,
  indeterminate: false,
};

export default Progress;
