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
  const getPropertyName = (property, parents) => [...parents, property].join('.');

  const iter = (data, parents = []) => {
    const lines = data.flatMap((obj) => {
      const currentPath = getPropertyName(obj.key, parents);

      switch (obj.type) {
        case 'nested': {
          return iter(obj.children, [...parents, obj.key]);
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

    const result = lines.join('\n');
    return result;
  };

  return iter(dataToFormat);
};

export default plain;
