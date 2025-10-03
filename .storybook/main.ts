import path from 'path';
import type { StorybookConfig } from '@storybook/react-webpack5';

// Export a function. Accept the base config as the only param.
const config: StorybookConfig = {
  framework: {
    name: '@storybook/react-webpack5',
    options: {}
  },
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  // stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  staticDirs: ['../public'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-docs',
    '@storybook/addon-webpack5-compiler-babel'
  ],
  docs: {
    defaultName: 'Documentation',
  },

  typescript: {
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      compilerOptions: {
        allowSyntheticDefaultImports: false,
        esModuleInterop: false,
      },
      propFilter: () => true,
      
    },
  },

  webpackFinal: async (config) => {
    if (config.resolve && config.resolve.alias && config.module && config.module.rules) {
      (config.resolve.alias as {[index: string]: string})["assets"] = path.resolve(__dirname, "../src/theme/jar/assets");
      
      config.module.rules.push(
        {
          test: /\.s(a|c)ss$/,
          include: path.resolve(__dirname, '../'),
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                modules: {
                  auto: true,
                  namedExport: false,
                  exportLocalsConvention: 'as-is',
                  localIdentRegExp: /[/\\]([^/\\]+?)(?:\.module)?\.[^./\\]+$/,
                  localIdentName: '[1]-[local]_[hash:base64:5]',
                },
                sourceMap: true,
                importLoaders: 1,
              },
            },
            'resolve-url-loader',
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
                sassOptions: {
                  silenceDeprecations: ['import'], // FIXME: next update should fix this
                  loadPaths: [
                    path.resolve(__dirname, '../node_modules'),
                    path.resolve(__dirname, '../src/theme/jar')
                  ]
                }
              }
            },
            
          ],
        },
      );
    }
    return config;
  },

  features: {
    backgrounds: false
  }
};

export default config;