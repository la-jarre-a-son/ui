import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Drawer from './Drawer';
import { axe } from 'jest-axe';

describe('Drawer', () => {
  it('not opened', () => {
    render(<Drawer aria-label="drawer">content</Drawer>);

    const content = screen.queryByText('content');
    expect(content).not.toBeInTheDocument();
  });

  it('can be opened', async () => {
    const { container } = render(
      <Drawer aria-label="drawer" open title="Drawer">
        content
      </Drawer>
    );

    let content: any;
    await waitFor(() => {
      content = screen.getByText('content');
    });

    expect(content).toBeInTheDocument();
    expect(await axe(container)).toHaveNoViolations();
  });

  it('ask to close on escape', async () => {
    const user = userEvent.setup();
    const fn = jest.fn();

    render(
      <Drawer aria-label="drawer" onClose={fn} open title="Drawer">
        content
      </Drawer>
    );

    let content: any;
    await waitFor(() => {
      content = screen.getByText('content');
    });

    await user.keyboard('{Escape}');

    expect(content).toBeInTheDocument();
    expect(fn).toHaveBeenCalledWith('escape');
  });

  it('trap focus', async () => {
    const user = userEvent.setup();
    render(
      <Drawer aria-label="drawer" open title="Drawer">
        <button>button1</button>
        <button>button2</button>
        <button>button3</button>
      </Drawer>
    );

    let button1, button2, button3;

    await waitFor(() => {
      button1 = screen.getByText('button1');
      button2 = screen.getByText('button2');
      button3 = screen.getByText('button3');
    });

    expect(button1).toHaveFocus();

    await user.tab();
    expect(button2).toHaveFocus();

    await user.tab();
    expect(button3).toHaveFocus();

    await user.tab();
    expect(button1).toHaveFocus();

    await user.tab({
      shift: true,
    });
    expect(button3).toHaveFocus();
  });

  it('ask to close on click on the overlay', async () => {
    const user = userEvent.setup();
    const fn = jest.fn();

    render(
      <Drawer aria-label="drawer" onClose={fn} open title="Drawer">
        <button>button1</button>
        <button>button2</button>
        <button>button3</button>
      </Drawer>
    );

    const overlay = screen.getByRole('presentation');

    await user.click(overlay);

    expect(fn).toHaveBeenCalledWith('clickoutside');
  });
});
