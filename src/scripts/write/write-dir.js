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

	//Dev only
	shell.mkdir('-p', writeLocation);
	result.status = true;
	result.message = `${success.bold('Success:')} ${success.highlight(
		`"${options.directory}"`
	)} directory created ok`;

	// if (!shell.test('-e', writeLocation)) {
	// 	shell.mkdir('-p', writeLocation);
	// 	result.status = true;
	// 	result.message = `${success.bold('Success:')} ${success.highlight(
	// 		`"${options.directory}"`
	// 	)} directory created ok`;
	// }

	return result;
};

module.exports = writeDir;
