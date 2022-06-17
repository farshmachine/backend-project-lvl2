import _ from 'lodash';
import { isAbsolute, join, resolve } from 'path';

function getSortedUniqKeys(obj1, obj2) {
  const keys = _.uniq(Object.keys({ ...obj1, ...obj2 }));

  return keys.sort();
}

function resolvePath(path) {
  return isAbsolute(path) ? join(process.cwd(), path) : resolve(path);
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

function getPlainFormatedValue(value) {
  if (typeof value === 'string') {
    return `'${value}'`;
  }

  if (typeof value === 'object') {
    return `[complex value]`;
  }

  return value;
}

export { getSortedUniqKeys, resolvePath, getIndent, getPlainFormatedValue };
