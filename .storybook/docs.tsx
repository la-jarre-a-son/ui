import React from 'react';
import {
    Title,
    Subtitle,
    Description,
    Primary,
    Controls,
    Stories,
} from '@storybook/addon-docs';

import { Theming } from './utils/Theming';

const docs = {
    page: () => (
        <>
            <Title />
            <Subtitle />
            <Description />
            <Primary />
            <Controls />
            <Theming />
            <Stories />
        </>
    ),
};

export default docs;
