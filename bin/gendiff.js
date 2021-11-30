#!/usr/bin/env node

import { Command } from 'commander/esm.mjs';
const program = new Command();

program
  .arguments('<filepath1> <filepath2>')
  .version('0.0.1', '-V, --vers', 'output the current version')
  .description('Compares two configuration files and shows a difference.')
  .parse()
  .help('-h, --help', 'output usage information')
  .options('-f, --format [type]', 'output format');

const options = program.opts();
console.log('Options:');
if (options.version) console.log(program.version);
if (options.help) console.log(`$shell help`);