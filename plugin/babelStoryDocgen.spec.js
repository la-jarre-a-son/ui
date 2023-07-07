const babel = require('@babel/core');
const plugin = require('./babelStoryDocgen');

describe('babelStoryDocgen', () => {
  it('Add story description', () => {
    const storyWithDesc = `
            /** @storyDesc Test */
            export const Story = () => {
                return (
                    <div />
                )
            }
        `;
    const { code } = babel.transform(storyWithDesc, {
      plugins: [plugin],
      filename: 'test',
    });
    expect(code).toMatchSnapshot();
  });

  it('Disable stories', () => {
    const disabledStory = `
            /** @storyDisabled Test */
            export const Story = () => {
                return (
                    <div />
                )
            }
        `;
    const { code } = babel.transform(disabledStory, {
      plugins: [plugin],
      filename: 'test',
    });
    expect(code).toMatchSnapshot();
  });
});
