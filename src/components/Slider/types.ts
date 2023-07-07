import { ReactSliderProps } from 'react-slider';
import { MergeProps } from '../../utils/typeUtils';

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
