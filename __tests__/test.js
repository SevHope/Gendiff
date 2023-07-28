import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import { test, expect } from '@jest/globals';
import genDiff from '../src/genDiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const resultStylish = readFile('resultStylish.txt');
const resultPlain = readFile('resultPlain.txt');

test.each(['json', 'yaml'])(
  'genDiff should return the expected output for %p',
  (format) => {
    const path1 = getFixturePath(`file1.${format}`);
    const path2 = getFixturePath(`file2.${format}`);
    expect(genDiff(path1, path2)).toEqual(resultStylish);
    expect(genDiff(path1, path2, 'stylish')).toEqual(resultStylish);
    expect(genDiff(path1, path2, 'plain')).toEqual(resultPlain);
    expect(() => JSON.parse(genDiff(path1, path2, 'json'))).not.toThrow();
  },
);
