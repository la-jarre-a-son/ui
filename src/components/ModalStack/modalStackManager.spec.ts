import { HIDE_SCROLL_CLASS } from './hideScroll';
import modalStackManager from './modalStackManager';

const el = () => document.createElement('div');

describe('modalStackManager', () => {
  it('create a stack', () => {
    const manager = modalStackManager();
    expect(Array.isArray(manager.getStack())).toBeTruthy();
    expect(manager.getStack().length).toEqual(0);
  });

  it('can add modal to the stack', () => {
    const manager = modalStackManager();
    const remove = manager.add({
      rootEl: el(),
    });

    expect(manager.getStack().length).toEqual(1);
    expect(typeof remove).toEqual('function');

    remove();
    expect(manager.getStack().length).toEqual(0);
  });

  it('hide modals below', () => {
    const manager = modalStackManager();
    manager.add({
      rootEl: el(),
      hideOnStack: true,
    });
    manager.add({
      rootEl: el(),
    });

    expect(manager.getStack()?.[0].rootEl.getAttribute('aria-hidden')).toBeTruthy();
    expect(manager.getStack()?.[1].rootEl.getAttribute('aria-hidden')).toBeFalsy();
  });

  it('show modals when beeing on top', () => {
    const manager = modalStackManager();
    manager.add({
      rootEl: document.createElement('div'),
      hideOnStack: true,
    });
    const remove = manager.add({
      rootEl: document.createElement('div'),
    });
    remove();

    expect(manager.getStack()?.[0].rootEl.getAttribute('aria-hidden')).toBeFalsy();
  });

  it('hide scroll', () => {
    const manager = modalStackManager();
    const remove = manager.add({
      rootEl: el(),
      hideOnStack: true,
    });

    expect(document.body.classList.toString().includes(HIDE_SCROLL_CLASS)).toEqual(true);

    remove();

    expect(document.body.classList.toString().includes(HIDE_SCROLL_CLASS)).toEqual(false);
  });

  it('check is nested modals contains the given element', () => {
    const sub = el();
    const midle = el();
    const top = el();
    const topChild = el();
    top.appendChild(topChild);
    const manager = modalStackManager();

    manager.add({
      rootEl: sub,
    });
    manager.add({
      rootEl: midle,
    });
    manager.add({
      rootEl: top,
    });

    const modal = manager.modal(midle);

    expect(modal.nestedContains(topChild)).toEqual(true);
    expect(modal.nestedContains(top)).toEqual(true);
    expect(modal.nestedContains(midle)).toEqual(false);
    expect(modal.nestedContains(sub)).toEqual(false);
  });

  it('check if a modal has nested ones', () => {
    const sub = el();
    const top = el();

    const manager = modalStackManager();

    manager.add({
      rootEl: sub,
    });
    manager.add({
      rootEl: top,
    });

    expect(manager.modal(sub).hasNested()).toEqual(true);
    expect(manager.modal(top).hasNested()).toEqual(false);
  });
});
