import _ from 'lodash';

const stringifyObj = (obj) => {
  if (_.isObject(obj)) {
    return '[complex value]';
  }
  return typeof obj === 'string' ? `'${obj}'` : String(obj);
};

const plain = (obj, key = '') => {
  const result = obj
    .filter((node) => node.type !== 'unchanged')
    .flatMap((node) => {
      const keys = [...key, node.key];
      const path = keys.join('.');
      switch (node.type) {
        case 'nested':
          return plain(node.children, keys);
        case 'added':
          return `Property '${path}' was added with value: ${stringifyObj(node.children)}`;
        case 'deleted':
          return `Property '${path}' was removed`;
        case 'changed':
          return `Property '${path}' was updated. From ${stringifyObj(node.children1)} to ${stringifyObj(node.children2)}`;
        default:
          return undefined;
      }
    }).join('\n');
  return result;
};

export default plain;
