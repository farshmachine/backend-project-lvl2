import { load } from 'js-yaml';

function json(data) {
  return JSON.parse(data);
}

function yaml(data) {
  return load(data);
}

const yml = yaml;

export {
  json, yaml, yml,
};
