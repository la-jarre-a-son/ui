import React from 'react';
import { render, screen } from '@testing-library/react';

import Grid from './Grid';

describe('Grid', () => {
  it('render without crashing', async () => {
    render(<Grid>content</Grid>);

    const content = screen.getByText('content');

    expect(content).toBeInTheDocument();
  });

  it('make use of the as prop', () => {
    render(<Grid as="button">content</Grid>);

    const buttonGrid = screen.getByRole('button');

    expect(buttonGrid).toBeInTheDocument();
  });
});
