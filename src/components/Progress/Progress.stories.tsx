import React, { useEffect, useState } from 'react';
import { Meta, Story } from '@storybook/react';

import { extractThemeVariables } from '../../../.storybook/utils/Theming';

import moduleCss from '!!raw-loader!./Progress.module.scss?raw';
import themeVariablesScss from '!!raw-loader!../../theme/jar/variables/Progress.scss?raw';

import { Progress } from '.';

export default {
  title: 'Components/Data/Progress',
  component: Progress,
  tags: ['autodocs'],
  parameters: {
    theming: extractThemeVariables([moduleCss, themeVariablesScss], 'Progress'),
  },
} as Meta;

type StoryProps = React.ComponentProps<typeof Progress>;

const Template: Story<StoryProps> = (props) => <Progress aria-label="Progress" {...props} />;

export const Default = Template.bind({});
Default.args = {
  value: 10,
  valueText: '10%',
  min: 0,
  max: 100,
  indeterminate: false,
};
Default.argTypes = {
  value: {
    control: {
      type: 'range',
      min: 0,
      max: 100,
      step: 1,
    },
  },
};

export const Examples = () => (
  <>
    <Progress aria-label="File download progress" max={100} value={0} valueText="0%" />
    <Progress aria-label="File download progress" max={100} value={50} valueText="50%" />
    <Progress aria-label="Steps" max={5} value={3} valueText="5/8" />
    <Progress aria-label="Steps" min={5} max={10} value={8} valueText="8" />
  </>
);

/**
 * @storyDesc for accessibility purpose, you have to provide a valid label to the component,
 * by either providing an aria-label prop to it, or attaching the component to a label element.
 */
export const WithLabel = () => {
  return (
    <>
      <label htmlFor="file-loading">File loading</label>
      <Progress id="file-loading" value={30} />
    </>
  );
};

/**
 * @storyDesc Setting the `indeterminate` boolean prop put the component in a indeterminated loading state.
 */
export const Indeterminate = () => {
  return <Progress indeterminate />;
};

/**
 * @storyDesc You can use the `Progress` to label the loading state of an element.
 */
export const Loading = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => (p < 100 ? p + 1 : p));
    }, 100);

    if (progress >= 100) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [setProgress, progress]);

  const loading = progress !== 100;

  return (
    <>
      <button type="button" onClick={() => setProgress(0)}>
        Reload
      </button>
      <Progress id="linear-progress" value={progress} valueText={`${progress}%`} />
      <div aria-busy={loading} aria-describedby="linear-progress">
        {loading && <div>Content loading...</div>}
        {!loading && <div>Loaded !!</div>}
      </div>
    </>
  );
};
