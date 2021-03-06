import plain from './plain.js';
import stylish from './stylish.js';

const formatTree = (tree, formatName) => {
  if (formatName === 'plain') {
    return plain(tree).join('').trim();
  }
  if (formatName === 'json') {
    return JSON.stringify(tree);
  }

  return stylish(tree, 1);
};

export default formatTree;
