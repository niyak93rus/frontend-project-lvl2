/* eslint-disable no-underscore-dangle */
import { test, expect } from '@jest/globals';
import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import genDiff from '../src/index';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__tests__', '__fixtures__', filename);

test('generate diffs between two JSON files', () => {
  const file1 = getFixturePath('file1.json');
  const file2 = getFixturePath('file2.json');
  const expectedFile = fs.readFileSync(getFixturePath('result.txt'), 'utf-8');
  expect(genDiff(file1, file2)).toBe(expectedFile);
});

test('generate diffs between two YAML files', () => {
  const file1 = getFixturePath('file1.yml');
  const file2 = getFixturePath('file2.yml');
  const expectedFile = fs.readFileSync(getFixturePath('result.txt'), 'utf-8');
  expect(genDiff(file1, file2)).toBe(expectedFile);
});

test('generate diffs between JSON and YAML files', async () => {
  const file1 = getFixturePath('file1.json');
  const file2 = getFixturePath('file2.yml');
  const expectedFile = fs.readFileSync(getFixturePath('result.txt'), 'utf-8');
  expect(genDiff(file1, file2)).toBe(expectedFile);
});
