const shell = require('shelljs');

const { checkKeys } = require('./error-checks');

const writeDir = require('./write-dir');
const writeFile = require('./write-file');

const templateGenerator = options => {
	// Check if all keys are present in config
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

	// 3. compile and write the files using the templates
	let file = writeFile(options);
	shell.echo(file.message);
	if (!file.status) {
		process.exit();
	}
};

module.exports = templateGenerator;
