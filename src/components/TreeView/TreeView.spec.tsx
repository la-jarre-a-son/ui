import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TreeView from './TreeView';
import TreeViewItem from './TreeViewItem';
import { axe } from 'jest-axe';
import { disableAnimation, enableAnimation } from '../../utils/useAnimationDuration';

const wait = () => new Promise((r) => setTimeout(r, 300));

describe('TreeView', () => {
  beforeAll(() => {
    disableAnimation();
  });

  afterAll(() => {
    enableAnimation();
  });

  beforeEach(() => {
    jest.spyOn(window, 'requestAnimationFrame').mockImplementation((cb: any) => cb());
  });

  afterEach(() => {
    (window.requestAnimationFrame as any).mockRestore();
  });

  it('can have element left', () => {
    render(
      <TreeView aria-label="tree view">
        <TreeViewItem title="item1" left={<div>left</div>} />
      </TreeView>
    );

    const left = screen.getByText('left');

    expect(left).toBeInTheDocument();
  });

  it('display the first level only', async () => {
    const { container } = render(
      <TreeView aria-label="tree view">
        <TreeViewItem title="item1">
          <TreeViewItem title="item11" />
          <TreeViewItem title="item12" />
        </TreeViewItem>
        <TreeViewItem title="item2" />
        <TreeViewItem title="item3" />
      </TreeView>
    );

    expect(await axe(container)).toHaveNoViolations();
    expect(screen.queryByText('item1')).toBeInTheDocument();
    expect(screen.queryByText('item2')).toBeInTheDocument();
    expect(screen.queryByText('item3')).toBeInTheDocument();
    expect(screen.queryByText('item11')).not.toBeInTheDocument();
    expect(screen.queryByText('item12')).not.toBeInTheDocument();
  });

  it('can be default opened', async () => {
    const { container } = render(
      <TreeView aria-label="tree view">
        <TreeViewItem defaultOpen title="item1">
          <TreeViewItem title="item11" />
          <TreeViewItem title="item12" />
        </TreeViewItem>
        <TreeViewItem title="item2" />
        <TreeViewItem title="item3" />
      </TreeView>
    );

    await waitFor(async () => {
      expect(await axe(container)).toHaveNoViolations();
      expect(screen.queryByText('item1')).toBeInTheDocument();
      expect(screen.queryByText('item2')).toBeInTheDocument();
      expect(screen.queryByText('item3')).toBeInTheDocument();
      expect(screen.queryByText('item11')).toBeInTheDocument();
      expect(screen.queryByText('item12')).toBeInTheDocument();
    });
  });

  it('open children when clicking on the parent item', async () => {
    const user = userEvent.setup();

    render(
      <TreeView aria-label="tree view">
        <TreeViewItem title="item1">
          <TreeViewItem title="item11" />
          <TreeViewItem title="item12" />
        </TreeViewItem>
        <TreeViewItem title="item2" />
        <TreeViewItem title="item3" />
      </TreeView>
    );

    const firstItem = screen.getByText('item1');

    await user.click(firstItem);

    await waitFor(async () => {
      expect(screen.queryByText('item11')).toBeInTheDocument();
      expect(screen.queryByText('item12')).toBeInTheDocument();
    });

    await user.click(firstItem);

    await waitFor(async () => {
      expect(screen.queryByText('item11')).not.toBeInTheDocument();
      expect(screen.queryByText('item12')).not.toBeInTheDocument();
    });
  });

  it('don`t navigate with tab', async () => {
    const user = userEvent.setup();

    render(
      <>
        <TreeView aria-label="tree view">
          <TreeViewItem title="item1" defaultOpen>
            <TreeViewItem title="item11" disabled />
            <TreeViewItem title="item12" />
          </TreeViewItem>
          <TreeViewItem title="item2" />
          <div />
          <TreeViewItem title="item3" />
        </TreeView>
        <button>button</button>
      </>
    );

    await user.tab();

    expect(screen.getByText('item1')).toHaveFocus();

    await user.tab();

    expect(screen.getByText('button')).toHaveFocus();
  });

  it('navigate with arrow down', async () => {
    const user = userEvent.setup();

    render(
      <>
        <TreeView aria-label="tree view">
          <TreeViewItem title="item1" defaultOpen>
            <div />
            <TreeViewItem title="item11" disabled />
            <TreeViewItem title="item12" />
            <TreeViewItem title="item13" />
          </TreeViewItem>
        </TreeView>
        <button>button</button>
      </>
    );

    await user.tab();
    await user.keyboard('{ArrowDown}');
    expect(screen.getByText('item12')).toHaveFocus();

    await user.keyboard('{ArrowDown}');
    expect(screen.getByText('item13')).toHaveFocus();

    await user.keyboard('{ArrowDown}');
    expect(screen.getByText('item1')).toHaveFocus();
  });

  it('navigate with arrow up', async () => {
    const user = userEvent.setup();

    render(
      <>
        <TreeView aria-label="tree view">
          <TreeViewItem title="item1" defaultOpen>
            <TreeViewItem title="item11" disabled />
            <TreeViewItem title="item12" />
            <div />
            <TreeViewItem title="item13" />
          </TreeViewItem>
        </TreeView>
        <button>button</button>
      </>
    );

    await user.tab();
    await user.keyboard('{ArrowUp}');
    expect(screen.getByText('item13')).toHaveFocus();

    await user.keyboard('{ArrowUp}');
    expect(screen.getByText('item12')).toHaveFocus();

    await user.keyboard('{ArrowUp}');
    expect(screen.getByText('item1')).toHaveFocus();
  });

  it('open on arrow right', async () => {
    const user = userEvent.setup();

    render(
      <>
        <TreeView aria-label="tree view">
          <TreeViewItem title="item1">
            <TreeViewItem title="item11" disabled />
            <TreeViewItem title="item12" />
            <TreeViewItem title="item13" />
            <div />
          </TreeViewItem>
        </TreeView>
        <button>button</button>
      </>
    );

    expect(screen.queryByText('item11')).not.toBeInTheDocument();

    await user.tab();
    await user.keyboard('{ArrowRight}');

    await waitFor(() => {
      expect(screen.getByText('item11')).toBeInTheDocument();
    });
  });

  it('close on arrow left', async () => {
    const user = userEvent.setup();

    render(
      <>
        <TreeView aria-label="tree view">
          <TreeViewItem title="item1" defaultOpen>
            <TreeViewItem title="item11" disabled />
            <div />
            <TreeViewItem title="item12" />
            <TreeViewItem title="item13" />
          </TreeViewItem>
        </TreeView>
        <button>button</button>
      </>
    );

    expect(screen.queryByText('item11')).toBeInTheDocument();

    await user.tab();
    await user.keyboard('{ArrowLeft}');
    await waitFor(() => {
      expect(screen.queryByText('item11')).not.toBeInTheDocument();
    });
  });

  it('navigate to the bottom with End key', async () => {
    const user = userEvent.setup();

    render(
      <>
        <TreeView aria-label="tree view">
          <TreeViewItem title="item1" defaultOpen>
            <TreeViewItem title="item11" disabled />
            <div />
            <TreeViewItem title="item12" />
            <TreeViewItem title="item13" />
          </TreeViewItem>
        </TreeView>
        <button>button</button>
      </>
    );

    await user.tab();
    await user.keyboard('{End}');

    expect(screen.queryByText('item13')).toHaveFocus();
  });

  it('navigate to the bottom with PageDown key', async () => {
    const user = userEvent.setup();

    render(
      <>
        <TreeView aria-label="tree view">
          <TreeViewItem title="item1" defaultOpen>
            <TreeViewItem title="item11" disabled />
            <div />
            <TreeViewItem title="item12" />
            <TreeViewItem title="item13" />
          </TreeViewItem>
        </TreeView>
        <button>button</button>
      </>
    );

    await user.tab();
    await user.keyboard('{PageDown}');

    expect(screen.queryByText('item13')).toHaveFocus();
  });

  it('navigate to the top with PageUp key', async () => {
    const user = userEvent.setup();

    render(
      <>
        <TreeView aria-label="tree view">
          <TreeViewItem title="item1" defaultOpen>
            <TreeViewItem title="item11" disabled />
            <div />
            <TreeViewItem title="item12" />
            <TreeViewItem title="item13" />
          </TreeViewItem>
        </TreeView>
        <button>button</button>
      </>
    );

    await user.click(screen.getByText('item13'));
    await user.keyboard('{PageUp}');

    expect(screen.queryByText('item1')).toHaveFocus();
  });

  it('navigate to the top with Home key', async () => {
    const user = userEvent.setup();

    render(
      <>
        <TreeView aria-label="tree view">
          <TreeViewItem title="item1" defaultOpen>
            <TreeViewItem title="item11" disabled />
            <div />
            <TreeViewItem title="item12" />
            <TreeViewItem title="item13" />
          </TreeViewItem>
        </TreeView>
        <button>button</button>
      </>
    );

    await user.click(screen.getByText('item13'));
    await user.keyboard('{Home}');

    expect(screen.queryByText('item1')).toHaveFocus();
  });

  it('navigate with text', async () => {
    const user = userEvent.setup();

    render(
      <>
        <TreeView aria-label="tree view">
          <TreeViewItem title="item1" defaultOpen>
            <TreeViewItem title="item11" disabled />
            <div />
            <TreeViewItem title="item12" />
            <TreeViewItem title="item13" />
          </TreeViewItem>
        </TreeView>
        <button>button</button>
      </>
    );

    await user.tab();
    await user.keyboard('i');
    expect(screen.queryByText('item12')).toHaveFocus();

    await wait();
    await user.keyboard(' ');
    expect(screen.getByText('item12')).toHaveFocus();

    await wait();
    await user.keyboard('item1');
    expect(screen.getByText('item1')).toHaveFocus();
  });

  it('navigate to parent with left', async () => {
    const user = userEvent.setup();

    render(
      <>
        <TreeView aria-label="tree view">
          <TreeViewItem title="item1" defaultOpen>
            <TreeViewItem title="item11" disabled />
            <div />
            <TreeViewItem title="item12" />
            <TreeViewItem title="item13" defaultOpen>
              <TreeViewItem title="item131" />
            </TreeViewItem>
          </TreeViewItem>
        </TreeView>
        <button>button</button>
      </>
    );

    const item131 = screen.getByText('item131');
    const item13 = screen.getByText('item13');
    const item1 = screen.getByText('item1');

    await user.click(item131);
    expect(item131).toHaveFocus();

    await user.keyboard('{ArrowLeft}');
    expect(item13).toHaveFocus();

    await user.keyboard('{ArrowLeft}');
    expect(item131).not.toBeInTheDocument();

    await user.keyboard('{ArrowLeft}');
    expect(item1).toHaveFocus();

    await user.keyboard('{ArrowLeft}');
    expect(item13).not.toBeInTheDocument();

    await user.keyboard('{ArrowLeft}');
    expect(item1).toHaveFocus();
  });

  it("can't open disabled items", async () => {
    const user = userEvent.setup();

    render(
      <>
        <TreeView aria-label="tree view">
          <TreeViewItem title="item1" disabled defaultOpen>
            <TreeViewItem title="item11" disabled />
            <div />
            <TreeViewItem title="item12" />
            <TreeViewItem title="item13" defaultOpen>
              <TreeViewItem title="item131" />
            </TreeViewItem>
          </TreeViewItem>
        </TreeView>
        <button>button</button>
      </>
    );

    expect(screen.queryByText('item12')).not.toBeInTheDocument();

    await user.click(screen.getByText('item1'));

    expect(screen.queryByText('item12')).not.toBeInTheDocument();
  });

  it('has clickable sub items', async () => {
    const user = userEvent.setup();

    const onClickHandler = jest.fn();

    render(
      <TreeView aria-label="tree view">
        <TreeViewItem title="item1" defaultOpen>
          <TreeViewItem title="item11" onClick={onClickHandler} />
          <TreeViewItem title="item12" />
        </TreeViewItem>
        <TreeViewItem title="item2" />
        <TreeViewItem title="item3" />
      </TreeView>
    );

    const subItem = screen.getByText('item11');

    await user.click(subItem);

    await waitFor(async () => {
      expect(onClickHandler).toBeCalled();
    });
  });

  it('can be controlled externally', async () => {
    const user = userEvent.setup();

    const onOpenHandler = jest.fn();
    const onCloseHandler = jest.fn();

    render(
      <TreeView aria-label="tree view">
        <TreeViewItem title="item1" open={true} onOpen={onOpenHandler} onClose={onCloseHandler}>
          <TreeViewItem title="item11" />
          <TreeViewItem title="item12" />
        </TreeViewItem>
        <TreeViewItem title="item2" open={false} onOpen={onOpenHandler} onClose={onCloseHandler}>
          <TreeViewItem title="item21" />
          <TreeViewItem title="item22" />
        </TreeViewItem>
        <TreeViewItem title="item3" />
      </TreeView>
    );

    await waitFor(async () => {
      expect(screen.queryByText('item11')).toBeInTheDocument();
      expect(screen.queryByText('item12')).toBeInTheDocument();
    });

    const firstItem = screen.getByText('item1');

    await user.click(firstItem);

    await waitFor(async () => {
      expect(onCloseHandler).toBeCalled();
      // Controlled elements should not be closed by itself
      expect(screen.queryByText('item11')).toBeInTheDocument();
      expect(screen.queryByText('item12')).toBeInTheDocument();
    });

    const secondItem = screen.getByText('item2');

    await user.click(secondItem);

    await waitFor(async () => {
      expect(onOpenHandler).toBeCalled();
      // Controlled elements should not be opened by itself
      expect(screen.queryByText('item21')).not.toBeInTheDocument();
      expect(screen.queryByText('item22')).not.toBeInTheDocument();
    });
  });
});
