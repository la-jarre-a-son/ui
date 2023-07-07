import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Link from './Link';

describe('Link', () => {
  it('render without crashing', async () => {
    render(<Link>content</Link>);

    const content = screen.getByText('content');

    expect(content).toBeInTheDocument();
  });

  it('make use of the as prop', () => {
    render(<Link as="button">content</Link>);

    const buttonLink = screen.getByRole('button');

    expect(buttonLink).toBeInTheDocument();
  });

  it("can't interact when disabled", async () => {
    const onClick = jest.fn();
    const user = userEvent.setup();

    render(
      <Link disabled as="button" onClick={onClick}>
        my button
      </Link>
    );

    const buttonLink = screen.getByRole('button');
    await user.click(buttonLink);

    expect(onClick).not.toHaveBeenCalled();
  });
});
