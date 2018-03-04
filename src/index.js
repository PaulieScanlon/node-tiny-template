#!/usr/bin/env node

const path = require('path');
const shell = require('shelljs');
const program = require('commander');
const templateGenerator = require('./scripts/template-gen');

program
	.version('1.0.0', '-v, --version')
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

templateGenerator(program, err => {
	if (err) {
		shell.echo(err);
		process.exit();
	}
});
