import React, { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';

import { enableAnimation, disableAnimation } from '../../utils/useAnimationDuration';
import Tooltip from './Tooltip';

describe('Tooltip', () => {
  beforeAll(() => {
    disableAnimation();
  });

  afterAll(() => {
    enableAnimation();
  });

  it('Wrapp a child component', async () => {
    const { container } = render(
      <Tooltip>
        <button>button</button>
      </Tooltip>
    );

    const button = screen.getByText('button');

    expect(button).toBeInTheDocument();
    expect(await axe(container)).toHaveNoViolations();
  });

  it('Open/Close on focus after a delay', async () => {
    const user = userEvent.setup();

    const { container } = render(
      <Tooltip content="content" title="title">
        <button>button</button>
      </Tooltip>
    );

    await act(() => user.tab());

    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByRole('tooltip')).toBeInTheDocument();
    });

    expect(screen.getByText('content')).toBeInTheDocument();
    expect(screen.getByText('title')).toBeInTheDocument();
    expect(await axe(container)).toHaveNoViolations();

    await act(() => user.tab());

    await waitFor(() => {
      expect(screen.getByText('button')).not.toHaveFocus();
      expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
      expect(screen.queryByText('content')).not.toBeInTheDocument();
    });
  });

  it('Open/Close on focus after a delay', async () => {
    const user = userEvent.setup();

    render(
      <>
        <Tooltip content="content" title="title">
          <button>button</button>
        </Tooltip>
        <div>other</div>
      </>
    );

    const button = screen.getByText('button');
    await user.hover(button);

    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByRole('tooltip')).toBeInTheDocument();
    });

    expect(screen.getByText('content')).toBeInTheDocument();
    expect(screen.getByText('title')).toBeInTheDocument();

    const otherDiv = screen.getByText('other');
    await act(() => user.hover(otherDiv));

    await waitFor(() => {
      expect(screen.getByText('button')).not.toHaveFocus();
      expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
      expect(screen.queryByText('content')).not.toBeInTheDocument();
    });
  });

  it('Close on Escape', async () => {
    const user = userEvent.setup();

    render(
      <>
        <Tooltip content="content" title="title">
          <button>button</button>
        </Tooltip>
        <div>other</div>
      </>
    );

    await act(() => user.tab());

    await waitFor(() => {
      expect(screen.getByRole('tooltip')).toBeInTheDocument();
    });

    await act(() => user.keyboard('{Escape}'));

    await waitFor(() => {
      expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
      expect(screen.queryByText('content')).not.toBeInTheDocument();
    });
  });

  it("Don't show if no content and title", async () => {
    const user = userEvent.setup();

    render(
      <>
        <Tooltip content="">
          <button>button</button>
        </Tooltip>
      </>
    );

    await act(() => user.tab());

    await waitFor(() => {
      expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
      expect(screen.queryByText('content')).not.toBeInTheDocument();
    });
  });

  it('can add a description to the wrapped element', async () => {
    const user = userEvent.setup();

    const { container } = render(
      <>
        <Tooltip content="content1">
          <button>button1</button>
        </Tooltip>
      </>
    );

    const button1 = screen.getByText('button1');
    await act(() => user.click(button1));

    await waitFor(async () => {
      const content1 = screen.queryByText('content1');
      expect(content1).toBeInTheDocument();
      expect(content1).toHaveAttribute('id', expect.anything());
      expect(button1).toHaveAttribute('aria-describedby', expect.anything());
      expect(button1.getAttribute('aria-describedby')?.trim()).toEqual(
        content1?.getAttribute('id')
      );
      expect(await axe(container)).toHaveNoViolations();
    });
  });

  it('can add a label to the wrapped element', async () => {
    const user = userEvent.setup();

    const { container } = render(
      <>
        <Tooltip content="content1" describeAs="label">
          <button>button1</button>
        </Tooltip>
      </>
    );

    const button1 = screen.getByText('button1');
    await user.click(button1);

    await waitFor(async () => {
      const content1 = screen.queryByText('content1');
      expect(content1).toBeInTheDocument();
      expect(content1).toHaveAttribute('id', expect.anything());
      expect(button1).toHaveAttribute('aria-labelledby', expect.anything());
      expect(button1.getAttribute('aria-labelledby')?.trim()).toEqual(content1?.getAttribute('id'));
      expect(await axe(container)).toHaveNoViolations();
    });
  });

  it('can wrapp without describing anything', async () => {
    const user = userEvent.setup();

    const { container } = render(
      <>
        <Tooltip content="content1" describeAs="none">
          <button>button1</button>
        </Tooltip>
      </>
    );

    const button1 = screen.getByText('button1');
    await user.click(button1);

    await waitFor(async () => {
      const content1 = screen.queryByText('content1');
      expect(content1).toBeInTheDocument();
      expect(content1).toHaveAttribute('id', expect.anything());
      expect(button1).not.toHaveAttribute('aria-labelledby', expect.anything());
      expect(await axe(container)).toHaveNoViolations();
    });
  });

  it("don't override existing aria description", async () => {
    const user = userEvent.setup();

    const { container } = render(
      <>
        <Tooltip id="tooltip" content="content1" describeAs="label">
          <button aria-labelledby="test">button1</button>
        </Tooltip>
      </>
    );

    const button1 = screen.getByText('button1');
    await user.click(button1);

    await waitFor(async () => {
      const content1 = screen.queryByText('content1');
      expect(content1).toBeInTheDocument();
      expect(content1).toHaveAttribute('id', 'tooltip');
      expect(button1).toHaveAttribute('aria-labelledby', 'test tooltip');
      expect(await axe(container)).toHaveNoViolations();
    });
  });
});
