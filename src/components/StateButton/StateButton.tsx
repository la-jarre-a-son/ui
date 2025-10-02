import React, { useState, useCallback, useRef, useEffect } from 'react';

import { bindClassNames } from '../../utils/classNames';
import { forwardRefWithAs } from '../../utils/forwardRefWithAsProp';

import Button from '../Button';
import Icon from '../Icon';

import styles from './StateButton.module.scss';

type StateButtonStatus = null | 'success' | 'error' | 'pending';

type StateButtonStatics = {
  /**
   * Duration (in ms) of feedback (sucess/error) after promise is resolved
   */
  FEEDBACK_DURATION: number;
  /**
   * Icon for the pending state (automatic spin)
   */
  ICON_PENDING: string;
  /**
   * Icon for the success state (automatic spin)
   */
  ICON_SUCCESS: string;
  /**
   * Icon for the error state (automatic spin)
   */
  ICON_ERROR: string;
};

const cx = bindClassNames(styles);

function FeedbackRender({
  status,
  iconPending,
  iconError,
  iconSuccess,
}: {
  status: StateButtonStatus;
  iconPending: string;
  iconError: string;
  iconSuccess: string;
}): JSX.Element {
  return (
    <span className={cx('feedback')}>
      {status === 'pending' && <Icon name={iconPending} spin />}
      {status === 'success' && <Icon name={iconSuccess} />}
      {status === 'error' && <Icon name={iconError} />}
    </span>
  );
}

/* Props */

export type StateButtonProps = {
  /**
   * Callback fired on button click
   *
   * If the handler returns a Promise, the button will automatically handle its state.
   */
  onClick?: (e: React.MouseEvent<HTMLElement>) => void | Promise<unknown>;
  /**
   * A promise to give the button a state
   */
  promise?: Promise<unknown>;
  /**
   * Specifies that the button is in pending state
   */
  loading?: boolean;
  /**
   * Disables the button and its interactions
   */
  disabled?: boolean;
  /**
   * Content on the left of the button
   */
  left?: React.ReactNode;
  /**
   * Content on the right of the button
   */
  right?: React.ReactNode;
  /**
   * Content of the button
   */
  children: React.ReactNode;
  /**
   * Icon classname when status is pending
   */
  iconPending?: string;
  /**
   * Icon classname when status is success
   */
  iconSuccess?: string;
  /**
   * Icon classname when status is error
   */
  iconError?: string;
};

/**
 * Renders a button with a loading, success or error state depending on a Promise.
 *
 * You can pass a `promise` as props, or return a Promise in the `onClick` handler.
 * You can also control the pending state directly with `loading`
 */
export const StateButton = forwardRefWithAs<StateButtonProps, typeof Button, StateButtonStatics>(
  (
    {
      as,
      className,
      children,
      promise,
      loading,
      onClick,
      iconPending,
      iconSuccess,
      iconError,
      ...otherProps
    },
    ref: React.Ref<typeof Button>
  ) => {
    const [status, setStatus] = useState<StateButtonStatus>(null);

    const currentPromise = useRef<Promise<unknown> | null>(promise || null);
    const currentTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

    const startTimeout = useCallback(() => {
      if (currentTimeout.current) {
        clearTimeout(currentTimeout.current);
      }
      currentTimeout.current = setTimeout(() => {
        setStatus(null);
        currentTimeout.current = null;
      }, StateButton.FEEDBACK_DURATION);
    }, [setStatus]);

    const handlePromiseSuccess = useCallback(
      (resolvedPromise: Promise<unknown>) => {
        if (currentPromise?.current === resolvedPromise) {
          setStatus('success');
          startTimeout();
        }
      },
      [setStatus, startTimeout]
    );

    const handlePromiseError = useCallback(
      (resolvedPromise: Promise<unknown>) => {
        if (currentPromise?.current === resolvedPromise) {
          setStatus('error');
          startTimeout();
        }
      },
      [currentPromise, setStatus, startTimeout]
    );

    const handleClick = useCallback(
      (event: React.MouseEvent<HTMLButtonElement>) => {
        if (onClick) {
          const result = onClick(event as React.MouseEvent<HTMLButtonElement>);

          // if promise
          if (typeof result?.then === 'function') {
            currentPromise.current = result;
            setStatus('pending');
            result.then(() => handlePromiseSuccess(result)).catch(() => handlePromiseError(result));
          }
        }
        return null;
      },
      [handlePromiseError, handlePromiseSuccess, onClick]
    );

    useEffect(() => {
      if (promise) {
        currentPromise.current = promise;
        setStatus('pending');
        promise.then(() => handlePromiseSuccess(promise)).catch(() => handlePromiseError(promise));
      } else {
        if (currentPromise.current) {
          setStatus(null);
        }
        currentPromise.current = null;
      }
    }, [promise, handlePromiseSuccess, handlePromiseError]);

    useEffect(
      () => () => {
        currentPromise.current = null;
        if (currentTimeout.current) {
          clearTimeout(currentTimeout.current);
        }
      },
      []
    );

    const Element = as || Button;

    return (
      <Element
        as={as}
        ref={ref}
        className={cx(
          'root',
          {
            '--pending': loading || status === 'pending',
            '--error': !loading && status === 'error',
            '--success': !loading && status === 'success',
          },
          className
        )}
        onClick={handleClick}
        {...otherProps}
      >
        {typeof children === 'string' ? <span className={cx('label')}>{children}</span> : children}
        <FeedbackRender
          status={loading ? 'pending' : status}
          iconPending={iconPending ?? StateButton.ICON_PENDING}
          iconSuccess={iconSuccess ?? StateButton.ICON_SUCCESS}
          iconError={iconError ?? StateButton.ICON_ERROR}
        />
      </Element>
    );
  }
);

StateButton.FEEDBACK_DURATION = 1500;
StateButton.ICON_PENDING = 'fi fi-rr-spinner';
StateButton.ICON_SUCCESS = 'fi fi-rr-check';
StateButton.ICON_ERROR = 'fi fi-rr-cross';

StateButton.displayName = 'StateButton';

export default StateButton;
