import React from 'react';
import { render, screen } from '@testing-library/react';

import List from './List';

describe('List', () => {
  it('render without crashing', async () => {
    render(<List>content</List>);

    const content = screen.getByText('content');

    expect(content).toBeInTheDocument();
  });

  it('make use of the as prop', () => {
    render(<List as="button">content</List>);

    const buttonList = screen.getByRole('button');

    expect(buttonList).toBeInTheDocument();
  });
});
