const quoteAdder = (data) => {
  if (typeof data === 'string') {
    return `'${data}'`;
  }
  return data;
};

const objectReplacer = (data) => {
  if (typeof data === 'object' && data !== null) {
    return '[complex value]';
  }
  return data;
};

const pathMaker = (path, prop) => {
  if (path.length === 0) {
    return `${prop}`;
  }
  return `${path.join('.')}.${prop}`;
};

const plain = (tree) => {
  const iter = (node, path) => {
    const result = node.flatMap(({
      property, type, value, newValue, oldValue, children,
    }) => {
      console.log(path);
      switch (type) {
        case 'deleted': return `Property '${pathMaker(path, property)}' was removed`;
        case 'added': return `Property '${pathMaker(path, property)}' was added with value: ${objectReplacer(quoteAdder(value))}`;
        case 'changed': return `Property '${pathMaker(path, property)}' was updated. From ${objectReplacer(quoteAdder(oldValue))} to ${objectReplacer(quoteAdder(newValue))}`;
        case 'hasChildren': return iter(children, path.concat(property));
        default: return [];
      }
    });
    return result.join('\n');
  };
  return iter(tree, []);
};

export default plain;
