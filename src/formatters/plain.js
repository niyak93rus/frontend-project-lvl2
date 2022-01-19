const stringify = (data) => {
  if (typeof data === 'string') {
    return `'${data}'`;
  }
  if (typeof data === 'object' && data !== null) {
    return '[complex value]';
  }
  return data;
};

const getPath = (path, prop) => {
  if (path.length === 0) {
    return [...path, prop];
  }
  return [...path, prop].join('.');
};

const plain = (tree) => {
  const iter = (node, path) => {
    const result = node.map(({
      property, type, value, newValue, oldValue, children,
    }) => {
      switch (type) {
        case 'deleted':
          return `Property '${getPath(path, property)}' was removed\n`;
        case 'added':
          return `Property '${getPath(path, property)}' was added with value: ${stringify(value)}\n`;
        case 'changed':
          return `Property '${getPath(path, property)}' was updated. From ${stringify(oldValue)} to ${stringify(newValue)}\n`;
        case 'nested':
          return iter(children, path.concat(property));
        case 'root':
          return iter(children, []);
        default:
          return [];
      }
    });
    return result.join('');
  };
  return iter(tree, []).trim();
};

export default plain;
