import React from 'react';
import { render, screen } from '@testing-library/react';
import Dot from './Dot';

describe('Dot', () => {
  it('render without crashing', () => {
    render(<Dot />);
  });

  it("make use of the 'as' prop", async () => {
    render(<Dot as="button" aria-label="Dot" />);

    const div = screen.getByRole('button');

    expect(div).toBeInTheDocument();
  });
});
