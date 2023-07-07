import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';

import Divider from './Divider';

describe('Divider', () => {
  it('render without crashing', async () => {
    const { container } = render(<Divider />);

    const divider = screen.getByRole('separator');

    expect(divider).toBeInTheDocument();
    expect(await axe(container)).toHaveNoViolations();
  });

  it('make use of the as prop', () => {
    render(<Divider as="button" />);

    const buttonDivider = screen.getByRole('separator');

    expect(buttonDivider.tagName).toEqual('BUTTON');
  });
});
