#!/usr/bin/env node

const path = require('path');
const shell = require('shelljs');
const program = require('commander');
const templateGenerator = require('./scripts/template-gen');

const { success, tiny } = require('./scripts/echo/echo-styles');

program
	.version('2.0.0', '-v, --version')
	.description('Tiny Template')
	.option('-c, --config [optional]', 'optional path to config file')
	.option('-f, --force [optional]', 'force writes a directory')
	// .option('-e, --entry <required>', 'required array from config object')
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

templateGenerator(
	program,
	err => {
		shell.echo('');
		shell.echo(
			`${tiny.error(' ERROR ')} Tiny Template finished ... but with errors!`
		);
		shell.echo('');
		process.exit(1);
	},
	success => {
		shell.echo('');
		shell.echo(`${tiny.success(' FINISHED ')} Tiny Template finished ok!`);
		shell.echo('');
		process.exit(0);
	}
);
