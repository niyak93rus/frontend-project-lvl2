import { test, expect } from '@jest/globals';
import genDiff from '../src/index';

test('generate diffs between two JSON files', () => {
  expect(genDiff('__tests__/__fixtures__/file1.json', '__tests__/__fixtures__/file2.json')).toBe(`{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`);
});

test('generate diffs between two YAML files', () => {
  expect(genDiff('__tests__/__fixtures__/file1.yml', '__tests__/__fixtures__/file2.yml')).toBe(`{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`);
});

test('generate diffs between JSON and YAML files', () => {
  expect(genDiff('__tests__/__fixtures__/file1.json', '__tests__/__fixtures__/file2.yml')).toBe(`{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`);
});
