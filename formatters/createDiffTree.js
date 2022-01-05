import _ from 'lodash';

const createDiffTree = (obj1, obj2) => {
  const keys1 = _.keys(obj1);
  const keys2 = _.keys(obj2);
  const keys = _.union(keys1, keys2);
  const sortedKeys = _.sortBy(keys);

  const diffTree = sortedKeys.flatMap((key) => {
    const propertiesCollection = [];
    if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
      const newObj = { property: key, type: 'root', children: createDiffTree(obj1[key], obj2[key]) };
      return [...propertiesCollection, newObj];
    }
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
  });

  return diffTree;
};

export default createDiffTree;
