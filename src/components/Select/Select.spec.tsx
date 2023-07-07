import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FormField } from '../Form';
import Select from './Select';
import { SelectTrigger } from './SelectTrigger';
import { axe } from 'jest-axe';
import { disableAnimation, enableAnimation } from '../../utils';

const options = [
  {
    value: 'value1',
    label: 'label1',
  },
  {
    value: 'value2',
    label: 'label2',
  },
  {
    value: 'value3',
    label: 'label3',
  },
];

describe('Select', () => {
  beforeAll(() => {
    disableAnimation();
    const { getComputedStyle } = window;
    window.getComputedStyle = (elt) => getComputedStyle(elt);
  });

  afterAll(() => {
    enableAnimation();
  });

  it('render correctly', async () => {
    const { container } = render(
      <FormField label="Label">
        <Select placeholder="Placeholder" />
      </FormField>
    );

    const select = screen.getByPlaceholderText('Placeholder');
    expect(select).toBeInTheDocument();
    expect(await axe(container)).toHaveNoViolations();
  });

  it('open when clicked', async () => {
    const user = userEvent.setup();

    const { container } = render(<Select options={options} aria-label="select" />);

    const select = screen.getByLabelText('select');

    await act(() => user.click(select));

    expect(screen.queryByRole('listbox')).toBeInTheDocument();
    expect(screen.queryByText('label1')).toBeInTheDocument();
    expect(screen.queryByText('label2')).toBeInTheDocument();
    expect(screen.queryByText('label3')).toBeInTheDocument();
    expect(await axe(container)).toHaveNoViolations();
  });

  it('use the label of the parent FormField', async () => {
    render(
      <FormField label="Label">
        <Select />
      </FormField>
    );

    await waitFor(() => {
      const select = screen.queryByLabelText('Label');
      expect(select).toBeInTheDocument();
    });
  });

  it('cannot be focused when disabled', async () => {
    const user = userEvent.setup();
    render(<Select disabled aria-label="select" />);

    const select = screen.getByLabelText('select');
    expect(select).not.toHaveFocus();

    await act(() => user.tab());
    expect(select).not.toHaveFocus();
  });

  it('focus the first selected item on opening', async () => {
    const user = userEvent.setup();
    render(<Select options={options} value="value2" aria-label="select" />);

    const select = screen.getByLabelText('select');

    await act(() => user.click(select));

    await waitFor(() => {
      expect(screen.queryByRole('listbox')).toBeInTheDocument();
      expect(screen.queryAllByRole('option')?.[1]).toHaveFocus();
    });
  });

  it('close on tab and refocus the trigger', async () => {
    const user = userEvent.setup();

    render(<Select options={options} value="value2" aria-label="select" />);

    // open the select
    const select = screen.getByLabelText('select');
    await act(() => user.click(select));
    expect(screen.getByText('label1')).toBeInTheDocument();
    expect(select).not.toHaveFocus();

    // tab away
    await act(() => user.tab());

    await waitFor(() => {
      expect(select).toHaveFocus();
      expect(screen.queryByText('label1')).not.toBeInTheDocument();
    });
  });

  it('close on escape and refocus the trigger', async () => {
    const user = userEvent.setup();

    render(<Select options={options} value="value2" aria-label="select" />);

    // open the select
    const select = screen.getByLabelText('select');
    await act(() => user.click(select));

    expect(screen.getByText('label1')).toBeInTheDocument();
    expect(select).not.toHaveFocus();

    // tab away
    await act(() => user.keyboard('{Escape}'));

    await waitFor(() => {
      expect(select).toHaveFocus();
      expect(screen.queryByText('label1')).not.toBeInTheDocument();
    });
  });

  it('close and refocus the trigger on selection', async () => {
    const user = userEvent.setup();

    render(<Select options={options} value="value2" aria-label="select" />);

    // open the select
    const select = screen.getByLabelText('select');
    await act(() => user.click(select));

    const option1 = screen.getByText('label1');
    expect(option1).toBeInTheDocument();
    expect(select).not.toHaveFocus();

    // tab away
    await act(() => user.click(option1));

    await waitFor(() => {
      expect(select).toHaveFocus();
      expect(screen.queryByText('label1')).not.toBeInTheDocument();
    });
  });

  it('can keep opened after selection', async () => {
    const user = userEvent.setup();

    render(<Select options={options} value="value2" aria-label="select" keepOpened />);

    // open the select
    const select = screen.getByLabelText('select');
    await act(() => user.click(select));

    const option1 = screen.getByText('label1');
    expect(option1).toBeInTheDocument();
    expect(select).not.toHaveFocus();

    // tab away
    await act(() => user.click(option1));

    await waitFor(() => {
      expect(select).not.toHaveFocus();
      expect(screen.queryByText('label1')).toBeInTheDocument();
    });
  });

  it('can navigate with only one option', async () => {
    const user = userEvent.setup();

    render(
      <Select options={[{ value: 'value1', label: 'label1' }]} aria-label="select" keepOpened />
    );

    // open the select
    const select = screen.getByLabelText('select');
    await act(() => user.click(select));

    // nav down
    await act(() => user.keyboard('{ArrowDown}'));

    await waitFor(() => {
      expect(screen.getByText('label1')).toHaveFocus();
      expect(screen.queryByText('label1')).toBeInTheDocument();
    });
  });

  it('Display a placeholder when no option is available', async () => {
    const user = userEvent.setup();

    render(<Select options={[]} aria-label="select" keepOpened noOptionPlaceholder="nope" />);

    // open the select
    const select = screen.getByLabelText('select');
    await act(() => user.click(select));

    await waitFor(() => {
      expect(screen.getByText('nope')).toBeInTheDocument();
    });
  });

  describe('SelectTrigger', () => {
    it('render without crashing', () => {
      render(<SelectTrigger />);
    });
  });
});
