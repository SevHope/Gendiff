import fs from 'fs';
import path from 'path';
import format from './formatters/index.js';
import diffTree from './diffTree.js';
import parse from './parser.js';

const getPath = (filepath) => path.resolve('__fixtures__', filepath);
const getFileData = (filepath) => fs.readFileSync(getPath(filepath), 'utf8');
const getExtname = (filepath) => path.extname(filepath).substring(1);

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const data1 = parse(getFileData(filepath1), getExtname(filepath1));
  const data2 = parse(getFileData(filepath2), getExtname(filepath2));
  const diff = diffTree(data1, data2);
  return format(diff, formatName);
};

export default genDiff;
