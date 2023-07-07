import React from 'react';
import { render, screen } from '@testing-library/react';

import Stack from './Stack';
import StackSeparator from './StackSeparator';

describe('Stack', () => {
  it('render without crashing', async () => {
    render(<Stack>content</Stack>);

    const content = screen.getByText('content');

    expect(content).toBeInTheDocument();
  });

  it('make use of the as prop', () => {
    render(<Stack as="button">content</Stack>);

    const buttonStack = screen.getByRole('button');

    expect(buttonStack).toBeInTheDocument();
  });
});

describe('StackSeparator', () => {
  it('render without crashing', () => {
    render(<StackSeparator />);
    expect(screen.getByRole('separator')).toBeInTheDocument();
  });

  it('can wrap a child without overriding his ref', () => {
    const ref1 = jest.fn();
    const ref2 = jest.fn();

    render(
      <StackSeparator ref={ref1}>
        <div ref={ref2}>content</div>
      </StackSeparator>
    );

    expect(screen.getByText('content')).toBeInTheDocument();
    expect(ref1).toHaveBeenCalled();
    expect(ref2).toHaveBeenCalled();
  });
});
