import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return String(value);
};

const plain = (dataToFormat) => {
  const iter = (data, path = '') => {
    const lines = data.flatMap((obj) => {
      const currentPath = path ? `${path}.${obj.key}` : obj.key;

      switch (obj.type) {
        case 'nested': {
          return iter(obj.children, currentPath);
        }
        case 'deleted':
          return `Property '${currentPath}' was removed`;
        case 'added':
          return `Property '${currentPath}' was added with value: ${stringify(obj.value)}`;
        case 'unchanged':
          return [];
        case 'changed':
          return `Property '${currentPath}' was updated. From ${stringify(obj.firstValue)} to ${stringify(obj.secondValue)}`;
        default:
          throw new Error(`Plain formatting failed. Unknown type: ${obj.type}`);
      }
    });

    const result = [...lines].join('\n');
    return result;
  };

  return iter(dataToFormat);
};

export default plain;
