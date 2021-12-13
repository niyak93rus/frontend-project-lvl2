/* eslint-disable import/extensions */
/* eslint-disable no-console */
import { readFileSync } from 'fs';
import _ from 'lodash';
import * as path from 'path';
import parse from './parsers.js';

const genDiff = (filename1, filename2) => {
  const path1 = path.resolve(process.cwd(), filename1);
  const path2 = path.resolve(process.cwd(), filename2);

  const format1 = path.extname(path1);
  const format2 = path.extname(path2);

  const file1 = readFileSync(path1);
  const file2 = readFileSync(path2);

  const obj1 = parse(file1, format1);
  const obj2 = parse(file2, format2);

  const keys1 = _.keys(obj1);
  const keys2 = _.keys(obj2);
  const keys = _.union(keys1, keys2);
  const sortedKeys = _.sortBy(keys);

  let result = '{\n';
  sortedKeys.map((key) => {
    if (!_.has(obj2, key)) {
      result += `  - ${key}: ${obj1[key]}\n`;
    } else if (!_.has(obj1, key)) {
      result += `  + ${key}: ${obj2[key]}\n`;
    } else if (obj1[key] !== obj2[key]) {
      result += `  - ${key}: ${obj1[key]}\n`;
      result += `  + ${key}: ${obj2[key]}\n`;
    } else {
      result += `    ${key}: ${obj1[key]}\n`;
    }
    return result;
  });

  result += '}';

  console.log(result.trim());
  return result.trim();
};

export default genDiff;
