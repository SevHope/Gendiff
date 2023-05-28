import path from 'node:path';
import { fileURLToPath } from 'node:url';
import fs from 'fs';
import getDifference from '../src/genDiff.js';

const importFileName = fileURLToPath(import.meta.url);
const generateDName = path.dirname(importFileName);

const getFixturePath = (filename) => path.join(generateDName, '..', '__fixtures__', filename);

const test = ('JSON file', () => {
  const filename1 = getFixturePath('file1.json');
  const filename2 = getFixturePath('file2.json');
  const resultFilename = getFixturePath('fileResult.txt');
  const result = fs.readFileSync(resultFilename, 'utf-8');
  expect(getDifference(filename1, filename2)).toBe(result);
});
export default test;