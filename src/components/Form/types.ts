import React from 'react';
import { PropsWithAs } from '../../utils/typeUtils';

export type FormFieldContextValue = {
  label?: string;
  error?: string | null;
  labelId?: string;
  hintId?: string;
  inputProps: {
    id?: string;
    'aria-invalid'?: boolean;
    'aria-describedby'?: string;
  };
};

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

export type FormControlLabelProps = {
  /**
   * The control label
   */
  label: React.ReactNode;
  /**
   * The hint text of the control
   */
  hint?: string;
  /**
   * The error text if the field is invalid
   */
  error?: string | null;
  /**
   * Specifies that the control is disabled
   */
  disabled?: boolean;
  /**
   * Puts the control after its label
   */
  reverse?: boolean;
  /**
   * The control to decorate
   */
  children?: React.ReactNode;
};

export type FieldLabelProps = {
  /**
   * Specifies that the label is hidden (still available for screenreaders)
   */
  hide?: boolean;
  /**
   * Content of the label
   */
  children?: React.ReactNode;
};

export type FieldHintProps = {
  /**
   * The hint text content
   */
  hint?: React.ReactNode;
  /**
   * The error to be rendered instead of a hint
   */
  error?: React.ReactNode;
};

export type FieldsetProps = {
  /**
   * The fieldset label
   */
  label: React.ReactNode;
  /**
   * Content of the label
   */
  children?: React.ReactNode;
};
