const babel = require('@babel/core');

const DESC_PARAM = '@storyDesc';
const DISABLED_PARAM = '@storyDisabled';

function createDescriptionNode(name, description) {
  return babel.types.expressionStatement(
    babel.types.assignmentExpression(
      '=',
      babel.types.memberExpression(
        babel.types.identifier(name),
        babel.types.identifier('parameters')
      ),
      babel.types.objectExpression([
        babel.types.objectProperty(
          babel.types.identifier('docs'),
          babel.types.objectExpression([
            babel.types.objectProperty(
              babel.types.identifier('description'),
              babel.types.objectExpression([
                babel.types.objectProperty(
                  babel.types.identifier('story'),
                  babel.types.stringLiteral(description)
                ),
              ])
            ),
          ])
        ),
      ])
    )
  );
}

function createDisabledNode(name) {
  return babel.types.expressionStatement(
    babel.types.assignmentExpression(
      '=',
      babel.types.memberExpression(
        babel.types.identifier(name),
        babel.types.identifier('parameters')
      ),
      babel.types.objectExpression([
        babel.types.objectProperty(
          babel.types.identifier('docs'),
          babel.types.objectExpression([
            babel.types.objectProperty(
              babel.types.identifier('disable'),
              babel.types.booleanLiteral(true)
            ),
          ])
        ),
      ])
    )
  );
}

function extractNodeComments(node) {
  const commentValues = node.leadingComments.map((node) => {
    if (node.type === 'CommentLine') {
      return node.value.trimLeft();
    } else if (node.type === 'CommentBlock') {
      return node.value
        .split('\n')
        .map((line) => {
          // stripping out the whitespace and * from comment blocks
          return line.replace(/^(\s+)?(\*+)?(\s+)?/, '');
        })
        .join('\n')
        .trim();
    }
  });
  return commentValues.join('\n');
}

module.exports = function annotateDescriptionPlugin() {
  return {
    name: 'ljas-story-docgen',
    visitor: {
      ExportNamedDeclaration(path) {
        if (path.node.leadingComments) {
          const comment = extractNodeComments(path.node);
          const declaration = path.node.declaration.declarations?.[0] || '';
          if (comment.includes(DISABLED_PARAM)) {
            path.insertAfter(createDisabledNode(declaration.id.name));
          } else if (comment.includes(DESC_PARAM)) {
            const storyDesc = comment.replace(DESC_PARAM, '');
            path.insertAfter(createDescriptionNode(declaration.id.name, storyDesc));
          }
        }
      },
    },
  };
};
