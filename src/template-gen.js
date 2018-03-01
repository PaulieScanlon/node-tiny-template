const shell = require('shelljs');

const writeDir = require('./write-dir');
const writeFile = require('./write-file');

const { checkKeys, checkTemplates } = require('./error-checks');
const { errors, success, tiny } = require('./error-styles');

const templateGenerator = options => {
	// check if all keys are present in config
	let keys = checkKeys(options);
	shell.echo(keys.message);
	if (!keys.status) {
		process.exit();
	}

	// 2. write the dir if it doesn't already exist
	let dir = writeDir(options);
	shell.echo(dir.message);
	if (!dir.status) {
		process.exit();
	}

	// 3. check if the template files are there before attempting to write them
	let templates = checkTemplates(options);
	shell.echo(templates.message);
	if (!templates.status) {
		process.exit();
	}

	// 4. compile and write the files using the templates
	let file = writeFile(options);
	shell.echo(file.message);
	if (!file.status) {
		process.exit();
	}

	shell.echo('');
	shell.echo(`${tiny.finished(' FINISHED ')} Tiny Template finished!`);
	shell.echo('');
};

module.exports = templateGenerator;
