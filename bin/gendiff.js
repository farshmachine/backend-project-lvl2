#!/usr/bin/env node

import { Command } from 'commander/esm.mjs';
import {
    getFilesData,
    mergeObjectValues,
    prepareOutput
} from '../src/comparators.js';

const program = new Command();

program
    .version('0.0.1')
    .description('Compares two configuration files and shows a difference.')
    .argument('<filepath1>')
    .argument('<filepath2>')
    .option('-f, --format [type]', 'output format')
    .action((filepath1, filepath2) => {
        const data = getFilesData(filepath1, filepath2);
        const diff = mergeObjectValues(data);
        const output = prepareOutput(diff);
        console.log(output);
      });

program.parse();