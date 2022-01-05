/* eslint-disable no-restricted-syntax */
/* eslint-disable no-param-reassign */
/* eslint-disable import/extensions */

import { readFileSync } from 'fs';
import * as path from 'path';
import parse from './parsers.js';
import stylish from './stylish.js';
import plain from './plain.js';
import createDiffTree from './createDiffTree.js';

const getObjFromFile = (filepath) => {
  const pathResolve = path.resolve(process.cwd(), filepath);
  const format = path.extname(pathResolve);
  const file = readFileSync(pathResolve);
  const obj = parse(file, format);

  return obj;
};

const genDiff = (filepath1, filepath2, formatName) => {
  const obj1 = getObjFromFile(filepath1);
  const obj2 = getObjFromFile(filepath2);

  const unformattedTree = createDiffTree(obj1, obj2);

  if (formatName === 'plain') {
    return plain(unformattedTree);
  }
  if (formatName === 'json') {
    return JSON.stringify(unformattedTree);
  }
  return stylish(unformattedTree);
};

export default genDiff;
