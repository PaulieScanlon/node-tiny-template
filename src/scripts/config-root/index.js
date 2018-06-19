const { errors, success } = require('../../utils/echo');

const checkConfigRoot = (configFile, object) => {
	let result = {
		status: false,
		message: `${errors.bold('Error:')} config ${errors.highlight(
			`"${object}"`
		)} not found!`
	};

	// Check for root object or array in main config object
	if (configFile.config[`${object}`]) {
		result.status = true;
		result.message = `${success.bold('Success:')} config ${success.highlight(
			`"${object}"`
		)} object found ok!`;
	}

	return result;
};

module.exports = {
	checkConfigRoot
};
