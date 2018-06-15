#!/usr/bin/env node

const path = require('path');
const shell = require('shelljs');
const program = require('commander');
const templateGenerator = require('./scripts/template-gen');
const flags = require('./flags');

const { success, tiny } = require('./scripts/echo/echo-styles');

program
	.version('2.0.0', '-v, --version')
	.description('Tiny Template')
	.option(`${flags.config.short}, ${flags.config.long}`, `${flags.config.description}`)
	.option(`${flags.force.short}, ${flags.force.long}`, `${flags.force.description}`)
	.option(`${flags.directory.short}, ${flags.directory.long}`, `${flags.directory.description}`)
	.on('--help', () => {
		shell.echo('');
		shell.echo('  Examples:');
		shell.echo('');
		shell.echo('    $ custom-help --help');
		shell.echo('    $ custom-help -h');
		shell.echo(`    $ tiny-template -d "new-component"`);
		shell.echo(`    `);
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
