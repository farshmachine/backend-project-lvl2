#!/usr/bin/env node

const jsonDiff = require('../src/comparators');

describe('json flat comparator', () => {
  it('test', () => {
    const file1Path = './__fixtures__/file1.json';
    const file2Path = './__fixtures__/file2.json';

    expect(jsonDiff(file1Path, file2Path)).toEqual(`{
      - follow: false
        host: hexlet.io
      - proxy: 123.234.53.22
      - timeout: 50
      + timeout: 20
      + verbose: true
    }`);
  });
});
