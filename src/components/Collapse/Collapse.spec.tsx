import React from 'react';
import { render, screen } from '@testing-library/react';

import { disableAnimation } from '../../utils/useAnimationDuration';
import { enableAnimation } from '../../utils/useAnimationDuration';
import Collapse from './Collapse';

describe('Collapse', () => {
  beforeAll(() => {
    disableAnimation();
  });

  afterAll(() => {
    enableAnimation();
  });

  it('render without crashing', () => {
    render(<Collapse>content</Collapse>);

    const content = screen.queryByText('content');

    expect(content).not.toBeInTheDocument();
  });

  it('can be opened by default', () => {
    render(<Collapse open>content</Collapse>);

    const content = screen.queryByText('content');

    expect(content).toBeInTheDocument();
  });

  it('can render the content when open=true', () => {
    const { rerender } = render(<Collapse open={false}>content</Collapse>);

    let content = screen.queryByText('content');

    expect(content).not.toBeInTheDocument();

    rerender(<Collapse open>content</Collapse>);

    content = screen.queryByText('content');

    expect(content).toBeInTheDocument();
  });

  it('can keep the content mounted when open=false', () => {
    render(<Collapse keepMounted>content</Collapse>);

    const content = screen.queryByText('content');

    expect(content).toBeInTheDocument();
  });

  it('make use of the as prop', () => {
    render(<Collapse as="button">content</Collapse>);

    const buttonCollapse = screen.getByRole('button');

    expect(buttonCollapse).toBeInTheDocument();
  });
});
