import React, { useEffect, useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';

import { extractThemeVariables } from '../../../.storybook/utils/Theming';

import moduleCss from '!!raw-loader!./Slider.module.scss?raw';
import themeVariablesScss from '!!raw-loader!../../theme/jar/variables/Slider.scss?raw';

import { Slider } from '.';

export default {
  title: 'Components/Form/Slider',
  component: Slider,
  tags: ['autodocs'],
  parameters: {
    theming: extractThemeVariables([moduleCss, themeVariablesScss], 'Slider'),
  },
} as Meta;

export const Default: StoryObj<typeof Slider> = {
  render: (props) => {
    const { value: propsValue, ...otherProps } = props;

    const [value, setValue] = useState(propsValue);

    const handleChange = (v: number) => {
      setValue(v);
    };

    useEffect(() => {
      setValue(propsValue);
    }, [propsValue]);

    return (
      <Slider
        aria-label="Slider"
        value={value}
        valueText={`${value}%`}
        {...otherProps}
        onChange={handleChange}
      />
    );
  },
  args: {
    value: 10,
    min: 0,
    max: 100,
    step: 10,
    marks: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
    orientation: 'horizontal',
  },
};

export const Range: StoryObj<typeof Slider> = {
  render: (props) => {
    const { value: propsValue, ...otherProps } = props;

    const [value, setValue] = useState<number[]>(
      Array.isArray(propsValue) ? propsValue : [propsValue ?? 0]
    );

    const handleChange = (v: number[]) => {
      setValue(v);
    };

    useEffect(() => {
      setValue(Array.isArray(propsValue) ? propsValue : [propsValue ?? 0]);
    }, [propsValue]);

    return (
      <Slider
        aria-label="Slider"
        value={value}
        valueText={`${value[0]} - ${value[1]}`}
        {...otherProps}
        onChange={handleChange}
      />
    );
  },
  args: {
    value: [20, 60],
    min: 0,
    max: 100,
    step: 10,
    marks: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
    orientation: 'horizontal',
    pearling: true,
    minDistance: 10,
  },
};

export const Multiple: StoryObj<typeof Slider> = {
  render: (props) => {
    const { value: propsValue, ...otherProps } = props;

    const [value, setValue] = useState<number[]>(
      Array.isArray(propsValue) ? propsValue : [propsValue ?? 0]
    );

    const handleChange = (v: number[]) => {
      setValue(v);
    };

    useEffect(() => {
      setValue(Array.isArray(propsValue) ? propsValue : [propsValue ?? 0]);
    }, [propsValue]);

    return (
      <Slider
        aria-label="Slider"
        value={value}
        ariaValueText={`${value[0]} - ${value[1]}`}
        {...otherProps}
        onChange={handleChange}
      />
    );
  },
  args: {
    value: [20, 30, 40, 50, 60],
    min: 0,
    max: 100,
    marks: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
    orientation: 'horizontal',
    pearling: true,
    minDistance: 1,
  },
};

function findClosest(marks?: number[] | number | boolean | readonly number[], value?: number) {
  return Array.isArray(marks)
    ? marks.reduce(
        (closest, m) =>
          closest === undefined ||
          (value !== undefined && Math.abs(closest - value) > Math.abs(m - value))
            ? m
            : closest,
        undefined
      ) ?? value
    : value;
}

export const Snap: StoryObj<typeof Slider> = {
  render: (props) => {
    const { value: propsValue, marks, ...otherProps } = props;

    const [value, setValue] = useState(propsValue);

    const handleChange = (v: number) => {
      const closest = findClosest(marks, v);

      setValue(closest);
    };

    useEffect(() => {
      setValue(propsValue);
    }, [propsValue]);

    return (
      <Slider
        aria-label="Slider"
        marks={marks}
        value={value}
        valueText={`${value}%`}
        {...otherProps}
        onChange={handleChange}
      />
    );
  },
  args: {
    value: 50,
    min: 0,
    max: 100,
    marks: [0, 5, 15, 50, 85, 95, 100],
    orientation: 'horizontal',
  },
};
