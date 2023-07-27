import _ from 'lodash';

const makeDiffTree = (data1, data2) => {
  const keys = _.sortBy(_.union(_.keys(data1), _.keys(data2)));

  return keys.map((key) => {
    const value1 = data1[key];
    const value2 = data2[key];

    if (!_.has(data1, key)) {
      return { key, value: value2, type: 'added' };
    }
    if (!_.has(data2, key)) {
      return { key, value: value1, type: 'deleted' };
    }
    if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
      return { key, children: makeDiffTree(value1, value2), type: 'nested' };
    }
    if (value1 !== value2) {
      return {
        key,
        firstValue: value1,
        secondValue: value2,
        type: 'changed',
      };
    }
    return { key, value: value1, type: 'unchanged' };
  });
};

export default makeDiffTree;
