import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import genDiff from '../src/genDiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');
const getActual = (filename1, filename2, format) => {
  const path1 = getFixturePath(filename1);
  const path2 = getFixturePath(filename2);
  return genDiff(path1, path2, format);
};

const cases = [
  {
    file1: 'file3.json',
    file2: 'file4.json',
    exp: 'resultStylish.txt',
    format: 'stylish',
  },
  {
    file1: 'file3.json',
    file2: 'file4.json',
    exp: 'resultPlain.txt',
    format: 'plain',
  },
  {
    file1: 'file1.yaml',
    file2: 'file2.yaml',
    exp: 'resultStylish.txt',
    format: 'stylish',
  },
  {
    file1: 'file1.yaml',
    file2: 'file2.yaml',
    exp: 'resultPlain.txt',
    format: 'plain',
  },
];

test.each(cases)(
  'genDiff should return the expected output for %p',
  ({
    file1, file2, exp, format,
  }) => {
    const actual = getActual(file1, file2, format);
    const expected = readFile(exp);
    expect(actual).toBe(expected);
  },
);

test('test format JSON', () => {
  const file1 = getFixturePath('file3.json');
  const file2 = getFixturePath('file4.json');
  const data = genDiff(file1, file2, 'json');
  expect(() => JSON.parse(data)).not.toThrow();
});
