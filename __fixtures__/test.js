import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'node:path';
import { dirname } from 'path';
import genDiff from '../src/genDiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const generateDName = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const importFileName = fileURLToPath(import.meta.url);

const getFixturePath = (filename) => path.join(generateDName, '..', '__fixtures__', filename);

const test = ('JSON file', () => {
  const filename1 = getFixturePath('file1.json');
  const filename2 = getFixturePath('file2.json');
  const resultFilename = getFixturePath('fileResult.txt');
  const result = fs.readFileSync(resultFilename, 'utf-8');
  expect(genDiff(filename1, filename2)).toBe(result);
});
export default test;
