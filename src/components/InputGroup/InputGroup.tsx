import React from 'react';

import { bindClassNames } from '../../utils/classNames';
import { forwardRefWithAs } from '../../utils/forwardRef';

import styles from './InputGroup.module.scss';

const cx = bindClassNames(styles);

/* Props */

export const InputGroupDirections = ['horizontal', 'vertical'] as const;

export type InputGroupDirection = (typeof InputGroupDirections)[number];

export type InputGroupProps = {
  /**
   * The direction of the stacked input elements
   */
  direction?: InputGroupDirection;
  /**
   * Makes the inputs in group take all available space equally
   */
  stretch?: boolean;
  /**
   * Makes the group take the whole available width
   */
  block?: boolean;
  /**
   * The inputs in group - should be elements using InputContainer
   */
  children?: React.ReactNode;
};

/**
 * Wraps a set of inputs relative to each other.
 *
 * You can mix any elements wrapped with InputContainer, InputContainerLabel and Button.
 */
export const InputGroup = forwardRefWithAs<InputGroupProps, 'div'>((props, ref) => {
  const {
    className,
    as,
    children,
    direction = 'horizontal',
    stretch = false,
    block = false,
    ...otherProps
  } = props;

  const Element = as || 'div';

  return (
    <Element
      ref={ref}
      className={cx(
        'root',
        `--${direction}`,
        stretch && '--stretch',
        block && '--block',
        className
      )}
      {...otherProps}
    >
      {children}
    </Element>
  );
});

InputGroup.displayName = 'InputGroup';

export default InputGroup;
