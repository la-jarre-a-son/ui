import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  attemptFocus,
  focusByText,
  focusFirstDescendant,
  focusLastDescendant,
  getFirstFocusableDescendant,
  getLastFocusableDescendant,
  getNextFocusable,
  getPreviousFocusable,
  isFocusable,
  isOutside,
} from './focusUtils';

describe('focusUtils', () => {
  describe('isFocusable', () => {
    it('check if the given element is focusable', () => {
      const div = document.createElement('div');
      const button = document.createElement('button');
      const a = document.createElement('a');
      const nonFocusA = document.createElement('a');
      const input = document.createElement('input');
      const textarea = document.createElement('textarea');
      const disabled = document.createElement('button');
      const focusDiv = document.createElement('div');

      disabled.setAttribute('disabled', 'true');
      a.setAttribute('href', 'www.google.com');
      nonFocusA.setAttribute('href', 'www.google.com');
      nonFocusA.setAttribute('rel', 'ignore');
      focusDiv.setAttribute('tabindex', '0');

      expect(isFocusable(div)).toEqual(false);
      expect(isFocusable(button)).toEqual(true);
      expect(isFocusable(a)).toEqual(true);
      expect(isFocusable(input)).toEqual(true);
      expect(isFocusable(textarea)).toEqual(true);
      expect(isFocusable(disabled)).toEqual(false);
      expect(isFocusable(nonFocusA)).toEqual(false);
      expect(isFocusable(focusDiv)).toEqual(true);
    });

    it('optionnaly consider negative tab index', () => {
      const div = document.createElement('div');

      div.setAttribute('tabindex', '-1');

      expect(isFocusable(div)).toEqual(false);
      expect(isFocusable(div, true)).toEqual(true);
    });
  });

  describe('attemptFocus', () => {
    it('focus the given element if possible and return the result', () => {
      render(
        <div>
          <button>button</button>
          <div>div</div>
        </div>
      );

      const button = screen.getByText('button');
      const div = screen.getByText('div');

      const result1 = attemptFocus(button);
      const result2 = attemptFocus(div);

      expect(result1).toEqual(true);
      expect(result2).toEqual(false);
      expect(button).toHaveFocus();
      expect(div).not.toHaveFocus();
    });

    it('can consider negative tab index', () => {
      render(
        <div>
          <div tabIndex={-1}>div</div>
        </div>
      );

      const div = screen.getByText('div');

      const result2 = attemptFocus(div, true);

      expect(result2).toEqual(true);
      expect(div).toHaveFocus();
    });
  });

  describe('focusFirstDescendant', () => {
    it('focus the next focusable descendant', () => {
      render(
        <div data-testid="container">
          <div>div</div>
          <button>button</button>
          <button>other button</button>
        </div>
      );

      const container = screen.getByTestId('container');

      const result = focusFirstDescendant(container);

      expect(result).toEqual(true);
      expect(screen.getByText('button')).toHaveFocus();
    });

    it('return false if nothing to focus', () => {
      render(
        <div data-testid="container">
          <div>div</div>
        </div>
      );

      const container = screen.getByTestId('container');

      const result = focusFirstDescendant(container);

      expect(result).toEqual(false);
      expect(screen.getByText('div')).not.toHaveFocus();
    });

    it('can consider negative tabindex', () => {
      render(
        <div data-testid="container">
          <div tabIndex={-1}>div</div>
        </div>
      );

      const container = screen.getByTestId('container');

      const result = focusFirstDescendant(container, true);

      expect(result).toEqual(true);
      expect(screen.getByText('div')).toHaveFocus();
    });
  });

  describe('focusLastDescendant', () => {
    it('focus the last focusable descendant', () => {
      render(
        <div data-testid="container">
          <div>div</div>
          <button>button</button>
          <button>other button</button>
        </div>
      );

      const container = screen.getByTestId('container');

      const result = focusLastDescendant(container);

      expect(result).toEqual(true);
      expect(screen.getByText('other button')).toHaveFocus();
    });

    it('return false if nothing to focus', () => {
      render(
        <div data-testid="container">
          <div>div</div>
        </div>
      );

      const container = screen.getByTestId('container');

      const result = focusLastDescendant(container);

      expect(result).toEqual(false);
      expect(screen.getByText('div')).not.toHaveFocus();
    });

    it('can consider negative tabindex', () => {
      render(
        <div data-testid="container">
          <div>a div</div>
          <div tabIndex={-1}>div</div>
        </div>
      );

      const container = screen.getByTestId('container');

      const result = focusLastDescendant(container, true);

      expect(result).toEqual(true);
      expect(screen.getByText('div')).toHaveFocus();
    });
  });

  describe('getFirstFocusableDescendant', () => {
    it('return the first focusable descendant element', () => {
      render(
        <div data-testid="container">
          <div>div</div>
          <button>button</button>
          <button>other button</button>
        </div>
      );

      const container = screen.getByTestId('container');

      const result = getFirstFocusableDescendant(container);

      expect(result).toEqual(screen.getByText('button'));
    });

    it('return undefined if no focusable descendant found', () => {
      render(
        <div data-testid="container">
          <div>div</div>
        </div>
      );

      const container = screen.getByTestId('container');

      const result = getFirstFocusableDescendant(container);

      expect(result).toEqual(undefined);
    });

    it('can consider negative tabindex', () => {
      render(
        <div data-testid="container">
          <div tabIndex={1}>div</div>
          <button>button</button>
          <button>other button</button>
        </div>
      );

      const container = screen.getByTestId('container');

      const result = getFirstFocusableDescendant(container);

      expect(result).toEqual(screen.getByText('div'));
    });
  });

  describe('getLastFocusableDescendant', () => {
    it('return the first focusable descendant element', () => {
      render(
        <div data-testid="container">
          <div>div</div>
          <button>button</button>
          <button>other button</button>
        </div>
      );

      const container = screen.getByTestId('container');

      const result = getLastFocusableDescendant(container);

      expect(result).toEqual(screen.getByText('other button'));
    });

    it('return undefined if no focusable descendant found', () => {
      render(
        <div data-testid="container">
          <div>div</div>
        </div>
      );

      const container = screen.getByTestId('container');

      const result = getLastFocusableDescendant(container);

      expect(result).toEqual(undefined);
    });

    it('can consider negative tabindex', () => {
      render(
        <div data-testid="container">
          <button>button</button>
          <button>other button</button>
          <div tabIndex={1}>div</div>
        </div>
      );

      const container = screen.getByTestId('container');

      const result = getLastFocusableDescendant(container);

      expect(result).toEqual(screen.getByText('div'));
    });
  });

  describe('getNextFocusable', () => {
    it('return the next focusable element', () => {
      render(
        <div data-testid="container">
          <button>button</button>
          <div>div</div>
          <button>other button</button>
        </div>
      );

      const next = getNextFocusable(screen.getByText('button'));

      expect(next).toEqual(screen.getByText('other button'));
    });

    it('return undefined if no next focusable element', () => {
      render(
        <div data-testid="container">
          <button>button</button>
          <div>div</div>
        </div>
      );

      const next = getNextFocusable(screen.getByText('button'));

      expect(next).toEqual(undefined);
    });

    it('can consider negative tabindex', () => {
      render(
        <div data-testid="container">
          <button>button</button>
          <div tabIndex={-1}>div</div>
          <button>other button</button>
        </div>
      );

      const next = getNextFocusable(screen.getByText('button'), true);

      expect(next).toEqual(screen.getByText('div'));
    });
  });

  describe('getPreviousFocusable', () => {
    it('return the next focusable element', () => {
      render(
        <div data-testid="container">
          <button>button</button>
          <div>div</div>
          <button>other button</button>
        </div>
      );

      const next = getPreviousFocusable(screen.getByText('other button'));

      expect(next).toEqual(screen.getByText('button'));
    });

    it('return undefined if no next focusable element', () => {
      render(
        <div data-testid="container">
          <div>div</div>
          <button>button</button>
        </div>
      );

      const next = getPreviousFocusable(screen.getByText('button'));

      expect(next).toEqual(undefined);
    });

    it('can consider negative tabindex', () => {
      render(
        <div data-testid="container">
          <button>button</button>
          <div tabIndex={-1}>div</div>
          <button>other button</button>
        </div>
      );

      const next = getPreviousFocusable(screen.getByText('other button'), true);

      expect(next).toEqual(screen.getByText('div'));
    });
  });

  describe('isOutside', () => {
    it('return false if element equal container', () => {
      render(
        <div data-testid="container">
          <div>div</div>
          <button>button</button>
        </div>
      );

      const container = screen.getByTestId('container');

      const result = isOutside(container, container);

      expect(result).toEqual(false);
    });

    it('return false if element is in container', () => {
      render(
        <div data-testid="container">
          <div>div</div>
          <button>button</button>
        </div>
      );

      const container = screen.getByTestId('container');
      const button = screen.getByText('button');

      const result = isOutside(container, button);

      expect(result).toEqual(false);
    });

    it('return true if element is outside container', () => {
      render(
        <>
          <div data-testid="container">
            <div>div</div>
          </div>
          <button>button</button>
        </>
      );

      const container = screen.getByTestId('container');
      const button = screen.getByText('button');

      const result = isOutside(container, button);

      expect(result).toEqual(true);
    });

    it('return undefined if no container or no element provided', () => {
      render(
        <>
          <div data-testid="container">
            <div>div</div>
          </div>
          <button>button</button>
        </>
      );

      const container = screen.getByTestId('container');
      const button = screen.getByText('button');

      const result1 = isOutside(container, null);
      const result2 = isOutside(null, button);
      const result3 = isOutside(null, null);

      expect(result1).toEqual(undefined);
      expect(result2).toEqual(undefined);
      expect(result3).toEqual(undefined);
    });
  });

  describe('focusByText', () => {
    it('focus the next element matching the given text', async () => {
      render(
        <>
          <div data-testid="container">
            <div>div</div>
            <button>bbutton</button>
            <button>button</button>
          </div>
        </>
      );

      const user = userEvent.setup();
      await user.tab();

      const result = focusByText({
        rootEl: screen.getByTestId('container'),
        startEl: screen.getByText('bbutton'),
        text: 'butt',
      });

      expect(result).toEqual(true);
      expect(screen.getByText('button')).toHaveFocus();
    });
  });
});
