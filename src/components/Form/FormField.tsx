import React, { useMemo } from 'react';
import { bindClassNames } from '../../utils/classNames';
import { forwardRefWithAs } from '../../utils/forwardRefWithAsProp';
import useId from '../../utils/useId';

import { FormFieldContextValue, FormFieldProps } from './types';

import styles from './FormField.module.scss';
import { FormFieldContext } from './FormFieldContext';
import FieldLabel from './FieldLabel';
import FieldHint from './FieldHint';
import FieldContainer from './FieldContainer';

const cx = bindClassNames(styles);

/**
 * Renders a form field allowing to create accessible form field inputs with a field label.
 *
 * Pass a `Input` or `Select` input type component as a child of the `FormField` to decorate it and manage accessibility.
 */
export const FormField = forwardRefWithAs<FormFieldProps, 'label'>((props, ref) => {
  const {
    as,
    hint,
    error,
    label,
    block,
    children,
    hideLabel,
    className,
    fieldHintProps,
    fieldLabelProp,
    ...otherProps
  } = props;

  const hintId = useId(fieldHintProps?.id);
  const labelId = useId(fieldLabelProp?.id);

  const contextValue = useMemo(
    (): FormFieldContextValue => ({
      label,
      labelId,
      hintId,
      error,
      inputProps: {
        'aria-invalid': error ? true : undefined,
        'aria-describedby': error || hint ? hintId : undefined,
      },
    }),
    [label, error, hint, labelId, hintId]
  );

  return (
    <FormFieldContext.Provider value={contextValue}>
      <FieldContainer
        as={as}
        ref={ref}
        className={cx('root', block && '--block', className)}
        {...otherProps}
      >
        <FieldLabel hide={hideLabel} {...(fieldLabelProp || {})} id={labelId}>
          {label}
        </FieldLabel>
        {typeof children === 'function' ? children(contextValue) : children}
        <FieldHint error={error} hint={hint} {...(fieldHintProps || {})} id={hintId} />
      </FieldContainer>
    </FormFieldContext.Provider>
  );
});

FormField.displayName = 'FormField';

export default FormField;
