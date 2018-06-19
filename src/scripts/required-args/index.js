const path = require('path');
const shell = require('shelljs');
const flags = require('../../utils/flags/');

const { errors, success } = require('../../utils/echo');

const checkRequiredArgs = rawArgs => {
	console.log(rawArgs);

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
