import React from 'react';
import ReactSlider, { ReactSliderProps } from 'react-slider';

import { bindClassNames } from '../../utils/classNames';
import { forwardRefWithAs } from '../../utils/forwardRefWithAsProp';
import { MergeProps } from '../../utils/typeUtils';

import styles from './Slider.module.scss';

const cx = bindClassNames(styles);

/* Props */

export type SliderDirection = 'horizontal' | 'vertical';

export type SliderProps = MergeProps<
  {
    /**
     * The text for the current value of slider
     */
    valueText?: string;
    /**
     * The direction of the slider.
     *
     * Replaces ReactSlider's `orientation` prop.
     */
    direction?: SliderDirection;
    /**
     * Inverts the direction of the slider.
     *
     * Default horizontal direction is left to right, vertical direction is bottom to top (inverted with ReactSlider)
     */
    invert?: boolean;
    /**
     * ClassName to apply to the value text
     */
    textClassName?: string;
  },
  Omit<ReactSliderProps<number | number[]>, 'orientation'>
>;

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
    value = 0,
    valueText,
    ariaValuetext,
    direction = 'horizontal',
    min = 0,
    max = 100,
    invert = false,
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
        min={min}
        max={max}
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

export default Slider;
