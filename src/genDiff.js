import fs from 'fs';
import path from 'path';
import diffTree from './diffTree.js';
import parse from './parser.js';
import getFormat from './formatters/format.js';

const getPath = (filepath) => path.resolve('__fixtures__', filepath);
const getFileData = (filepath) => fs.readFileSync(getPath(filepath), 'utf8');
const getExtname = (filepath) => path.extname(filepath);

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const data1 = parse(getFileData(filepath1), getExtname(filepath1));
  const data2 = parse(getFileData(filepath2), getExtname(filepath2));
  const format = getFormat(formatName);
  return format(diffTree(data1, data2));
};

export default genDiff;
