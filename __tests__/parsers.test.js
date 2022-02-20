import { expect } from '@jest/globals';
import fs from 'fs';
import path from 'path';
import { json, yaml } from '../src/parsers';

describe('parsers', () => {
  it('should parse json file', () => {
    const p = path.join(process.cwd(), '__tests__/__fixtures__/data.json');
    const data = fs.readFileSync(p);
    const parsedData = json(data);

    expect(typeof parsedData).toEqual('object');
    expect(parsedData.foo).toEqual(42);
  });

  it('should parse yaml file', () => {
    const p = path.join(process.cwd(), '__tests__/__fixtures__/data.yml');
    const data = fs.readFileSync(p);
    const parsedData = yaml(data);

    expect(typeof parsedData).toEqual('object');
    expect(parsedData.foo).toEqual(43);
  });
});
