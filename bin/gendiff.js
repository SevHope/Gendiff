#!/bin/env node

import { Command } from 'commander/esm.mjs';

const program = new Command();

program
  .description('Compares two configuration files and shows a difference.')
  .version('-v, --vers', 'output the current version')
  .helpOption('-h, --help', 'display help for command')
;

program.parse();