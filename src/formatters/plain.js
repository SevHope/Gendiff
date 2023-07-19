import _ from 'lodash';

const plain = (diffTree) => {
  const toString = (node) => {
    if (typeof node === 'string') {
      return `'${node}'`;
    }
    if (_.isPlainObject(node)) {
      return '[complex value]';
    }
    return String(node);
  };

  const iter = (node, path = '') => node.flatMap((prop) => {
    const {
      key, type, value, previous, current, children,
    } = prop;
    const currentPath = [path, key].filter(Boolean).join('.');
    switch (type) {
      case 'added':
        return `Property '${currentPath}' was added with value: ${toString(value)}`;
      case 'removed':
        return `Property '${currentPath}' was removed`;
      case 'nested':
        return iter(children, currentPath);
      case 'updated':
        return `Property '${currentPath}' was updated. From ${toString(previous)} to ${toString(current)}`;
      default:
        return [];
    }
  });

  return iter(diffTree).join('\n');
};

export default plain;
