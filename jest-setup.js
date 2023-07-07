/* global expect */
import '@testing-library/jest-dom';
import { toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

// ResizeObserver mock
class ResizeObserver {
  observe() {
    // do nothing
  }
  unobserve() {
    // do nothing
  }
  disconnect() {
    // do nothing
  }
}
window.ResizeObserver = ResizeObserver;

// match media mock
window.matchMedia = () => false;
