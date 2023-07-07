import React from 'react';
import ReactSlider from 'react-slider';

import { forwardRefWithAs } from '../../utils/forwardRefWithAsProp';
import { bindClassNames } from '../../utils/classNames';

import styles from './Slider.module.scss';
import { SliderProps } from './types';

const cx = bindClassNames(styles);

/**
 * Renders a Slider bar to get a numerical value from user.
 */
export const Slider = forwardRefWithAs<SliderProps, 'div'>((props, ref) => {
  const {
    as,
    className,
    thumbClassName,
    trackClassName,
    markClassName,
    thumbActiveClassName,
    textClassName,
    value,
    valueText,
    ariaValuetext,
    direction,
    invert,
    ...otherProps
  } = props;

  const Element = as || 'div';
  return (
    <Element
      ref={ref}
      className={cx('root', direction && `--${direction}`, invert && `--invert`, className)}
    >
      <ReactSlider
        className={cx(
          'slider',
          {
            '--single': !value || typeof value === 'number' || value.length === 1,
            '--range': value && typeof value !== 'number' && value.length === 2,
            '--multiple': value && typeof value !== 'number' && value.length > 2,
          },
          className
        )}
        thumbClassName={cx('thumb', thumbClassName)}
        trackClassName={cx('track', trackClassName)}
        markClassName={cx('mark', markClassName)}
        thumbActiveClassName={cx('thumb--active', thumbActiveClassName)}
        {...otherProps}
        orientation={direction}
        invert={direction === 'horizontal' ? invert : !invert}
        value={value}
        ariaValuetext={ariaValuetext ?? valueText}
      ></ReactSlider>
      {valueText && (
        <div aria-hidden="true" className={cx('text', textClassName)}>
          {valueText}
        </div>
      )}
    </Element>
  );
});

Slider.displayName = 'Slider';

Slider.defaultProps = {
  direction: 'horizontal',
  value: 0,
  min: 0,
  max: 100,
  invert: false,
};

export default Slider;
