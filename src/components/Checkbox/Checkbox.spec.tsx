import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';

import Checkbox from './Checkbox';
import { FormControlLabel } from '../Form';

describe('Checkbox', () => {
  it('render without crashing', async () => {
    const { container } = render(<Checkbox aria-label="label" />);

    const content = screen.getByRole('checkbox');

    expect(content).toBeInTheDocument();
    expect(await axe(container)).toHaveNoViolations();
  });

  it('make use of the as prop', () => {
    render(<Checkbox as="button" />);

    const buttonCheckbox = screen.getByRole('button');

    expect(buttonCheckbox).toBeInTheDocument();
  });

  it('trigger a callback on change', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();

    render(<Checkbox onChange={onChange} />);

    const checkbox = screen.getByRole('checkbox');
    await user.click(checkbox);

    expect(onChange).toHaveBeenCalled();
    expect(onChange).toHaveBeenCalledWith(true, expect.anything());
  });

  it("can't interact when disabled", async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();

    render(<Checkbox disabled onChange={onChange} />);

    const checkbox = screen.getByRole('checkbox');
    await user.click(checkbox);

    expect(onChange).not.toHaveBeenCalled();
  });

  it('Can be enhanced with a label', async () => {
    const { container } = render(
      <FormControlLabel label="label">
        <Checkbox />
      </FormControlLabel>
    );

    expect(await axe(container)).toHaveNoViolations();
  });

  it('can be controlled', async () => {
    const user = userEvent.setup();

    const { rerender } = render(<Checkbox checked={false} />);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();

    await user.click(checkbox);
    expect(checkbox).not.toBeChecked();

    rerender(<Checkbox checked />);
    expect(checkbox).toBeChecked();
  });

  it('can be uncontrolled', async () => {
    const user = userEvent.setup();

    render(<Checkbox />);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();

    await user.click(checkbox);
    expect(checkbox).toBeChecked();
  });

  it('can be checked when indeterminate and uncontrolled', async () => {
    const user = userEvent.setup();

    render(<Checkbox indeterminate />);

    const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
    expect(checkbox).not.toBeChecked();
    expect(checkbox.indeterminate).toBe(true);

    await user.click(checkbox);
    expect(checkbox).toBeChecked();
  });

  it('trigger a callback on change with checked = true when indeterminate', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();

    render(<Checkbox onChange={onChange} indeterminate />);

    const checkbox = screen.getByRole('checkbox');
    await user.click(checkbox);

    expect(onChange).toHaveBeenCalled();
    expect(onChange).toHaveBeenCalledWith(true, expect.anything());
  });
});
