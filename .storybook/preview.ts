
import { Preview } from '@storybook/react';
import darkTheme from './darkTheme';

import { withTheme, themeGlobalTypes } from './theme';
import docs from './docs';

export const parameters = {
    actions: { argTypesRegex: '^on[A-Z].*' },
    backgrounds: { disable: true },
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
    },
    options: {
        storySort: {
            order: [
                'Documentation',
                ['Introduction'],
                'Components',
                ['Default'],
                'Utilities',
                'Showcase',
                '*',
            ],
        },
    },
    docs,
};

export const globalTypes = {
    ...themeGlobalTypes,
};

export const decorators = [withTheme];


const preview: Preview = {
  parameters: {
    docs: {
      theme: darkTheme,
    },
  },
};

export default preview;
