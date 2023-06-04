import { readFileSync } from 'node:fs';
import _ from 'lodash';
import path from 'node:path';

const getPath = (file) => {
  if ((String(file)).startsWith('__', '/', '.')) {
    const filepath = path.resolve(file);
    return filepath;
  }
  const filepath = path.resolve('__fixtures__', file);
  return filepath;
};

const genDiff = (file1, file2) => {
  const filepath1 = getPath(file1);
  const filepath2 = getPath(file2);
  const data1 = readFileSync(filepath1, 'utf-8');
  const data2 = readFileSync(filepath2, 'utf-8');
  const dataParse1 = JSON.parse(data1);
  const dataParse2 = JSON.parse(data2);
  const keys1 = Object.keys(dataParse1);
  const keys2 = Object.keys(dataParse2);
  const allKeys = [...keys1, ...keys2];
  const sortedAllKeys = _.sortBy(allKeys);
  const result = [];
  for (const key of sortedAllKeys) {
    if (_.has(dataParse1, key) && _.has(dataParse2, key) && dataParse1[key] === dataParse2[key] && !result.includes(key)) {
      result.push(`     ${key}: ${dataParse1[key]} \n`);
    }
    if (_.has(dataParse1, key) && !_.has(dataParse2, key) && !result.includes(key)) {
      result.push(`   - ${key}: ${dataParse1[key]} \n`);
    }
    if (_.has(dataParse1, key) && _.has(dataParse2, key) && dataParse1[key] !== dataParse2[key] && !result.includes(key)) {
      result.push(`   - ${key}: ${dataParse1[key]} \n`);
      result.push(`   + ${key}: ${dataParse2[key]} \n`);
    }
    if (_.has(dataParse2, key) && !_.has(dataParse1, key) && !result.includes(key)) {
      result.push(`   + ${key}: ${dataParse2[key]} \n`);
    }}
  const uniqResult = _.uniq(result);
  const stringResult = String(uniqResult);
  const newResult = stringResult.replace(/,/g, '');
  return `{\n${newResult}}`;
};
export default genDiff;
