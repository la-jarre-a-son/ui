const path = require('path');
const getLocalIdent = require('./getLocalIdent');

// Export a function. Accept the base config as the only param.
module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  staticDirs: ['../public'],
  addons: ['@storybook/addon-links', {
    name: '@storybook/addon-essentials',
    options: {
      backgrounds: false
    }
  }, '@storybook/addon-interactions', '@storybook/addon-mdx-gfm'],
  framework: {
    name: '@storybook/react-webpack5',
    options: {}
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
  docs: {
    autodocs: 'tag', // require use of tags: ['autodocs']
  },
  webpackFinal: async (config) => {
    config.resolve.alias["assets"] = path.resolve(__dirname, "../src/theme/jar/assets");
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
                localIdentName: '[local]__[hash:base62:5]',
                getLocalIdent
              },
            },
          },
          'resolve-url-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              sassOptions: {
                includePaths: [
                  path.resolve(__dirname, '../node_modules'),
                  path.resolve(__dirname, '../src/theme/jar')
                ]
              }
            }
          },
          
        ],
      },
    );
    return config;
  },
};

