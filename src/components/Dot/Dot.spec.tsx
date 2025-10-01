import React from 'react';
import { render, screen } from '@testing-library/react';
import Dot from './Dot';

describe('Dot', () => {
  it('render without crashing', () => {
    render(<Dot />);
  });

  it("make use of the 'as' prop", async () => {
    render(<Dot as="a" role="button" />);

    const button = screen.getByRole('button');

    expect(button.tagName).toEqual('A');
  });
});
