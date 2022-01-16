import _ from 'lodash';
import { isAbsolute, resolve } from 'path';

function getSortedUniqKeys(obj1, obj2) {
  const keys = _.uniq(Object.keys({ ...obj1, ...obj2 }));

  return keys.sort();
}

function resolvePath(path) {
  return isAbsolute(path) ? resolve(process.cwd(), path) : resolve(path);
}

function getIndent(type) {
  switch (type) {
    case 'added':
      return '  + ';
    case 'deleted':
      return '  - ';
    case 'equal':
    default:
      return '    ';
  }
}

export {
  getSortedUniqKeys,
  resolvePath,
  getIndent,
};
