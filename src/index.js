import { readFileSync } from 'fs';
import * as path from 'path';
import parse from './parsers.js';
import createDiffTree from './createDiffTree.js';
import formatTree from './formatters/index.js';

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

  return formatTree(unformattedTree, formatName);
};

export default genDiff;
