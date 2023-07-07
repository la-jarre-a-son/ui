import React, { render, fireEvent, waitFor, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { disableAnimation } from '../../utils/useAnimationDuration';
import Dropdown from './Dropdown';

disableAnimation();

describe('Dropdown', () => {
  it('render the passed trigger element', async () => {
    render(<Dropdown trigger={<button>trigger</button>}>content</Dropdown>);

    const button = await screen.findByText('trigger');

    expect(button).toBeInTheDocument();
  });

  it('open the content when clicking on the trigger', async () => {
    render(<Dropdown trigger={<button>trigger</button>}>content</Dropdown>);

    const button = screen.getByText('trigger');
    fireEvent.click(button);

    await waitFor(() => screen.findByText('content'));

    expect(screen.getByText('content')).toBeInTheDocument();
  });

  it('focus the first focusable element after opening', async () => {
    const user = userEvent.setup();

    render(
      <Dropdown trigger={<button>trigger</button>}>
        <div>content</div>
        <button>inside</button>
      </Dropdown>
    );

    const button = screen.getByText('trigger');
    await act(() => user.click(button));

    await waitFor(() => {
      screen.getByText('content');
    });

    const inside = screen.getByText('inside');
    await waitFor(() => expect(inside).toHaveFocus());
  });

  it('trap focus inside content', async () => {
    const user = userEvent.setup();

    render(
      <Dropdown trigger={<button>trigger</button>}>
        <div>content</div>
        <button>inside</button>
      </Dropdown>
    );

    const button = screen.getByText('trigger');
    await act(() => user.click(button));

    await waitFor(() => {
      screen.getByText('content');
    });

    const inside = screen.getByText('inside');
    await waitFor(() => expect(inside).toHaveFocus());

    await user.tab();
    expect(inside).toHaveFocus();

    await user.tab({
      shift: true,
    });
    expect(inside).toHaveFocus();
  });

  it('Close the dropdown on Echap and refocus trigger', async () => {
    const user = userEvent.setup();

    render(
      <>
        <Dropdown trigger={<button>trigger</button>}>
          <div>content</div>
          <button>inside</button>
        </Dropdown>
        <button>outside</button>
      </>
    );

    const button = screen.getByText('trigger');
    await act(() => user.click(button));

    await waitFor(() => screen.getByText('content'));

    await act(() => user.keyboard('{Escape}'));

    await waitFor(() => {
      expect(button).toHaveFocus();
      expect(screen.queryByText('content')).not.toBeInTheDocument();
    });
  });

  it('Close the dropdown on click outside', async () => {
    const user = userEvent.setup();

    render(
      <>
        <Dropdown trigger={<button>trigger</button>}>
          <div>content</div>
          <button>inside</button>
        </Dropdown>
        <button>outside</button>
      </>
    );

    const button = screen.getByText('trigger');
    await act(() => user.click(button));

    await waitFor(() => screen.getByText('content'));

    const outsideButton = screen.getByText('outside');
    await act(() => user.click(outsideButton));

    await waitFor(() => {
      expect(screen.queryByText('content')).not.toBeInTheDocument();
    });
  });

  it('Cycle the focus trap', async () => {
    const user = userEvent.setup();

    render(
      <>
        <Dropdown trigger={<button>trigger</button>}>
          <div>content</div>
          <button>first</button>
          <button>seconde</button>
        </Dropdown>
      </>
    );

    const button = screen.getByText('trigger');

    await act(() => user.click(button));

    await waitFor(() => screen.getByText('content'));

    const first = screen.getByText('first');
    const seconde = screen.getByText('seconde');

    await waitFor(() => expect(first).toHaveFocus());

    await user.tab();

    expect(seconde).toHaveFocus();

    await user.tab();

    expect(first).toHaveFocus();

    await user.tab({
      shift: true,
    });

    expect(seconde).toHaveFocus();

    await user.tab({
      shift: true,
    });

    expect(first).toHaveFocus();
  });

  it('can be a controlled component', async () => {
    const user = userEvent.setup();
    const onClose = jest.fn();

    render(
      <>
        <Dropdown open onClose={onClose}>
          <div>content</div>
        </Dropdown>
        <button>outside</button>
      </>
    );

    await waitFor(() => {
      expect(screen.getByText('content')).toBeInTheDocument();
    });

    await act(() => user.click(screen.getByText('outside')));

    expect(screen.getByText('content')).toBeInTheDocument();
    expect(onClose).toHaveBeenCalled();
  });

  it('can accept custom trigger keys', async () => {
    const user = userEvent.setup();

    render(
      <Dropdown triggerKeys={['ArrowDown']} trigger={<button>button</button>}>
        inside
      </Dropdown>
    );

    // don't open on Space as it has been overrided
    await user.tab();
    await user.keyboard('{Space}');
    await waitFor(() => {
      expect(screen.queryByText('inside')).not.toBeInTheDocument();
    });

    // don't open at A
    await user.keyboard('{A}');
    await waitFor(() => {
      expect(screen.queryByText('inside')).not.toBeInTheDocument();
    });

    // open at ArrowDown
    await act(() => user.keyboard('{ArrowDown}'));
    await waitFor(() => {
      expect(screen.queryByText('inside')).toBeInTheDocument();
    });
  });
});
