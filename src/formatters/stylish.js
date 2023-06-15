import _ from 'lodash';

const getIndent = (depth, leftShift = 0, spacesCount = 4) => ' '.repeat(spacesCount * depth - leftShift);
const getBracketIndent = (depth, spacesCount = 4) => ' '.repeat(spacesCount * depth - spacesCount);

const stringify = (value, depth) => {
  if (!_.isObject(value)) {
    return `${value}`;
  }

  const currentIndent = getIndent(depth);
  const bracketIndent = getBracketIndent(depth);
  const lines = Object.entries(value).map(([key, val]) => `${currentIndent}${key}: ${stringify(val, depth + 1)}`);

  return ['{', ...lines, `${bracketIndent}}`].join('\n');
};

const stylish = (diff) => {
  const iter = (data, depth) => {
    if (!_.isObject(data)) {
      return `${data}`;
    }

    const currentIndent = getIndent(depth, 2);
    const bracketIndent = getBracketIndent(depth);
    const lines = data.map((node) => {
      switch (node.type) {
        case 'added':
          return `${currentIndent}+ ${node.key}: ${stringify(node.value, depth + 1)}`;
        case 'deleted':
          return `${currentIndent}- ${node.key}: ${stringify(node.value, depth + 1)}`;
        case 'unchanged':
          return `${currentIndent}  ${node.key}: ${stringify(node.value, depth + 1)}`;
        case 'changed':
          return `${currentIndent}- ${node.key}: ${stringify(node.oldValue, depth + 1)}
${currentIndent}+ ${node.key}: ${stringify(node.newValue, depth + 1)}`;
        case 'nested':
          return `${currentIndent}  ${node.key}: ${iter(node.children, depth + 1)}`;
        default:
          throw new Error(`Unknown type: '${node.type}'!`);
      }
    });
    return ['{', ...lines, `${bracketIndent}}`].join('\n');
  };
  return iter(diff, 1);
};

export default stylish;
