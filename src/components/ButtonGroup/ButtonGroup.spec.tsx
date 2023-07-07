import React from 'react';
import { render, screen } from '@testing-library/react';
import Button from '../Button';
import ButtonGroup from './ButtonGroup';

describe('ButtonGroup', () => {
  it('render without crashing', () => {
    render(
      <ButtonGroup>
        <Button>button1</Button>
        <Button>button1</Button>
        <Button>button1</Button>
      </ButtonGroup>
    );

    const buttons = screen.getAllByRole('button');

    expect(buttons.length).toEqual(3);
  });

  it("make use of the 'as' prop", async () => {
    render(
      <ButtonGroup as="nav">
        <Button>button1</Button>
        <Button>button1</Button>
        <Button>button1</Button>
      </ButtonGroup>
    );

    const group = screen.getByRole('navigation');

    expect(group).toBeInTheDocument();
  });
});
