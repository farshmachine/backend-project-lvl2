import { describe, expect, it } from '@jest/globals';
import { getIndent, getSortedUniqKeys, resolvePath } from '../src/utils';
import path from 'path';

describe('utils', () => {
  describe('getSortedUniqKeys', () => {
    it('should return keys from 2 defined objects', () => {
      const obj1 = {
        c: 'bar',
        b: 'foo',
        a: 1,
      };

      const obj2 = {
        b: 'bar',
        a: 'foo',
        d: 42,
      };

      const sortedKeys = getSortedUniqKeys(obj1, obj2);
      const [a, b, c, d] = sortedKeys;
      expect(sortedKeys.length).toEqual(4);
      expect(a).toEqual('a');
      expect(b).toEqual('b');
      expect(c).toEqual('c');
      expect(d).toEqual('d');
    });

    it('should return keys even if only 1 object defined', () => {
      const obj1 = {
        c: 'bar',
        b: 'foo',
        a: 1,
      };

      const obj2 = undefined;

      const sortedKeys = getSortedUniqKeys(obj1, obj2);
      expect(sortedKeys.length).toEqual(3);
    });

    it('should return empty array from 2 undefined objects', () => {
      const obj1 = null;

      const obj2 = undefined;

      const sortedKeys = getSortedUniqKeys(obj1, obj2);
      expect(sortedKeys.length).toEqual(0);
    });

    it('should return empty array from 2 empty objects', () => {
      const obj1 = {};

      const obj2 = {};

      const sortedKeys = getSortedUniqKeys(obj1, obj2);
      expect(sortedKeys.length).toEqual(0);
    });
  });

  describe('getIndent', () => {
    it('length should equals 4', () => {
      const indent = getIndent('added');
      expect(indent.length).toBe(4);
    });

    it('should return indent for added type', () => {
      const [, , sign] = getIndent('added');
      expect(sign).toEqual('+');
    });

    it('should return indent for deleted type', () => {
      const [, , sign] = getIndent('deleted');
      expect(sign).toEqual('-');
    });

    it('should return indent for equal type', () => {
      const [, , sign] = getIndent('equal');
      expect(sign).toEqual(' ');
    });

    it('should return default indent if type is not defined', () => {
      const [, , sign] = getIndent();
      expect(sign).toEqual(' ');
    });
  });

  describe('resolvePath', () => {
    it('should resolve absolute path relativly to working directory', () => {
      const resolvedPath = resolvePath('/README.md');
      expect(resolvedPath).toEqual(path.join(process.cwd(), '/README.md'));
    });

    it('should resolve relative path', () => {
      const resolvedPath = resolvePath('./src/index.js');
      expect(resolvedPath).toEqual(path.resolve('src/index.js'));
    });
  });
});
