import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Input from './Input';
import { axe } from 'jest-axe';
import InputContainerLabel from './InputContainerLabel';

describe('Input', () => {
  beforeAll(() => {
    // Issue with jest-axe and jsdom on validating input
    // see: https://github.com/nickcolley/jest-axe/issues/147#issuecomment-758804533
    // TODO: remove when it's properly fixed
    const { getComputedStyle } = window;
    window.getComputedStyle = (elt) => getComputedStyle(elt);
  });

  it('render without crashing', async () => {
    const { container } = render(<Input aria-label="input label" />);

    const content = screen.getByRole('textbox');

    expect(content).toBeInTheDocument();
    expect(await axe(container)).toHaveNoViolations();
  });

  it('can have an element left', () => {
    render(<Input left={'left'} />);

    const left = screen.getByText('left');

    expect(left).toBeInTheDocument();
  });

  it('can have an element right', () => {
    render(<Input left={'right'} />);

    const right = screen.getByText('right');

    expect(right).toBeInTheDocument();
  });

  it('trigger a callback on change', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();

    render(<Input onChange={onChange} />);

    const content = screen.getByRole('textbox');

    content.focus();

    await user.keyboard('a');

    expect(onChange).toHaveBeenCalled();
    expect(onChange).toHaveBeenCalledWith('a', expect.anything());
  });

  it('can be in error', async () => {
    const { container } = render(<Input aria-label="input label" error />);

    const content = screen.getByRole('textbox');

    expect(content.getAttribute('aria-invalid')).toEqual('true');
    expect(await axe(container)).toHaveNoViolations();
  });

  it('can be required', async () => {
    const { container } = render(<Input aria-label="input label" required />);

    const content = screen.getByRole('textbox');

    expect(content.getAttribute('aria-required')).toEqual('true');
    expect(await axe(container)).toHaveNoViolations();
  });

  it('can be disabled', async () => {
    const { container } = render(<Input aria-label="input label" disabled />);

    const content = screen.getByRole('textbox');

    expect(content).toBeDisabled();
    expect(await axe(container)).toHaveNoViolations();
  });

  it('can render a custom input', () => {
    render(
      <Input aria-label="input label" required>
        <div>custom input</div>
      </Input>
    );

    const customContent = screen.getByText('custom input');

    expect(customContent).toBeInTheDocument();
  });

  describe('InputContainerLabel', () => {
    it('render without crashing', () => {
      render(<InputContainerLabel>Label</InputContainerLabel>);
      expect(screen.getByText('Label')).toBeInTheDocument();
    });
  });
});
