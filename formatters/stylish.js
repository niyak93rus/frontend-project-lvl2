import _ from 'lodash';

const makeIndent = (n) => ' '.repeat(n);

const indentSize = 2;
const baseIndent = 4;
const baseCloseIndent = 2;

const stringify = (data, depth) => {
  if (!_.isPlainObject(data)) {
    return data;
  }
  const currentIndent = depth + indentSize * baseIndent;
  const closeIndent = indentSize * baseCloseIndent;
  const lines = Object
    .entries(data)
    .map(([key, value]) => {
      if (_.isPlainObject(value)) {
        return `${makeIndent(currentIndent)}${key}: ${stringify(value, depth + closeIndent)}`;
      }
      return `${makeIndent(currentIndent)}${key}: ${value}`;
    });

  return [
    '{',
    ...lines,
    `${makeIndent(depth + closeIndent)}}`,
  ].join('\n');
};

export default (tree) => {
  const iter = (currentValue, depth) => {
    const lines = currentValue.map(({
      property, type, value, oldValue, newValue, children,
    }) => {
      switch (type) {
        case 'added':
          return `${makeIndent(depth + indentSize)}+ ${property}: ${stringify(value, depth)}`;
        case 'deleted':
          return `${makeIndent(depth + indentSize)}- ${property}: ${stringify(value, depth)}`;
        case 'changed':
          return `${makeIndent(depth + indentSize)}- ${property}: ${stringify(oldValue, depth)}\n${makeIndent(depth + indentSize)}+ ${property}: ${stringify(newValue, depth)}`;
        case 'unchanged':
          return `${makeIndent(depth + indentSize)}  ${property}: ${stringify(value, depth)}`;
        case 'hasChildren':
          return `${makeIndent(depth + indentSize)}  ${property}: ${iter(children, depth + indentSize * 2)}`;
        default:
          throw new Error(`Wrong type: '${type}'!`);
      }
    });
    return [
      '{',
      ...lines,
      `${makeIndent(depth)}}`,
    ].join('\n');
  };
  return iter(tree, 0);
};
