
import { Preview } from '@storybook/react';


import { withTheme, themeGlobalTypes } from './theme';
import docs from './docs';
import { SyntaxHighlighter } from '@storybook/components';
import scss from 'react-syntax-highlighter/dist/esm/languages/prism/scss';

SyntaxHighlighter.registerLanguage('scss', scss)

export const globalTypes = {
    ...themeGlobalTypes,
};

export const decorators = [withTheme];

const preview: Preview = {
    parameters: {
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
    }
};

export default preview;
