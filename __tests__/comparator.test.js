#!/usr/bin/env node

import { expect } from '@jest/globals';
import getObjectsDiff from '../src/comparator';

describe('comparator', () => {
  it('inner key type should be modified', () => {
    const obj1 = {
      key: {
        innerKey: 'foo',
      },
    };

    const obj2 = {
      key: {
        innerKey: {
          foo: '42',
        },
      },
    };

    const [diff] = getObjectsDiff(obj1, obj2);
    const [innerKeyDiff] = diff.children;
    expect(innerKeyDiff.type).toBe('modified');
  });

  it('inner key type should be equal', () => {
    const obj1 = {
      key: {
        innerKey: 'foo',
      },
    };

    const obj2 = {
      key: {
        innerKey: 'foo',
      },
    };

    const [diff] = getObjectsDiff(obj1, obj2);
    const [innerKeyDiff] = diff.children;
    expect(innerKeyDiff.type).toBe('equal');
  });

  it('inner key type should be deleted', () => {
    const obj1 = {
      key: {
        innerKey: 'foo',
      },
    };

    const obj2 = {
      key: {},
    };

    const [diff] = getObjectsDiff(obj1, obj2);
    const [innerKeyDiff] = diff.children;
    expect(innerKeyDiff.type).toBe('deleted');
  });

  it('inner key type should be added', () => {
    const obj1 = {
      key: {},
    };

    const obj2 = {
      key: {
        innerKey: 'foo',
      },
    };

    const [diff] = getObjectsDiff(obj1, obj2);
    const [innerKeyDiff] = diff.children;
    expect(innerKeyDiff.type).toBe('added');
  });

  it('inner key type should be tree', () => {
    const obj1 = {
      key: {
        innerKey: 'bar',
      },
    };

    const obj2 = {
      key: {
        innerKey: 'foo',
      },
    };

    const [keyDiff] = getObjectsDiff(obj1, obj2);
    expect(keyDiff.type).toBe('tree');
  });
});
