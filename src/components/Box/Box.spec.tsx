import React from 'react';
import { render, screen } from '@testing-library/react';

import Box from './Box';

describe('Box', () => {
  it('render without crashing', async () => {
    render(<Box>content</Box>);

    const content = screen.getByText('content');

    expect(content).toBeInTheDocument();
  });

  it('make use of the as prop', () => {
    render(<Box as="button">content</Box>);

    const buttonBox = screen.getByRole('button');

    expect(buttonBox).toBeInTheDocument();
  });
});
