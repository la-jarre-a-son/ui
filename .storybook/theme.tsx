import React from 'react';
import { DecoratorFn } from '@storybook/react';

import '@fortawesome/fontawesome-free/css/fontawesome.min.css';
import '@fortawesome/fontawesome-free/css/solid.min.css';

import { ThemeProvider } from '../src/theme';

import './theme.module.scss';

export const themeGlobalTypes = {
    theme: {
        name: 'Switch theme',
        description: 'Global theme for components',
        defaultValue: 'dark',
        toolbar: {
            // The icon for the toolbar item
            icon: 'paintbrush',
            // Array of options
            items: [
                { value: 'dark', title: 'dark' },
                { value: null, title: 'none' },
            ],
            showName: false,
        },
    },
};

export const withTheme: DecoratorFn = (StoryFn, context) => {
    const theme = context.parameters.theme || context.globals.theme;
    return (
        <main>
            <ThemeProvider theme={'jar'} variant={theme}>
                <StoryFn />
            </ThemeProvider>
        </main>
    );
};
