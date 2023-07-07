import React from 'react';

import { forwardRefWithAs } from '../../utils/forwardRefWithAsProp';

import { InputProps } from './types';
import InputContainer from './InputContainer';
import { useFormField } from '../Form';

/**
 * Renders a basic text input with style and additional states.
 *
 * Accept all the props of an input, as well as a `left` and `right` props.
 *
 * > All props passed to it will be passed to the input element.
 * If you wan't to pass props specifically to the container root element, use the `containerProps` prop.
 */
export const Input = forwardRefWithAs<InputProps, 'input'>((props, ref) => {
  const {
    as,
    id,
    left,
    right,
    error,
    style,
    block,
    size,
    focused,
    required,
    disabled,
    children,
    onChange,
    containerProps,
    ...inputProps
  } = props;

  const Element = as || 'input';

  const { inputProps: fieldInputProps, error: fieldError } = useFormField();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(event.currentTarget.value, event);
    }
  };

  const err = error || fieldError;

  return (
    <InputContainer
      block={block}
      size={size}
      error={err}
      left={left}
      right={right}
      disabled={disabled}
      focused={focused}
      {...(containerProps || {})}
    >
      {children || (
        <Element
          id={id}
          ref={ref}
          style={style}
          required={required}
          aria-required={required}
          aria-invalid={err ? 'true' : undefined}
          {...fieldInputProps}
          {...inputProps}
          disabled={disabled}
          onChange={handleChange}
        />
      )}
    </InputContainer>
  );
});

Input.displayName = 'Input';

export default Input;
