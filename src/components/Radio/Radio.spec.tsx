import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';

import { FormControlLabel } from '../Form';
import Radio from './Radio';

describe('Radio', () => {
  it('render without crashing', async () => {
    const { container } = render(<Radio aria-label="label" />);

    const content = screen.getByRole('radio');

    expect(content).toBeInTheDocument();
    expect(await axe(container)).toHaveNoViolations();
  });

  it('make use of the as prop', () => {
    render(<Radio as="button" />);

    const buttonCheckbox = screen.getByRole('button');

    expect(buttonCheckbox).toBeInTheDocument();
  });

  it('trigger a callback on change', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();

    render(<Radio onChange={onChange} value="value" />);

    const radio = screen.getByRole('radio');
    await user.click(radio);

    expect(onChange).toHaveBeenCalled();
    expect(onChange).toHaveBeenCalledWith('value', expect.anything());
  });

  it("can't interact when disabled", async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();

    render(<Radio disabled onChange={onChange} />);

    const radio = screen.getByRole('radio');
    await user.click(radio);

    expect(onChange).not.toHaveBeenCalled();
  });

  it('Can be enhanced with a label', async () => {
    const { container } = render(
      <FormControlLabel label="label">
        <Radio />
      </FormControlLabel>
    );

    expect(await axe(container)).toHaveNoViolations();
  });

  it('can be controlled', async () => {
    const user = userEvent.setup();

    const { rerender } = render(<Radio checked={false} />);

    const radio = screen.getByRole('radio');
    expect(radio).not.toBeChecked();

    await user.click(radio);
    expect(radio).not.toBeChecked();

    rerender(<Radio checked />);
    expect(radio).toBeChecked();
  });

  it('can be uncontrolled', async () => {
    const user = userEvent.setup();

    render(<Radio />);

    const radio = screen.getByRole('radio');
    expect(radio).not.toBeChecked();

    await user.click(radio);
    expect(radio).toBeChecked();
  });
});
