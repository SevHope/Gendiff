import fs from 'fs';
import yaml from 'js-yaml';

export default (file) => {
  const extension = file.split('.')[1];
  if (extension === 'json') {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  }
  return yaml.load(fs.readFileSync(file, 'utf8'));
};
