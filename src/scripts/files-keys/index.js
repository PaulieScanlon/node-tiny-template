const difference = require('lodash.difference');
const { errors, success } = require('../../utils/echo');

const requiredFilesKeys = ['extension', 'format', 'template'];
const opttionalFilesKeys = ['name'];

const checkFilesKeys = files => {
	let result = {
		status: true,
		message: `${success.bold('Success:')} all ${success.highlight(
			`"files"`
		)} required keys found ok!`
	};

	const required = files.map(object => {
		const filesKeys = Object.keys(object);

		return filesKeys.filter(key => {
			if (!opttionalFilesKeys.includes(key)) {
				return key;
			}
		});
	});

	for (let i = 0; i < required.length; i++) {
		const diff = difference(requiredFilesKeys, required[i]);
		if (diff.length !== 0) {
			return {
				status: false,
				message: `${errors.bold('Error:')} ${errors.highlight(
					`"${diff[0]}"`
				)} is missing from ${errors.highlight(
					`"files"`
				)} array position ${errors.highlight(`"${i}"`)}`
			};
		}
	}

	return result;
};

module.exports = {
	checkFilesKeys
};
