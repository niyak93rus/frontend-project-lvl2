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

const plain = (node, path) => {
  switch (node.type) {
    case 'deleted':
      return `Property '${getPath(path, node.property)}' was removed\n`;
    case 'added':
      return `Property '${getPath(path, node.property)}' was added with value: ${stringify(node.value)}\n`;
    case 'changed':
      return `Property '${getPath(path, node.property)}' was updated. From ${stringify(node.oldValue)} to ${stringify(node.newValue)}\n`;
    case 'nested':
      return node.children.flatMap((child) => plain(child, path.concat(node.property)));
    case 'root':
      return node.children.flatMap((child) => plain(child, []));
    case 'unchanged':
      return [];
    default:
      throw new Error(`Unknown type of node ${node.type}`);
  }
};

export default plain;
