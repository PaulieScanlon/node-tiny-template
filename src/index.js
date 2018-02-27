#!/usr/bin/env node

const path = require('path');
const shell = require('shelljs');
const program = require('commander');
const templateGenerator = require('./template-gen');

const defaultName = 'tiny-template.config.js';
const defaultConfig = path.resolve(process.cwd(), `${defaultName}`);

let config = null;

const checkForEntry = config => {
	if (!config.hasOwnProperty(`${program.entry}`)) {
		shell.echo(`"${program.entry}" not found in config!`);
		process.exit();
	}
	shell.echo('Everyting is probably ok!');
};

program
	.version('0.0.1', '-v, --version')
	.description('Tiny Template')
	.option('-d, --directory <required>', 'required output directory')
	.option('-e, --entry <required>', 'required array from config object')
	.option('-c, --config <optional>', 'optional path to config file')

	.on('--help', () => {
		shell.echo('');
		shell.echo('  Examples:');
		shell.echo('');
		shell.echo('    $ custom-help --help');
		shell.echo('    $ custom-help -h');
		shell.echo(`    $ tiny-template -e "components" -d "my-component"`);
		shell.echo('');
	})
	.parse(process.argv);

shell.echo('process.cwd', process.cwd());

if (!program.entry) {
	shell.echo('> An array is required!');
	process.exit();
}

if (!program.directory) {
	shell.echo('> An output directory is required!');
	process.exit();
}

if (program.config) {
	config = require(path.resolve(process.cwd(), `${program.config}`));
	checkForEntry(config);
}

if (!shell.test('-e', defaultConfig)) {
	shell.echo(`> You must have a config file called ${defaultName} on root!`);
	process.exit();
}

if (shell.test('-e', defaultConfig) && !program.config) {
	config = require(defaultConfig);
	checkForEntry(config);
}

// TODO options construction with error checking
const options = {
	config: config,
	entry: program.entry,
	directory: program.directory
};

templateGenerator(options);
