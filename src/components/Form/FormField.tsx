import React, { useMemo } from 'react';

import { bindClassNames } from '../../utils/classNames';
import { forwardRefWithAs } from '../../utils/forwardRef';
import { PropsWithAs } from '../../utils/typeUtils';

import { useId } from '../../hooks/useId';

import { FormFieldContext, FormFieldContextValue } from './FormFieldContext';
import { FieldLabel, FieldLabelProps } from './FieldLabel';
import { FieldHint, FieldHintProps } from './FieldHint';
import { FieldContainer } from './FieldContainer';

import styles from './FormField.module.scss';

const cx = bindClassNames(styles);

/* Props */

type FormFieldRenderProp = (props: FormFieldContextValue) => React.ReactNode;

export type FormFieldProps = {
  /**
   * The hint label shown below the field
   */
  hint?: string;
  /**
   * The error label if the field is invalid
   */
  error?: string | null;
  /**
   * The field label
   */
  label: string;
  /**
   * Hides the label (still available for screenreaders)
   */
  hideLabel?: boolean;
  /**
   * Props to pass to the field hint or error
   */
  fieldHintProps?: Partial<PropsWithAs<'div', FieldHintProps>>;
  /**
   * Props to pass to the field label
   */
  fieldLabelProp?: Partial<PropsWithAs<'div', FieldLabelProps>>;
  /**
   * The field content, or a render function
   *
   * First argument of the render function is a `FormFieldContextValue`
   */
  children?: React.ReactNode | FormFieldRenderProp;
  /**
   * Make the field 100% width
   */
  block?: boolean;
};

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
