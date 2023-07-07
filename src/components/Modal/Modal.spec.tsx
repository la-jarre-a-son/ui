import React, { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ModalHeader } from './ModalHeader';
import { axe } from 'jest-axe';
import { disableAnimation } from '../../utils/useAnimationDuration';
import Modal from './Modal';
import { useState } from 'react';

disableAnimation();

describe('Modal', () => {
  it('does not render the content if not opened', () => {
    render(<Modal>content</Modal>);

    const content = screen.queryByText('content');
    expect(content).not.toBeInTheDocument();
  });

  it('render the content when opened', async () => {
    const { container } = render(<Modal open>content</Modal>);

    const content = screen.queryByText('content');
    const dialog = screen.queryByRole('dialog');

    expect(content).toBeInTheDocument();
    expect(dialog).toBeInTheDocument();
    expect(await axe(container)).toHaveNoViolations();
  });

  it('focus the first focusable child on opening', async () => {
    render(
      <Modal open>
        <div>content</div>
        <button>first</button>
      </Modal>
    );

    const first = screen.queryByText('first');
    expect(first).toBeInTheDocument();
    await waitFor(() => expect(first).toHaveFocus());
  });

  it('trap the focus inside the modal', async () => {
    const user = userEvent.setup();

    render(
      <Modal open>
        <div>content</div>
        <button>first</button>
      </Modal>
    );

    const button = screen.queryByText('first');
    await waitFor(() => expect(button).toHaveFocus());

    await user.tab();
    expect(button).toHaveFocus();

    await user.tab({
      shift: true,
    });
    expect(button).toHaveFocus();
  });

  it('close on Escape', async () => {
    const user = userEvent.setup();

    const onClose = jest.fn();

    render(
      <Modal open onClose={onClose}>
        <div>content</div>
        <button>first</button>
      </Modal>
    );

    await waitFor(() => {
      expect(screen.getByText('content')).toBeInTheDocument();
    });

    await user.keyboard('{Escape}');

    expect(onClose).toHaveBeenCalledWith('escape');
  });

  it('close when clicking outside', async () => {
    const user = userEvent.setup();

    const onClose = jest.fn();

    render(
      <>
        <button>outside</button>
        <Modal open onClose={onClose}>
          <div>content</div>
          <button>first</button>
        </Modal>
      </>
    );

    await waitFor(() => {
      expect(screen.getByText('content')).toBeInTheDocument();
    });

    const outside = screen.getByText('outside');
    await user.click(outside);

    expect(onClose).toHaveBeenCalledWith('clickoutside');
  });

  it('allow for modal stacking', async () => {
    render(
      <Modal open>
        <div>content</div>
        <button>button1</button>
        <Modal open>
          <div>content2</div>
          <button>button2</button>
        </Modal>
      </Modal>
    );

    await waitFor(() => {
      expect(screen.getByText('content')).toBeInTheDocument();
      expect(screen.getByText('content2')).toBeInTheDocument();
      expect(screen.getByText('button2')).toHaveFocus();
    });
  });

  it('refocus trigger on close', async () => {
    const user = userEvent.setup();

    const Comp = () => {
      const [open, setOpen] = useState(false);
      return (
        <>
          <button>button1</button>
          <button onClick={() => setOpen(true)}>button2</button>
          <button>button3</button>
          <Modal open={open} onClose={() => setOpen(false)}>
            <button onClick={() => setOpen(false)}>inner</button>
            content
          </Modal>
        </>
      );
    };

    render(<Comp />);

    const button2 = screen.getByText('button2');
    await user.click(button2);

    expect(button2).not.toHaveFocus();

    await user.click(screen.getByText('inner'));

    expect(button2).toHaveFocus();
  });

  describe('ModalHeader', () => {
    it('render without crashing', () => {
      render(<ModalHeader title="title" />);

      expect(screen.getByText('title')).toBeInTheDocument();
    });

    it('render a close button', async () => {
      const onClose = jest.fn();
      const user = userEvent.setup();

      render(<ModalHeader title="title" onClose={onClose} />);

      const closeButton = screen.getByRole('button');

      await user.click(closeButton);

      expect(onClose).toHaveBeenCalledWith('closebutton');
    });

    it('take the props of the parent Modal', async () => {
      const onClose = jest.fn();
      const user = userEvent.setup();

      const { container } = render(
        <Modal onClose={onClose} open>
          <ModalHeader title="title" />
        </Modal>
      );

      const dialog = screen.getByRole('dialog');
      const title = screen.getByText('title');
      const button = screen.getByRole('button');

      await user.click(button);

      expect(await axe(container)).toHaveNoViolations();
      expect(onClose).toHaveBeenCalledWith('closebutton');
      expect(dialog).toHaveAttribute('aria-labelledby', title.getAttribute('id'));
    });

    it('ids can be passed as props', async () => {
      const { container } = render(
        <Modal open>
          <ModalHeader title="title" titleProps={{ id: 'titleId' }} />
        </Modal>
      );

      const dialog = screen.getByRole('dialog');

      expect(await axe(container)).toHaveNoViolations();
      expect(dialog).toHaveAttribute('aria-labelledby', 'titleId');
    });
  });
});
