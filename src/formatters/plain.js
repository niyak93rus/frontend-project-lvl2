const stringify = (data) => {
  if (typeof data === 'string') {
    return `'${data}'`;
  }
  if (typeof data === 'object' && data !== null) {
    return '[complex value]';
  }
  return data;
};

const plain = (node, path = []) => {
  const allKeys = [...path, node.property];
  const pathString = allKeys.join('.');
  switch (node.type) {
    case 'deleted':
      return `Property '${pathString}' was removed\n`;
    case 'added':
      return `Property '${pathString}' was added with value: ${stringify(node.value)}\n`;
    case 'changed':
      return `Property '${pathString}' was updated. From ${stringify(node.oldValue)} to ${stringify(node.newValue)}\n`;
    case 'nested':
      return node.children.flatMap((child) => plain(child, allKeys));
    case 'root':
      return node.children.flatMap((child) => plain(child, []));
    case 'unchanged':
      return [];
    default:
      throw new Error(`Unknown type of node ${node.type}`);
  }
};

export default plain;
