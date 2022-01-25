import _ from 'lodash';

const createDiffTree = (obj1, obj2) => {
  const keys1 = _.keys(obj1);
  const keys2 = _.keys(obj2);
  const keys = _.union(keys1, keys2);
  const sortedKeys = _.sortBy(keys);

  const diffTree = sortedKeys.map((key) => {
    if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
      const newObj = { property: key, type: 'nested', children: createDiffTree(obj1[key], obj2[key]) };
      return newObj;
    }
    if (!_.has(obj2, key)) {
      const newObj = { property: key, type: 'deleted', value: obj1[key] };
      return newObj;
    }
    if (!_.has(obj1, key)) {
      const newObj = { property: key, type: 'added', value: obj2[key] };
      return newObj;
    }
    if (_.has(obj1, key) && _.has(obj2, key) && obj1[key] !== obj2[key]) {
      const newObj = {
        property: key, type: 'changed', oldValue: obj1[key], newValue: obj2[key],
      };
      return newObj;
    }
    const newObj = { property: key, type: 'unchanged', value: obj1[key] };
    return newObj;
  });

  return diffTree;
};

export default (obj1, obj2) => ({ type: 'root', children: createDiffTree(obj1, obj2) });
