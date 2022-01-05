import plain from './plain';
import stylish from './stylish';

const formatTree = (tree, formatName) => {
  if (formatName === 'plain') {
    return plain(tree);
  }
  if (formatName === 'json') {
    return JSON.stringify(tree);
  }
  return stylish(tree);
};

export default formatTree;
