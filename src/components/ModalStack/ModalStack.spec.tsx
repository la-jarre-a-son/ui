import React from 'react';
import { render, screen } from '@testing-library/react';

import ModalStack from './ModalStack';
import { modalStack } from './useModalStack';

describe('ModalStack', () => {
  beforeEach(() => {
    modalStack.clear();
  });

  afterAll(() => {
    modalStack.clear();
  });

  it('render without crashing', async () => {
    render(<ModalStack />);
  });

  it("don't override ref", () => {
    const ref = jest.fn();

    render(
      <ModalStack>
        <div ref={ref}>content</div>
      </ModalStack>
    );

    expect(ref).toHaveBeenCalled();
  });

  it('manage the registration of the child in the modal stack', () => {
    const wrapper = render(
      <ModalStack>
        <div>modal</div>
      </ModalStack>
    );

    const content = screen.getByText('modal');

    expect(content).toBeInTheDocument();
    expect(modalStack.getStack().length).toEqual(1);

    wrapper.unmount();

    expect(modalStack.getStack().length).toEqual(0);
  });
});
