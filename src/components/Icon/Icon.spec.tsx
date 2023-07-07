import React from 'react';
import { render, screen } from '@testing-library/react';

import Icon from './Icon';

describe('Icon', () => {
  it('render without crashing', async () => {
    render(<Icon name="fa-solid fa-star" />);

    const icon = screen.getByRole('img', { hidden: true });

    expect(icon).toBeInTheDocument();
  });

  it('make use of the as prop', () => {
    render(
      <Icon as="span" name="fa-solid fa-star">
        content
      </Icon>
    );

    const spanIcon = screen.getByRole('img', { hidden: true });
    expect(spanIcon.tagName).toBe('SPAN');
    expect(spanIcon).toBeInTheDocument();
  });

  it('has accessible hidden attribute if no label', () => {
    render(<Icon name="fa-solid fa-star" />);

    const icon = screen.getByRole('img', { hidden: true });
    expect(icon).toHaveAttribute('aria-hidden', 'true');
  });

  it('can have accessible label', () => {
    render(<Icon name="fa-solid fa-star" aria-label="Star" />);

    const icon = screen.getByRole('img', { hidden: false });
    expect(icon).toHaveAccessibleName('Star');
  });
});
