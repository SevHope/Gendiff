#!/usr/bin/env node

import { program } from 'commander';
import genDiff from '../index.js';

program
  .description('Compares two configuration files and shows a difference.')
  .helpOption('-h, --help', 'display help for command')
  .version('-V, --version')
  .option('-f, --format <type>', 'output format', 'stylish')
  .arguments('<filePath1> <filePath2>')
  .action((filepath1, filepath2) => {
    console.log(genDiff(filepath1, filepath2, program.opts().format));
  });

program.parse();
