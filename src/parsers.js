import yaml from 'js-yaml';

const parse = (file, format) => {
  switch (format) {
    case '.yml':
      return yaml.load(file);
    case '.yaml':
      return yaml.load(file);
    case '.json':
      return JSON.parse(file);
    default:
      throw new Error(`Wrong format: ${format}`);
  }
};

export default parse;
