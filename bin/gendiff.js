#!/usr/bin/env node

import { Command } from 'commander';
import getDiff from '../src/index.js';

const program = new Command();

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .option('-f, --format [type]', 'output formats: stylish, plain', 'stylish')
  .action((filepath1, filepath2, { format }) => {
    console.log(filepath1, filepath2);
    const diff = getDiff(format, filepath1, filepath2);
    console.log(diff);
  });

program.parse();
