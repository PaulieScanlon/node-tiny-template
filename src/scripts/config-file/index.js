const path = require('path');
const shell = require('shelljs');
const flags = require('../../flags');

const { errors, success } = require('../echo/echo-styles');

const checkConfigFile = config => {
	let result = {
		status: false,
		message: `${errors.bold('Error:')} config ${errors.highlight(
			`"${config}"`
		)} not found`,
		config: null,
		fileName: config
	};

	if (shell.test('-e', config)) {
		result.status = true;
		result.message = `${success.bold('Success:')} file ${success.highlight(
			`"${config}"`
		)} ok!`;
		result.config = require(path.resolve(process.cwd(), `${config}`));
	}

	return result;
};

module.exports = {
	checkConfigFile
};
