import { readFileSync } from 'node:fs';
import _ from 'lodash';

export default (filepath1, filepath2) => {
  const data1 = readFileSync(filepath1, 'utf-8');
  const data2 = readFileSync(filepath2, 'utf-8');
  const dataParse1 = JSON.parse(data1);
  const dataParse2 = JSON.parse(data2);
  const keys1 = Object.keys(dataParse1);
    const keys2 = Object.keys(dataParse2);
    const allKeys = [...keys1, ...keys2];
    const sortedAllKeys = allKeys.sort();
    const result = [];
  for (const key of sortedAllKeys) {
    if (_.has(dataParse1, key) && _.has(dataParse2, key) && dataParse1[key] === dataParse2[key] && !result.includes(key)) {
        result.push(`  ${key}: ${dataParse1[key]} \n`);
    }
     if (_.has(dataParse1, key) && !_.has(dataParse2, key)  && !result.includes(key)) {
      result.push(`- ${key}: ${dataParse1[key]} \n`);
  }
  if (_.has(dataParse1, key) && _.has(dataParse2, key) && dataParse1[key] !== dataParse2[key]  && !result.includes(key)) {
    result.push(`- ${key}: ${dataParse1[key]} \n`);
    result.push(`+ ${key}: ${dataParse2[key]} \n`);
  }
  if (_.has(dataParse2, key) && !_.has(dataParse1, key)  && !result.includes(key)) {
    result.push(`+ ${key}: ${dataParse2[key]} \n`);
  }
}
const uniqResult = _.uniq(result);
const stringResult = String(uniqResult);
const newResult = stringResult.replace(/,/g, '');
return `{\n${newResult}}`;
};