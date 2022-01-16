import _ from 'lodash';
import { getIndent } from './utils.js';

// eslint-disable-next-line import/prefer-default-export
export function stylish(data) {
  function iter(tree, depth) {
    const currentIndent = '    '.repeat(depth - 1);

    const lines = tree.flatMap((node) => {
      const {
        type, children, oldValue, newValue, key,
      } = node;
      const indent = currentIndent + getIndent(type);

      switch (type) {
        case 'equal':
        case 'added': {
          const value = _.isObject(newValue) ? iter(newValue, depth + 1) : newValue;
          return `${indent}${key}: ${value}`;
        }
        case 'deleted': {
          const value = _.isObject(oldValue) ? iter(oldValue, depth + 1) : oldValue;
          return `${indent}${key}: ${value}`;
        }
        case 'tree':
          return `${indent}${key}: ${iter(children, depth + 1)}`;
        case 'modified': {
          const newValueIndent = currentIndent + getIndent('added');
          const oldValueIndent = currentIndent + getIndent('deleted');
          const v1 = _.isObject(oldValue) ? iter(oldValue, depth + 1) : oldValue;
          const v2 = _.isObject(newValue) ? iter(newValue, depth + 1) : newValue;
          return [`${oldValueIndent}${key}: ${v1}`, `${newValueIndent}${key}: ${v2}`];
        }
        default:
          return '';
      }
    });

    return [
      '{',
      ...lines,
      `${currentIndent}}`,
    ].join('\n');
  }
  return iter(data, 1);
}
