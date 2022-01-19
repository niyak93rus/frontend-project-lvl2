import _ from 'lodash';

const makeIndent = (n) => '  '.repeat(n);

const indentSize = 2;

const stringify = (data, depth) => {
  const closingBracketsIndent = (depth - 1) * indentSize;
  if (!_.isPlainObject(data)) {
    return data;
  }

  const lines = Object
    .entries(data)
    .map(([key, value]) => {
      if (_.isPlainObject(value)) {
        return `${makeIndent(depth * indentSize)}${key}: ${stringify(value, depth + 1)}`;
      }
      return `${makeIndent(depth * indentSize)}${key}: ${value}`;
    });

  return [
    '{',
    ...lines,
    `${makeIndent(closingBracketsIndent)}}`,
  ].join('\n');
};

export default (tree) => {
  const iter = (currentValue, depth) => {
    const modifiedLineIndent = depth * indentSize - 1;
    const closingBracketsIndent = (depth - 1) * indentSize;

    const lines = currentValue.map(({
      property, type, value, oldValue, newValue, children,
    }) => {
      switch (type) {
        case 'added':
          return `${makeIndent(modifiedLineIndent)}+ ${property}: ${stringify(value, depth + 1)}`;
        case 'deleted':
          return `${makeIndent(modifiedLineIndent)}- ${property}: ${stringify(value, depth + 1)}`;
        case 'changed':
          return `${makeIndent(modifiedLineIndent)}- ${property}: ${stringify(oldValue, depth + 1)}\n${makeIndent(modifiedLineIndent)}+ ${property}: ${stringify(newValue, depth + 1)}`;
        case 'unchanged':
          return `${makeIndent(depth * indentSize)}${property}: ${stringify(value, depth)}`;
        case 'nested':
          return `${makeIndent(depth * indentSize)}${property}: ${iter(children, depth + 1)}`;
        case 'root':
          return `${iter(children, depth).slice(2, -2)}`;
        default:
          throw new Error(`Wrong type: '${type}'!`);
      }
    });
    return [
      '{',
      ...lines,
      `${makeIndent(closingBracketsIndent)}}`,
    ].join('\n');
  };
  return iter(tree, 1);
};
