import { extname } from 'path';
import { readFileSync } from 'fs';
import { resolvePath } from './utils.js';
import * as parsers from './parsers.js';
import { getFormater } from './formaters.js';
import getObjectDiff from './comparator.js';

export default (format, ...paths) => {
  const [obj1, obj2] = paths.map((path) => {
    const resolvedPath = resolvePath(path);
    const ext = extname(resolvedPath).slice(1);
    const data = readFileSync(resolvedPath);
    const parser = parsers[ext];

    return parser(data);
  });

  const diff = getObjectDiff(obj1, obj2);
  const formater = getFormater(format);
  return formater(diff);
};
