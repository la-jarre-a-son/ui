import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';

import Switch from './Switch';
import { FormControlLabel } from '../Form';

describe('Switch', () => {
  it('render without crashing', async () => {
    const { container } = render(<Switch aria-label="label" />);

    const content = screen.getByRole('checkbox');

    expect(content).toBeInTheDocument();
    expect(await axe(container)).toHaveNoViolations();
  });

  it('make use of the as prop', () => {
    render(<Switch as="button" />);

    const buttonCheckbox = screen.getByRole('button');

    expect(buttonCheckbox).toBeInTheDocument();
  });

  it('trigger a callback on change', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();

    render(<Switch onChange={onChange} />);

    const checkbox = screen.getByRole('checkbox');
    await user.click(checkbox);

    expect(onChange).toHaveBeenCalled();
    expect(onChange).toHaveBeenCalledWith(true, expect.anything());
  });

  it("can't interact when disabled", async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();

    render(<Switch disabled onChange={onChange} />);

    const checkbox = screen.getByRole('checkbox');
    await user.click(checkbox);

    expect(onChange).not.toHaveBeenCalled();
  });

  it('Can be enhanced with a label', async () => {
    const { container } = render(
      <FormControlLabel label="label">
        <Switch />
      </FormControlLabel>
    );

    expect(await axe(container)).toHaveNoViolations();
  });

  it('can be controlled', async () => {
    const user = userEvent.setup();

    const { rerender } = render(<Switch checked={false} />);

    const switchEl = screen.getByRole('checkbox');
    expect(switchEl).not.toBeChecked();

    await user.click(switchEl);
    expect(switchEl).not.toBeChecked();

    rerender(<Switch checked />);
    expect(switchEl).toBeChecked();
  });

  it('can be uncontrolled', async () => {
    const user = userEvent.setup();

    render(<Switch />);

    const switchEl = screen.getByRole('checkbox');
    expect(switchEl).not.toBeChecked();

    await user.click(switchEl);
    expect(switchEl).toBeChecked();
  });
});
