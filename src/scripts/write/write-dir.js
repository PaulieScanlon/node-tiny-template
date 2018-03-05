const path = require('path');
const shell = require('shelljs');

const { errors, success } = require('../echo/echo-styles');

const writeDir = options => {
	const writeLocation = path.join(
		process.cwd(),
		`${options.config[options.entry][0].output}/${options.directory}`
	);

	let result = {
		status: false,
		message: `${errors.bold('Error:')} ${errors.highlight(
			`"${options.directory}"`
		)} directory already exists`
	};

	// 1. if force === true create the dir regardless
	// TODO write test for this
	if (options.force) {
		shell.mkdir('-p', writeLocation);
		result.status = true;
		result.message = `${success.bold('Success:')} ${success.highlight(
			`"${options.directory}"`
		)} directory created ok`;
	}

	// 2. if force === false check before making the dir
	if (!shell.test('-e', writeLocation) && !options.force) {
		shell.mkdir('-p', writeLocation);
		result.status = true;
		result.message = `${success.bold('Success:')} ${success.highlight(
			`"${options.directory}"`
		)} directory created ok`;
	}

	return result;
};

module.exports = writeDir;
