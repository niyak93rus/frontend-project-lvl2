#!/usr/bin/env node

import { Command } from 'commander/esm.mjs';
const program = new Command();

program.version('0.0.1', '-v, --vers', 'output the current version')
  .description('Compares two configuration files and shows a difference.')
  .parse()
  .option('-v, --version' , 'output the version number')
  .option('-h, --help', 'output usage information');

const options = program.opts();
console.log('Options:');
if (options.version) console.log(program.version);
if (options.help) console.log(`$shell help`);