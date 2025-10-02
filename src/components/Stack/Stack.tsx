import React from 'react';

import { bindClassNames } from '../../utils/classNames';
import { forwardRefWithAs } from '../../utils/forwardRef';

import styles from './Stack.module.scss';

const cx = bindClassNames(styles);

/* Props */

export const StackDirections = ['horizontal', 'vertical'] as const;
export const StackAligns = ['center', 'end', 'start', 'stretch'] as const;
export const StackJustifies = [
  ...StackAligns,
  'space-around',
  'space-between',
  'space-evenly',
] as const;
export const StackGaps = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

export type StackDirection = (typeof StackDirections)[number];
export type StackJustify = (typeof StackJustifies)[number];
export type StackAlign = (typeof StackAligns)[number];
export type StackGap = (typeof StackGaps)[number];

export type StackProps = {
  /**
   * Specifies if the elements should wrap (`flex-wrap` behaviour)
   */
  wrap?: boolean;
  /**
   * Specifies how the elements should be aligned (`align-items` behaviour)
   */
  align?: StackAlign;
  /**
   * Specifies how the content should be justified (`justify-content` behaviour)
   */
  justify?: StackJustify;
  /**
   * The space between elements (in tee shirt size)
   */
  gap?: StackGap;
  /**
   * The direction of the stack
   */
  direction?: StackDirection;
  /**
   * Makes the stack take the whole available width
   */
  block?: boolean;
  /**
   * Makes the stach element take all available space equally
   */
  stretch?: boolean;
  /**
   * The stack content
   */
  children?: React.ReactNode;
};

/**
 * Wraps and arranges a stack of items.
 *
 * This component use the most common flex box positioning
 */
export const Stack = forwardRefWithAs<StackProps, 'div'>((props, ref) => {
  const {
    children,
    as,
    className,
    align,
    justify,
    direction,
    wrap,
    gap,
    block,
    stretch,
    ...otherProps
  } = props;

  const Element = as || 'div';

  return (
    <Element
      ref={ref}
      className={cx(
        'root',
        align && `--align-${align}`,
        justify && `--justify-${justify}`,
        gap && `--gap-${gap}`,
        wrap && '--wrap',
        block && '--block',
        stretch && '--stretch',
        direction && `--${direction}`,
        className
      )}
      {...otherProps}
    >
      {children}
    </Element>
  );
});

Stack.displayName = 'Stack';

export default Stack;
