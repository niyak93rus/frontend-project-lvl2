/* eslint-disable no-restricted-syntax */
/* eslint-disable no-param-reassign */
/* eslint-disable import/extensions */

import { readFileSync } from 'fs';
import _ from 'lodash';
import * as path from 'path';
import parse from './parsers.js';
import stylish from './stylish.js';
import plain from './plain.js';

const getDifferencesOfObjects = (obj1, obj2) => {
  const keys1 = _.keys(obj1);
  const keys2 = _.keys(obj2);
  const keys = _.union(keys1, keys2);
  const sortedKeys = _.sortBy(keys);

  const diffTree = sortedKeys.reduce((propertiesCollection, key) => {
    if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
      const newObj = { property: key, type: 'hasChildren', children: getDifferencesOfObjects(obj1[key], obj2[key]) };
      return [...propertiesCollection, newObj];
    }
    if (!_.isObject(obj1[key]) || !_.isObject(obj2[key])) {
      if (!_.has(obj2, key)) {
        const newObj = { property: key, type: 'deleted', value: obj1[key] };
        return [...propertiesCollection, newObj];
      }
      if (!_.has(obj1, key)) {
        const newObj = { property: key, type: 'added', value: obj2[key] };
        return [...propertiesCollection, newObj];
      }
      if (_.has(obj1, key) && _.has(obj2, key) && obj1[key] !== obj2[key]) {
        const newObj = {
          property: key, type: 'changed', oldValue: obj1[key], newValue: obj2[key],
        };
        return [...propertiesCollection, newObj];
      }
      const newObj = { property: key, type: 'unchanged', value: obj1[key] };
      return [...propertiesCollection, newObj];
    }

    return propertiesCollection;
  }, []);

  return diffTree;
};

const genDiff = (filepath1, filepath2, formatName) => {
  const path1 = path.resolve(process.cwd(), filepath1);
  const path2 = path.resolve(process.cwd(), filepath2);

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
