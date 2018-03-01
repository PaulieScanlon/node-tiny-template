#!/usr/bin/env node

const path = require('path');
const shell = require('shelljs');
const program = require('commander');
const templateGenerator = require('./template-gen');

const defaultName = 'tiny-template.config.js';

const {
	checkConfig,
	checkRequiredFlags,
	checkEntry
} = require('./error-checks');

const { errors, success, tiny } = require('./error-styles');

let options = {
	config: null,
	entry: null,
	directory: null
};

let configObject = null;

program
	.version('0.0.1', '-v, --version')
	.description('Tiny Template')
	.option('-c, --config [optional]', 'optional path to config file')
	.option('-e, --entry <required>', 'required array from config object')
	.option('-d, --directory <required>', 'required output directory')
	.on('--help', () => {
		shell.echo('');
		shell.echo('  Examples:');
		shell.echo('');
		shell.echo('    $ custom-help --help');
		shell.echo('    $ custom-help -h');
		shell.echo(`    $ tiny-template -e "components" -d "app-component"`);
		shell.echo(
			`    $ tiny-template -c "tiny-template-custom.config.js" -e "containers" -d "app"`
		);
		shell.echo('');
	})
	.parse(process.argv);

shell.echo('');
shell.echo(`${tiny.starting(' STARTING ')} Tiny Template starting up!`);
shell.echo('');
// Check if cli -c flag has been passed in and use that file instead of default
if (program.config) {
	configObject = checkConfig(program.config, 'programConfig');
}

// If no cli -c flag then use the default config file
if (!program.config) {
	configObject = checkConfig(defaultName, 'defaultConfig');
}

// Check all required flags have been passed in
const requiredFlags = checkRequiredFlags(program);
shell.echo(requiredFlags.message);
if (!requiredFlags.status) {
	process.exit();
}

// Check the passed in -e entry exists in the config file
const entryFound = checkEntry(configObject, program.entry);
shell.echo(entryFound.message);
if (!entryFound.status) {
	process.exit();
}

// Set some stuff on the options object
options.config = configObject;
options.entry = program.entry;
options.directory = program.directory;

// If no name has been passed in from config file set it to the same as the -d directory
// and create a new options config objct
options.config[options.entry].map((obj, i) => {
	obj['directory'] = options.directory;
	if (!obj.name) {
		obj['name'] = options.directory;
	}
});

// Pass new optios config on to templateGenerator
templateGenerator(options);
