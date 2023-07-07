import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import RadioGroup from './RadioGroup';
import Radio from '../Radio';
import { FormControlLabel } from '../Form';
import { axe } from 'jest-axe';

describe('RadioGroup', () => {
  it('render without crashing', async () => {
    const onChange = jest.fn();

    const { container } = render(
      <RadioGroup value="1" name="group" onChange={onChange}>
        <FormControlLabel label="choice 1">
          <Radio value="1" />
        </FormControlLabel>
        <FormControlLabel label="choice 2">
          <Radio value="2" />
        </FormControlLabel>
      </RadioGroup>
    );

    const content = screen.getAllByRole('radio');

    expect(await axe(container)).toHaveNoViolations();
    expect(content.length).toEqual(2);
    expect(content?.[0]).toBeChecked();
  });

  it('manage the child radios', async () => {
    const user = userEvent.setup();

    const onChange = jest.fn();

    render(
      <RadioGroup value="1" name="group" onChange={onChange}>
        <FormControlLabel label="choice 1">
          <Radio value="1" />
        </FormControlLabel>
        <FormControlLabel label="choice 2">
          <Radio value="2" data-testid="radio2" />
        </FormControlLabel>
      </RadioGroup>
    );

    const radio = screen.getByTestId('radio2');
    await user.click(radio);

    expect(onChange).toHaveBeenCalledWith('2', expect.anything());
  });
});
