import _ from 'lodash';

const getIndent = (depth, leftShift = 2, spacesCount = 4) => ' '.repeat(spacesCount * depth - leftShift);
const getBracketIndent = (depth, spacesCount = 4) => ' '.repeat(spacesCount * depth - spacesCount);

const stringify = (value, depth) => {
  if (!_.isObject(value)) {
    return `${value}`;
  }

  const currentIndent = getIndent(depth, 0);
  const bracketIndent = getBracketIndent(depth);
  const lines = Object.entries(value).map(([key, val]) => `${currentIndent}${key}: ${stringify(val, depth + 1)}`);

  return ['{', ...lines, `${bracketIndent}}`].join('\n');
};

const stylish = (diff, depth = 1) => {
  const currentIndent = getIndent(depth);
  const bracketIndent = getBracketIndent(depth);
  const lines = diff.flatMap((node) => {
    switch (node.type) {
      case 'added':
        return `${currentIndent}+ ${node.key}: ${stringify(node.value, depth + 1)}`;
      case 'deleted':
        return `${currentIndent}- ${node.key}: ${stringify(node.value, depth + 1)}`;
      case 'unchanged':
        return `${currentIndent}  ${node.key}: ${stringify(node.value, depth + 1)}`;
      case 'changed':
        return [
          `${currentIndent}- ${node.key}: ${stringify(node.firstValue, depth + 1)}`,
          `${currentIndent}+ ${node.key}: ${stringify(node.secondValue, depth + 1)}`,
        ];
      case 'nested':
        return `${currentIndent}  ${node.key}: ${stylish(node.children, depth + 1)}`;
      default:
        throw new Error(`Unknown type: '${node.type}'!`);
    }
  });

  return ['{', ...lines, `${bracketIndent}}`].join('\n');
};

export default stylish;
