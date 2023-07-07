import React from 'react';
import { render, screen } from '@testing-library/react';

import Toolbar from './Toolbar';

describe('Toolbar', () => {
  it('render without crashing', async () => {
    render(<Toolbar>content</Toolbar>);

    const content = screen.getByText('content');

    expect(content).toBeInTheDocument();
  });

  it('make use of the as prop', () => {
    render(<Toolbar as="button">content</Toolbar>);

    const buttonToolbar = screen.getByRole('button');

    expect(buttonToolbar).toBeInTheDocument();
  });
});
