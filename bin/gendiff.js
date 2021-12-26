#!/usr/bin/env node
/* eslint-disable import/extensions */
/* eslint-disable no-console */
import { program } from 'commander';
import genDiff from '../formatters/index.js';

program
  .arguments('<filepath1> <filepath2>')
  .version('0.0.1', '-V, --vers', 'output the current version')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --formatter [type]', 'stylish', 'stylish')
  .action(genDiff);

program.parse(process.argv);

const options = program.opts();

if (options.version) console.log(program.version);
if (options.help) console.log('$shell help');
if (options.format) console.log(`formatter: ${program.opts().formatter}`);
