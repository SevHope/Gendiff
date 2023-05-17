#!/bin/env node

import { Command } from 'commander/esm.mjs';
import genDiff from '../src/genDiff.js';

const program = new Command();

program
  .description('Compares two configuration files and shows a difference.')
  .helpOption('-h, --help', 'display help for command')
  .version('-V, --version')
  .option('-f, --format <type>', 'output format')
  .argument('<filepath1>', 'first configuration file')
  .argument('<filepath2>', 'second configuration file')
  .action((filepath1, filepath2) => {
    console.log(genDiff(filepath1, filepath2))
  })

program.parse(process.argv);