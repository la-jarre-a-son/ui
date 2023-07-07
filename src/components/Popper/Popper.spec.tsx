import React from 'react';
import { render, screen } from '@testing-library/react';

import Popper from './Popper';

describe('Popper', () => {
  it('render without crashing', async () => {
    render(<Popper>content</Popper>);

    const content = screen.getByText('content');

    expect(content).toBeInTheDocument();
  });

  it('make use of the as prop', () => {
    render(<Popper as="button">content</Popper>);

    const buttonPopper = screen.getByRole('button');

    expect(buttonPopper).toBeInTheDocument();
  });
});
