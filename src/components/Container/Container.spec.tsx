import React from 'react';
import { render, screen } from '@testing-library/react';

import Container from './Container';

describe('Container', () => {
  it('render without crashing', async () => {
    render(<Container>content</Container>);

    const content = screen.getByText('content');

    expect(content).toBeInTheDocument();
  });

  it('make use of the as prop', () => {
    render(<Container as="button">content</Container>);

    const buttonContainer = screen.getByRole('button');

    expect(buttonContainer).toBeInTheDocument();
  });
});
