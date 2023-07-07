import React from 'react';
import { render, screen } from '@testing-library/react';

import Slider from './Slider';
import { axe } from 'jest-axe';

describe('Slider', () => {
  it('render without crashing', async () => {
    const { container } = render(<Slider ariaLabel="Slider" max={100} value={10} />);

    const content = screen.getByRole('slider');

    expect(content).toBeInTheDocument();
    expect(await axe(container)).toHaveNoViolations();
    expect(content).toHaveAttribute('aria-label', 'Slider');
    expect(content).toHaveAttribute('aria-valuenow', '10');
  });
});
