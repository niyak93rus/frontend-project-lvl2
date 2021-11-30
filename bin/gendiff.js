#!/usr/bin/env node

import { Command } from 'commander/esm.mjs';
import gendiff from '../src/index.js';

const program = new Command();

program
  .arguments('<filepath1> <filepath2>')
  .name("gendiff")
  .version('0.0.1', '-V, --vers', 'output the current version')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format')
  .help('-h, --help', 'output usage information')
  .action(gendiff(arguments));

program.parse();

const options = program.opts();
console.log('Options:');
if (options.version) console.log(program.version);
if (options.help) console.log(`$shell help`);
if (options.format) console.log(program.option);
