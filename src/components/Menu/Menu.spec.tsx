import React, { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';

import { disableAnimation } from '../../utils/useAnimationDuration';

import Menu from './Menu';
import MenuGroup from './MenuGroup';
import MenuItem from './MenuItem';
import MenuItemCheckbox from './MenuItemCheckbox';
import MenuItemRadio from './MenuItemRadio';

const wait = () => new Promise((r) => setTimeout(r, 300));

describe('Menu', () => {
  beforeAll(() => {
    disableAnimation();
  });

  it('can navigate with the arrows', async () => {
    const user = userEvent.setup();
    render(
      <>
        <Menu trigger={<button>button1</button>}>
          <MenuItem>item1</MenuItem>
          <MenuItem>item2</MenuItem>
        </Menu>
        <button>button2</button>
      </>
    );

    const button1 = screen.getByText('button1');

    await act(() => user.click(button1));

    // waiting for the menu container to have focus
    await waitFor(() => expect(screen.getByRole('menu')).toHaveFocus());

    const [item1, item2] = screen.getAllByRole('menuitem');

    await user.keyboard('{ArrowDown}');
    expect(item1).toHaveFocus();

    await user.keyboard('{ArrowDown}');
    expect(item2).toHaveFocus();

    await user.keyboard('{ArrowUp}');
    expect(item1).toHaveFocus();

    await user.keyboard('{ArrowUp}');
    expect(item2).toHaveFocus();
  });

  it('can navigate with top and bottom keys', async () => {
    const user = userEvent.setup();
    render(
      <>
        <Menu trigger={<button>button1</button>}>
          <MenuItem>item1</MenuItem>
          <MenuItem>item2</MenuItem>
          <MenuItem>item3</MenuItem>
        </Menu>
        <button>button2</button>
      </>
    );

    const button1 = screen.getByText('button1');
    await act(() => user.click(button1));

    // waiting for the menu container to have focus
    await waitFor(() => expect(screen.getByRole('menu')).toHaveFocus());

    const [item1, _, item3] = screen.getAllByRole('menuitem');

    await user.keyboard('{End}');
    expect(item3).toHaveFocus();

    await user.keyboard('{Home}');
    expect(item1).toHaveFocus();
  });

  it('Escape close and re-focus the trigger', async () => {
    const user = userEvent.setup();
    render(
      <>
        <Menu trigger={<button>button1</button>}>
          <MenuItem>item1</MenuItem>
          <MenuItem>item2</MenuItem>
          <MenuItem>item3</MenuItem>
        </Menu>
        <button>button2</button>
      </>
    );

    const button1 = screen.getByText('button1');
    await act(() => user.click(button1));

    // waiting for the menu container to have focus
    await waitFor(() => expect(screen.getByRole('menu')).toHaveFocus());

    await act(() => user.keyboard('{Escape}'));

    await waitFor(() => {
      expect(button1).toHaveFocus();
      expect(screen.queryByText('item2')).not.toBeInTheDocument();
    });
  });

  it('Tab away close and re-focus the trigger', async () => {
    const user = userEvent.setup();

    render(
      <>
        <Menu trigger={<button>button1</button>}>
          <MenuItem>item1</MenuItem>
          <MenuItem>item2</MenuItem>
          <MenuItem>item3</MenuItem>
        </Menu>
        <button>button2</button>
      </>
    );

    const button1 = screen.getByText('button1');
    await act(() => user.click(button1));

    // waiting for the menu container to have focus
    await waitFor(() => expect(screen.getByRole('menu')).toHaveFocus());

    await act(() => user.tab());

    await waitFor(() => {
      expect(button1).toHaveFocus();
      expect(screen.queryByText('item2')).not.toBeInTheDocument();
    });
  });

  it('Can navigate with char', async () => {
    const user = userEvent.setup();

    render(
      <>
        <Menu trigger={<button>button1</button>}>
          <MenuItem>A</MenuItem>
          <MenuItem>B1</MenuItem>
          <MenuItem>B2</MenuItem>
          <MenuItem>C1</MenuItem>
          <MenuItem>C2</MenuItem>
        </Menu>
        <button>button2</button>
      </>
    );

    const button1 = screen.getByText('button1');
    await act(() => user.click(button1));

    // waiting for the menu container to have focus
    await waitFor(() => expect(screen.getByRole('menu')).toHaveFocus());

    await user.keyboard('b');
    expect(screen.queryByText('B1')).toHaveFocus();

    await user.keyboard('d');
    expect(screen.queryByText('B1')).toHaveFocus();

    await user.keyboard('B');
    expect(screen.queryByText('B2')).toHaveFocus();

    // waiting some time before the next keyboard input
    await wait();

    await user.keyboard('c2');
    expect(screen.queryByText('C2')).toHaveFocus();

    // waiting some time before the next keyboard input
    await wait();

    await user.keyboard('a');
    expect(screen.queryByText('A')).toHaveFocus();
  });

  it('call onChange on item click', async () => {
    const user = userEvent.setup();

    const onChange = jest.fn();

    render(
      <>
        <Menu trigger={<button>button1</button>} onChange={onChange}>
          <MenuItem value="1">A</MenuItem>
          <MenuItem value="2">B1</MenuItem>
          <MenuItem value="3">B2</MenuItem>
          <MenuItem value="4">C1</MenuItem>
          <MenuItem value="5">C2</MenuItem>
        </Menu>
      </>
    );

    const button1 = screen.getByText('button1');
    await act(() => user.click(button1));

    const item = screen.getByText('B1');
    await act(() => user.click(item));

    expect(onChange).toHaveBeenCalledWith('2');
  });

  it('control the selected item', async () => {
    const user = userEvent.setup();

    const { container } = render(
      <>
        <Menu trigger={<button>button1</button>} value="2">
          <MenuItem value="1">A</MenuItem>
          <MenuItem value="2">B1</MenuItem>
          <MenuItem value="3">B2</MenuItem>
          <MenuItem value="4">C1</MenuItem>
          <MenuItem value="5">C2</MenuItem>
        </Menu>
      </>
    );

    const button1 = screen.getByText('button1');
    await act(() => user.click(button1));

    expect(await axe(container)).toHaveNoViolations();
    expect(screen.getByText('B1').getAttribute('aria-current')).toEqual('true');
  });

  describe('MenuItem', () => {
    it('render without crashing', () => {
      render(<MenuItem>content</MenuItem>);
      expect(screen.getByText('content')).toBeInTheDocument();
    });
  });

  describe('MenuItemRadio', () => {
    it('render without crashing', () => {
      render(<MenuItemRadio>content</MenuItemRadio>);
      expect(screen.getByText('content')).toBeInTheDocument();
    });

    it('control the selected item', async () => {
      const user = userEvent.setup();
      const onChange = jest.fn();

      const { container } = render(
        <Menu trigger={<button>button</button>} onChange={onChange} value="1">
          <MenuItemRadio value="1">A</MenuItemRadio>
          <MenuItemRadio value="2">B1</MenuItemRadio>
          <MenuItemRadio value="3">B2</MenuItemRadio>
          <MenuItemRadio value="4">C1</MenuItemRadio>
          <MenuItemRadio value="5">C2</MenuItemRadio>
        </Menu>
      );

      const button = screen.getByText('button');
      await act(() => user.click(button));

      const item1 = screen.getByText('A');
      expect(item1.getAttribute('aria-checked')).toEqual('true');
      expect(await axe(container)).toHaveNoViolations();

      await act(() => user.click(screen.getByText('B1')));
      expect(onChange).toHaveBeenCalledWith('2');
    });
  });

  describe('MenuItemCheckbox', () => {
    it('render without crashing', () => {
      render(<MenuItemCheckbox>content</MenuItemCheckbox>);
      expect(screen.getByText('content')).toBeInTheDocument();
    });

    it('control the selected item', async () => {
      const user = userEvent.setup();
      const onChange = jest.fn();

      const { container } = render(
        <Menu trigger={<button>button</button>} onChange={onChange} value={['1', '2']}>
          <MenuItemCheckbox value="1">A</MenuItemCheckbox>
          <MenuItemCheckbox value="2">B1</MenuItemCheckbox>
          <MenuItemCheckbox value="3">B2</MenuItemCheckbox>
          <MenuItemCheckbox value="4">C1</MenuItemCheckbox>
          <MenuItemCheckbox value="5">C2</MenuItemCheckbox>
        </Menu>
      );

      const button = screen.getByText('button');
      await act(() => user.click(button));

      const item1 = screen.getByText('A');
      expect(item1.getAttribute('aria-checked')).toEqual('true');
      const item2 = screen.getByText('B1');
      expect(item2.getAttribute('aria-checked')).toEqual('true');
      expect(await axe(container)).toHaveNoViolations();

      await act(() => user.click(screen.getByText('B1')));
      expect(onChange).toHaveBeenCalledWith(['1']);

      await act(() => user.click(screen.getByText('B2')));
      expect(onChange).toHaveBeenCalledWith(['1', '2', '3']);
    });
  });

  describe('MenuGroup', () => {
    it('render without crashing', () => {
      render(<MenuGroup header="title">content</MenuGroup>);
      expect(screen.getByText('content')).toBeInTheDocument();
      expect(screen.getByText('title')).toBeInTheDocument();
    });
  });
});
