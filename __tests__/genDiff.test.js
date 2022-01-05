/* eslint-disable no-underscore-dangle */
import { test, expect, describe } from '@jest/globals';
import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import genDiff from '../src/index';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

describe('test diff generation between two files', () => {
  test.each([
    ['stylish', getFixturePath('file1.json'), getFixturePath('file2.json'), fs.readFileSync(getFixturePath('resultStylish.txt'), 'utf-8')],
    ['stylish', getFixturePath('file1.yml'), getFixturePath('file2.yml'), fs.readFileSync(getFixturePath('resultStylish.txt'), 'utf-8')],
    ['plain', getFixturePath('file1.json'), getFixturePath('file2.yml'), fs.readFileSync(getFixturePath('resultPlain.txt'), 'utf-8')],
    ['json', getFixturePath('file1.json'), getFixturePath('file2.json'), fs.readFileSync(getFixturePath('resultJSON.txt'), 'utf-8')],
  ])('genDiff compares file1 and file2 using %s formatter and returns what expected', (formatName, file1, file2, expectedFile) => {
    expect(genDiff(file1, file2, formatName)).toBe(expectedFile);
  });
});
