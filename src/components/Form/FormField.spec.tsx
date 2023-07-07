import React from 'react';
import { render, screen } from '@testing-library/react';
import FormField from './FormField';
import { Input } from '../Input';
import { axe } from 'jest-axe';
import FieldContainer from './FieldContainer';
import FieldLabel from './FieldLabel';
import FieldHint from './FieldHint';

describe('FormField', () => {
  it('has a valid label', async () => {
    const { container } = render(
      <FormField label="Label">
        <Input />
      </FormField>
    );

    const label = screen.getByLabelText('Label');

    expect(await axe(container)).toHaveNoViolations();
    expect(label).toBeInTheDocument();
  });

  it('can have an hint text', async () => {
    const { container } = render(
      <FormField label="Label" hint="Hint">
        <Input />
      </FormField>
    );

    expect(await axe(container)).toHaveNoViolations();
    expect(screen.getByText('Hint')).toBeInTheDocument();
  });

  it('can have an error', async () => {
    const { container } = render(
      <FormField label="Label" error="Error">
        <Input />
      </FormField>
    );

    const input = screen.getByRole('textbox');
    const error = screen.getByRole('alert');

    expect(await axe(container)).toHaveNoViolations();
    expect(error).toBeInTheDocument();
    expect(error.innerHTML).toEqual('Error');
    expect(input.getAttribute('aria-invalid')).toEqual('true');
  });

  it('can be recomposed', async () => {
    const { container } = render(
      <FieldContainer>
        <FieldLabel id="label">Label</FieldLabel>
        <Input aria-labelledby="label error" error />
        <FieldHint error="Error" id="error" />
      </FieldContainer>
    );

    const input = screen.getByRole('textbox');
    const error = screen.getByRole('alert');
    const label = screen.getByLabelText('Label');

    expect(await axe(container)).toHaveNoViolations();
    expect(label).toBeInTheDocument();
    expect(error).toBeInTheDocument();
    expect(error.innerHTML).toEqual('Error');
    expect(input.getAttribute('aria-invalid')).toEqual('true');
  });
});
