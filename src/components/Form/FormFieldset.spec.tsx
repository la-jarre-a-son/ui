import React from 'react';
import { render, screen } from '@testing-library/react';
import FormFieldset from './FormFieldset';

describe('FormFieldset', () => {
  it('render without crashing', async () => {
    render(<FormFieldset label="legend">content</FormFieldset>);

    const legend = screen.getByText('legend');
    const content = screen.getByText('content');

    expect(legend).toBeInTheDocument();
    expect(content).toBeInTheDocument();
  });

  it('make use of the as prop', () => {
    render(
      <FormFieldset as="button" label="legend">
        content
      </FormFieldset>
    );

    const buttonFormFieldset = screen.getByRole('button');

    expect(buttonFormFieldset).toBeInTheDocument();
  });
});
