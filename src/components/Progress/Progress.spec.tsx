import React from 'react';
import { render, screen } from '@testing-library/react';

import Progress from './Progress';
import { axe } from 'jest-axe';

describe('Progress', () => {
  it('render without crashing', async () => {
    const { container } = render(
      <Progress aria-label="File download progress" max={100} value={10} valueText="0%" />
    );

    const content = screen.getByRole('progressbar');

    expect(content).toBeInTheDocument();
    expect(await axe(container)).toHaveNoViolations();
    expect(content).toHaveAttribute('aria-valuenow', '10');
  });

  it('make use of the as prop', () => {
    render(<Progress as="button">content</Progress>);

    const buttonProgress = screen.getByRole('progressbar');

    expect(buttonProgress.tagName).toEqual('BUTTON');
  });

  it('can have a valueText', () => {
    render(<Progress max={100} value={0} valueText="0%" />);

    const valueText = screen.getByText('0%');

    expect(valueText).toBeInTheDocument();
  });
});
