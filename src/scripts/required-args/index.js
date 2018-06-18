const path = require('path');
const shell = require('shelljs');
const flags = require('../../flags');

const { errors, success } = require('../echo/echo-styles');

const checkRequiredArgs = rawArgs => {
	const result = {
		status: false,
		message: `${errors.bold('Error:')} Missing one or more ${errors.highlight(
			'"<required>"'
		)} args`
	};

	const flagKeys = Object.keys(flags);
	for (let i = 0; i < flagKeys.length; i++) {
		const flag = flags[flagKeys[i]];
		if (flag.validate) {
			if (flag.validate(rawArgs)) {
				return {
					status: true,
					message: `${success.bold('Success:')} all ${success.highlight(
						'"<required>"'
					)} args found ok!`
				};
			}
		}
	}

	return result;
};

module.exports = {
	checkRequiredArgs
};
