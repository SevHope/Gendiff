import { load } from 'js-yaml';

const getParsedContent = (data, ext) => {
  switch (ext) {
    case '.json':
      return JSON.parse(data);
    case '.yaml':
      return load(data);
    case '.yml':
      return load(data);
    default:
      throw new Error(`File extension ${ext} is incorrect!`);
  }
};

export default getParsedContent;
