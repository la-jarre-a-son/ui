import React from 'react';

import { bindClassNames } from '../../utils/classNames';
import { forwardRefWithAs } from '../../utils/forwardRefWithAsProp';

import styles from './Progress.module.scss';

const cx = bindClassNames(styles);

/* Props */

export type ProgressProps = {
  /**
   * The current value of progress
   */
  value?: number;
  /**
   * The minimum value that represents the start of progress
   */
  min?: number;
  /**
   * The maximum vlaue that represents the end of progress
   */
  max?: number;
  /**
   * The text for the current value of progress
   */
  valueText?: string;
  /**
   * Makes the progress animated indefinitely
   */
  indeterminate?: boolean;
};

/**
 * Renders a horizontal progress bar to give some feedback on a loading state.
 *
 * Its value can be clamped to any minimum and maximum values (e.g. 0...1, or 0...100), or indeterminate (with a looping animation).
 */
export const Progress = forwardRefWithAs<ProgressProps, 'div'>((props, ref) => {
  const {
    as,
    valueText,
    min = 0,
    max = 100,
    value = 0,
    className,
    indeterminate = false,
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

export default Progress;
