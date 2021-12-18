/* eslint-disable no-restricted-syntax */
/* eslint-disable no-param-reassign */
/* eslint-disable import/extensions */
/* eslint-disable no-console */
import { readFileSync } from 'fs';
import _ from 'lodash';
import * as path from 'path';
import parse from './parsers.js';
import stylish from './stylish.js';

const getDifferencesOfObjects = (tree1, tree2) => {
  const keys1 = _.keys(tree1);
  const keys2 = _.keys(tree2);
  const keys = _.union(keys1, keys2);
  const sortedKeys = _.sortBy(keys);
  console.log(`KEYS: ${sortedKeys}`);

  const propertiesCollection = sortedKeys.reduce((result, key) => {
    const newObj = {};
    console.log(`CURRENT KEY: ${key}`);
    if (_.isObject(tree1[key]) && _.isObject(tree2[key])) {
      newObj.property = key;
      result.push(newObj, getDifferencesOfObjects(tree1[key], tree2[key]));
    }
    if (!_.isObject(tree1[key]) || !_.isObject(tree2[key])) {
      newObj.property = key;
      if (!_.has(tree2, key)) {
        newObj.status = 'deleted';
        newObj.value = tree1[key];
      } else if (!_.has(tree1, key)) {
        newObj.status = 'added';
        newObj.value = tree2[key];
      } else if (_.has(tree1, key) && _.has(tree2, key) && tree1[key] !== tree2[key]) {
        newObj.status = 'changed';
        newObj.oldValue = tree1[key];
        newObj.newValue = tree2[key];
      } else {
        newObj.status = 'unchanged';
        newObj.value = tree1[key];
      }
      result.push(newObj);
    }
    console.log(newObj);

    return result;
  }, []);

  return propertiesCollection;
};

const genDiff = (filename1, filename2) => {
  const path1 = path.resolve(process.cwd(), filename1);
  const path2 = path.resolve(process.cwd(), filename2);

  const format1 = path.extname(path1);
  const format2 = path.extname(path2);

  const file1 = readFileSync(path1);
  const file2 = readFileSync(path2);

  const obj1 = parse(file1, format1);
  const obj2 = parse(file2, format2);

  const unformattedTree = getDifferencesOfObjects(obj1, obj2);

  // FORMAT TREE
  const buildAST = (arr) => {
    const resultObj = {};
    arr.flatMap((item) => {
      if (item.status === 'unchanged') {
        resultObj.value = item.value;
      } else if (item.status === 'added') {
        // TODO
      } else if (item.status === 'deleted') {
        // TODO
      } else {
        // TODO
      }
      return null;
    });
  };

  const result = buildAST(unformattedTree);

  return unformattedTree;
};

export default genDiff;
