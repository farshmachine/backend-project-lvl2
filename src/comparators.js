import { readFileSync } from 'fs';
import { resolve } from 'path';

function getFilesData(...paths) {
  return paths.reduce((data, path, index) => {
    const fileNumber = index + 1;
    const keyName = `file${fileNumber}`;
    const resolvedPath = resolve(path);
    const fileData = readFileSync(resolvedPath);

    return {
      ...data,
      [keyName]: JSON.parse(fileData),
    };
  }, {});
}

function stringify(key, value, objectNumber = 0) {
  let prefix = ' ';

  if (objectNumber === 1) {
    prefix = '-';
  }

  if (objectNumber === 2) {
    prefix = '+';
  }

  return `  ${prefix} ${key}: ${value}\n`;
}

function getSortedUniqKeys(obj1, obj2) {
  const keys = Object.keys({ ...obj1, ...obj2 });

  return [...new Set([...keys])].sort();
}

function isValueDefined(value) {
  return value !== undefined;
}

function mergeObjectValues({ file1, file2 }) {
  const keys = getSortedUniqKeys(file1, file2);
  const result = {};

  for (let i = 0; i < keys.length; i += 1) {
    result[i] = [file1[i], file2[i]];
  }

  return result;
}

function prepareOutput(obj) {
  const diff = Object.keys(obj).map((key) => {
    const [value1, value2] = obj[key];

    if (value1 === value2) {
      return stringify(key, value1);
    }

    if (value1 !== value2 && isValueDefined(value1) && isValueDefined(value2)) {
      let value = stringify(key, value1, 1);
      value += stringify(key, value2, 2);

      return value;
    }

    if (value1 !== value2 && isValueDefined(value1)) {
      return stringify(key, value1, 1);
    }

    return stringify(key, value2, 2);
  }).join('');

  return `{\n${diff}}`;
}

function printFileDiff(filepath1, filepath2) {
  const data = getFilesData(filepath1, filepath2);
  const diff = mergeObjectValues(data);
  const output = prepareOutput(diff);
  console.log(output);
}

export default printFileDiff;
