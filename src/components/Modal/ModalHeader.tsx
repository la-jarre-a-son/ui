import React, { useCallback, useEffect } from 'react';

import { bindClassNames } from '../../utils/classNames';
import { forwardRefWithAs } from '../../utils/forwardRefWithAsProp';
import { useId } from '../../utils/useId';

import Button from '../Button';
import Icon from '../Icon';

import { useModal, OnModalClose } from './ModalContext';

import styles from './Modal.module.scss';

const cx = bindClassNames(styles);

type ModalHeaderStatics = {
  /**
   * Icon for the close button
   */
  ICON_CLOSE: string;
};

/* Props */

export type ModalTitleProps = React.ComponentPropsWithRef<'div'>;

export type ModalHeaderProps = {
  /**
   * The modal title
   */
  title?: string;
  /**
   * Props to pass to the title element
   */
  titleProps?: ModalTitleProps;
  /**
   * Callbacks fired after triggering the close button
   */
  onClose?: OnModalClose;
  /**
   * The modal header content
   */
  children?: React.ReactNode;
};

/**
 * Renders the header of a modal.
 *
 * Must be used inside a Modal, through its `renderHeader` prop.
 */
export const ModalHeader = forwardRefWithAs<ModalHeaderProps, 'header', ModalHeaderStatics>(
  (props, ref) => {
    const { children, as, className, onClose, title, titleProps, ...otherProps } = props;

    const _titleUid = useId(titleProps?.id);

    const Element = as || 'header';

    // get the parent Modal props
    const { onClose: _onClose, dialogEl } = useModal({
      onClose,
    });

    /**
     * Close the modal when clicking on the close button
     */
    const handleClose = useCallback(() => {
      if (_onClose) _onClose('closebutton');
    }, [_onClose]);

    // set label/describe id to the parent dialog element for accessibility
    useEffect(() => {
      if (dialogEl) {
        if (_titleUid && title) {
          dialogEl.setAttribute('aria-labelledby', _titleUid);
        }
      }
    }, [title, _titleUid, dialogEl]);

    return (
      <Element ref={ref} className={cx('header', className)} {...otherProps}>
        {title && (
          <div tabIndex={-1} className={cx('title')} id={_titleUid} {...titleProps}>
            {title}
          </div>
        )}
        {children}
        {_onClose && (
          <Button
            className={cx('closeButton')}
            icon
            variant="ghost"
            intent="neutral"
            aria-label="close"
            size="md"
            onClick={handleClose}
          >
            <Icon name={ModalHeader.ICON_CLOSE} />
          </Button>
        )}
      </Element>
    );
  }
);

ModalHeader.ICON_CLOSE = 'fi fi-rr-cross';

ModalHeader.displayName = 'ModalHeader';

export default ModalHeader;
