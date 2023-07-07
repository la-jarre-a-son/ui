import React from 'react';
import { bindClassNames } from '../../utils/classNames';
import { forwardRefWithAs } from '../../utils/forwardRefWithAsProp';

import styles from './Card.module.scss';
import { CardHeaderProps } from './types';

const cx = bindClassNames(styles);

/**
 * Wraps the header of a card, with left and right contents on the sides.
 *
 * Must be used inside a Card component.
 */
export const CardHeader = forwardRefWithAs<CardHeaderProps, 'div'>((props, ref) => {
  const { children, as, className, left, right, ...otherProps } = props;

  const Element = as || 'div';

  return (
    <Element ref={ref} className={cx('header', className)} {...otherProps}>
      {left && <div className={cx('headerLeft')}>{left}</div>}
      <div className={cx('headerContent')}>{children}</div>
      {right && <div className={cx('headerRight')}>{right}</div>}
    </Element>
  );
});

CardHeader.displayName = 'CardHeader';

export default CardHeader;
