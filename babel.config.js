module.exports = (api) => {
  const isTest = api.env('test');
  return {
    presets: [
      ['@babel/preset-env', { targets: { node: 'current' } }],
      '@babel/preset-typescript',
      ['@babel/preset-react', { runtime: 'automatic' }],
    ],
    plugins: !isTest ? ['./plugin/babelStoryDocgen.js'] : [],
  };
};
