import React from 'react';
import { render, screen } from '@testing-library/react';

import Typography from './Typography';

describe('Typography', () => {
  it('render without crashing', () => {
    render(<Typography>content</Typography>);

    const content = screen.getByText('content');

    expect(content).toBeInTheDocument();
  });

  it('make use of the as prop', () => {
    render(<Typography as="button">content</Typography>);

    const buttonTypography = screen.getByRole('button');

    expect(buttonTypography).toBeInTheDocument();
  });
});
