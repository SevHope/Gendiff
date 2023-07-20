import { readFileSync } from 'node:fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { test, expect } from '@jest/globals';
import genDiff from '../src/genDiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

const result = readFile('resultPlain.txt');

test('genDiff', () => {
  const filepath3 = getFixturePath('file3.json');
  const filepath4 = getFixturePath('file4.json');
  expect(genDiff(filepath3, filepath4, 'plain')).toBe(result);
});
