import _ from 'lodash';
import { getIndent, getPlainFormatedValue } from './utils.js';

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

function stylish(data) {
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

function plain(data) {
  function iter(tree, path) {
    const lines = tree.flatMap((node) => {
      const { type, children, oldValue, newValue, key } = node;
      const currentPath = path ? `${path}.${key}` : key;
      switch (type) {
        case 'equal':
        case 'added':
          return `Property '${currentPath}' was added with value: ${getPlainFormatedValue(
            newValue
          )}`;
        case 'deleted':
          return `Property ${currentPath} was removed`;
        case 'tree':
          return iter(children, currentPath);
        case 'modified': {
          return `Property ${currentPath} was updated. From ${getPlainFormatedValue(
            oldValue
          )} to ${getPlainFormatedValue(newValue)}`;
        }
        default:
          return '';
      }
    });

    return lines.join('\n');
  }

  return iter(data, '');
}

function getFormater(type) {
  if (type === 'plain') {
    return plain;
  }

  return stylish;
}

// eslint-disable-next-line import/prefer-default-export
export { getFormater };
