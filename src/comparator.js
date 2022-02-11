import _ from 'lodash';
import { getSortedUniqKeys } from './utils.js';

export default function getObjectsDiff(obj1, obj2) {
  const keys = getSortedUniqKeys(obj1, obj2);

  return keys.map((key) => {
    const value1 = obj1?.[key];
    const value2 = obj2?.[key];
    const result = {
      key,
      oldValue: value1,
      newValue: value2,
    };

    if (_.isObject(value1) && _.isObject(value2)) {
      result.type = 'tree';
      result.children = getObjectsDiff(value1, value2);

      return result;
    }

    if (value1 === value2) {
      result.type = 'equal';
      return result;
    }

    if (value1 !== value2 && _.has(obj1, key) && _.has(obj2, key)) {
      result.type = 'modified';
      return result;
    }

    if (_.has(obj1, key)) {
      result.type = 'deleted';
      return result;
    }

    result.type = 'added';
    return result;
  });
}
