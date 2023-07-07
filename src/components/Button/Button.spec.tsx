import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from './Button';

describe('Button', () => {
  it('render without crashing', () => {
    render(<Button>my button</Button>);

    const button = screen.getByRole('button');
    const buttonText = screen.getByText('my button');

    expect(button).toBeInTheDocument();
    expect(buttonText).toBeInTheDocument();
  });

  it('can render an element left', () => {
    render(<Button left={<div>left</div>}>my button</Button>);

    const left = screen.getByText('left');

    expect(left).toBeInTheDocument();
  });

  it('can render an element right', () => {
    render(<Button right={<div>right</div>}>my button</Button>);

    const right = screen.getByText('right');

    expect(right).toBeInTheDocument();
  });

  it("can't interact when disabled", async () => {
    const onClick = jest.fn();
    const user = userEvent.setup();

    render(
      <Button disabled onClick={onClick}>
        my button
      </Button>
    );

    const button = screen.getByRole('button');
    await user.click(button);

    expect(onClick).not.toHaveBeenCalled();
  });

  it("make use of the 'as' prop", async () => {
    render(
      <Button as="a" role="button">
        my button
      </Button>
    );

    const button = screen.getByRole('button');

    expect(button.tagName).toEqual('A');
  });
});
