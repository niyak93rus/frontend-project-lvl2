/* eslint-disable no-underscore-dangle */
import { test, expect } from '@jest/globals';
import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import genDiff from '../formatters/index';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__tests__', '__fixtures__', filename);

test('generate STYLISH diff between two JSON files', () => {
  const file1 = getFixturePath('file1.json');
  const file2 = getFixturePath('file2.json');
  const formatName = 'stylish';
  const expectedFile = fs.readFileSync(getFixturePath('resultStylish.txt'), 'utf-8');
  expect(genDiff(file1, file2, formatName)).toBe(expectedFile);
});

test('generate STYLISH diff between two YAML files', () => {
  const file1 = getFixturePath('file1.yml');
  const file2 = getFixturePath('file2.yml');
  const formatName = 'stylish';
  const expectedFile = fs.readFileSync(getFixturePath('resultStylish.txt'), 'utf-8');
  expect(genDiff(file1, file2, formatName)).toBe(expectedFile);
});

test('generate PLAIN diff between JSON and YAML files', async () => {
  const file1 = getFixturePath('file1.json');
  const file2 = getFixturePath('file2.yml');
  const formatName = 'plain';
  const expectedFile = fs.readFileSync(getFixturePath('resultPlain.txt'), 'utf-8');
  expect(genDiff(file1, file2, formatName)).toBe(expectedFile);
});
