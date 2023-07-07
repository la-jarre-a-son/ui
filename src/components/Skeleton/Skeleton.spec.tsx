import React from 'react';
import { render, screen } from '@testing-library/react';

import Skeleton from './Skeleton';

describe('Skeleton', () => {
  it('render without crashing', () => {
    render(<Skeleton data-testid="skeleton" />);

    const content = screen.getByTestId('skeleton');

    expect(content).toBeInTheDocument();
  });

  it('make use of the as prop', () => {
    render(
      <Skeleton as="button" data-testid="skeleton">
        content
      </Skeleton>
    );

    const content = screen.getByTestId('skeleton');

    expect(content.tagName).toEqual('BUTTON');
  });
});
