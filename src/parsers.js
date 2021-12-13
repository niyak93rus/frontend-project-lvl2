import yaml from 'js-yaml';

function parse(file, format) {
  let result;
  if (format === '.json') {
    result = JSON.parse(file);
  }
  if (format === '.yml' || format === '.yaml') {
    result = yaml.load(file);
  }
  return result;
}

export default parse;
