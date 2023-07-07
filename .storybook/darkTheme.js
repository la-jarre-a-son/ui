import { create } from '@storybook/theming';

import brandImage from "../ljas-ui.png"

export default create({
    base: 'dark',
    colorPrimary: '#3567f0',
    colorSecondary: '#3567f0',
    appBg: '#121212',
    appContentBg: '#191919',
    appBorderColor: '#0e0e0e',
    appBorderRadius: 0,
    barBg: '#252525',
    fontCode: 'monospace',
    textColor: '#f0f0f0',
    textInverseColor: 'rgba(0,0,0,0.9)',
    brandTitle: 'LJAS UI',
    brandUrl: 'https://la-jarre-a-son.github.io/ui',
    brandTarget: '_self',
    brandImage,
});
