const path = require('path');
const shell = require('shelljs');
const changeCase = require('change-case');

const { errors, success, warnings } = require('../echo/echo-styles');

const writeDir = (program, options) => {
	const formattedDirectory = `${changeCase[options.directory.format](
		program.directory
	)}`;

	const writeLocation = path.join(
		process.cwd(),
		`${options.directory.output}/${formattedDirectory}`
	);

	let result = {
		status: false,
		message: `${errors.bold('Error:')} ${errors.highlight(
			`"${formattedDirectory}"`
		)} directory already exists!`
	};

	if (program.force) {
		shell.mkdir('-p', writeLocation);
		result.status = true;
		result.message = `${success.bold('Success:')} ${success.highlight(
			`"${formattedDirectory}"`
		)} directory created with ${warnings.underline('force')} ok!`;
	}

	if (!shell.test('-e', writeLocation) && !options.force) {
		shell.mkdir('-p', writeLocation);
		result.status = true;
		result.message = `${success.bold('Success:')} ${success.highlight(
			`"${formattedDirectory}"`
		)} directory created ok!`;
	}

	return result;
};

module.exports = writeDir;
