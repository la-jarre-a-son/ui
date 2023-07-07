import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ListItem from './ListItem';

describe('ListItem', () => {
  it('render without crashing', () => {
    render(<ListItem>content</ListItem>);

    const content = screen.getByText('content');

    expect(content).toBeInTheDocument();
  });

  it('make use of the as prop', () => {
    render(<ListItem as="button">content</ListItem>);

    const buttonListItem = screen.getByRole('button');

    expect(buttonListItem).toBeInTheDocument();
  });

  it('can be disabled', () => {
    render(<ListItem disabled>content</ListItem>);

    const item = screen.getByText('content');

    expect(item).toHaveAttribute('aria-disabled', 'true');
  });

  it('can have an element left', () => {
    render(<ListItem left={'left'}>content</ListItem>);

    const left = screen.getByText('left');

    expect(left).toBeInTheDocument();
  });

  it('can have an element right', () => {
    render(<ListItem right={'right'}>content</ListItem>);

    const right = screen.getByText('right');

    expect(right).toBeInTheDocument();
  });

  it('can be interactive', async () => {
    const user = userEvent.setup();
    const onClick = jest.fn();

    render(
      <ListItem interactive role="button" onClick={onClick}>
        content
      </ListItem>
    );

    const item = screen.getByRole('button');

    await user.click(item);

    expect(onClick).toHaveBeenCalled();
  });
});
