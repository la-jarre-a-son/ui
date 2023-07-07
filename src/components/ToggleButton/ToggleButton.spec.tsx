import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';

import ToggleButton from './ToggleButton';

describe('ToggleButton', () => {
  it('render without crashing', async () => {
    const { container } = render(<ToggleButton>content</ToggleButton>);

    const content = screen.getByText('content');
    const button = screen.getByRole('button');

    expect(content).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    expect(await axe(container)).toHaveNoViolations();
  });

  it('make use of the as prop', () => {
    render(
      <ToggleButton as="a" role="link">
        content
      </ToggleButton>
    );

    const button = screen.getByRole('link');

    expect(button.tagName).toEqual('A');
  });

  it('can be selected', async () => {
    const { container } = render(<ToggleButton selected>content</ToggleButton>);

    const button = screen.getByRole('button');

    expect(button).toBeInTheDocument();
    expect(await axe(container)).toHaveNoViolations();
    expect(button).toHaveAttribute('aria-pressed', 'true');
  });
});
