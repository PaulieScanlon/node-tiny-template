#!/usr/bin/env node

const path = require('path');
const shell = require('shelljs');
const program = require('commander');
const templateGenerator = require('./template-gen');

let constants = require('./constants');

const defaultConfig = path.resolve(process.cwd(), `${constants.defaultName}`);

const {
	checkConfig,
	checkEntry,
	checkArray,
	checkDirectory
} = require('./error-checks');

let logic = {
	config: false,
	entry: false,
	array: false,
	output: false
};

let options = {
	configName: '',
	config: '',
	entry: '',
	directory: ''
};

// const checkForEntry = config => {
// 	if (!config.hasOwnProperty(`${program.entry}`)) {
// 		shell.echo(`"${program.entry}" not found in config!`);
// 		process.exit();
// 	}
// 	shell.echo('Everyting is probably ok!');
// };

program
	.version('0.0.1', '-v, --version')
	.description('Tiny Template')
	.option('-e, --entry <required>', 'required array from config object')
	.option('-d, --directory <required>', 'required output directory')
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

if (program.config) {
	// 1. has been passed -c flag
	// 2. check to see if that file actually exists
	// console.log('program.config: ', program.config);
	logic.config = checkConfig(program.config, 'programConfig');
	options.config = program.config;
	// 3. set a const to say config stuff has been sorted
}

if (!program.config) {
	// 1. hasn't been passed -c flag...
	// 2. we now need to check the default config file is there
	// console.log('defaultConfig: ', defaultConfig);
	logic.config = checkConfig(defaultConfig, 'defaultConfig');
	options.configName = defaultConfig;
	// 3. set a const to say config stuff has been sorted
}

if (logic.config) {
	// TODO // maybe check through the optional flags and do the shit that's required
	// rather than a load of other if statments??

	// 1. check we have been passed the -e flag...
	logic.entry = checkEntry(program.entry);
	options.entry = program.entry;
}

if (logic.config && logic.entry) {
	// 1. require the config file
	options.config = require(`${options.configName}`);
	// 2. we now need to check the config file contains the entry
	logic.array = checkArray(options.config, options.entry);
}

if (logic.array) {
	//1. check we have been passed the -d flag
	logic.directory = checkDirectory(program.directory);
}

if (logic.directory) {
	//if -n flag reformat the options object and set -n as name
	// if no -n flag reformat the options object and set directory as the name
}

// templateGenerator(options);

// TODO options construction with error checking
// const options = {
// 	config: config,
// 	entry: program.entry,
// 	directory: program.directory
// };

// templateGenerator(options);

// if (!program.entry) {
// 	shell.echo('> An array is required!');
// 	process.exit();
// }

// if (!program.directory) {
// 	shell.echo('> An output directory is required!');
// 	process.exit();
// }

// if (program.config) {
// 	config = require(path.resolve(process.cwd(), `${program.config}`));
// 	checkForEntry(config);
// }

// if (!shell.test('-e', defaultConfig)) {
// 	shell.echo(`> You must have a config file called ${defaultName} on root!`);
// 	process.exit();
// }

// if (shell.test('-e', defaultConfig) && !program.config) {
// 	config = require(defaultConfig);
// 	checkForEntry(config);
// }
