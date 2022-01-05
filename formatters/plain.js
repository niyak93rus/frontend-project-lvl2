const addQuotes = (data) => {
  if (typeof data === 'string') {
    return `'${data}'`;
  }
  return data;
};

const replaceObjects = (data) => {
  if (typeof data === 'object' && data !== null) {
    return '[complex value]';
  }
  return data;
};

const getPath = (path, prop) => {
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
      switch (type) {
        case 'deleted':
          return `Property '${getPath(path, property)}' was removed`;
        case 'added':
          return `Property '${getPath(path, property)}' was added with value: ${replaceObjects(addQuotes(value))}`;
        case 'changed':
          return `Property '${getPath(path, property)}' was updated. From ${replaceObjects(addQuotes(oldValue))} to ${replaceObjects(addQuotes(newValue))}`;
        case 'root':
          return iter(children, path.concat(property));
        default:
          return [];
      }
    });
    return result.join('\n');
  };
  return iter(tree, []);
};

export default plain;
