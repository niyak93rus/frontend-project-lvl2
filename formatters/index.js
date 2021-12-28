/* eslint-disable no-restricted-syntax */
/* eslint-disable no-param-reassign */
/* eslint-disable import/extensions */
/* eslint-disable no-console */
import { readFileSync } from 'fs';
import _ from 'lodash';
import * as path from 'path';
import parse from './parsers.js';
import stylish from './stylish.js';
import plain from './plain.js';

const getDifferencesOfObjects = (tree1, tree2) => {
  const keys1 = _.keys(tree1);
  const keys2 = _.keys(tree2);
  const keys = _.union(keys1, keys2);
  const sortedKeys = _.sortBy(keys);

  const propertiesCollection = sortedKeys.reduce((result, key) => {
    if (_.isObject(tree1[key]) && _.isObject(tree2[key])) {
      const newObj = { property: key, type: 'hasChildren', children: getDifferencesOfObjects(tree1[key], tree2[key]) };
      return [...result, newObj];
    }
    if (!_.isObject(tree1[key]) || !_.isObject(tree2[key])) {
      if (!_.has(tree2, key)) {
        const newObj = { property: key, type: 'deleted', value: tree1[key] };
        return [...result, newObj];
      }
      if (!_.has(tree1, key)) {
        const newObj = { property: key, type: 'added', value: tree2[key] };
        return [...result, newObj];
      }
      if (_.has(tree1, key) && _.has(tree2, key) && tree1[key] !== tree2[key]) {
        const newObj = {
          property: key, type: 'changed', oldValue: tree1[key], newValue: tree2[key],
        };
        return [...result, newObj];
      }
      const newObj = { property: key, type: 'unchanged', value: tree1[key] };
      return [...result, newObj];
    }

    return result;
  }, []);

  return propertiesCollection;
};

const genDiff = (filename1, filename2, formatName) => {
  const path1 = path.resolve(process.cwd(), filename1);
  const path2 = path.resolve(process.cwd(), filename2);

  const format1 = path.extname(path1);
  const format2 = path.extname(path2);

  const file1 = readFileSync(path1);
  const file2 = readFileSync(path2);

  const obj1 = parse(file1, format1);
  const obj2 = parse(file2, format2);

  const unformattedTree = getDifferencesOfObjects(obj1, obj2);

  if (formatName === 'plain') {
    return plain(unformattedTree);
  }
  if (formatName === 'json') {
    return JSON.stringify(unformattedTree);
  }
  return stylish(unformattedTree);
};

export default genDiff;
