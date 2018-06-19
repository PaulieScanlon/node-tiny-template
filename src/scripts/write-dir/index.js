const path = require('path');
const shell = require('shelljs');
const changeCase = require('change-case');

const { errors, success, warnings } = require('../../utils/echo');

const checkWriteDir = (directory, force, configFile) => {
	const formattedDirectory = `${changeCase[configFile.directory.format](
		directory
	)}`;

	const writeLocation = path.join(
		process.cwd(),
		`${configFile.directory.output}/${formattedDirectory}`
	);

	let result = {
		status: false,
		message: `${errors.bold('Error:')} ${errors.highlight(
			`"${formattedDirectory}"`
		)} directory already exists!`
	};

	if (force) {
		shell.mkdir('-p', writeLocation);
		result.status = true;
		result.message = `${success.bold('Success:')} ${success.highlight(
			`"${formattedDirectory}"`
		)} directory created with ${warnings.underline('force')} ok!`;
	}

	if (!shell.test('-e', writeLocation) && !force) {
		shell.mkdir('-p', writeLocation);
		result.status = true;
		result.message = `${success.bold('Success:')} ${success.highlight(
			`"${formattedDirectory}"`
		)} directory created ok!`;
	}

	return result;
};

module.exports = {
	checkWriteDir
};
