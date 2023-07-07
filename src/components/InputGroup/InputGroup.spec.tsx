import React from 'react';
import { render, screen } from '@testing-library/react';

import InputGroup from './InputGroup';

describe('InputGroup', () => {
  it('render without crashing', () => {
    render(<InputGroup>content</InputGroup>);

    const content = screen.getByText('content');

    expect(content).toBeInTheDocument();
  });

  it('make use of the as prop', () => {
    render(<InputGroup as="button">content</InputGroup>);

    const buttonInputGroup = screen.getByRole('button');

    expect(buttonInputGroup).toBeInTheDocument();
  });
});
