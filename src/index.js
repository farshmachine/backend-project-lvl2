import { extname } from 'path';
import { readFileSync } from 'fs';
import { resolvePath } from './utils.js';
import * as parsers from './parsers.js';
import { stylish } from './formaters.js';
import getObjectDiff from './comparator.js';

export default (...paths) => {
  const [obj1, obj2] = paths.map((path) => {
    const resolvedPath = resolvePath(path);
    const ext = extname(resolvedPath).slice(1);
    const data = readFileSync(resolvedPath);
    const parser = parsers[ext];

    return parser(data);
  });

  const diff = getObjectDiff(obj1, obj2);
  return stylish(diff);
};
