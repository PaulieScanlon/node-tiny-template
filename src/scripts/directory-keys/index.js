const { errors, success } = require('../echo/echo-styles');

const requiredDirectoryKeys = ['format', 'output'];

const checkDirectoryKeys = directory => {
	let result = {
		status: true,
		message: `${success.bold('Success:')} all ${success.highlight(
			`"directory"`
		)} required keys found ok!`
	};

	for (let i = 0; i < requiredDirectoryKeys.length; i++) {
		if (!Object.keys(directory).includes(requiredDirectoryKeys[i])) {
			return {
				status: false,
				message: `${errors.bold('Error:')} ${errors.highlight(
					`"${requiredDirectoryKeys[i]}"`
				)} is missing from ${errors.highlight(`"directory"`)} object!`
			};
		}
	}

	return result;
};

module.exports = {
	checkDirectoryKeys
};
