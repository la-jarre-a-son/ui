import React from 'react';
import { render, screen } from '@testing-library/react';

import Badge from './Badge';

describe('Badge', () => {
  it('render without crashing', async () => {
    render(<Badge>content</Badge>);

    const content = screen.getByText('content');

    expect(content).toBeInTheDocument();
  });

  it('can render an element left', async () => {
    render(<Badge left={'left'}>content</Badge>);

    const left = screen.getByText('left');

    expect(left).toBeInTheDocument();
  });

  it('can render an element right', async () => {
    render(<Badge right={'right'}>content</Badge>);

    const right = screen.getByText('right');

    expect(right).toBeInTheDocument();
  });

  it('make use of the as prop', () => {
    render(<Badge as="button">content</Badge>);

    const buttonBadge = screen.getByRole('button');

    expect(buttonBadge).toBeInTheDocument();
  });
});
