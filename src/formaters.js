import _ from 'lodash';
import { getIndent } from './utils.js';

function stringify(value, depth) {
  const indent = '    '.repeat(depth);
  const bracketIndent = '    '.repeat(depth - 1);
  if (!_.isObject(value)) {
    return `${value}`;
  }

  const lines = Object.keys(value).map(
    (key) => `${indent}${key}: ${stringify(value[key], depth + 1)}`
  );

  return ['{', ...lines, `${bracketIndent}}`].join('\n');
}

// eslint-disable-next-line import/prefer-default-export
export function stylish(data) {
  function iter(tree, depth) {
    const currentIndent = '    '.repeat(depth - 1);

    const lines = tree.flatMap((node) => {
      const { type, children, oldValue, newValue, key } = node;
      const indent = currentIndent + getIndent(type);
      switch (type) {
        case 'equal':
        case 'added':
          return `${indent}${key}: ${stringify(newValue, depth + 1)}`;
        case 'deleted':
          return `${indent}${key}: ${stringify(oldValue, depth + 1)}`;
        case 'tree':
          return `${indent}${key}: ${iter(children, depth + 1)}`;
        case 'modified': {
          const newValueIndent = currentIndent + getIndent('added');
          const oldValueIndent = currentIndent + getIndent('deleted');
          return [
            `${oldValueIndent}${key}: ${stringify(oldValue, depth + 1)}`,
            `${newValueIndent}${key}: ${stringify(newValue, depth + 1)}`,
          ];
        }
        default:
          return '';
      }
    });

    return ['{', ...lines, `${currentIndent}}`].join('\n');
  }
  return iter(data, 1);
}
