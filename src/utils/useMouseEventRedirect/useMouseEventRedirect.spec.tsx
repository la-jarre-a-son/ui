import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import useMouseEventRedirect from './useMouseEventRedirect';

describe('useMouseEventRedirect', () => {
  it('redirect the clicks to the trigger', async () => {
    const user = userEvent.setup();
    const onClick = jest.fn();

    const Comp = () => {
      const [rootRef, triggerRef] = useMouseEventRedirect<HTMLDivElement, HTMLButtonElement>();

      return (
        <div ref={rootRef}>
          <button ref={triggerRef} onClick={onClick}>
            button
          </button>
          <div>div</div>
        </div>
      );
    };

    render(<Comp />);

    const div = screen.getByText('div');
    await user.click(div);

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("don't redirect if click already on the trigger", async () => {
    const user = userEvent.setup();
    const onClick = jest.fn();

    const Comp = () => {
      const [rootRef, triggerRef] = useMouseEventRedirect<HTMLDivElement, HTMLButtonElement>();

      return (
        <div ref={rootRef}>
          <button ref={triggerRef} onClick={onClick}>
            button
          </button>
          <div>div</div>
        </div>
      );
    };

    render(<Comp />);

    const button = screen.getByText('button');
    await user.click(button);

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("don't redirect click on disabled triggers", async () => {
    const user = userEvent.setup();
    const onClick = jest.fn();

    const Comp: React.FC = () => {
      const [rootRef, triggerRef] = useMouseEventRedirect<HTMLDivElement, HTMLButtonElement>();

      return (
        <div ref={rootRef}>
          <button ref={triggerRef} disabled onClick={onClick}>
            button
          </button>
          <div>div</div>
        </div>
      );
    };

    render(<Comp />);

    const div = screen.getByText('div');
    await user.click(div);

    expect(onClick).not.toHaveBeenCalled();
  });

  it("don't redirect click on aria-disabled triggers", async () => {
    const user = userEvent.setup();
    const onClick = jest.fn();

    const Comp = () => {
      const [rootRef, triggerRef] = useMouseEventRedirect<HTMLDivElement, HTMLButtonElement>();

      return (
        <div ref={rootRef}>
          <button ref={triggerRef} aria-disabled="true" onClick={onClick}>
            button
          </button>
          <div>div</div>
        </div>
      );
    };

    render(<Comp />);

    const div = screen.getByText('div');
    await user.click(div);

    expect(onClick).not.toHaveBeenCalled();
  });

  it('can disable is behaviour', async () => {
    const user = userEvent.setup();
    const onClick = jest.fn();

    const Comp = () => {
      const [rootRef, triggerRef] = useMouseEventRedirect<HTMLDivElement, HTMLButtonElement>({
        disabled: true,
      });

      return (
        <div ref={rootRef}>
          <button ref={triggerRef} onClick={onClick}>
            button
          </button>
          <div>div</div>
        </div>
      );
    };

    render(<Comp />);

    const div = screen.getByText('div');
    await user.click(div);

    expect(onClick).not.toHaveBeenCalled();
  });

  it('can accept a custom redirect condition function', async () => {
    const user = userEvent.setup();
    const onClick = jest.fn();

    const Comp = () => {
      const [rootRef, triggerRef] = useMouseEventRedirect<HTMLDivElement, HTMLButtonElement>({
        checkRedirect: (e) => {
          // authorize redirection for element with id 'button2' only
          return !!e.target && (e.target as HTMLElement).getAttribute('id') === 'button2';
        },
      });

      return (
        <div ref={rootRef}>
          <button ref={triggerRef} onClick={onClick}>
            button
          </button>
          <div>div</div>
          <button id="button2">button2</button>
        </div>
      );
    };

    render(<Comp />);

    const div = screen.getByText('div');
    await user.click(div);

    expect(onClick).not.toHaveBeenCalled();

    const btn = screen.getByText('button2');
    await user.click(btn);

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('can disable redirection for interactive elements', async () => {
    const user = userEvent.setup();
    const onClick = jest.fn();

    const Comp = () => {
      const [rootRef, triggerRef] = useMouseEventRedirect<HTMLDivElement, HTMLButtonElement>({
        nonInteractiveOnly: true,
      });

      return (
        <div ref={rootRef}>
          card
          <button ref={triggerRef} onClick={onClick}>
            button
          </button>
          <div>div</div>
          <button>button2</button>
          <button>
            <span>button3</span>
          </button>
        </div>
      );
    };

    render(<Comp />);

    const btn = screen.getByText('button2');
    await user.click(btn);

    expect(onClick).not.toHaveBeenCalled();

    const btn2 = screen.getByText('button3');
    await user.click(btn2);

    expect(onClick).not.toHaveBeenCalled();

    const card = screen.getByText('card');
    await user.click(card);

    expect(onClick).toHaveBeenCalledTimes(1);

    const div = screen.getByText('div');
    await user.click(div);

    expect(onClick).toHaveBeenCalledTimes(2);
  });
});
