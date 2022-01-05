import yaml from 'js-yaml';

const parse = (file, format) => {
  if (format === '.yml' || format === '.yaml') {
    return yaml.load(file);
  }
  return JSON.parse(file);
};

export default parse;
